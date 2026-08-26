#!/usr/bin/env bash
# Daily scheduled publish for ism50.com, run by launchd on Kal's Mac.
#
# WHY A SCHEDULER EXISTS AT ALL. The site is static, so there is no server to
# check the clock. An article dated tomorrow is simply absent from today's build
# and present in the build that runs on its date; src/lib/publication.ts
# implements that gate. Without something rebuilding daily, a scheduled article
# stays invisible forever.
#
# WHY THIS RATHER THAN A GITHUB ACTION. Actions minutes are metered on private
# repos and this account is blocked on billing, so on the sibling sites every
# scheduled workflow run failed before the job even started. A launchd agent on
# a Mac that is already switched on costs nothing.
#
# DELIBERATELY UNCONDITIONAL. It builds and deploys every time rather than
# checking whether anything is due. If the Mac was off for three days, the
# overdue articles are already in the past by the time this runs, `isLive` picks
# all of them up, and one build catches up completely. A due-date check would
# have to reason about the gap; this does not.
#
# AND THEREFORE IDEMPOTENT. Running it three times in one day produces the same
# dist three times. Firebase uploads only files whose hash changed, and the
# IndexNow ping is gated on the rendered HTML actually differing, so the second
# and third runs of a quiet day cost a couple of minutes of CPU and nothing
# else. That is what makes four slots a day safe.
set -uo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$HOME/Library/Logs/ism50-publish.log"
mkdir -p "$(dirname "$LOG")"

exec >>"$LOG" 2>&1
echo "=============================================================="
echo "$(date '+%Y-%m-%d %H:%M:%S %Z')  starting"

cd "$REPO" || { echo "FAIL: repo not found at $REPO"; exit 1; }

# =====================================================================
# ONE PUBLISHER AT A TIME, ACROSS ALL FIVE SITES
#
# WHY THIS EXISTS. On 2026-08-19 the kodelytics run died with a Vite "transport
# invoke timed out after 60000ms" during `astro sync`, and the run before it
# died with "kodelytics-5b6ab not visible to the active Firebase account". Two
# different errors, one cause.
#
# The sites' launchd slots are staggered 30 minutes apart, which was generous
# when a build took 15 seconds. Real durations from the logs on 2026-08-18:
#
#     khaledhawari.ca    07:26 -> 10:57   3.5 hours
#     kodelytics         07:45 -> 08:25
#     khaledhawari.com   13:15 -> 17:34   4.3 hours
#
# Every slot overran the next one, so several Astro builds and several Firebase
# deploys ran at once on one laptop. They starve each other until Vite's module
# runner gives up at its 60s ceiling. The Firebase error has the same root:
# concurrent `npx firebase-tools` processes race on the single shared
# ~/.config/configstore/firebase-tools.json and one of them reads a half-written
# file, then reports the project as invisible.
#
# Run the same build alone and it takes seconds. The builds were never the
# problem; the concurrency was. ism50.com is the FIFTH site to serialise on this
# lock, which is the whole reason the path below is not site-specific: the lock
# belongs to the MACHINE, not to any one repository, and a site that invented
# its own lock path would be invisible to the other four and would reintroduce
# the exact failure the lock exists to prevent.
#
# mkdir is the lock because it is atomic on POSIX: it either creates the
# directory or fails, with no window between checking and creating. A lock file
# written with `>` is not atomic and two publishers can both win it.
#
# EXITING WITHOUT PUBLISHING IS SAFE, which is why the timeout is short. Every
# one of these scripts is unconditional and idempotent, and each site runs four
# slots a day, so a skipped slot is picked up by the next one and an article
# that was due is still due. Waiting hours for a lock would just move the
# pile-up.
LOCK_DIR="$HOME/Library/Caches/kal-site-publish.lock"
LOCK_WAIT_SECONDS=900

