#!/usr/bin/env bash
# Delete superseded Firebase Hosting versions before a deploy.
#
# WHY THIS EXISTS. On 2026-08-25 the 07:15 run built the day's article, all 152
# URLs and every verify script green, then failed all three deploy attempts:
#
#   HTTP 429: You have exceeded the Hosting storage quota for your Firebase
#   project, so you cannot deploy to your site right now.
#
# The site had accumulated 154 stored versions at roughly 1,153 files each.
# Firebase keeps every version you have ever deployed until told otherwise, and
# with four scheduled slots a day across three sites that ceiling arrives on its
# own schedule. The article did not appear, and the only signal was a line in a
# log nobody reads.
#
# Deleting the 147 EXPIRED and 2 ABANDONED versions, keeping the 5 FINALIZED
# ones, reclaimed about 169,000 files and the deploy went through unchanged.
# This script does that automatically so the ceiling is never reached again.
#
# WHAT IS SAFE TO DELETE. An EXPIRED version is one Firebase has already
# superseded; it is not served to anyone. An ABANDONED version was never
# finalized. FINALIZED versions include the one currently released, so they are
# never touched: the live release plus its rollback history survives intact.
#
# FAIL-OPEN, DELIBERATELY. Every failure path here warns and returns 0. A
# missing gcloud, stale credentials, an API change, no network: none of them may
# stop the day's article from shipping. The worst case is that this is a no-op
# and the deploy behaves exactly as it did before this file existed. That is
# also why it runs BEFORE the deploy rather than after, so a full quota is
# cleared in the same run that needs the room.

set -uo pipefail

SITE="${1:-}"
if [ -z "$SITE" ]; then
  echo "prune: no site id given, skipping"
  exit 0
fi

if ! command -v gcloud >/dev/null 2>&1; then
  echo "prune: gcloud not installed, skipping (deploy continues)"
  exit 0
fi

TOKEN="$(gcloud auth print-access-token 2>/dev/null)"
if [ -z "$TOKEN" ]; then
  echo "prune: no access token available, skipping (deploy continues)"
  exit 0
fi

# THE QUOTA PROJECT IS NOT THE SITE ID.
#
# x-goog-user-project wants the GCP PROJECT, while $1 is the Hosting SITE. On
# all three of these repos those strings happen to be equal, which is why this
# worked when it was written, but they are different namespaces and one project
# can host many sites. Add a staging or preview site and its id stops matching,
# the API answers 403, the fail-open path returns 0, and pruning silently stops.
# Storage then refills until a deploy 429s again, which is the outage this
# script exists to prevent, announced by one warning line in a log nobody reads.
# So read the real project from .firebaserc, falling back to the site id only
# when that is unreadable, which preserves today's working behaviour.
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT="$(python3 -c "import json,io,sys
try: print(json.load(io.open('$REPO_ROOT/.firebaserc'))['projects']['default'])
except Exception: sys.exit(1)" 2>/dev/null)"
if [ -z "$PROJECT" ]; then
  PROJECT="$SITE"
  echo "prune: no .firebaserc project found, falling back to site id '$SITE'"
fi

python3 - "$SITE" "$TOKEN" "$PROJECT" <<'PYEOF' || echo "prune: pruning failed, skipping (deploy continues)"
import json, sys, urllib.request, urllib.error, collections

site, token, project = sys.argv[1], sys.argv[2], sys.argv[3]
base = "https://firebasehosting.googleapis.com/v1beta1"
hdr = {"Authorization": "Bearer " + token, "x-goog-user-project": project}

# Always safe: EXPIRED is already superseded and served to nobody, ABANDONED was
# never finalized. FINALIZED is handled separately and much more carefully.
ALWAYS_STALE = ("EXPIRED", "ABANDONED")

# How many FINALIZED versions to keep, including the live one. Rollback depth.
KEEP_FINALIZED = 5

def api(url, method="GET"):
    req = urllib.request.Request(url, headers=hdr, method=method)
    return urllib.request.urlopen(req, timeout=30)

try:
    versions, tok = [], None
    while True:
        url = "%s/sites/%s/versions?pageSize=100%s" % (
            base, site, ("&pageToken=" + tok) if tok else "")
        page = json.load(api(url))
        versions += page.get("versions", [])
        tok = page.get("nextPageToken")
        if not tok:
            break
except urllib.error.HTTPError as e:
    print("prune: could not list versions (%s), skipping" % e.code)
    sys.exit(0)
except Exception as e:
    print("prune: could not list versions (%s), skipping" % type(e).__name__)
    sys.exit(0)

counts = collections.Counter(v.get("status") for v in versions)
doomed = [v for v in versions if v.get("status") in ALWAYS_STALE]

# THE GUARD. Old FINALIZED versions are only rollback points and are the reason
# kodelytics and khaledhawari.com were sitting on 97 and 74 of them, heading for
# the same 429 that took khaledhawari.ca down. They are still deletable, but ONLY
# once we know for certain which one is live. If that lookup fails for any
# reason we delete no FINALIZED version at all, because the cost of guessing
# wrong is taking the site off the internet. A full disk is recoverable; that is
# not.
live = None
try:
    rel = json.load(api("%s/sites/%s/releases?pageSize=1" % (base, site)))
    live = (rel.get("releases") or [{}])[0].get("version", {}).get("name")
except Exception:
    live = None

if live:
    finalized = [v for v in versions if v.get("status") == "FINALIZED"]
    finalized.sort(key=lambda v: v.get("createTime", ""), reverse=True)
    keep = {live}
    for v in finalized:
        if len(keep) >= KEEP_FINALIZED:
            break
        keep.add(v["name"])
    doomed += [v for v in finalized if v["name"] not in keep]
else:
    print("prune: could not confirm the live release, leaving all finalized versions alone")

if not doomed:
    print("prune: %d versions, nothing to reclaim" % len(versions))
    sys.exit(0)

ok = 0
for v in doomed:
    if v["name"] == live:
        continue  # belt and braces; the live version is never deletable
    try:
        api(base + "/" + v["name"], method="DELETE")
        ok += 1
    except Exception:
        pass  # one stubborn version must not stop the rest, or the deploy

print("prune: %d versions (%s), deleted %d, kept %d" % (
    len(versions),
    ", ".join("%s %d" % (k.lower(), n) for k, n in sorted(counts.items())),
    ok,
    len(versions) - ok,
))
PYEOF

exit 0
