# The split: what belongs here and what belongs on khaledhawari.ca

**ISM50 is what happened. khaledhawari.ca is what you owe.**

That is the whole rule, and it is enforced by `scripts/verify-subject.mjs`, which
fails the build if Canadian crypto tax vocabulary appears anywhere on this
domain. This document explains why a build check is the right level of force.

## The incident

In August 2026 khaledhawari.ca fell off page one for its owner's own name. There
was no penalty and no competitor involved. Two domains he owns were offering
themselves as the answer to one query, Google kept one and filtered the rest, and
the one it filtered was the tax practice, which is the property that actually
earns money.

That mechanism is recorded in `khaledhawari-com/src/lib/seo.ts` and it is what
`kna-group/scripts/seo-doctor` was built to detect. Google does not honour an
intent distinction that exists only in the author's head. It reads strings.

## Why this domain is the risky one

khaledhawari.ca is not a general tax site with some crypto on it. It has roughly
thirty articles specifically about Canadian crypto tax: the adjusted cost base,
T1135, superficial losses, GST/HST on crypto payments, staking and airdrops, what
exchanges report to the CRA, mining, stablecoins, NFT royalties, DeFi lending. It
already ranks for them and they are the practice's funnel.

So ism50.com is the one sibling whose SUBJECT genuinely abuts .ca's. The other
three do not: nobody searching for a finance operations firm lands on a crypto
history article by accident. Here the overlap is one paragraph away at all times,
which is why this is the only repository in the group carrying a vocabulary gate.

## What the gate does and does not ban

The list was built by reading what khaledhawari.ca actually publishes rather than
by imagining what tax writing looks like, and that reading produced the most
important entry in the file:

> **"Audit" appears 122 times in .ca's crypto content and roughly five of those
> are the CRA. The rest are smart contract audits.**

A naive ban on "audit" would make the history of DeFi unwritable. The same trap
is set by "return" (rate of return, a function's return value), "assessment" (a
risk assessment), "election" (a DAO governance election), "penalty" (a slashing
penalty), "capital" (venture capital), "income" (protocol revenue), "filing" (an
SEC filing, a bankruptcy filing, which this site quotes constantly) and
"compliance" (FINTRAC and the travel rule are genuine crypto history).

So there are three tiers, all documented at the top of
`scripts/verify-subject.mjs`:

1. **Unambiguous.** Strings that can only mean Canadian tax compliance. Banned.
2. **Compound.** A word that is innocent alone and damning in a phrase. The
   phrase is banned; the word is not.
3. **Considered and deliberately allowed.** Listed by name, with the reason, so
   the next person to widen the list can see they were rejected rather than
   missed.

## If the build just failed on you

**Cut the paragraph. Do not reword it.** A rewritten tax paragraph is still a tax
paragraph and still makes two URLs candidates for one query. If the point
genuinely needs making it is an article on khaledhawari.ca, and this page can
link to it.

The reverse also holds, and is somebody else's build to enforce: khaledhawari.ca
does not write about protocols, consensus mechanisms, market structure or crypto
history.

## Titles

Every title on this domain leads with its SUBJECT and never with a person's name.
The one exception is `/about/`, which carries the name AFTER the divider because
it is the only page here that can ever answer a query about a person.

Run `npm run estate:titles` before shipping any title set. It imports the shared
detector from `kna-group/scripts/seo-doctor/lib/checks.mjs`, fetches what the
four sibling domains are serving live, and reports any shared leading segment.
`docs/ESTATE-TITLE-CHECK.md` holds the comparison as of the last run.