# A lock is only as good as its staleness rule. Three ways a naive version
# wedges or double-publishes, all found by review on khaledhawari.ca on
# 2026-08-20:
#
#   1. `[ -n "$stale_pid" ]` meant a lock whose pid file was MISSING OR EMPTY
#      was never judged stale. A hard power-off between `mkdir` and the `echo
#      $$` on the next line leaves exactly that, and ~/Library/Caches survives
#      reboots, so every run of every site would wait 900s and exit 0 forever,
#      logging nothing but "the next slot will catch up". This machine gets
#      powered off abruptly and often, which is why RunAtLoad exists.
#   2. `kill -0` proves only that SOMETHING owns that pid. Pids get recycled,
#      and an unrelated helper process inheriting a dead publisher's pid makes
#      an abandoned lock look alive forever.
#   3. Check-then-`rm -rf` is not atomic. Two waiters could both read the same
#      dead pid, both pass the guard, and both delete: the second one deleting
#      the lock the first had just legitimately re-taken.
#
# So staleness has an AGE CEILING that needs no pid at all, liveness is
# confirmed against the process's actual command, and the takeover is an atomic
# `mv` of the directory, which exactly one waiter can win.
LOCK_STALE_SECONDS=7200

mkdir -p "$(dirname "$LOCK_DIR")"
lock_held=0
waited=0
while [ "$waited" -le "$LOCK_WAIT_SECONDS" ]; do
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    echo "$$" >"$LOCK_DIR/pid"
    date '+%Y-%m-%d %H:%M:%S %Z' >"$LOCK_DIR/since"
    lock_held=1
    break
  fi

  stale_pid=$(cat "$LOCK_DIR/pid" 2>/dev/null || echo "")
  stale=0
  stale_reason=""

  if [ -z "$stale_pid" ]; then
    # No pid recorded. Age alone decides; see the ceiling check below.
    :
  elif ! kill -0 "$stale_pid" 2>/dev/null; then
    stale=1
    stale_reason="pid $stale_pid is not alive"
  elif ! ps -o command= -p "$stale_pid" 2>/dev/null | grep -q 'publish-scheduled.sh'; then
    # Alive, but it is not one of ours: the pid was recycled.
    stale=1
    stale_reason="pid $stale_pid is not a publisher (recycled pid)"
  fi

  # The catch-all, and the only check that works with no pid file at all.
  lock_mtime=$(stat -f %m "$LOCK_DIR" 2>/dev/null || echo "")
  if [ -n "$lock_mtime" ]; then
    lock_age=$(( $(date +%s) - lock_mtime ))
    if [ "$lock_age" -gt "$LOCK_STALE_SECONDS" ]; then
      stale=1
      stale_reason="held ${lock_age}s, past the ${LOCK_STALE_SECONDS}s ceiling"
    fi
  fi

  if [ "$stale" -eq 1 ]; then
    # Atomic takeover. Renaming a path is all-or-nothing, so if two waiters race
    # here exactly one `mv` succeeds and the loser simply waits. Deleting in
    # place lets the loser delete a live lock.
    if mv "$LOCK_DIR" "${LOCK_DIR}.stale.$$" 2>/dev/null; then
      echo "warn: clearing stale lock ($stale_reason)"
      rm -rf "${LOCK_DIR}.stale.$$"
    fi
  fi

  [ "$waited" -eq 0 ] && echo "another site is publishing (pid ${stale_pid:-?}, since $(cat "$LOCK_DIR/since" 2>/dev/null)), waiting"
  # Always sleep and always advance the counter, on EVERY path. Jumping straight
  # back to the top after clearing a stale lock skips both, so an `rm` that
  # failed (full disk, bad permissions) spins at 100% CPU forever, appending to
  # a log on a disk that is already full.
  sleep 10
  waited=$((waited + 10))
done

if [ "$lock_held" -ne 1 ]; then
  echo "skipped: another site held the lock for ${LOCK_WAIT_SECONDS}s. The next slot will catch up."
  exit 0
fi

