# The publisher agent

`com.ism50.publish` rebuilds and deploys ism50.com four times a day. It is the
other half of the publication gate: `src/lib/publication.ts` withholds a
future-dated article, and this is the thing that eventually runs on its date and
lets it out. Delete one without the other and every scheduled piece stays
invisible forever.

## Install

    cp launchd/com.ism50.publish.plist ~/Library/LaunchAgents/
    launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.ism50.publish.plist

`RunAtLoad` is true, so bootstrapping it RUNS A BUILD AND A DEPLOY IMMEDIATELY.
That is deliberate and it is the fix for a real recurring failure (see the
comment in the plist), but it means you should not bootstrap it until you are
willing for the site to deploy.

## Check, run by hand, remove

    launchctl print gui/$(id -u)/com.ism50.publish
    launchctl kickstart -k gui/$(id -u)/com.ism50.publish
    launchctl bootout gui/$(id -u)/com.ism50.publish

Logs are at `~/Library/Logs/ism50-publish.log`. The `.launchd.log` beside it
catches anything that dies before the script can redirect, such as a bad
interpreter path.

## The slots, and why they are these minutes

Five sites build on one laptop and share ONE lock at
`~/Library/Caches/kal-site-publish.lock`, so simultaneous jobs queue rather than
starving each other. They are staggered 30 minutes apart so the queue is usually
empty when a job arrives.

| Site | Slots |
| --- | --- |
| khaledhawari.ca | 07:15 12:15 17:15 21:15 |
| kodelytics.ca | 07:45 12:45 17:45 21:45 |
| khaledhawari.com | 08:15 13:15 18:15 22:15 |
| kna-group.com | 08:45 13:45 18:45 22:45 |
| **ism50.com** | **09:15 14:15 19:15 23:15** |

Four slots rather than one because launchd catches up a missed calendar job when
the machine was ASLEEP and does not when it was switched OFF. On 2026-08-08 two
sites lost a day to exactly that. For ism50 to lose a day the Mac has to be off
at 09:15, 14:15, 19:15 and 23:15.

## Before you trust it

The script preflights the Firebase account before spending a build, because a
wrong account does not error until deploy. It needs `ism50-a8a44` to be visible
to `khhawari92@gmail.com` (note the double h). If the preflight fails:

    cd /Users/kalhawari/GitHub/ism50 && npx firebase-tools login:use khhawari92@gmail.com

The repository must stay at `/Users/kalhawari/GitHub/ism50`. Not `~/Documents`,
which macOS privacy protection blocks a launchd agent from reading entirely, and
not a git worktree, because firebase-tools binds an account to an exact path.
