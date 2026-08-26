# Deploying ism50.com

## What is already wired

| Thing | Value |
| --- | --- |
| Firebase project id | `ism50-a8a44` |
| Firebase hosting site | `ism50-a8a44` |
| Default URLs | `https://ism50-a8a44.web.app`, `https://ism50-a8a44.firebaseapp.com` |
| Firebase account | `khhawari92@gmail.com` (note the DOUBLE h) |
| Repository path | `/Users/kalhawari/GitHub/ism50` |

**Do not assume the project id and the site id match just because they do here.**
On kna-group the project is `kna-group` while the site is `kna-group-a26da`. Both
values above were read off `firebase projects:list` and
`firebase hosting:sites:list`, not guessed.

`.firebaserc` names the project and `firebase.json` pins
`hosting.site` to the site. Deploying is:

    npm run build && npx firebase-tools deploy --only hosting --non-interactive

`scripts/publish-scheduled.sh` does that plus a preflight, a version prune, three
retries, a sitemap-manifest commit and an IndexNow ping.

## The account binding, which is the usual failure

firebase-tools records the signed-in account against an EXACT directory path in
`~/.config/configstore/firebase-tools.json`. Two consequences:

1. Moving or copying the repository orphans the binding, and the CLI silently
   falls back to whatever the default account is. Running from a git worktree
   does the same thing, because a worktree path is not a key in that file.
2. A wrong account does not error early. It errors at deploy, after a full build,
   with a message about the project not existing.

So `publish-scheduled.sh` asks the CLI what it can see BEFORE spending the build
and refuses rather than deploying somewhere unexpected. If it refuses:

    cd /Users/kalhawari/GitHub/ism50 && npx firebase-tools login:use khhawari92@gmail.com

**The repository must not move into `~/Documents`.** macOS privacy protection
blocks a launchd agent from reading that folder entirely, and it has already cost
this project days on a sibling site.

## WHAT KAL HAS TO DO: attach ism50.com

The custom domain is not attached yet. Today `ism50.com` is registered at Porkbun
with Porkbun's own nameservers and resolves to a parking page. Nothing in the
build assumes the apex resolves: every internal link is root-relative, every
canonical is written from the configured `site` value, and the site works
correctly on the `.web.app` URL.

Two steps, in this order.

### 1. In the Firebase console

Hosting, site `ism50-a8a44`, **Add custom domain**. Add `ism50.com`, and tick the
option to redirect `www.ism50.com` to it (or add `www` as a second domain
redirecting to the apex).

Firebase will show a **TXT record** to prove ownership, then, once verified, **two
A records**. Take the values from the console: the TXT token is unique to this
verification and the A records should be read rather than assumed.

### 2. At Porkbun, in the DNS records for ism50.com

Porkbun's editor asks for Type, Host, Answer, TTL. Leave `Host` EMPTY for the
apex; Porkbun writes `ism50.com` itself. Do not type `@`.

**First, the ownership check:**

| Type | Host | Answer | TTL |
| --- | --- | --- | --- |
| TXT | *(empty)* | the exact `hosting-site=...` value the console shows | 600 |

Wait for Firebase to report the domain as verified. It is usually minutes.

**Then, the A records.** Firebase Hosting has used `199.36.158.100` for these
sites, and the sibling domains resolve to it today, but **read the two addresses
off the console rather than copying that one from here.** They are per-project and
Google has changed them before.

| Type | Host | Answer | TTL |
| --- | --- | --- | --- |
| A | *(empty)* | first address from the console | 600 |
| A | *(empty)* | second address from the console | 600 |

**And remove the parking records.** Porkbun's default `A`/`ALIAS` record pointing
at its parking page must be deleted, or the domain will resolve to both and the
result is intermittent. This is the step people skip.

If a `www` CNAME is wanted:

| Type | Host | Answer | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `ism50-a8a44.web.app` | 600 |

### 3. Afterwards

Firebase provisions a certificate automatically once the A records resolve. That
can take up to 24 hours and usually takes far less. Until it completes the domain
serves a certificate warning, which is expected and not a misconfiguration.

Once the apex is live:

- Verify with `curl -sI https://ism50.com/` and check for a `200`.
- Check the four public resolvers, not just this machine. On 2026-08-26
  khaledhawari.ca answered correctly on Cloudflare, Google and OpenDNS and
  returned SERVFAIL on Quad9, which is invisible from a browser here and total
  for anybody using Quad9.
- Submit `https://ism50.com/sitemap-index.xml` in Search Console.
- The IndexNow key file is already in `public/`. It is served at the site root and
  the key must equal the filename; `scripts/indexnow.mjs` discovers it rather than
  hardcoding it, so there is one place to change it.

## What is deliberately NOT done

- **The launchd agent is not installed.** See `launchd/README.md`. Installing it
  runs a build and a deploy immediately, because `RunAtLoad` is true.
- **Nothing points DNS anywhere.** That is the section above and it is Kal's.