# RELEASE ONLY A LOCK THIS PROCESS OWNS, AND DO NOT RESUME AFTER A SIGNAL.
#
# The obvious form, `trap 'rm -rf "$LOCK_DIR"' EXIT INT TERM`, does not do what
# it looks like. A signal trap that does not itself exit is not an exit path:
# bash runs the handler and then RESUMES. Confirmed by experiment on
# khaledhawari.ca on 2026-08-20, where the handler deleted the lock and the
# script carried on to completion, unlocked. So a SIGTERM at logout, or
# `launchctl kickstart -k`, or a shutdown while a deploy was in flight, released
# the lock mid-deploy and let another site start its own `firebase-tools`
# against the shared ~/.config/configstore/firebase-tools.json: precisely the
# corruption this lock exists to stop.
#
# The ownership check matters just as much. Without it, a process whose lock had
# already been cleared as stale would, on exit, delete whichever lock another
# site had since acquired.
release_lock() {
  if [ "$lock_held" -eq 1 ] && [ "$(cat "$LOCK_DIR/pid" 2>/dev/null)" = "$$" ]; then
    rm -rf "$LOCK_DIR"
  fi
}
trap 'release_lock' EXIT
trap 'release_lock; exit 130' INT
trap 'release_lock; exit 143' TERM
echo "lock acquired"

# launchd gives a near-empty PATH, so node and npm are not on it. Homebrew on
# Apple silicon lives in /opt/homebrew; keep /usr/local for Intel Macs.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

command -v node >/dev/null || { echo "FAIL: node not on PATH"; exit 1; }
echo "node $(node -v)"

# PREFLIGHT. firebase-tools binds the signed-in account to an EXACT directory
# path, recorded in ~/.config/configstore/firebase-tools.json under
# `activeAccounts`. The account that can see this project is
# khhawari92@gmail.com (note the DOUBLE h), and the CLI has at times defaulted to
# a different Google account that cannot see it at all.
#
# Two consequences, both of which have bitten a sibling site:
#
#   1. MOVING OR COPYING THE REPO ORPHANS THE BINDING. khaledhawari.ca moved out
#      of ~/Documents, because launchd cannot read that folder under macOS
#      privacy protection, and the CLI silently fell back to the default account
#      and a different project. THIS REPOSITORY LIVES AT ~/GitHub/ism50 FOR THAT
#      REASON AND MUST NOT BE MOVED INTO ~/Documents. Running from a git worktree
#      does the same thing: the worktree path is not a key in that file.
#   2. A wrong account does not error early. It errors at deploy, after a full
#      build, with a message about the project not existing.
#
# So this asks the CLI what it can see BEFORE spending the build, and refuses
# rather than deploying somewhere unexpected.
projects=$(npx firebase-tools projects:list --non-interactive 2>&1) || true
if ! printf '%s' "$projects" | grep -q "ism50-a8a44"; then
  echo "FAIL: ism50-a8a44 not visible to the active Firebase account."
  echo "      Fix: cd $REPO && npx firebase-tools login:use khhawari92@gmail.com"
  echo "--- what firebase actually returned ---"
  printf '%s\n' "$projects" | tail -20
  exit 1
fi
echo "preflight ok: ism50-a8a44 visible"

# grep -c counts LINES, and the sitemap is a single line, so it always returns
# 1. Count the occurrences. The cache-buster is because Firebase serves this
# with a revalidating cache header and a stale copy would make every day look
# like a day with no change.
before=$(curl -s --max-time 30 "https://ism50.com/sitemap-0.xml?v=$RANDOM" \
  | grep -o '<loc>' | wc -l | tr -d ' ')
echo "live URLs before: ${before:-0}"

# `npm run build` is the full gate: verify:emdash, the canonical-person sync,
# astro build, the sitemap stylesheet fix, the sitemap lastmod pass, then
# verify:links, verify:content, verify:subject and verify:schema. Nothing is
# deployed unless all of them pass, which is the point of calling the same
# command a human calls rather than `astro build` directly.
#
# verify:subject is the one that is specific to this domain. It fails the build
# if Canadian crypto tax vocabulary appears anywhere, because that subject
# belongs to khaledhawari.ca and two of the same owner's domains competing for
# one query is what put .ca off page one in August 2026.
if ! npm run build; then
  echo "FAIL: build failed, nothing deployed"
  exit 1
fi

after=$(grep -o '<loc>' dist/sitemap-0.xml | wc -l | tr -d ' ')
echo "built URLs: $after"

# Reclaim hosting storage BEFORE deploying, not after.
#
# WHY. On 2026-08-25 khaledhawari.ca built the day's article, every URL and
# every verify script green, then failed all three deploy attempts on:
#
#   HTTP 429: You have exceeded the Hosting storage quota for your Firebase
#   project, so you cannot deploy to your site right now.
#
# Firebase keeps every version ever deployed until told otherwise. At four
# scheduled slots a day this ceiling arrives on its own schedule, and this site
# starts accumulating from today. Before the deploy rather than after, so a full
# quota is cleared in the same run that needs the room. The script is fail-open
# by design and always exits 0: a missing gcloud, stale credentials or no
# network warns and continues, and the worst case is a no-op.
bash "$REPO/scripts/prune-hosting-versions.sh" ism50-a8a44 || true

# Deploy, retrying twice on a transport failure.
#
# WHY. On 2026-08-07 the khaledhawari.ca run built and uploaded all 1,151 files
# and then died on the very last step: "finalizing version..." followed by
# "Failed to make request to firebasehosting.googleapis.com". A dropped
# connection to Google, nothing to do with the site. That day's article simply
# did not appear, and the only signal was a line in a log nobody reads.
# Re-running the identical script minutes later succeeded with no changes.
#
# That is the whole argument for retrying. The expensive part, the build and the
# upload, had already succeeded; one flaky HTTPS call threw it away. Backoff is
# 30s then 120s, well inside the gap before anyone looks at the site, and a
# genuine failure (bad credentials, wrong project, quota) fails all three
# attempts and still exits 1 loudly.
#
# `--only hosting` with no target: firebase.json declares a single hosting
# config pinned to site ism50-a8a44, so there is exactly one thing to deploy and
# naming a target would only add a second place to keep in step.
#
# NOTE ON THE PROJECT ID. It is ism50-a8a44 and the hosting site is ALSO
# ism50-a8a44. Do not assume that pattern: on kna-group the project is
# `kna-group` while the site is `kna-group-a26da`, and they differ. Both values
# here were read off `firebase projects:list` and `firebase hosting:sites:list`
# rather than guessed.
deployed=0
for attempt in 1 2 3; do
  if npx firebase-tools deploy --only hosting --non-interactive; then
    deployed=1
    [ "$attempt" -gt 1 ] && echo "deploy succeeded on attempt $attempt"
    break
  fi
  if [ "$attempt" -lt 3 ]; then
    wait=$((attempt == 1 ? 30 : 120))
    echo "warn: deploy attempt $attempt failed, retrying in ${wait}s"
    sleep "$wait"
  fi
done

if [ "$deployed" -ne 1 ]; then
  echo "FAIL: deploy failed after 3 attempts"
  exit 1
fi

# COMMIT THE SITEMAP MANIFEST. It is state, and nothing else records it.
#
# content/sitemap-hashes.json is the only memory of what the last deploy
# actually rendered. scripts/sitemap-lastmod.mjs rewrites it on every build and
# compares against it to decide which `lastmod` dates move, so it is the whole
# reason a date can stay still on a day nothing changed.
#
# Leaving it uncommitted works until the tree is reverted, and this repository
# is worked on by several agents in parallel worktrees. Any `git checkout .`,
# stash, hard reset, branch switch or fresh clone restores the older committed
# hashes; every page that has changed since then compares as changed AGAIN, and
# the next build re-stamps it with the current date. A sitemap whose dates move
# on every build is a build timestamp wearing a content date, which is the exact
# failure the hashing design exists to prevent and which teaches a crawler to
# discount the field entirely.
#
# Runs only after a successful deploy, because the manifest should record what
# was actually published rather than what was merely built. Scoped to the one
# file, so an unrelated edit sitting in the tree is never swept into an
# automated commit. Every step is tolerated: a detached HEAD, no credentials, a
# rejected push, all warn and continue. Publishing the day's article outranks
# bookkeeping, and the next slot retries.
if [ -n "$(git status --porcelain -- content/sitemap-hashes.json 2>/dev/null)" ]; then
  if git add content/sitemap-hashes.json 2>/dev/null &&
     git -c user.name="ism50.com publisher" \
         -c user.email="publisher@ism50.com" \
         commit -q -m "Sitemap manifest: record what $(date '+%Y-%m-%d %H:%M') published" 2>/dev/null; then
    if git push -q 2>/dev/null; then
      echo "sitemap manifest committed and pushed"
    else
      echo "warn: sitemap manifest committed locally but push failed; push it by hand"
    fi
  else
    echo "warn: could not commit the sitemap manifest; commit it by hand or dates will re-stamp"
  fi
fi

# Ping IndexNow when the CONTENT changed, not when the page COUNT changed.
#
# WHY NOT A COUNT. khaledhawari.ca compared the number of <loc> entries live
# against the number just built, which only ever notices a page being ADDED or
# REMOVED. On 2026-08-09 a deploy there rewrote the titles and meta descriptions
# of 15 pages and corrected a stale figure across 5 articles, the page count was
# identical, and the run logged "no change in page count, skipping IndexNow".
# The one kind of change whose entire purpose is to make a search engine re-read
# the page was the kind it refused to submit.
#
# A fingerprint over the built HTML catches added, removed AND edited pages, and
# is deterministic: two consecutive builds of an unchanged tree produce the same
# digest, so a genuinely idle day still skips, which is the correct instinct and
# the reason not to ping unconditionally. The digest covers HTML only. Images
# and hashed assets are deliberately out: regenerating an OG card is not a
# reason to ask Bing to re-crawl.
STATE="$REPO/.cache/last-published.sha256"
mkdir -p "$(dirname "$STATE")"

# An empty dist is NOT an edit-only day. `find | xargs cat | shasum` over zero
# files returns the digest of the empty string, e3b0c442...b855, and exits 0, so
# a wiped or half-written dist produces a perfectly well-formed fingerprint that
# differs from the stored one. The script would then log "content changed", ping
# IndexNow, and record that digest as the state of production. Guard first.
html_count=$(find dist -name '*.html' -type f | wc -l | tr -d ' ')
if [ "$html_count" -eq 0 ]; then
  echo "FAIL: dist contains no HTML after a reportedly successful build; refusing to fingerprint or ping"
  exit 1
fi
fingerprint=$(find dist -name '*.html' -type f | sort | xargs cat | shasum -a 256 | cut -d' ' -f1)
previous=$(cat "$STATE" 2>/dev/null || echo "none")

if [ "$fingerprint" != "$previous" ]; then
  if [ "$after" != "$before" ]; then
    echo "content changed and page count moved ($before -> $after), submitting to IndexNow"
  else
    echo "content changed with no page count change (an edit-only day), submitting to IndexNow"
  fi
  # The state file gates the IndexNow ping, so writing it unconditionally after
  # a failed ping is permanent data loss: the next run recomputes the identical
  # fingerprint, compares equal, logs "byte-identical to the last publish", and
  # those URLs are never submitted again. indexnow.mjs exits non-zero on a
  # transport error or any status >= 400, which a dropped connection or a 429
  # will produce. Written only after BOTH the deploy and the ping succeed, so a
  # failure of either retries on the next slot rather than recording a state
  # that never reached production.
  if npm run indexnow; then
    printf '%s' "$fingerprint" >"$STATE"
  else
    echo "warn: IndexNow failed; NOT recording the fingerprint, so the next slot retries"
  fi
else
  echo "rendered HTML is byte-identical to the last publish, skipping IndexNow"
fi

echo "$(date '+%Y-%m-%d %H:%M:%S %Z')  done"
