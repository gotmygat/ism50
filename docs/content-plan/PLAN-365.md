# The 365 day editorial plan for ism50.com

One article a day, from **2026-08-28** to **2027-08-27** inclusive. Three
hundred and sixty five entries, one per calendar date, no gaps and no
duplicates. The machine readable version of everything below is
`plan-365.json` in this directory, and `validate-plan.mjs` checks both against
the frozen schema in `src/content.config.ts`.

---

## The thesis, which is the reason this plan is not 365 encyclopedia entries

An ISM reading of 50 is the line between expansion and contraction. Every entry answers what was expanding, what was contracting, and who could tell at the time.

That is not decoration and it is not a tagline to sprinkle on a page. It is the
test a draft has to pass. **A piece that could run on any crypto blog does not
belong here.** If a draft never identifies what was growing, what was shrinking,
and who could read the difference at the time, it has failed the brief no matter
how accurate it is.

Say the name once, well, on the about page. Never explain it again. A brand that
keeps explaining itself has not landed.

---

## Before you write anything

Crypto history is the easiest subject in the world to get confidently wrong.
Narratives get rewritten by whoever survived, primary sources quietly vanish,
and numbers get repeated until they sound verified. The rules below exist
because of that, and three of them kill a draft outright rather than degrade it.

1. **Invent nothing.** No price, no market capitalisation, no volume, no date,
   no quotation and no claim about what a named person said or did, unless you
   have the source in front of you as you write it. If a topic only works with a
   number you cannot verify, cut the claim rather than estimate it. The angle for
   every entry in this plan names what that piece may not assert; that sentence
   is the most important line in the entry.

2. **This site never writes about crypto tax.** No adjusted cost base, no
   reporting, no filing, no capital gains treatment, no accounting for disposals.
   That subject belongs to khaledhawari.ca and it already ranks for it. Two of
   the same owner's domains competing on one subject is precisely what cost
   khaledhawari.ca page one for his own name in August 2026.
   `validate-plan.mjs` fails on the vocabulary and so does the build.

3. **No investment advice and no implied recommendation.** No price targets, no
   undervalued or overvalued, no forecasting, no "this was the moment to". This
   is history, not a newsletter, and Google treats financial content as YMYL.

Four more that are easy to breach without noticing:

- **Never write an em dash.** Or an en dash used as one, or a spaced hyphen used
  as a dramatic pause. The build fails on it. Comma, colon, full stop,
  parentheses.
- **Where a claim is contested, name the contest.** Say who disputes it and on
  what basis. Do not pick the likelier side and present it as settled.
- **Where a source is dead or altered, say so, and make the piece partly about
  that.** A missing primary source is itself a finding on a site about a badly
  documented subject.
- **Titles lead with the subject, never with a person's name.** This is a brand
  first publication and that is also the safest position in the estate.

### The frontmatter contract

`src/content.config.ts` is enforced at build time and again by
`scripts/verify-content.mjs` against the shipped HTML. The fields below are
supplied per entry and must be carried into the frontmatter unchanged unless you
have a reason and you recount the characters.

| Field | Rule |
| --- | --- |
| `title` | The on-page H1. Uncapped. |
| `seoTitle` | The complete `<title>`. **62 characters maximum.** Nothing is appended. |
| `description` | 50 to 158 characters. |
| `date` | As planned. One article per date. It drives the publication gate. |
| `author` | Khaled Hawari. |
| `era` | `origins`, `earlyExchange`, `icoEra`, `defiSummer`, `institutional`, `postFtx`. Closed set. |
| `kind` | `timeline`, `postmortem`, `explainer`, `primarySource`, `profile`. Closed set. |
| `lede` | One sentence, 20 characters minimum. |

`cluster`, `angle` and `internalLinks` are planning fields. They direct the
writing and do not appear in frontmatter.

### The five kinds mean something

A `timeline` is genuinely sequenced and every step carries a date or an ordering
you can check. A `postmortem` follows **one** failure to its causes and does not
wander into general advice. An `explainer` makes **one** mechanism comprehensible
and is still true in three years. A `primarySource` is built around a document or
an artefact and reports what it actually said, with the document open. A
`profile` is about a person or a group and what changed because of them, sourced,
and it must survive that person reading it.

If a draft has drifted from its planned kind, change the draft rather than the
frontmatter. The listing page and the reader both expect what the label promises.

### Writing about people

No hagiography and no hit pieces. A `profile` covers what somebody actually did
and what it changed. Many of the profiles in this plan are deliberately about a
**role or a group** rather than an individual, because the interesting unit in
this history is usually the position somebody occupied. Where an individual is
named, use only their published work and public statements, and never speculate
about identity, motive, health, finances or any legal matter.

### Internal links

Every entry carries two to four links. **They all point backwards in time**, to
an entry that has already published or to one of the pieces already on disk. The
site is new, so the alternative is a link that 404s for months. The validator
enforces this and will reject a forward link.

Link them in the body where a reader genuinely needs them, not in a block at the
end.

### Already published

3 articles are on disk and dated before this plan's first entry, so they are
live anchors from day one.

- `constant-product-is-an-inequality`
- `mt-gox-the-coins-were-already-gone`
- `the-bitcoin-whitepaper-is-not-the-document-you-think`

Where an angle ends with a sentence beginning "Do not restate", that sentence is
load bearing. It exists because a published piece already owns that ground, and
the fastest way to waste a publication slot is to cover it again. Adjacent is the
design. Duplicate gets filtered, and a filtered page contributes nothing at all.

---

## How the year is sequenced

The plan runs **in historical order**, era by era. That is a deliberate choice
with a cost, and both halves are worth stating.

The gain is that the link graph is acyclic and always resolves. Every piece can
reach back to the mechanism it depends on, because that mechanism published
weeks earlier. A reader arriving in month nine can follow a chain of live links
back to the first principles, and no link is ever a promise about a future post.

The cost is that the material with the most search demand, the collapses and the
enforcement, publishes late in the year. That was accepted rather than
overlooked. The alternative, shuffling eras together, buys earlier traffic and
pays for it with either forward links that 404 or pieces that cannot reference
their own foundations.

| Dates | Era | Articles |
| --- | --- | --- |
| 2026-08-28 to 2026-10-16 | `origins` | 50 |
| 2026-10-17 to 2026-12-15 | `earlyExchange` | 60 |
| 2026-12-16 to 2027-02-18 | `icoEra` | 65 |
| 2027-02-19 to 2027-04-24 | `defiSummer` | 65 |
| 2027-04-25 to 2027-06-18 | `institutional` | 55 |
| 2027-06-19 to 2027-08-27 | `postFtx` | 70 |

Within an era the clusters are interleaved, so consecutive days change subject
while the order inside a cluster is preserved. That preservation is what keeps
every link pointing backwards.

---

## The clusters

30 clusters across the six eras.

### `origins` (50 articles)

What had to be true before any of it could work, the document itself, the first users, and the invention of a way to decide anything.

| Cluster | Articles |
| --- | --- |
| Before the whitepaper | 13 |
| The whitepaper and the genesis block | 12 |
| The first users | 13 |
| Who decided, and how | 12 |

### `earlyExchange` (60 articles)

The intermediary reappears immediately, holds everyone's money, and starts failing. Mining becomes an industry and the law arrives.

| Cluster | Articles |
| --- | --- |
| Exchanges before exchange was a business | 12 |
| Mt. Gox, taken apart | 12 |
| The clone economy | 12 |
| Darknet markets and the arrival of law | 12 |
| Mining becomes an industry | 12 |

### `icoEra` (65 articles)

A general purpose chain, a fork that proved intervention was available, a fundraising machine built on a six function interface, and a governance war.

| Cluster | Articles |
| --- | --- |
| Ethereum: the idea and the launch | 13 |
| The DAO and the fork | 13 |
| The token sale machine | 13 |
| Regulators arrive | 13 |
| The scaling wars | 13 |

### `defiSummer` (65 articles)

Financial primitives assembled in public, a stable unit that made pricing possible, a catalogue of exploits, and a collectibles market.

| Cluster | Articles |
| --- | --- |
| The primitives | 13 |
| Stablecoins as a mechanism | 13 |
| Exploits, taken apart | 13 |
| NFTs and on-chain culture | 13 |
| DAOs after The DAO | 13 |

### `institutional` (55 articles)

Custody becomes a separate business, Wall Street builds a wrapper, states answer with their own designs, and a compliance layer forms at the edges.

| Cluster | Articles |
| --- | --- |
| The custody problem | 11 |
| Wall Street builds a wrapper | 11 |
| Treasuries and states | 11 |
| The state's own answer | 11 |
| The compliance layer | 11 |

### `postFtx` (70 articles)

A credit cascade, the largest custody failure yet, a transparency exercise that proves the easy half, the courts, and what actually settled.

| Cluster | Articles |
| --- | --- |
| The 2022 credit cascade | 13 |
| FTX, taken apart | 13 |
| Proof of reserves and what it does not prove | 10 |
| Enforcement and the courts | 12 |
| Bankruptcy as a discovery process | 11 |
| What settled and what did not | 11 |

### Kind balance

| Kind | Articles |
| --- | --- |
| `explainer` | 143 |
| `postmortem` | 72 |
| `timeline` | 62 |
| `profile` | 44 |
| `primarySource` | 44 |

**Total: 365.**

---

## The plan

Each entry gives the writer the slug, the date, the era, the kind, the H1, the
`seoTitle` and `description` already inside their caps, the lede, the angle, the
cluster and the internal links.

**Read the angle twice.** The final sentence of every angle states what the piece
may not claim. That sentence is the whole reason this plan can be handed to a
writer eleven months from now.

### August 2026

_4 articles._

#### 2026-08-28 &middot; `the-double-spend-problem`

**The Double Spend Problem, and Why Every Earlier Attempt Needed a Referee**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | Before the whitepaper |
| seoTitle | The Double Spend Problem Explained _(34 chars)_ |
| description | Why a digital coin is trivially copyable, why every pre-2009 design solved that with a trusted issuer, and what that dependency cost them. _(138 chars)_ |
| lede | A file can be copied perfectly and for free, which is exactly the property you do not want in money. |
| Links | `/about/`, `/articles/` |

Sets up the whole site by naming the single technical constraint that every digital cash design before 2009 had to answer, and shows that they all answered it the same way, with a central party who keeps the ledger and refuses the second spend. Argue that the trusted referee was not a design flaw but a business model, and that it put a single company inside the settlement path of every transaction, which is the thing that later kept getting shut down. Frame it against the site's line: the technical capability was expanding steadily through the 1990s while the number of surviving operators was contracting, and almost nobody read those two curves together at the time. The piece must not claim that Bitcoin solved double spending absolutely or permanently, because it did not, it made reversal expensive rather than impossible, and it must not assert any figure for transaction volumes or user counts at any of the earlier systems.

#### 2026-08-29 &middot; `the-banking-crisis-backdrop`

**What Was Actually Happening in Finance the Autumn the Whitepaper Appeared**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The 2008 Backdrop to the Bitcoin Whitepaper _(43 chars)_ |
| description | A sequenced account of the banking events of late 2008 and a careful statement of what can and cannot be inferred about their connection to the whitepaper. _(155 chars)_ |
| lede | The whitepaper appeared in a season when the phrase bank failure was on the front page most weeks. |
| Links | `/articles/the-double-spend-problem/`, `/about/` |

Sequences the public record of the autumn of 2008 alongside the publication of the whitepaper, and then does the harder job of separating coincidence, context and causation. Argue that the causal story everyone tells, that Bitcoin was built as a response to the financial crisis, is supported by exactly one line of on chain text and a great deal of retrofitting, and that the honest position is to present the evidence and stop. This is the clearest case on the site of a threshold crossing in both directions at once: trust in intermediated finance contracting sharply while appetite for an alternative expanded, with almost nobody connecting the two in real time. The piece must not assert a motive for the whitepaper's author, must not state that Bitcoin was created because of any specific institutional failure, and must not use any market index level or loss figure.

#### 2026-08-30 &middot; `the-forum-as-the-only-record`

**For Two Years, a Web Forum Was the Entire Institutional Memory**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | The first users |
| seoTitle | The Forum That Holds Early Bitcoin History _(42 chars)_ |
| description | Almost everything documented about the first years lives in a handful of forum threads, and that dependency has consequences we still live with. _(144 chars)_ |
| lede | One privately operated forum holds most of what we can say about the first two years, which should worry anyone who has watched a forum disappear. |
| Links | `/articles/the-banking-crisis-backdrop/`, `/articles/the-double-spend-problem/` |

A group profile of the early posting community treated as an institution: who was there, what kinds of questions they were actually asking, and how a forum with no archival mandate became the de facto record. Argue that the fragility is the story, since threads have been edited, accounts deleted and images lost, and a history built on one privately held archive is one hosting decision away from being unwritable. Commit to the position that anyone writing about this period owes the reader a note on which claims are archive dependent. The piece must not quote any forum post that cannot be located in an archive at the time of writing, must not attribute a post to a person whose identity is not publicly and voluntarily established, and must not characterise the community's mood using recollections gathered years later as though contemporaneous.

#### 2026-08-31 &middot; `the-departure`

**The Founder Left, and the Project Had to Invent a Way to Continue**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | Who decided, and how |
| seoTitle | When Bitcoin's Founder Stopped Posting _(38 chars)_ |
| description | A pseudonymous author stopped participating, handed over repository access, and left a project with no succession plan to build one. _(132 chars)_ |
| lede | The most consequential governance event in this history is somebody quietly not posting any more. |
| Links | `/articles/the-forum-as-the-only-record/`, `/articles/the-banking-crisis-backdrop/`, `/articles/the-double-spend-problem/` |

Sequences the documented handover of repository and communication access and the months on either side of it, using only archived posts and commit history. Argue that the absence of a founder is the single largest structural difference between this project and every other software project of comparable importance, and that it forced the invention of a decision process rather than the inheritance of one. The threshold reading is unusual and worth stating: authority contracted to nothing while the number of people who could act expanded, and the resulting system is neither a hierarchy nor a democracy. The piece must not speculate about why the author left, must not treat any later message signed or unsigned as authentic without cryptographic verification, and must not describe the handover as a designation of a successor beyond what the archived words say.


### September 2026

_30 articles._

#### 2026-09-01 &middot; `david-chaum-and-blind-signatures`

**David Chaum and the Idea That Payment Privacy Could Be Mathematical**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | Before the whitepaper |
| seoTitle | David Chaum and the Blind Signature _(35 chars)_ |
| description | The cryptographer who argued in the early 1980s that electronic payment would either be private by construction or surveilled by default. _(137 chars)_ |
| lede | Chaum described the surveillance problem in electronic payments roughly a decade before most people had an electronic payment to make. |
| Links | `/articles/the-double-spend-problem/`, `/articles/the-departure/`, `/articles/the-forum-as-the-only-record/` |

A profile built strictly from Chaum's published academic work and the public record of the companies he founded, covering what a blind signature actually does and why it let a bank authorise a payment without learning who made it. Argue that his contribution was framing rather than mechanism: he made privacy a design requirement instead of a courtesy, and that framing outlived every product he shipped. Use the site's lens on the gap between an expanding academic literature and a contracting commercial appetite for it. The piece must not speculate about his views on Bitcoin or on any later project beyond what he has published under his own name, must not characterise him as a precursor who was cheated of credit, and must not assign dates to unpublished work.

#### 2026-09-02 &middot; `reading-the-bitcoin-whitepaper`

**Reading the Bitcoin Whitepaper Section by Section**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | Reading the Bitcoin Whitepaper, Section by Section _(50 chars)_ |
| description | A close read of the nine numbered sections, what each one claims, and which claims the document supports rather than assumes. _(125 chars)_ |
| lede | The whitepaper is short, and almost everyone who cites it is citing something they read about it. |
| Links | `/articles/the-double-spend-problem/`, `/articles/the-bitcoin-whitepaper-is-not-the-document-you-think/` |

Walks the document in its own order, section by section, stating in plain language what each section is actually doing and flagging where a section states a result versus where it assumes a condition. Argue that the paper is a good deal more modest than its reputation, particularly on incentives and on the majority assumption, and that reading it as a manifesto rather than an engineering note is the source of a lot of downstream confusion. The threshold reading is that the document describes a system whose security expands with participation and contracts with concentration, which is a claim the industry spent fifteen years testing. The piece must not quote the paper from memory, must not paraphrase a sentence and present it as the paper's wording, and must not attribute any political intent to the text beyond what the text says. Do not restate what the paper omits: the published piece on what the whitepaper does not say already owns that ground, so link to it instead of covering it again.

#### 2026-09-03 &middot; `running-a-node-when-nobody-did`

**What Running a Node Actually Meant Before Anyone Called It That**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | The first users |
| seoTitle | What Running an Early Node Actually Meant _(41 chars)_ |
| description | A single program did wallet, miner, node and interface, and understanding that bundle explains most early advice that now reads as strange. _(139 chars)_ |
| lede | The first software did four jobs at once, which is why early instructions sound like they were written for a different system. |
| Links | `/articles/the-forum-as-the-only-record/`, `/articles/reading-the-bitcoin-whitepaper/`, `/articles/david-chaum-and-blind-signatures/` |

A profile of the early node runner and the software they lived with, a monolithic client where validating, storing keys and mining were one process, tracing how each of those responsibilities was later split into a separate product category. Argue that the unbundling is the single largest structural change in the user experience of crypto, larger than any interface redesign, because it moved key custody and validation into other people's hands one step at a time. Read through the threshold: participation in validation expanded while the share of users doing it contracted, and both were true at once. The piece must not state node counts for any period, must not claim what percentage of users mined, and must not present running a node as a recommendation to any reader.

#### 2026-09-04 &middot; `maintainers-not-owners`

**What a Maintainer Can and Cannot Do to a Public Protocol**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | Who decided, and how |
| seoTitle | What a Protocol Maintainer Can Actually Do _(42 chars)_ |
| description | Commit access looks like control and is not, because a maintainer can merge anything and cannot make anyone run it. _(115 chars)_ |
| lede | The people with commit access have less power than their critics claim and more responsibility than they wanted. |
| Links | `/articles/the-departure/`, `/articles/running-a-node-when-nobody-did/`, `/articles/reading-the-bitcoin-whitepaper/` |

A group profile of the maintainer role rather than of individuals, describing what merging a change actually accomplishes, the separate step of releasing it, and the entirely separate step of users choosing to run the release. Argue that most accusations of developer capture and most defences against them are arguing about the wrong step, and that the real leverage sits with whoever chooses which binary to run. Commit to the position that this arrangement is unusually resistant to capture and unusually bad at making decisions quickly, and that both are the same property. The piece must not name individuals in a way that assigns blame or credit for outcomes, must not characterise anybody's motives, and must not state who currently holds any access.

#### 2026-09-05 &middot; `digicash-postmortem`

**DigiCash: Correct Cryptography, No Distribution**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `postmortem` |
| Cluster | Before the whitepaper |
| seoTitle | DigiCash: Why the Cryptography Was Not Enough _(45 chars)_ |
| description | A company with working privacy-preserving digital cash that could not get banks or merchants to carry it, and what that failure actually proves. _(144 chars)_ |
| lede | DigiCash shipped a working product that almost nobody could spend anywhere, which turns out to be the harder half of the problem. |
| Links | `/articles/david-chaum-and-blind-signatures/`, `/articles/the-double-spend-problem/` |

Follows one failure to its causes: a system that worked technically and still ran out of road because it required banks to adopt it and merchants to accept it, and neither had a reason to move first. Argue that the binding constraint was distribution and counterparty willingness rather than cryptography, which is a pattern that recurs across the next twenty five years of this site. Read it through the threshold: cryptographic capability well above the line, commercial adoption well below it, with the two mistaken for one number. The piece must not state a valuation, a funding figure, an employee count or a transaction volume for the company, must not reconstruct private negotiations from secondary retellings, and must not present the outcome as inevitable in hindsight.

#### 2026-09-06 &middot; `how-the-network-agrees-what-time-it-is`

**How a Network With No Clock Agrees What Time It Is**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | How the Network Agrees What Time It Is _(38 chars)_ |
| description | Every block carries a timestamp asserted by whoever produced it, and the rules that keep those assertions roughly honest are a quiet piece of the design. _(153 chars)_ |
| lede | The time in a block is a claim made by the miner, and nothing outside the network can check it. |
| Links | `/articles/reading-the-bitcoin-whitepaper/`, `/articles/the-banking-crisis-backdrop/` |

Makes one small mechanism comprehensible: a block states a time, that statement is unverifiable from outside, and consensus therefore constrains it with bounds drawn from the timestamps of surrounding blocks rather than from any external clock. Argue that this is a good miniature of the whole design, since the system does not obtain truth from anywhere, it narrows the range of lies that other participants will accept. Show why this matters practically, because difficulty retargeting reads these timestamps and a system that trusted them absolutely would be manipulable. The piece must not state the specific tolerance rules of any implementation without reading the source, must not claim timestamps are accurate, and must not describe any manipulation technique in operational detail.

#### 2026-09-07 &middot; `hal-finney-and-the-first-node`

**Hal Finney Ran the Second Node and Wrote Down What He Thought**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | The first users |
| seoTitle | Hal Finney and the Second Bitcoin Node _(38 chars)_ |
| description | A cryptographer with a long public record who engaged with the system immediately and left a written trail of his reasoning. _(124 chars)_ |
| lede | Finney is unusual in this history because he wrote his reasoning down at the time rather than reconstructing it later. |
| Links | `/articles/running-a-node-when-nobody-did/`, `/articles/the-forum-as-the-only-record/` |

A profile built only on his published work, mailing list posts and forum writing, covering his earlier cryptographic contributions, his immediate engagement with the new system and the specific reservations he recorded. Argue that his value to a historian is the contemporaneity of the record, since almost every other early participant is quoted from memory years afterwards, and memory in this subject is heavily contaminated by outcome. Make the honest observation that his early scepticism about some parts of the design is usually left out of the reverent version of the story. The piece must not repeat the recurring claim that he was the author of the whitepaper, which is not established, must not describe his health, family or finances, and must not quote him without an archived source.

#### 2026-09-08 &middot; `the-bip-process`

**The Improvement Proposal Process, and What It Is Actually For**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Who decided, and how |
| seoTitle | How the Improvement Proposal Process Works _(42 chars)_ |
| description | A numbered proposal document is a coordination artefact, not an approval mechanism, and confusing the two explains a decade of arguments. _(137 chars)_ |
| lede | A proposal number is a filing reference, not a decision, and treating it as a decision has caused a lot of shouting. |
| Links | `/articles/maintainers-not-owners/`, `/articles/the-departure/` |

Built around the proposal documents that define the process itself: what a proposal contains, what statuses it can carry, who assigns them, and what happens after one is marked final, which is often nothing. Argue that the process was borrowed from older internet standards culture and inherited its assumption of a rough consensus that a value bearing network does not reliably produce. Show the practical consequence that a proposal can be final and unused, or widely deployed and never finalised, and that both happen. The piece must not describe the status of any specific proposal without checking the current repository, must not present the process as binding on anyone, and must not summarise a proposal's content from memory.

#### 2026-09-09 &middot; `e-gold-and-the-compliance-wall`

**e-gold and the Compliance Wall Every Centralised Issuer Eventually Hits**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `postmortem` |
| Cluster | Before the whitepaper |
| seoTitle | e-gold and the Compliance Wall _(30 chars)_ |
| description | A privately issued digital currency backed by metal that grew fast, attracted the wrong users, and was closed through its operator rather than its protocol. _(156 chars)_ |
| lede | e-gold demonstrated that a centralised digital currency has a throat to choke, and that somebody eventually chokes it. |
| Links | `/articles/digicash-postmortem/`, `/articles/the-double-spend-problem/` |

Traces how a system with a single identifiable operator and a single point of custody was addressed by law enforcement and regulators through that operator, without any need to attack the technology. Argue that this is the cleanest available illustration of why later designs went to such lengths to remove the operator, and that the lesson was learned by builders long before it was articulated. The threshold reading is that user growth and regulatory tolerance moved in opposite directions across the same period, and the second curve was the one that mattered. The piece must not restate specific charges, pleas, sentences or dollar amounts from any proceeding, must not characterise the intent of any named individual, and must not imply the outcome was unjust or just, because that argument belongs somewhere other than a history site.

#### 2026-09-10 &middot; `the-genesis-block-message`

**The Genesis Block Carries a Headline, and That Is Almost All We Know**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The Genesis Block Message, Read Carefully _(41 chars)_ |
| description | What is actually encoded in the first block, what it proves about timing, and how much interpretive weight it can honestly carry. _(129 chars)_ |
| lede | The first block contains a newspaper headline, which proves a date floor and very little else. |
| Links | `/articles/reading-the-bitcoin-whitepaper/`, `/articles/the-banking-crisis-backdrop/` |

Built entirely around the artefact: what bytes are in the coinbase field of the first block, what the standard reading of them is, and what that reading establishes with certainty, which is chiefly that the block was not created before the headline existed. Then argue against the overreach, because the same bytes are routinely used to establish an ideology, a motive and a political programme, and they do not support that load. Note the genuinely odd technical detail that the first block's reward is not spendable in the usual way, and explain why without dressing it as a secret message. The piece must not claim to know why the headline was chosen, must not reproduce the exact text unless verified against a block explorer at the time of writing, and must not describe the choice as proof of any position on monetary policy.

#### 2026-09-11 &middot; `cpu-mining-as-a-hobby`

**When Mining Was Something You Left Running Overnight**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | The first users |
| seoTitle | When Bitcoin Mining Was a Laptop Hobby _(38 chars)_ |
| description | The sequence from a checkbox in a desktop client to specialised hardware, and the exact points where each step stopped being viable at home. _(140 chars)_ |
| lede | Mining began as a toggle in a desktop program and ended as a category of industrial real estate. |
| Links | `/articles/running-a-node-when-nobody-did/`, `/articles/hal-finney-and-the-first-node/`, `/articles/the-forum-as-the-only-record/` |

Sequences the transition properly, from general purpose processors to graphics cards to purpose built hardware, and identifies at each step what specifically made the previous approach uneconomic. Argue that the transition was not gradual but stepwise, and that each step permanently removed a class of participant from an activity the original design assumed would be widely distributed. That is the site's threshold in one chart: capacity expanding relentlessly while the number of independent participants contracted. The piece must not give hash rates, hardware prices, electricity costs or profitability figures for any period, must not name a date for any hardware transition without a source, and must not tell a reader anything about whether mining is worth doing.

#### 2026-09-12 &middot; `rough-consensus-and-running-code`

**Rough Consensus Was Borrowed From a Culture With Nothing at Stake**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | Who decided, and how |
| seoTitle | Rough Consensus Applied to Money _(32 chars)_ |
| description | The decision norm crypto inherited from internet standards bodies was designed for protocols where disagreement did not move anyone's balance. _(142 chars)_ |
| lede | The norm works well when the losing side keeps nothing, and badly when the losing side holds the asset. |
| Links | `/articles/the-bip-process/`, `/articles/maintainers-not-owners/` |

Explains the inherited standards culture norm precisely, then argues that it breaks in a specific and predictable way when the participants hold a position in the outcome, because a technical objection and a financial interest become impossible for observers to tell apart. Use it to preload the scaling wars later on this site, where exactly this failure mode played out at scale and in public. Take the position plainly that no better norm has replaced it and that the alternatives on offer have their own worse failures. The piece must not claim any participant in any dispute acted from financial motive, must not characterise a technical position as bad faith, and must not present token weighted voting as a solution, since later eras on this site show it is not.

#### 2026-09-13 &middot; `the-cypherpunks-list`

**The Cypherpunks Mailing List as an Institution**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | Before the whitepaper |
| seoTitle | The Cypherpunks Mailing List, Explained _(39 chars)_ |
| description | A mailing list with no membership, no funding and no leadership produced a body of ideas that most of this site's later chapters are built on. _(142 chars)_ |
| lede | The list had no institutional form at all, which is exactly why its output is hard to attribute and easy to misquote. |
| Links | `/articles/david-chaum-and-blind-signatures/`, `/articles/e-gold-and-the-compliance-wall/`, `/articles/digicash-postmortem/` |

A group profile that treats the list as the organisational unit rather than any individual on it, describing how a public archive with open posting produced a durable set of shared assumptions about privacy, anonymity and money. Argue that the archive is the reason this period is documented at all, and that its survival is an accident we should not expect to repeat for later forums. Note honestly that reading the archive today invites hindsight bias, because we know which threads mattered and the participants did not. The piece must not attribute a position to any named participant without quoting the archived message that carries it, must not treat list consensus as existing, since it plainly did not, and must not use the list to support any claim about who wrote the Bitcoin whitepaper.

#### 2026-09-14 &middot; `the-first-release-announcement`

**The Release Announcement Read as a Product Launch**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The First Bitcoin Release Announcement _(38 chars)_ |
| description | The original software announcement described features, requirements and limits, and reads far more like a beta release note than a manifesto. _(141 chars)_ |
| lede | Read as a launch post rather than as history, the first announcement is strikingly ordinary. |
| Links | `/articles/reading-the-bitcoin-whitepaper/`, `/articles/the-genesis-block-message/` |

Reads the announcement of the first software release as the document it is, a note to a technical audience listing what the program does, what it needs and what it does not yet handle. Argue that the ordinariness is the finding: the tone contains none of the significance later attached to it, and comparing it to how the same event is described now is a direct measure of narrative drift. Frame the launch through the site's lens by asking what was expanding at that moment, which was almost nothing, and who could have told, which was almost nobody. The piece must not quote the announcement without the archived text in hand, must not describe reactions to it that cannot be sourced to the archive, and must not assert how many people downloaded or ran the software.

#### 2026-09-15 &middot; `faucets-and-the-distribution-problem`

**Giving It Away Was a Deliberate Answer to a Real Problem**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The first users |
| seoTitle | Faucets and the Early Distribution Problem _(42 chars)_ |
| description | A currency with no holders has no users and no merchants, and the earliest answer to that deadlock was simply to hand it out. _(125 chars)_ |
| lede | A payment network with no holders is a chicken and egg problem, and the first fix was to give the chicken away. |
| Links | `/articles/the-forum-as-the-only-record/`, `/articles/cpu-mining-as-a-hobby/` |

Explains the bootstrapping problem in plain terms, why nobody accepts a currency nobody holds, and how free distribution was used as a cold start mechanism rather than as charity or marketing. Argue that this is a genuinely instructive precedent for the token distribution debates that dominate later eras of this site, and that the later versions were far less honest about what they were doing. Note the mechanism's limits, since free distribution creates holders but not demand, and demand had to come from somewhere else. The piece must not state amounts distributed, values, or claims about how many people received anything, and must not present any distribution model as effective or advisable.

#### 2026-09-16 &middot; `what-a-soft-fork-actually-is`

**A Soft Fork Tightens the Rules, and Old Nodes Never Notice**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | Who decided, and how |
| seoTitle | What a Soft Fork Actually Is _(28 chars)_ |
| description | The distinction that governs every upgrade fight: a rule change that old software still accepts, and why that backwards compatibility is political. _(147 chars)_ |
| lede | The defining property is that software nobody updated still considers the new blocks valid. |
| Links | `/articles/the-bip-process/`, `/articles/rough-consensus-and-running-code/`, `/articles/maintainers-not-owners/` |

Makes the mechanism comprehensible without metaphor: a restriction of the valid set, why old nodes accept the result, and the precise sense in which non upgraded users are then following rules they never agreed to. Argue that the compatibility is what makes this method deployable and also what makes it contentious, because it lets a change ship without the whole network consenting to it. Set up later chapters by noting that both sides of the scaling dispute understood this correctly and disagreed about whether it was legitimate. The piece must not describe any specific historical activation without checking its actual mechanism, must not present either fork type as safer in general, and must not give any reader guidance about upgrading software they run.

#### 2026-09-17 &middot; `the-crypto-wars`

**The Crypto Wars: How Strong Encryption Stopped Being a Munition**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | Before the whitepaper |
| seoTitle | The Crypto Wars and Export Control _(34 chars)_ |
| description | The sequenced fight over export controls on strong cryptography in the 1990s, and why its outcome made everything after 2009 legally possible. _(142 chars)_ |
| lede | Before anyone could build public cryptographic money, publishing the code had to stop being a controlled export. |
| Links | `/articles/the-cypherpunks-list/`, `/articles/e-gold-and-the-compliance-wall/`, `/articles/digicash-postmortem/` |

A genuinely sequenced piece covering the regulatory position on strong cryptography, the legal and political challenges to it, and the eventual relaxation, using only the public rulemaking and court record. Argue that this is the single most underweighted precondition in crypto history, because the freedom to publish the code was won by other people, for other reasons, before the code existed. The threshold framing is direct: state tolerance for civilian cryptography crossed from contraction to expansion, and everything downstream depended on which side of the line it settled. The piece must not claim the fight is settled, must not attribute motives to any agency beyond what is in the public record, and must not name a specific court holding without the case actually saying it.

#### 2026-09-18 &middot; `what-the-first-client-actually-did`

**The First Client Shipped Features the Whitepaper Never Mentioned**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | What the First Bitcoin Client Actually Did _(42 chars)_ |
| description | The initial source release included a marketplace, a messaging idea and a scripting system, none of which appear in the paper. _(126 chars)_ |
| lede | The paper and the code that shipped alongside it are two different documents with two different scopes. |
| Links | `/articles/reading-the-bitcoin-whitepaper/`, `/articles/the-first-release-announcement/` |

Compares the described system in the whitepaper with the released implementation, drawing out the features that exist only in the code, and explains why a scripting system in particular changes what the thing is. Argue that historians of this period consistently read the paper and skip the source, which is how a system with programmable spending conditions from day one came to be described as a simple ledger. Use the threshold framing on ambition: the design space in the code was wider than the design space in the paper, and the difference narrowed rather than widened over the following years. The piece must not describe code that cannot be located in an archived release, must not state which features were later removed without checking the change history, and must not attribute a purpose to any feature the source does not document.

#### 2026-09-19 &middot; `how-a-thing-with-no-price-gets-one`

**How Something With No Price Acquires One**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The first users |
| seoTitle | How a Thing With No Price Gets One _(34 chars)_ |
| description | Price discovery for a new asset is a social process before it is a market process, and the mechanism is worth understanding without any numbers. _(144 chars)_ |
| lede | Before there is a market there are two people arguing about what a fair swap looks like, and everything else grows from that. |
| Links | `/articles/faucets-and-the-distribution-problem/`, `/articles/cpu-mining-as-a-hobby/`, `/articles/hal-finney-and-the-first-node/` |

Describes the mechanism of first price formation structurally: bilateral negotiation, then a posted bid and ask, then a venue that matches them, then a reference rate that other venues quote. Argue that understanding this sequence inoculates a reader against the most common error in crypto history writing, which is quoting an early price as though a liquid market produced it. Take the position that early prices are anecdotes about single trades and should be written that way. The piece must not state any historical price, exchange rate or valuation, must not compare an early value to a later one, and must not be written in a way that implies anything about what any asset is worth now.

#### 2026-09-20 &middot; `what-a-hard-fork-actually-is`

**A Hard Fork Loosens the Rules, and Everyone Has to Move at Once**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | Who decided, and how |
| seoTitle | What a Hard Fork Actually Is _(28 chars)_ |
| description | A rule change old software rejects forces a coordinated upgrade, and a failed coordination produces two chains and two assets. _(126 chars)_ |
| lede | The mechanism is simple, the coordination is not, and the coordination is where all the history happens. |
| Links | `/articles/what-a-soft-fork-actually-is/`, `/articles/rough-consensus-and-running-code/`, `/articles/the-bip-process/` |

Explains the second mechanism as the mirror of the first, why old nodes reject the new blocks, and what actually determines whether the outcome is an upgrade or a permanent split, which is neither code nor votes but which exchanges, miners and users follow which chain. Argue that a hard fork is best understood as a proposal to the whole ecosystem rather than a change to software, and that everything difficult about it happens outside the repository. Commit to the position that the technical debate about fork types is mostly a proxy for a political question about who has to consent. The piece must not present any historical split as having a legitimate and an illegitimate side, must not claim which chain is the real one in any case, and must not describe replay protection as universally implemented, because it has not been.

#### 2026-09-21 &middot; `hashcash-the-actual-mechanism`

**Hashcash: What the Proposal Actually Said It Was For**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Before the whitepaper |
| seoTitle | Hashcash: What the Proposal Actually Said _(41 chars)_ |
| description | Proof of work was designed as an anti-spam postage stamp, not as a monetary policy, and the original document is explicit about it. _(131 chars)_ |
| lede | The mechanism at the centre of Bitcoin mining was proposed to make email spam expensive. |
| Links | `/articles/the-double-spend-problem/`, `/articles/the-cypherpunks-list/` |

Built around the hashcash proposal itself, reading what it says the cost function is for and what problem it claims to solve, then showing precisely which part Bitcoin reused and which part it discarded. Argue that a great deal of confused writing about energy and mining comes from treating proof of work as a monetary invention when it was an access-control one. Show that the original framing, making an action cheap to verify and expensive to perform, is the property that carried forward, and that the anti-spam application never really worked. The piece must not quote the document from memory or paraphrase it as a quotation, must not claim it anticipated a blockchain, and must not attach any energy or cost figure to any era of mining.

#### 2026-09-22 &middot; `the-first-transaction-on-chain`

**The First Transaction Between Two People, and Why It Is Verifiable**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The First Bitcoin Transaction Between Two People _(48 chars)_ |
| description | One of the very few events in early crypto history that can be checked directly rather than trusted, and what that difference is worth. _(135 chars)_ |
| lede | Most of this history rests on archives and memory, and a small part of it rests on a chain that anyone can read. |
| Links | `/articles/the-genesis-block-message/`, `/articles/the-first-release-announcement/` |

Sequences the earliest network activity and then makes a methodological point that the site depends on: the chain itself is a primary source with properties no archive has, since it cannot be quietly edited and it does not go offline when a company does. Show what the chain does and does not tell you, because it records values and addresses and not identities, intentions or agreements. Argue that the discipline of separating chain evidence from testimony is the single most useful habit a reader of this period can develop. The piece must not attach a monetary value to any early transaction, must not identify the parties to any transaction beyond what has been publicly and voluntarily confirmed, and must not treat address clustering as identification.

#### 2026-09-23 &middot; `the-pizza-transaction-as-folklore`

**The Pizza Story Is True, and Almost Everything Said About It Is Not**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The first users |
| seoTitle | The Pizza Transaction, Separated From Folklore _(46 chars)_ |
| description | A real, verifiable early purchase became crypto's founding parable, and the parable version has replaced the documented one. _(124 chars)_ |
| lede | The transaction happened, it is on the chain, and the version everyone repeats is mostly commentary added later. |
| Links | `/articles/how-a-thing-with-no-price-gets-one/`, `/articles/the-first-transaction-on-chain/`, `/articles/the-forum-as-the-only-record/` |

Uses the most retold anecdote in the subject to teach the difference between a verifiable event and its accreted meaning, separating what the chain records, what the forum thread records, and what has been layered on since. Argue that the annual ritual of restating the story in current money is the purest example of hindsight distortion on this site, because it prices a decision using information the person did not have. Commit to the position that the anecdote's real significance is mundane and more interesting: it is evidence that someone would accept the thing for goods. The piece must not convert the amount into any currency at any date, must not describe the buyer's or seller's later circumstances, and must not present the transaction as a mistake or a lesson about holding anything.

#### 2026-09-24 &middot; `the-alert-key`

**There Was a Key That Could Broadcast a Message to Every Node**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Who decided, and how |
| seoTitle | The Alert Key and Why It Was Retired _(36 chars)_ |
| description | The original software included a signed alert system controlled by a small number of holders, and removing it was a deliberate decision. _(136 chars)_ |
| lede | For years the network shipped with a mechanism for a few people to display a message on everyone's screen. |
| Links | `/articles/what-the-first-client-actually-did/`, `/articles/maintainers-not-owners/`, `/articles/the-departure/` |

Built around the alert system as an artefact: what it could actually do, what it could not do, who held the key material, and the reasoning published when the feature was deprecated and the key later disclosed. Argue that its long quiet existence is a useful corrective to origin stories that describe the system as trustless from the first day, and that its removal is a better example of decentralisation as a process than most of the things given that label. Note that the disclosure itself is a primary source worth reading rather than summarising. The piece must not state who held the key without a published source, must not claim the mechanism was ever used maliciously, and must not reproduce any key material or alert text unverified.

#### 2026-09-25 &middot; `b-money-the-proposal`

**b-money: A Short Proposal That Named Most of the Problem**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Before the whitepaper |
| seoTitle | b-money: Reading the Original Proposal _(38 chars)_ |
| description | A brief 1998 proposal for a distributed currency that described collective bookkeeping and left the hardest part explicitly unsolved. _(133 chars)_ |
| lede | b-money is short enough to read in one sitting and honest enough to say where it does not work. |
| Links | `/articles/hashcash-the-actual-mechanism/`, `/articles/the-double-spend-problem/` |

Reads the proposal as a document, separating what it specifies from what it gestures at, and paying particular attention to the passage where it acknowledges the unresolved problem of who keeps the accounts honest. Argue that its value to this history is not that it was a blueprint but that it maps the shape of the difficulty, which is why a later document could cite it in a single line. Treat the citation in the Bitcoin whitepaper as a fact about the whitepaper, not as a claim about influence. The piece must not present b-money as a working design, must not use it as evidence in any authorship theory, and must not paraphrase its text as though quoting it.

#### 2026-09-26 &middot; `the-supply-schedule`

**The Supply Schedule Is a Rule in Code, Not a Promise in a Document**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | How the Bitcoin Supply Schedule Works _(37 chars)_ |
| description | Where the issuance rule actually lives, what enforces it, and why calling it a hard cap is a statement about social consensus. _(126 chars)_ |
| lede | The cap is enforced by every node choosing to run software that enforces it, which is a different kind of guarantee than most people hear. |
| Links | `/articles/reading-the-bitcoin-whitepaper/`, `/articles/the-bitcoin-whitepaper-is-not-the-document-you-think/` |

Built around the issuance rule as it appears in the source code rather than as it is described in summaries: how issuance decays, where the rule is implemented, and what would have to happen for it to change, which is a coordination problem rather than a mathematical impossibility. Argue that the strong version of the claim, that the supply cannot change, is a social fact dressed as a technical one, and that saying so plainly makes the design more impressive rather than less. Connect it to the site's line by pointing out that the credibility of the rule expands with the number of independent parties who would refuse a change. The piece must not forecast future issuance dates, must not state a current circulating supply or a market value, and must not describe the cap as an investment property of any kind. Do not restate the absence of any supply cap discussion from the paper itself, which the published whitepaper piece already establishes, and link to it rather than repeating it.

#### 2026-09-27 &middot; `the-value-overflow-incident`

**The Bug That Created Coins Out of Nothing, and the Fix That Rewrote History**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `postmortem` |
| Cluster | The first users |
| seoTitle | The Value Overflow Bug and the Chain Rewrite _(44 chars)_ |
| description | An arithmetic overflow allowed a transaction that violated the supply rule, and the response was a patched client and a reorganised chain. _(138 chars)_ |
| lede | The supply rule was broken by an integer overflow, and the repair required the network to abandon blocks it had already accepted. |
| Links | `/articles/running-a-node-when-nobody-did/`, `/articles/the-supply-schedule/` |

Follows one failure to its causes: the specific class of arithmetic error, why the validation logic did not catch it, how it was noticed, and what the coordinated response actually required from the people running the network. Argue that this incident is the strongest available counterexample to the claim that the chain is immutable, since a small number of coordinating humans invalidated accepted history within hours, and that the story is usually omitted from immutability arguments. Set up the DAO fork years later by establishing that the precedent for intervention existed from the very beginning. The piece must not state the number of units created without verifying it against the block record, must not name or characterise whoever broadcast the transaction, and must not describe the response as a governance decision by any formal body, because no such body existed.

#### 2026-09-28 &middot; `checkpoints-and-what-they-admitted`

**Hardcoded Checkpoints Were an Admission, and a Reasonable One**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Who decided, and how |
| seoTitle | Hardcoded Checkpoints and What They Admitted _(44 chars)_ |
| description | Baking known good block hashes into the software traded a little purity for a lot of practical safety, and the tradeoff was argued openly. _(138 chars)_ |
| lede | A checkpoint is the developers telling your node not to bother reconsidering the distant past. |
| Links | `/articles/the-alert-key/`, `/articles/what-a-hard-fork-actually-is/`, `/articles/what-a-soft-fork-actually-is/` |

Built around the commits and archived discussion that introduced checkpoints: what a checkpoint does mechanically, why it was added, what class of attack it made cheap to defend against, and the objection that it inserts a developer decision into a node's view of history. Argue that this is the cleanest small example of the recurring tradeoff on this site between a system's stated properties and its operational needs, and that the honest version of decentralisation is a series of these compromises rather than an absolute. Show how the objection was eventually addressed rather than dismissed. The piece must not state which checkpoints exist in any current release without checking the source, must not claim checkpoints prevented a specific attack, and must not treat their presence or removal as evidence of good or bad faith.

#### 2026-09-29 &middot; `bit-gold-the-proposal`

**bit gold: Unforgeable Costliness as a Design Goal**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Before the whitepaper |
| seoTitle | bit gold and Unforgeable Costliness _(35 chars)_ |
| description | A proposal that framed digital scarcity as a property to be manufactured rather than declared, and where its own author said it fell short. _(139 chars)_ |
| lede | bit gold asked what would have to be true for a string of bits to be expensive in the way a metal is. |
| Links | `/articles/b-money-the-proposal/`, `/articles/hashcash-the-actual-mechanism/` |

Works through the proposal's core argument that scarcity has to be produced by cost rather than asserted by rule, and then works through the parts the author himself flagged as incomplete, particularly the question of how the chain of proofs is agreed. Argue that this is the most philosophically direct of the pre-2009 proposals and the least implementable, and that the gap between those two is the entire story of the period. Use the threshold to describe an idea space expanding while the set of running systems stayed at zero. The piece must not use the proposal's similarity to Bitcoin as evidence about who wrote Bitcoin, a claim that recurs constantly and is not established, and must not attribute to the author any statement he has not published.

#### 2026-09-30 &middot; `the-difficulty-adjustment`

**Difficulty Adjustment: The Feedback Loop That Keeps the Clock Steady**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | How Difficulty Adjustment Actually Works _(40 chars)_ |
| description | The rule that retargets mining difficulty is a control system, and understanding it explains most of what mining economics does under stress. _(141 chars)_ |
| lede | The network has no clock, so it built one out of a moving target. |
| Links | `/articles/the-supply-schedule/`, `/articles/hashcash-the-actual-mechanism/` |

Makes one mechanism comprehensible: why a fixed target would break as hardware improved, how retargeting turns an unpredictable amount of work into a predictable rhythm, and what happens in the interval after a large share of capacity leaves. Argue that this loop, not the supply cap, is the most underappreciated piece of the original design, because it is what makes the system self correcting rather than merely scarce. Use the threshold directly: hash rate crossing sharply in either direction is the clearest expansion and contraction signal the system produces about itself. The piece must not state historical hash rate figures, difficulty values or block times without a cited source, must not forecast anything, and must not present hash rate as a valuation input.


### October 2026

_31 articles._

#### 2026-10-01 &middot; `the-first-merchants`

**The First Businesses That Accepted It, and Why Most Stopped**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | The first users |
| seoTitle | The First Merchants to Accept Bitcoin _(37 chars)_ |
| description | Merchant acceptance arrived early, peaked as a press story, and quietly reversed, and the reasons are operational rather than ideological. _(138 chars)_ |
| lede | Merchant acceptance is the most announced and least examined metric in this history. |
| Links | `/articles/how-a-thing-with-no-price-gets-one/`, `/articles/the-pizza-transaction-as-folklore/` |

Sequences the arrival of merchant acceptance and then examines the operating reality behind it, including settlement into local currency, volatility exposure, refund handling and the fact that most acceptance was intermediated by a processor rather than direct. Argue that the announcement of acceptance and the practice of acceptance diverged almost immediately, which makes the whole metric close to useless as a measure of adoption. The threshold reading is a genuine crossing in both directions, expanding through announcements and contracting through quiet removals nobody wrote up. The piece must not state how many merchants accepted at any point, must not name a business as still accepting without checking, and must not present acceptance figures from any vendor as independent data.

#### 2026-10-02 &middot; `disclosure-without-a-company`

**How Do You Responsibly Disclose a Bug When There Is No Vendor**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | Who decided, and how |
| seoTitle | Disclosing a Protocol Bug With No Vendor _(40 chars)_ |
| description | Security disclosure assumes a company that can patch and push, and a public protocol with voluntary upgrades has neither. _(121 chars)_ |
| lede | Standard disclosure practice assumes somebody can ship a fix to everyone, which is exactly what does not exist here. |
| Links | `/articles/the-value-overflow-incident/`, `/articles/maintainers-not-owners/` |

Explains the disclosure problem specific to protocols with no vendor: no forced updates, no support contract, an adversary who reads the same public repository, and a fix that is only effective once enough independent operators voluntarily deploy it. Argue that the informal norms that emerged, private coordination followed by delayed public write ups, are genuinely good practice invented under pressure and are among the most underrated institutional achievements in this history. Note the cost honestly, since private coordination among a small group is exactly what the design was meant to avoid. The piece must not describe any unpatched vulnerability, must not name individuals involved in any specific disclosure without a published account, and must not present any timeline as standard practice across projects, because there is no standard.

#### 2026-10-03 &middot; `the-timestamping-papers`

**The Timestamping Papers Bitcoin Cited, and What They Were Solving**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Before the whitepaper |
| seoTitle | The Timestamping Papers Bitcoin Cited _(37 chars)_ |
| description | Academic work on how to prove a document existed at a point in time, published years earlier, and how it shows up in the whitepaper's references. _(145 chars)_ |
| lede | The chain of hashes at the centre of the design was published as a way to notarise documents, not to move money. |
| Links | `/articles/bit-gold-the-proposal/`, `/articles/the-double-spend-problem/` |

Reads the cited timestamping literature on its own terms, explaining what problem it set out to solve for digital documents and how linking hashes into a chain makes retroactive alteration detectable. Show the specific step Bitcoin took beyond it, replacing the trusted timestamping service with a competition, and be precise that this is one step rather than a wholesale invention. Argue that the citation list of the whitepaper is the best available evidence of what its author had actually read, and that it is routinely ignored in favour of folklore. The piece must not claim the timestamping authors anticipated cryptocurrency, must not present the citation as an endorsement, and must not reproduce the papers' text as a quotation without the source in hand.

#### 2026-10-04 &middot; `the-halving-as-institutional-design`

**The Halving Is a Scheduled Revenue Cut for an Entire Industry**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The Halving as an Industrial Revenue Cut _(40 chars)_ |
| description | Read as monetary policy the halving is simple, but read as a business event it is a scheduled shock to every miner's income statement. _(134 chars)_ |
| lede | A scheduled, announced, unavoidable halving of revenue is a governance event that no ordinary industry would tolerate. |
| Links | `/articles/the-supply-schedule/`, `/articles/the-difficulty-adjustment/` |

Reframes a familiar mechanism as an operating problem, explaining why the issuance step down is trivial arithmetic for the protocol and a capital planning problem for the businesses that depend on it. Argue that the interesting history of the halving is a history of consolidation, since each one moves the marginal operator below its cost line and the fleet contracts before it expands again. That is the site's thesis in its most literal form, and it can be described structurally without any price. The piece must not name a price, a break even level, a hash price or an expected outcome for any future halving, must not frame the event as a market catalyst, and must not repeat the claim that halvings cause anything without saying who claims it and on what basis.

#### 2026-10-05 &middot; `lost-keys-and-unverifiable-losses`

**Lost Coins Are A Category Where Almost Every Number Is Made Up**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The first users |
| seoTitle | Lost Coins and the Numbers Nobody Can Verify _(44 chars)_ |
| description | Estimates of permanently lost holdings circulate as facts, and the methods behind them cannot distinguish lost from dormant. _(124 chars)_ |
| lede | There is no test that separates a key thrown away from a key held patiently, and every estimate quietly assumes one. |
| Links | `/articles/the-first-transaction-on-chain/`, `/articles/running-a-node-when-nobody-did/` |

Explains what on chain analysis can actually determine, which is that an output has not moved, and what it cannot determine, which is why. Argue that the widely repeated loss estimates are model outputs presented as measurements, and that the honest framing is a range with the assumptions named. Use the case to teach a general reading habit for this site: when a figure about crypto is quoted without a method, the method is usually the interesting part and usually the weak part. The piece must not repeat any specific lost coin estimate as fact, must not state a percentage of supply as lost, and must not use anecdotes about discarded hardware without a verifiable source.

#### 2026-10-06 &middot; `the-license-choice`

**The Licence Was Chosen Early and Shaped Everything That Could Be Built**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Who decided, and how |
| seoTitle | The Licence Choice and What It Permitted _(40 chars)_ |
| description | A permissive licence made forking the code legal and trivial, which is why the next era is full of near identical projects. _(123 chars)_ |
| lede | The most consequential legal document in early crypto is a short permissive software licence. |
| Links | `/articles/the-departure/`, `/articles/disclosure-without-a-company/`, `/articles/checkpoints-and-what-they-admitted/` |

Reads the licensing decision as a primary source and traces its direct consequences: anybody could copy the codebase, change parameters and launch, with no obligation to contribute back and no permission required. Argue that the clone economy of the following years is a licence artefact as much as a market phenomenon, and that a copyleft choice would have produced a visibly different history. Take the position that the choice was correct and that its costs, including thousands of abandoned near copies, were the price of the benefit. The piece must not give legal advice or interpret licence obligations for any reader, must not state the licence terms without reading them, and must not claim any specific project violated any licence.

#### 2026-10-07 &middot; `byzantine-fault-tolerance-plainly`

**Byzantine Fault Tolerance, Explained Without the Generals**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Before the whitepaper |
| seoTitle | Byzantine Fault Tolerance, Explained Plainly _(44 chars)_ |
| description | What it means for a system to keep agreeing when some participants are actively lying, and why that is a different problem from participants going offline. _(155 chars)_ |
| lede | A machine that crashes is easy to plan around, a machine that lies to you selectively is not. |
| Links | `/articles/the-double-spend-problem/`, `/articles/the-timestamping-papers/`, `/articles/bit-gold-the-proposal/` |

Built around the paper that introduced the problem, which is worth reading rather than paraphrasing: the difference between crash faults and adversarial faults, why the second is much harder, and what a fault tolerance threshold actually bounds. Argue that most popular writing collapses this into a slogan about trustlessness and thereby loses the only interesting part, which is that every such system buys safety by assuming a limit on how much of the network is hostile. Connect it forward by noting that every later consensus argument on this site, including the ones that turned into political fights, is a disagreement about that assumption. The piece must not attach a specific percentage threshold to any named production network without deriving it from that network's own documentation, and must not claim any live system has been formally proven Byzantine fault tolerant in practice.

#### 2026-10-08 &middot; `the-honest-majority-assumption`

**The Honest Majority Assumption Is an Assumption, and It Says So**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The Honest Majority Assumption, Examined _(40 chars)_ |
| description | Security rests on a stated condition about how much of the network is cooperating, and the document is explicit that it is a condition. _(135 chars)_ |
| lede | The guarantee is conditional, the condition is named in the paper, and almost every popular summary drops it. |
| Links | `/articles/byzantine-fault-tolerance-plainly/`, `/articles/reading-the-bitcoin-whitepaper/` |

Built around the specific passages of the whitepaper that state the security condition, reading what they do and do not cover, including the important detail that the guarantee bounds reordering rather than theft. Argue that dropping the condition when summarising is how the word trustless entered general use as a synonym for safe, and that the imprecision has real costs later on this site when smaller networks are attacked. Connect back to the general fault tolerance literature so the reader can see what is standard and what is specific here. The piece must not claim any particular network is currently above or below the threshold, must not cite mining pool concentration figures without a dated source, and must not present any attack as impossible.

#### 2026-10-09 &middot; `the-network-asked-to-take-a-side`

**The First Time the Network Was Asked to Be Political**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | The first users |
| seoTitle | The First Time Bitcoin Was Asked to Take a Side _(47 chars)_ |
| description | An early episode in which the community debated whether visible use by a controversial organisation was a benefit or an existential risk. _(137 chars)_ |
| lede | The argument about whether censorship resistance is a feature or a liability is as old as the first time somebody used it. |
| Links | `/articles/the-forum-as-the-only-record/`, `/articles/the-cypherpunks-list/` |

Sequences a documented early episode in which the network's censorship resistance was invoked in public and the community argued openly about whether the attention was survivable. Argue that the substance of that argument, whether a neutral protocol can stay neutral once it is used by someone unpopular, has never been resolved and recurs in every later chapter of this site involving sanctions, mixers and exchange policy. Present both positions from the archived record and refuse to adjudicate. The piece must not take a position on the organisation involved, must not describe any legal matter, charge or proceeding concerning any person, and must not quote any participant without an archived source.

#### 2026-10-10 &middot; `who-pays-the-developers`

**Nobody Owns the Protocol, So Somebody Has to Pay for the Work Anyway**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `profile` |
| Cluster | Who decided, and how |
| seoTitle | Who Pays Protocol Developers, and Why It Matters _(48 chars)_ |
| description | Protocol work has no revenue model built into it, and every arrangement invented to fund it carries a different conflict of interest. _(133 chars)_ |
| lede | The protocol generates no revenue for the people maintaining it, which is a structural problem with only awkward answers. |
| Links | `/articles/maintainers-not-owners/`, `/articles/rough-consensus-and-running-code/` |

A profile of the funded protocol developer as a role, working through the funding models actually used, employment by companies with a commercial interest, grants from foundations, sponsorships and independent funds, and the specific incentive problem attached to each. Argue that there is no clean answer and that pretending otherwise is how funding disputes turn into accusations, since every funder has a position and every developer knows it. Commit to a view: disclosed funding with an obvious conflict is much safer than undisclosed funding with a subtle one. The piece must not name any current funder or employment relationship without a published source, must not accuse anyone of acting for a funder, and must not state amounts of any grant or salary.

#### 2026-10-11 &middot; `smart-contracts-before-blockchains`

**The Term Smart Contract Predates Every Chain That Runs One**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `primarySource` |
| Cluster | Before the whitepaper |
| seoTitle | Smart Contracts Before Blockchains Existed _(42 chars)_ |
| description | The original meaning of the phrase, why the vending machine was the example, and how much drift the term has taken on since. _(124 chars)_ |
| lede | The phrase was coined to describe a vending machine, and it has been sliding away from that meaning ever since. |
| Links | `/articles/bit-gold-the-proposal/`, `/articles/the-cypherpunks-list/` |

Built around the essay that coined the term, recovering the original definition, a contract whose performance is embedded in a mechanism rather than enforced after the fact, and showing why the vending machine example is more precise than most later usages. Argue that the drift matters practically, because calling deployed code a contract imports assumptions about enforceability, interpretation and remedy that the code does not carry. Set up the later era of this site by naming the confusion in advance, since a large share of the DAO argument turns on exactly this equivocation. The piece must not assert what any jurisdiction currently holds about the legal status of contract code, must not give any reader guidance on whether their own arrangement is enforceable, and must not quote the coinage from memory.

#### 2026-10-12 &middot; `the-authorship-question`

**The Authorship Question, and How to Write About It Without Guessing**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `explainer` |
| Cluster | The whitepaper and the genesis block |
| seoTitle | The Bitcoin Authorship Question, Handled Honestly _(49 chars)_ |
| description | A pseudonymous author, a long list of claimed identifications, no accepted proof, and a method for writing about unresolved questions. _(134 chars)_ |
| lede | The honest summary is that nobody has demonstrated who wrote it, and that summary is unsatisfying by design. |
| Links | `/articles/the-cypherpunks-list/`, `/articles/the-bitcoin-whitepaper-is-not-the-document-you-think/`, `/articles/bit-gold-the-proposal/` |

Uses the most speculated about question in the subject as a worked example of how this site handles an open question: state what is documented, state what would count as proof, state that it has not been produced, and stop. Argue that the identification attempts are historically interesting as a study of evidence standards, since each one rests on stylometry, circumstantial timing or an unverified claim, and none rests on a signature from a known early key. Take the position plainly that the answer would change very little about the history and that the appetite for it is mostly narrative. The piece must not name any individual as a likely author, must not rank the candidates by plausibility, must not repeat any specific person's denial or claim as evidence, and must not treat coincidence of writing style as identification.

#### 2026-10-13 &middot; `the-first-alternative-clients`

**The First Competing Implementations and the Question They Raised**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | The first users |
| seoTitle | The First Alternative Bitcoin Clients _(37 chars)_ |
| description | Once a second implementation existed, the rules of the network stopped being defined by a program and started being defined by agreement. _(137 chars)_ |
| lede | A single implementation is a specification by accident, and the moment a second one appears that accident becomes a problem. |
| Links | `/articles/running-a-node-when-nobody-did/`, `/articles/what-the-first-client-actually-did/` |

Traces the emergence of alternative software and explains the consequence that follows immediately: with one client, the code is the rule, and with two, any behavioural difference is a potential chain split. Argue that this is the origin of the entire consensus compatibility discipline that later eras take for granted, and that it arrived before anyone had a process for handling it. Frame it against the threshold by noting that implementation diversity is simultaneously a resilience gain and a consensus risk, and reasonable people weighted those differently. The piece must not claim any specific split was caused by a client difference without a documented incident, must not describe present day client market share, and must not rank implementations by quality.

#### 2026-10-14 &middot; `the-governance-venue-moved`

**Every Time the Conversation Moved Venues, the Decision Rules Changed**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | Who decided, and how |
| seoTitle | How Crypto Governance Kept Changing Venue _(41 chars)_ |
| description | From a mailing list to a forum to chat to a repository to social platforms, and each move quietly changed who could participate and who could not. _(146 chars)_ |
| lede | Where an argument happens determines who is in the room, and this argument kept moving rooms. |
| Links | `/articles/the-forum-as-the-only-record/`, `/articles/rough-consensus-and-running-code/`, `/articles/the-bip-process/` |

Sequences the migration of protocol discussion across venues and shows how each move altered participation, archival quality and the practical definition of consensus, without anyone deciding it should. Argue that venue is an underrated governance variable, since a searchable archive produces a different history than an ephemeral chat, and a platform with an engagement algorithm produces a different debate than a moderated list. Connect it to the site's method by noting that the archival quality of each venue determines how much of this history can be written at all. The piece must not claim a specific decision was made in a specific venue without a citation, must not characterise any platform's moderation, and must not treat the loudest venue as the representative one.

#### 2026-10-15 &middot; `why-the-earlier-attempts-failed`

**Twenty Years of Digital Cash Attempts, and the Three Ways They Ended**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `timeline` |
| Cluster | Before the whitepaper |
| seoTitle | Why Digital Cash Kept Failing Before 2009 _(41 chars)_ |
| description | A sequenced read of the pre-2009 attempts, sorted by how they ended: no adoption, an operator shut down, or a design that was never built. _(138 chars)_ |
| lede | The attempts before 2009 failed in only a few distinct ways, and sorting them that way is more useful than listing them. |
| Links | `/articles/digicash-postmortem/`, `/articles/e-gold-and-the-compliance-wall/`, `/articles/the-crypto-wars/` |

Sequences the period and then classifies it, arguing that the failures cluster into three modes and that only one of them, the operator being removable, was actually addressed by what came next. Make the uncomfortable point that adoption failure was never solved by any protocol change and had to be solved socially, over a decade, which is why the second era of this site is about exchanges rather than cryptography. The threshold framing is the summary of the whole cluster: capability was above the line for years while distribution and legal tolerance were below it. The piece must not present the sequence as a march of progress toward Bitcoin, must not assign a success or failure verdict to any project still operating, and must not supply user, revenue or volume figures for any of them.

#### 2026-10-16 &middot; `why-early-adoption-figures-are-unknowable`

**Nobody Knows How Many Early Users There Were, Including the People Quoting Numbers**

| | |
| --- | --- |
| Era | `origins` |
| Kind | `postmortem` |
| Cluster | The first users |
| seoTitle | Why Early Adoption Figures Cannot Be Known _(42 chars)_ |
| description | Addresses are not people, downloads are not users, and forum accounts are not either, so every early user count is a guess wearing a suit. _(138 chars)_ |
| lede | Every unit you could count in the early years measures something other than a person. |
| Links | `/articles/lost-keys-and-unverifiable-losses/`, `/articles/the-forum-as-the-only-record/`, `/articles/the-first-merchants/` |

Follows a measurement failure to its causes, taking each available proxy in turn, addresses, downloads, forum registrations and node observations, and showing exactly what each one overcounts and undercounts. Argue that the industry's habit of reporting these proxies as user numbers began here and never stopped, and that it is the root of a large share of later misreporting about growth. Commit to a position: a history site should say the number is unknown rather than pick the least bad proxy, because picking one launders a guess into a citation. The piece must not supply any early user estimate even with a caveat, must not compare early adoption to any other technology using figures, and must not cite an analytics vendor's number as independent.

#### 2026-10-17 &middot; `what-an-exchange-actually-is`

**A Crypto Exchange Is Four Regulated Businesses in a Trench Coat**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | What a Crypto Exchange Actually Is _(34 chars)_ |
| description | Matching, custody, settlement and banking are separate licensed functions in every other market, and crypto bundled all four into one company. _(142 chars)_ |
| lede | In every other market these four jobs are done by four firms who watch each other, and here one firm does all of them. |
| Links | `/articles/why-early-adoption-figures-are-unknowable/`, `/articles/why-the-earlier-attempts-failed/`, `/articles/the-governance-venue-moved/` |

Separates the functions a crypto exchange performs and shows what each one corresponds to in a conventional market, where they are held apart by law, capital rules and mutual supervision. Argue that almost every failure in the next fifteen years of this site is a consequence of the bundling rather than of fraud specifically, because the bundle removes every party who would otherwise notice. Commit to the position that this is the structural fact of the industry and that reading later collapses without it produces a story about bad people instead of a story about design. The piece must not name any current venue as safe or unsafe, must not describe any jurisdiction's present licensing requirements, and must not advise a reader on where to hold anything.

#### 2026-10-18 &middot; `mt-gox-before-it-was-an-exchange`

**The Largest Exchange in the World Started as Something Else Entirely**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | What Mt. Gox Was Before It Was an Exchange _(42 chars)_ |
| description | The venue that dominated trading for years began as an unrelated hobby project, was sold, and grew far past what its code was built for. _(136 chars)_ |
| lede | The dominant venue of the era was built on a codebase that was never designed to hold anybody's money. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/why-early-adoption-figures-are-unknowable/`, `/articles/why-the-earlier-attempts-failed/` |

Sequences the venue's origins, its change of ownership, and the period in which it went from a small operation to the price source for the entire market, using only publicly documented history. Argue that the mismatch between what the software was designed for and what it became is the underlying condition of everything that followed, and that no amount of later diligence could have fixed an accounting system that was wrong from the start. The threshold reading is that market share expanded to near total while the operational base underneath it did not expand at all. The piece must not state trading volumes or market share percentages without a cited source, must not characterise the intentions of any owner or employee, and must not repeat purchase terms or prices that are not part of the public record.

#### 2026-10-19 &middot; `the-first-fork-of-the-code`

**The First Serious Fork Was Not About Money at All**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | The clone economy |
| seoTitle | The First Serious Fork of the Bitcoin Code _(42 chars)_ |
| description | The earliest important derivative project used the consensus machinery for domain names, establishing that the ledger was a general tool. _(137 chars)_ |
| lede | The first project worth taking seriously copied the consensus mechanism and pointed it at something other than payments. |
| Links | `/articles/the-license-choice/`, `/articles/the-first-alternative-clients/` |

Sequences the appearance of the first derivative project and explains why applying the same machinery to name registration was a genuine conceptual step rather than a copy. Argue that this established the pattern for the entire following decade, in which the interesting question stopped being whether the ledger worked and became what else you could put in it. Note the merged mining arrangement as the first real attempt to solve the security problem that every small chain immediately has. The piece must not claim the project succeeded or failed commercially, must not state user or registration counts, and must not present merged mining as securing a chain to the same degree as its parent.

#### 2026-10-20 &middot; `what-a-darknet-market-was`

**What Those Markets Actually Were, as Pieces of Software**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | Darknet Markets, as Pieces of Software _(38 chars)_ |
| description | Stripped of the reporting, these were commerce platforms with escrow, ratings and dispute resolution, running over an anonymity network. _(136 chars)_ |
| lede | Described as software rather than as crime, they were ordinary marketplace platforms with an unusual transport layer. |
| Links | `/articles/the-network-asked-to-take-a-side/`, `/articles/the-first-fork-of-the-code/`, `/articles/mt-gox-before-it-was-an-exchange/` |

Describes the technical composition without narrating any offence: an anonymity network for transport, a marketplace application, an escrow arrangement, a reputation system and a payment method with no reversal. Argue that understanding the software is necessary to understand why this was the first sustained real world use of the payment network, and that the reporting of the period consistently confused the transport layer with the payments layer. Keep the analysis at the level of market design throughout. The piece must not describe how to access any such site, must not narrate any specific transaction or offence, must not name any individual, and must not discuss any charge, trial or sentence.

#### 2026-10-21 &middot; `the-hardware-generations`

**Four Hardware Generations in About Four Years**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mining becomes an industry |
| seoTitle | The Four Generations of Mining Hardware _(39 chars)_ |
| description | Processors to graphics cards to programmable chips to purpose built silicon, and what each transition permanently removed from the network. _(139 chars)_ |
| lede | Each hardware generation made the previous one worthless within months, which is an unusual thing for an industry to survive. |
| Links | `/articles/cpu-mining-as-a-hobby/`, `/articles/the-difficulty-adjustment/` |

Sequences the hardware transitions and states precisely what each one changed: the capital required, the depreciation schedule, and the class of participant who could still take part. Argue that the compression of these transitions into a few years is why mining professionalised so abruptly, since no hobbyist can absorb a depreciation cycle measured in months. Read it through the threshold: total capacity expanded continuously while the participant base contracted at every step, and the industry reported only the first number. The piece must not state hardware specifications, prices, efficiency figures or dates without a cited source, and must not suggest any hardware is or was worth acquiring.

#### 2026-10-22 &middot; `the-first-exchanges`

**The First Exchanges Were Side Projects That Accidentally Held Everyone's Money**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | The First Crypto Exchanges, Sequenced _(37 chars)_ |
| description | A sequenced account of how trading venues appeared, mostly as personal projects, and how quickly they became systemically important. _(132 chars)_ |
| lede | The first venues were built by individuals with no intention of becoming financial infrastructure, and became it within months. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/how-a-thing-with-no-price-gets-one/` |

Sequences the appearance of the earliest venues and the speed at which each acquired a customer base large enough that its failure would matter to everyone. Argue that the gap between a hobby project's engineering standards and the responsibilities of a custodian was never closed by anything except the eventual failures, and that nobody had a mechanism to close it. Read it through the threshold: trading capacity expanded far faster than operational competence, and the two were reported as one number called volume. The piece must not state trading volumes, user counts or market share for any venue, must not describe founders' intentions beyond published statements, and must not rank early venues by trustworthiness.

#### 2026-10-23 &middot; `transaction-malleability-the-actual-bug`

**Transaction Malleability, Explained Properly and Without the Blame**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | Transaction Malleability, Explained Properly _(44 chars)_ |
| description | A transaction could be rebroadcast with a different identifier while remaining valid, and understanding exactly what that allowed matters here. _(143 chars)_ |
| lede | The identifier could change without the transaction changing, which breaks any system that treats the identifier as final. |
| Links | `/articles/mt-gox-before-it-was-an-exchange/`, `/articles/the-first-transaction-on-chain/`, `/articles/mt-gox-the-coins-were-already-gone/` |

Makes the mechanism comprehensible on its own before it is used in any argument: what a transaction identifier is derived from, which parts of a signature could be altered without invalidating it, and what an accounting system that keys on the identifier would then get wrong. Argue that the bug is real, was known and discussed before it became famous, and is a protocol level flaw that any exchange should have handled defensively. Keep the mechanism and the accusation strictly separate, because the next piece is about whether it explains what people say it explains. The piece must not assert that malleability caused any specific loss, must not describe the current state of the protocol without checking, and must not present the bug as unfixed. Do not restate the argument that the bug cannot account for the loss, which the published Mt. Gox piece already makes, and link to it instead.

#### 2026-10-24 &middot; `naming-as-a-use-case`

**Decentralised Naming Is the Use Case That Keeps Almost Working**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | The clone economy |
| seoTitle | Decentralised Naming: The Use Case That Keeps Returning _(55 chars)_ |
| description | Putting domain names on a ledger solves a real problem and creates several new ones, and the same design keeps being reinvented. _(128 chars)_ |
| lede | Every few years somebody rediscovers that naming is the obvious application, and hits the same three walls. |
| Links | `/articles/the-first-fork-of-the-code/`, `/articles/transaction-malleability-the-actual-bug/`, `/articles/the-first-exchanges/` |

Explains the mechanism and the recurring difficulties: squatting under a first come rule, the absence of a dispute process, the resolution problem for ordinary software, and the renewal economics. Argue that naming is genuinely well suited to a public ledger and genuinely badly suited to being the only layer, and that every later attempt has rediscovered this. Take the position that the repeated reinvention is evidence the industry does not read its own history. The piece must not name any current naming project as working or dominant, must not state registration figures, and must not advise a reader to register anything.

#### 2026-10-25 &middot; `escrow-and-reputation-without-law`

**How Strangers Trade When No Court Will Hear the Dispute**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | Escrow and Reputation Without a Legal System _(44 chars)_ |
| description | Markets outside legal recourse had to build enforcement from escrow, ratings and repeat play, and the mechanisms are genuinely instructive. _(139 chars)_ |
| lede | Remove the courts and the parties have to manufacture enforcement out of nothing but repeated interaction. |
| Links | `/articles/what-a-darknet-market-was/`, `/articles/smart-contracts-before-blockchains/` |

Explains the substitutes for legal enforcement: multi party escrow, reputation accumulated over repeated trades, and the operator as arbitrator of last resort, and shows exactly where each one fails. Argue that these markets are a natural experiment in institutional economics that is rarely read as one, and that their solutions were reinvented almost line for line by later peer to peer trading and by decentralised marketplaces. Commit to the position that the operator as arbitrator is the weak point, and that this is why exit scams are structural rather than incidental. The piece must not describe any illegal activity or facilitate it, must not name markets or individuals, and must not present any of these mechanisms as advice for any reader's own arrangements.

#### 2026-10-26 &middot; `mining-pools-and-what-they-centralise`

**Pools Solved Variance and Created a Different Problem**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Mining becomes an industry |
| seoTitle | What Mining Pools Actually Centralise _(37 chars)_ |
| description | Pooling smooths income for individual miners, and in doing so it concentrates block construction into a small number of hands. _(126 chars)_ |
| lede | A pool exists because random income is unbearable, and the price of fixing that is handing someone else the decisions. |
| Links | `/articles/the-hardware-generations/`, `/articles/the-honest-majority-assumption/` |

Explains the mechanism honestly: why solo mining produces intolerable variance, how a pool converts lottery income into wages, and exactly which decisions move to the pool operator when a miner joins. Argue that the standard concentration statistics measure the wrong thing, because they count hash rate by pool while the underlying hardware is widely distributed and can move between pools quickly. Commit to a position that pool concentration is a real risk and a poor metric, and that the distinction matters for every governance argument that cites it. The piece must not state pool market shares without a dated source, must not claim any pool has acted improperly, and must not present any pool arrangement as recommended.

#### 2026-10-27 &middot; `the-omnibus-account-problem`

**Your Balance on an Exchange Is a Database Row, Not a Coin**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | Why an Exchange Balance Is Just a Database Row _(46 chars)_ |
| description | Pooled custody means the number on the screen is an entry in the venue's ledger, and the difference only becomes visible when something breaks. _(143 chars)_ |
| lede | The screen shows what the company says you have, which is a claim on the company and not a holding. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/the-first-exchanges/` |

Explains pooled or omnibus custody precisely: why venues commingle, what internal accounting they run instead, and the exact sense in which a user holds an unsecured claim rather than an asset. Argue that this single mechanism explains why every later collapse produced the same surprised question from users, and that the industry's marketing language did real work in hiding it. Set up the whole postFtx era of this site by establishing the mechanism now, in the era where it was invented and nobody complained. The piece must not state how any current venue holds assets, must not describe any user's legal position in an insolvency, since that depends on jurisdiction and facts, and must not recommend any custody arrangement.

#### 2026-10-28 &middot; `the-malleability-explanation-examined`

**The Explanation Offered at the Time, and Why It Was Immediately Doubted**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | Examining the Mt. Gox Malleability Explanation _(46 chars)_ |
| description | The venue attributed its losses to a protocol bug, developers and researchers publicly disputed that the bug could account for it, and the dispute matters. _(155 chars)_ |
| lede | A company blamed the protocol, the people who maintain the protocol said the numbers did not work, and both statements are part of the record. |
| Links | `/articles/transaction-malleability-the-actual-bug/`, `/articles/mt-gox-before-it-was-an-exchange/`, `/articles/mt-gox-the-coins-were-already-gone/` |

Follows the dispute itself rather than picking a winner: the public statement made by the venue, the technical objections raised within days, the chain analysis published afterwards, and what each side could actually demonstrate. Argue that this episode is the clearest example on the site of a technically plausible explanation being used to describe a loss it could not fully account for, and that the correct historical position is to present the contest and its evidence rather than resolve it. Be explicit that later findings complicated the picture in both directions. The piece must not state that the venue's explanation was a lie, must not assign responsibility to any individual, must not state loss figures without citing the source that produced them, and must not treat any single analysis as settling the question. Do not restate the timing argument about when the coins actually went missing, which the published Mt. Gox piece already makes from the chain analysis, and link to it rather than repeating it.

#### 2026-10-29 &middot; `the-parameter-change-fork`

**Changing Three Constants Was Enough to Launch a Rival**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | The clone economy |
| seoTitle | How a Parameter Change Launched Rival Chains _(44 chars)_ |
| description | Most early alternatives were the same software with different block timing, supply and hashing, and that low barrier defined the era. _(133 chars)_ |
| lede | A working competitor could be produced by editing a handful of numbers and writing an announcement. |
| Links | `/articles/the-first-fork-of-the-code/`, `/articles/the-license-choice/` |

Explains exactly which parameters were typically altered, what each change actually does to the resulting network, and why the effect on user experience was almost always smaller than the marketing claimed. Argue that the low cost of launching a chain is the single most important economic fact of this era, because it made narrative rather than engineering the competitive variable. Read it through the threshold: the number of chains expanded enormously while the amount of distinct engineering contracted toward zero. The piece must not evaluate any specific project's technical merit, must not state market capitalisations or rankings, and must not describe any parameter choice as better.

#### 2026-10-30 &middot; `the-pseudonymity-misunderstanding`

**It Was Never Anonymous, and Almost Everyone Thought It Was**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | The Pseudonymity Misunderstanding, Explained _(44 chars)_ |
| description | A permanent public ledger of every transaction is close to the worst possible tool for hiding, and the early belief otherwise was universal. _(140 chars)_ |
| lede | A public, permanent, complete record of every payment is a strange thing to mistake for privacy. |
| Links | `/articles/what-a-darknet-market-was/`, `/articles/the-first-transaction-on-chain/` |

Explains the difference between pseudonymity and anonymity precisely: addresses are identifiers, identifiers can be linked to each other by transaction structure, and linking any one of them to a person deanonymises the cluster retroactively and permanently. Argue that this misunderstanding, held sincerely by both users and journalists for years, is the single most consequential factual error in crypto's popular history. Take the position that the ledger's permanence makes it a surveillance instrument by default and that later privacy work is an attempt to claw back a property it never had. The piece must not describe deanonymisation techniques in operational detail, must not reference any specific investigation, and must not present any privacy tool as effective.

#### 2026-10-31 &middot; `what-a-pool-operator-controls`

**The Pool Operator Chooses What Goes in the Block**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `profile` |
| Cluster | Mining becomes an industry |
| seoTitle | What a Pool Operator Actually Decides _(37 chars)_ |
| description | Transaction selection, ordering and signalling are decided by whoever builds the block template, not by the miners supplying the work. _(134 chars)_ |
| lede | The miners supply the electricity and the operator decides what the block says. |
| Links | `/articles/mining-pools-and-what-they-centralise/`, `/articles/the-hardware-generations/` |

A profile of the mining pool operator and the discretion the role actually carries: the block template, who constructs it, what that permits over transaction inclusion and ordering, and how upgrade signalling flows through the same channel. Argue that this is the most concrete form of centralisation in proof of work and the least discussed, because it is invisible in every chart of distributed hash rate. Connect forward to the later fights over transaction censorship and ordering, which are the same mechanism with higher stakes. The piece must not claim any pool has censored transactions without a documented instance, must not describe present day template construction practice, and must not present later template separation proposals as adopted.


### November 2026

_30 articles._

#### 2026-11-01 &middot; `hot-wallets-and-the-operational-reality`

**Hot Wallets Exist Because Customers Want Withdrawals to Be Instant**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | Hot Wallets and the Withdrawal Tradeoff _(39 chars)_ |
| description | Every venue chooses between keys that sign automatically and keys that cannot, and the choice is a customer experience decision with security costs. _(148 chars)_ |
| lede | The reason so much was stolen from online wallets is that the alternative made withdrawals slow. |
| Links | `/articles/the-omnibus-account-problem/`, `/articles/what-an-exchange-actually-is/` |

Follows the largest recurring loss mechanism of the era to its cause, which is a deliberate configuration: automated signing enables instant withdrawal and exposes key material to the server, and manual signing removes that exposure and makes withdrawal a business process. Argue that the industry chose speed almost universally and then described the resulting losses as hacking, when they were the predictable output of a deliberate configuration. Show that the later multi party signing and hardware isolation practices are attempts to buy back the tradeoff rather than eliminate it. The piece must not describe the current key management of any named venue, must not state loss amounts for any incident without a source, and must not offer any reader a custody recommendation.

#### 2026-11-02 &middot; `mt-gox-the-halt`

**The Weeks Between Withdrawals Slowing and the Site Going Blank**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | The Mt. Gox Halt, Week by Week _(30 chars)_ |
| description | A sequenced account of the public events between the first withdrawal problems and the venue's suspension, built from contemporaneous statements. _(145 chars)_ |
| lede | The end took weeks and was visible the whole time, which is the part worth studying. |
| Links | `/articles/the-malleability-explanation-examined/`, `/articles/transaction-malleability-the-actual-bug/`, `/articles/mt-gox-before-it-was-an-exchange/` |

Sequences the public record week by week: the withdrawal suspension, the statements issued, the reaction of other venues, and the day the site stopped serving. Argue that this is the founding example of the pattern established elsewhere on this site, where the warning is public and legible and still not actionable, because the same symptoms are produced by problems that are survivable. Point out that the industry's collective response, a joint statement by other venues, is itself a historically interesting artefact. The piece must not state prices, balances or loss figures, must not reconstruct internal company events from secondary reporting, and must not assert what any executive knew at any point.

#### 2026-11-03 &middot; `the-asic-resistance-claim`

**ASIC Resistance Was a Promise the Mathematics Could Not Keep**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | The clone economy |
| seoTitle | Why ASIC Resistance Never Held _(30 chars)_ |
| description | Memory hard hashing was supposed to keep mining on general purpose hardware permanently, and specialised chips arrived anyway, repeatedly. _(138 chars)_ |
| lede | Every chain that promised mining would stay on ordinary computers eventually watched purpose built hardware arrive. |
| Links | `/articles/the-parameter-change-fork/`, `/articles/cpu-mining-as-a-hobby/` |

Follows a promise that failed repeatedly to its causes: what memory hardness is meant to achieve, why it raises the cost of specialisation without preventing it, and why a sufficiently valuable network always justifies the engineering. Argue that the repeated failure of this promise is the clearest available case study in confusing a temporary economic barrier with a permanent technical one. Note that some projects responded with repeated algorithm changes and explain the cost of that strategy. The piece must not name a current algorithm as resistant, must not state hardware performance figures, and must not present any mining approach as accessible or worthwhile to a reader.

#### 2026-11-04 &middot; `chain-analysis-becomes-a-business`

**An Entire Industry Was Built on Reading the Public Ledger**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `profile` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | How Chain Analysis Became an Industry _(37 chars)_ |
| description | Firms selling transaction attribution to law enforcement and exchanges emerged in this period and became infrastructure with little scrutiny. _(141 chars)_ |
| lede | The ledger's transparency created a private industry whose product is telling you who is on the other end. |
| Links | `/articles/the-pseudonymity-misunderstanding/`, `/articles/what-a-darknet-market-was/` |

A profile of the transaction analysis firm as an institution: what its methods actually rely on, which is heuristics and off chain data rather than cryptography, and how quickly it became embedded in compliance and enforcement. Argue that the error rate and methodology of these tools are treated as trade secrets while their outputs are treated as evidence, and that this is a genuine and underexamined problem. Read it through the threshold: the assumption of privacy contracted to nothing while the assumption of accuracy expanded without being tested. The piece must not name vendors, must not describe any specific case, must not assert an error rate, and must not characterise the reliability of any tool beyond what published evaluations show.

#### 2026-11-05 &middot; `the-stratum-layer`

**The Protocol Between Miners and Pools Is a Load Bearing Afterthought**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `primarySource` |
| Cluster | Mining becomes an industry |
| seoTitle | The Mining Protocol Nobody Talks About _(38 chars)_ |
| description | A communication protocol written for convenience became the interface through which most of the network's work is coordinated. _(126 chars)_ |
| lede | An informal protocol written to make pooled mining practical ended up carrying most of the industry. |
| Links | `/articles/what-a-pool-operator-controls/`, `/articles/mining-pools-and-what-they-centralise/` |

Built around the published specification: what the protocol actually transmits between a miner and a pool, what it does not authenticate, and what that implies about the trust a miner extends to a pool. Argue that infrastructure written for convenience and adopted universally is a recurring pattern in this history, and that the security properties get examined only after the dependency is total. Note the later effort to redesign the interface and be careful about its adoption status. The piece must not describe attack techniques against the protocol operationally, must not state adoption figures for any version, and must not summarise the specification without reading it.

#### 2026-11-06 &middot; `the-banking-relationship-problem`

**The Hardest Part of Running an Exchange Was Keeping a Bank Account**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | Why Exchanges Kept Losing Their Bank Accounts _(45 chars)_ |
| description | A venue can run its own ledger but cannot run its own banking, and the fiat leg has been the fragile one from the beginning. _(124 chars)_ |
| lede | The crypto side of an exchange rarely failed first, the bank account did. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/the-first-exchanges/` |

Follows a recurring cause of failure that is usually invisible: correspondent banking, payment processors, the risk appetite of a compliance department that can end a business with a letter, and the workarounds venues used when access was withdrawn. Argue that this is the most consistently underweighted cause of failure in crypto history, because the crypto side is legible to observers and the banking side is invisible until it stops. The threshold reading is direct, since access to conventional payment rails expanded and contracted repeatedly and almost nobody outside the affected firms could read it in real time. The piece must not name any current banking relationship, must not characterise any bank's decision as improper, and must not describe workarounds in a way that reads as instruction.

#### 2026-11-07 &middot; `the-leaked-document-problem`

**Half the Sources for This Story Are Documents Nobody Authenticated**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | Leaked Documents and Unverifiable Sources _(41 chars)_ |
| description | Much of what circulates about this collapse comes from leaked material of uncertain provenance, and treating it as evidence has consequences. _(141 chars)_ |
| lede | A document that appeared on the internet and was never authenticated is not a source, however often it is cited. |
| Links | `/articles/mt-gox-the-halt/`, `/articles/the-forum-as-the-only-record/` |

Uses this episode to teach source discipline: the categories of material in circulation, court filings, company statements, leaked internal documents and anonymous analyses, and what standard each deserves. Argue that the industry's writing habits collapsed these categories almost immediately, and that claims from unauthenticated leaks are now repeated in reference works as established fact. Commit to the position that this site will cite the filing or say nothing, and explain why that means some questions stay open. The piece must not reproduce or summarise the contents of any unauthenticated document, must not name individuals appearing in leaked material, and must not use a secondary article as evidence for a primary claim.

#### 2026-11-08 &middot; `the-premine-question`

**Who Holds the Supply at Launch Is the Question That Divides Everything**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | The clone economy |
| seoTitle | The Premine Question, Explained _(31 chars)_ |
| description | Whether founders allocate themselves units before public launch is the sharpest structural distinction between projects in this era. _(132 chars)_ |
| lede | The distribution at block zero tells you more about a project than its whitepaper does. |
| Links | `/articles/the-parameter-change-fork/`, `/articles/faucets-and-the-distribution-problem/` |

Explains the mechanics of the different launch distributions, mined from zero, allocated to founders, sold in advance, or a mixture, and what each implies about incentives and about who bears risk. Argue that the premine debate was moralised early and analysed late, and that the useful framing is not fairness but concentration, because concentrated supply changes what governance and market behaviour are possible. Commit to the position that opaque distribution is the reliable warning sign and that the label itself is not. The piece must not state any project's distribution figures without a verifiable source, must not describe any launch as fair or unfair, and must not draw any conclusion about a project's current holders.

#### 2026-11-09 &middot; `the-seizure-and-what-it-proved`

**The First Large Seizure Settled an Argument About Whether This Was Reachable**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | The First Large Crypto Seizure and Its Meaning _(46 chars)_ |
| description | Enforcement action against a major platform demonstrated that operators, servers and holdings were all reachable, ending a widely held assumption. _(146 chars)_ |
| lede | The claim that this was beyond the reach of any government was tested publicly and did not survive. |
| Links | `/articles/chain-analysis-becomes-a-business/`, `/articles/e-gold-and-the-compliance-wall/` |

Sequences the public enforcement milestones of the period at an institutional level, focusing on what each demonstrated about reachability rather than on any individual case. Argue that the practical lesson absorbed by the industry was not that crypto was illegal but that operators are identifiable and infrastructure is seizable, which pushed later designs toward removing the operator. Note that the industry drew this lesson selectively and applied it inconsistently. The piece must not name any defendant, must not describe any charge, plea, trial, verdict or sentence, must not state seizure amounts, and must not characterise the conduct of any individual.

#### 2026-11-10 &middot; `the-preorder-failures`

**Selling Hardware That Depreciates While You Build It**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mining becomes an industry |
| seoTitle | The Mining Hardware Preorder Failures _(37 chars)_ |
| description | Companies took payment in advance for machines whose earning power fell every week of the delay, and the model failed structurally. _(131 chars)_ |
| lede | A machine bought in advance loses value every day it is not shipped, and the manufacturer holds the money. |
| Links | `/articles/the-hardware-generations/`, `/articles/the-stratum-layer/`, `/articles/what-a-pool-operator-controls/` |

Follows the failure mode to its cause: preorder financing, manufacturing delays measured in months, and an asset whose expected return falls with network capacity, which means every delay transfers value from customer to manufacturer whether or not anyone intended it. Argue that the resulting disputes were predictable from the structure alone and did not require anyone to behave badly, though some did. Take the position that this is the industry's first large scale example of a business model whose incentives are misaligned by construction. The piece must not name companies or individuals, must not describe any legal proceeding, must not state order values or refund amounts, and must not describe any specific allegation.

#### 2026-11-11 &middot; `order-books-without-market-makers`

**A Thin Order Book Makes Every Number Downstream of It Unreliable**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | Thin Order Books and Unreliable Prices _(38 chars)_ |
| description | When a venue has few resting orders, small trades move the quoted price, and that quoted price then feeds indexes, valuations and headlines. _(140 chars)_ |
| lede | The quoted price of a thinly traded asset is a statement about the last person who was impatient. |
| Links | `/articles/how-a-thing-with-no-price-gets-one/`, `/articles/the-first-exchanges/` |

Explains market microstructure at the simplest useful level: what a resting order is, what depth means, why a market without dedicated liquidity providers gaps, and how a single trade on a thin venue propagates into every derived figure. Argue that this mechanism is why early price history should be read as a series of anecdotes, and why later reporting that quotes a headline price without naming the venue is doing something meaningless. Take the position that depth, not price, is the honest measure of whether a market exists. The piece must not quote any price or depth figure, must not name a venue as liquid or illiquid, and must not describe any trading strategy or imply one is available.

#### 2026-11-12 &middot; `mt-gox-in-the-bankruptcy-record`

**What the Insolvency Filings Actually Establish, and What They Do Not**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `primarySource` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | What the Mt. Gox Filings Actually Establish _(43 chars)_ |
| description | Court and trustee documents are the strongest available source on this collapse, and they are narrower than the story usually told from them. _(141 chars)_ |
| lede | The filings settle a small number of questions precisely and leave the interesting ones open. |
| Links | `/articles/the-leaked-document-problem/`, `/articles/mt-gox-the-halt/` |

Built around the insolvency record as the primary source, explaining what a trustee's role is, what kinds of facts a filing establishes, and why an assertion in a filing by one party is not the same as a finding. Argue that the record is both the most reliable material available and consistently over read, because people take a schedule of claims as a full accounting of what happened. Show the specific questions that remain open in the record and resist filling them. The piece must not quote any filing without the document in hand, must not summarise a legal proceeding's outcome or characterise any charge, plea or judgment concerning any individual, and must not state recovery amounts.

#### 2026-11-13 &middot; `thin-markets-and-coordinated-trading`

**Why Thin Markets Attract Coordinated Trading, Structurally**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | The clone economy |
| seoTitle | Why Thin Markets Attract Coordinated Trading _(44 chars)_ |
| description | An asset with little depth and no surveillance is cheap to move, and this era created thousands of them at once. _(112 chars)_ |
| lede | The cost of moving a price is a function of depth, and these markets had almost none. |
| Links | `/articles/order-books-without-market-makers/`, `/articles/the-premine-question/` |

Explains the structural conditions that make coordinated trading cheap: low depth, no market surveillance, no reporting obligation, and a retail audience reading price as information. Argue that describing this era's episodes purely as fraud misses the design failure, because the same conditions would produce the same behaviour with entirely different participants. Keep it structural and historical, and note which of these conditions later regulation actually addressed. The piece must not describe how any scheme was executed in operational detail, must not name projects or individuals, must not state gains or losses, and must not be written in a way any reader could act on.

#### 2026-11-14 &middot; `when-a-government-becomes-a-seller`

**A Government Ran Public Auctions of Seized Digital Assets**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `primarySource` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | When a Government Auctioned Seized Crypto _(41 chars)_ |
| description | Public auction notices for forfeited holdings are unusually clean primary sources, and they document an early institutional interaction few noticed. _(148 chars)_ |
| lede | The auction notices are dry, public, and among the most reliable documents in this entire period. |
| Links | `/articles/the-seizure-and-what-it-proved/`, `/articles/chain-analysis-becomes-a-business/`, `/articles/the-pseudonymity-misunderstanding/` |

Built around the published auction notices as artefacts: what a forfeiture auction is procedurally, what the notices actually state, and why they represent an early and largely unremarked instance of a government transacting in the asset. Argue that these documents are more valuable than most contemporaneous journalism because they are procedural, dated and unambiguous, which is rare in this subject. Note who the buyers were only to the extent it is a matter of public record and voluntary disclosure. The piece must not state quantities, prices or proceeds without the notice in hand, must not identify bidders who have not identified themselves, and must not connect the auctions to any individual's case.

#### 2026-11-15 &middot; `the-majority-scare`

**The Time One Pool Got Close Enough to Frighten Everyone**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mining becomes an industry |
| seoTitle | When One Mining Pool Got Too Close _(34 chars)_ |
| description | A single pool approaching a majority of network capacity produced a public crisis and a voluntary retreat, and the episode is instructive. _(138 chars)_ |
| lede | The threshold everyone theorised about was approached in public, and the response was social rather than technical. |
| Links | `/articles/mining-pools-and-what-they-centralise/`, `/articles/the-honest-majority-assumption/` |

Sequences a documented episode in which one pool's share approached the level at which the security argument weakens, covering the public reaction, the pool's own response, and the redistribution of hash rate that followed. Argue that the resolution is the interesting part, because it was achieved by reputational pressure and voluntary miner migration rather than by any protocol mechanism, which means the system's defence was social. Read the threshold literally, since this is the site's premise appearing as an actual number people watched in real time. The piece must not state the exact share reached without a dated source, must not accuse the pool of any intent, and must not claim the risk was or was not real.

#### 2026-11-16 &middot; `the-reference-price-problem`

**Everyone Quoted One Venue's Price, Including People Who Should Not Have**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | The Reference Price Problem in Early Crypto _(43 chars)_ |
| description | For years a single venue's last trade served as the price of an asset for the whole world, including for contracts settled against it. _(134 chars)_ |
| lede | A number produced by one company's matching engine became the number everybody else built on. |
| Links | `/articles/order-books-without-market-makers/`, `/articles/the-first-exchanges/` |

Follows a systemic dependency to its cause by explaining how a reference rate is supposed to be constructed, with multiple sources, volume weighting and manipulation controls, and contrasting that with a single venue's tape treated as truth. Argue that this concentration is a hidden systemic dependency that made one company's outage into a market wide event, and that the industry only built proper index methodology after being forced to by derivatives listings. Connect forward to the institutional era where index construction becomes a regulatory question rather than a convenience. The piece must not state any historical price or index level, must not accuse any venue of manipulation, and must not describe any current index methodology without reading it.

#### 2026-11-17 &middot; `the-decade-long-creditor-process`

**Creditors Waited Roughly a Decade, and the Waiting Is the Lesson**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | The Mt. Gox Creditor Process, Sequenced _(39 chars)_ |
| description | An insolvency that ran for years across jurisdictions and procedural forms, and what the duration says about crypto's legal infrastructure. _(139 chars)_ |
| lede | The recovery process outlasted most of the companies that were founded in reaction to the collapse. |
| Links | `/articles/mt-gox-in-the-bankruptcy-record/`, `/articles/the-leaked-document-problem/` |

Sequences the procedural history at a structural level: the form the insolvency took, the change in procedure, the claim filing periods and the extended timeline, without asserting outcomes that are not public. Argue that duration is the single most transferable finding for a reader, because every later collapse on this site inherits the same problem, which is that a bearer asset held by an insolvent intermediary produces a slow legal process and not a fast technical one. The threshold framing is that legal certainty expanded very slowly while the asset and the industry moved on entirely. The piece must not state distribution amounts, recovery percentages or dates for future steps, must not describe any creditor's position, and must not present the process as complete unless verified.

#### 2026-11-18 &middot; `narrative-as-the-product`

**When the Code Is Identical, the Story Becomes the Only Difference**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | The clone economy |
| seoTitle | When the Story Becomes the Whole Product _(40 chars)_ |
| description | With near identical software freely available, projects competed on positioning, community and promise rather than on anything technical. _(137 chars)_ |
| lede | If the software is a copy, everything a project can compete on is a claim about the future. |
| Links | `/articles/the-parameter-change-fork/`, `/articles/thin-markets-and-coordinated-trading/` |

Follows the collapse of technical differentiation to its consequence in a market where the product is free to reproduce, showing how differentiation moved to branding, community management and forward looking claims. Argue that this is the origin of the promotional register that still dominates the industry's communication, and that it began as a rational response to commoditisation rather than as dishonesty. Take the position that the shift from engineering claims to narrative claims is the moment the subject became hard to write about accurately. The piece must not quote any project's marketing without a source, must not name projects as examples of dishonesty, and must not make any claim about which projects delivered.

#### 2026-11-19 &middot; `mixers-and-the-privacy-argument`

**The Argument About Mixing Services Has Not Changed in Ten Years**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | The Long Argument About Mixing Services _(39 chars)_ |
| description | Tools that break the link between transactions are defended as privacy infrastructure and treated as laundering infrastructure, and both descriptions fit. _(154 chars)_ |
| lede | The same tool is privacy infrastructure and laundering infrastructure depending only on who is using it. |
| Links | `/articles/the-pseudonymity-misunderstanding/`, `/articles/chain-analysis-becomes-a-business/` |

Explains the mechanism at a conceptual level, breaking the deterministic link between an input and an output by pooling, and then presents the two long standing positions on it without adjudicating. Argue that the debate is genuinely unresolved because both descriptions are accurate simultaneously, and that pretending otherwise is what makes most writing on the subject useless. Name the contest clearly: one side treats financial privacy as a default entitlement, the other treats traceability as a condition of participation in the financial system. The piece must not describe how to use any such service, must not name specific services or any enforcement action against them, must not take a side, and must not offer any reader guidance.

#### 2026-11-20 &middot; `small-chain-attacks`

**Small Chains Get Attacked Because They Are Cheap to Attack**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mining becomes an industry |
| seoTitle | Why Small Chains Get Reorganised _(32 chars)_ |
| description | A chain sharing an algorithm with a much larger one can be reorganised by renting capacity, and this happened repeatedly to real networks. _(138 chars)_ |
| lede | If a bigger chain uses your algorithm, your security budget is whatever somebody would pay to rent an afternoon. |
| Links | `/articles/the-majority-scare/`, `/articles/the-honest-majority-assumption/` |

Follows the failure class to its cause: shared hashing algorithms create a rentable attack capacity, exchange deposit confirmations create a profit path, and small networks have no defence except changing algorithm or waiting. Argue that these incidents falsified a widely held assumption that proof of work security is absolute rather than relative to the value being protected. Explain what venues did in response, which was to raise confirmation requirements and in some cases delist, and note that this makes exchanges de facto security regulators. The piece must not describe any attack operationally, must not state amounts taken, must not name attackers, and must not rank any chain as secure or insecure today.

#### 2026-11-21 &middot; `bitcoinica-postmortem`

**A Leveraged Trading Site Run by One Person, and How It Ended**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | The Bitcoinica Failure, Taken Apart _(35 chars)_ |
| description | An early margin trading venue failed through a combination of server compromise, unclear ownership and no segregation of customer assets. _(137 chars)_ |
| lede | It offered leverage before it had an accounting system, which is an ordering error with only one outcome. |
| Links | `/articles/hot-wallets-and-the-operational-reality/`, `/articles/the-omnibus-account-problem/`, `/articles/what-an-exchange-actually-is/` |

Follows one failure to its causes, separating the security incident from the deeper problems, which were that customer assets were not segregated, ownership and responsibility were unclear, and the venue offered leveraged products without the risk systems those require. Argue that the security breach is the part everyone remembers and the least important, because a venue with proper segregation survives a breach and this one could not have survived anything. Use it to establish the pattern the rest of this era repeats. The piece must not state loss amounts or customer numbers without a documented source, must not characterise the intent of anyone involved, and must not describe the outcome of any private dispute or settlement that is not public.

#### 2026-11-22 &middot; `dollarised-claims-and-a-moving-asset`

**Why Insolvency Law Struggles With an Asset That Moves While You Wait**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | Insolvency Claims When the Asset Keeps Moving _(45 chars)_ |
| description | Bankruptcy usually fixes claims in currency at a date, which produces strange results when the missing property is not currency. _(128 chars)_ |
| lede | The law wants to freeze the claim in dollars, and the thing that went missing refuses to stay frozen. |
| Links | `/articles/the-decade-long-creditor-process/`, `/articles/mt-gox-in-the-bankruptcy-record/` |

Explains the mechanism generically: why insolvency regimes convert claims to a monetary amount at a fixed date, what that accomplishes for ordinary creditors, and why it produces contested outcomes when the estate holds the same asset the claim was denominated in. Argue that this is a genuine unsolved problem at the boundary between two systems rather than a failure by any court, and that it recurs in every later crypto insolvency on this site. Present the competing positions without endorsing one. The piece must not give legal advice, must not state the rule in any named jurisdiction as settled, must not use any price to illustrate the effect, and must not predict how any pending matter will be resolved.

#### 2026-11-23 &middot; `the-first-proof-of-stake-attempts`

**Proof of Stake Was Proposed Early and the Objections Came Immediately**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | The clone economy |
| seoTitle | The First Proof of Stake Attempts _(33 chars)_ |
| description | Replacing physical cost with holdings was proposed within a few years, along with the nothing at stake objection that took a decade to answer. _(142 chars)_ |
| lede | The alternative to burning electricity was described early, and so was the reason it is hard. |
| Links | `/articles/byzantine-fault-tolerance-plainly/`, `/articles/the-parameter-change-fork/` |

Sequences the early attempts and the objections raised against each in turn, beginning with the core substitution, using ownership rather than expenditure to select who extends the chain, and the objection that a validator with nothing to lose can support multiple histories at once. Argue that the early implementations were partial and dependent on centralised safeguards, and that saying so is not a criticism of the idea but a description of an unfinished one. Set up the later era where the objection is answered by explicit penalties. The piece must not claim any early implementation was secure or insecure without evidence, must not compare energy usage with figures, and must not present either consensus family as superior.

#### 2026-11-24 &middot; `exit-scams-as-market-structure`

**When the Operator Holds the Escrow, Leaving Is Always the Best Final Move**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | Why Escrow Operators Always Have an Exit _(40 chars)_ |
| description | Any market where one party holds everyone's funds in escrow has a built in terminal incentive, and the pattern recurs far outside this context. _(143 chars)_ |
| lede | If one party holds all the escrow, the last move in the game is always available to them. |
| Links | `/articles/escrow-and-reputation-without-law/`, `/articles/the-omnibus-account-problem/` |

Follows this failure class to its incentive structure: escrow accumulates, the operator's expected future revenue is finite, and at some point the pool exceeds it. Argue that this is a design property rather than a moral observation, and that the identical structure appears later in this history in yield platforms, bridges and centralised venues. Commit to the position that any arrangement with this shape should be assumed to have the same terminal incentive regardless of who is running it. The piece must not name any market, service or individual, must not describe amounts, and must not be phrased in a way that reads as guidance about any current platform.

#### 2026-11-25 &middot; `mining-as-an-energy-business`

**At Scale, Mining Is an Energy Trading Business With a Computer Attached**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `profile` |
| Cluster | Mining becomes an industry |
| seoTitle | Mining as an Energy Business _(28 chars)_ |
| description | Once hardware efficiency converges, the only remaining variable is the price and reliability of power, which changes what the business is. _(138 chars)_ |
| lede | When everybody has the same machines, the business is entirely about the electricity contract. |
| Links | `/articles/the-hardware-generations/`, `/articles/the-halving-as-institutional-design/` |

A profile of the large scale miner as an energy trading business: hardware efficiency converges across operators, so competitive advantage collapses onto power procurement, curtailment agreements and location. Argue that this makes large mining an energy business with an unusual load profile, interruptible and location indifferent, which is why it ended up in the specific places it did. Handle the environmental argument by describing what is actually contested, the counterfactual use of the energy involved, rather than repeating either side's summary. The piece must not state energy consumption figures, carbon estimates or power prices, must not claim mining is or is not environmentally harmful, and must not describe any operator's contracts.

#### 2026-11-26 &middot; `proof-of-solvency-before-it-had-a-name`

**Someone Proposed a Way to Prove an Exchange Was Solvent, Years Early**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `primarySource` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | The Early Proposal to Prove Exchange Solvency _(45 chars)_ |
| description | A cryptographic scheme for proving customer liabilities and reserves was described long before the collapses that made everyone want one. _(137 chars)_ |
| lede | The technique existed for years before the industry had any interest in adopting it. |
| Links | `/articles/the-omnibus-account-problem/`, `/articles/what-an-exchange-actually-is/` |

Built around the published proposal itself: committing to a set of customer balances in a way each customer can check, then demonstrating control of assets at least equal to the total, and what that proves and leaves open. Argue that the interesting history is not the cryptography but the adoption failure, since venues had every technical means to demonstrate solvency and almost none did until after the industry had lost the argument. Take the position that voluntary transparency schemes get adopted after the disaster that would have made them useful, every time. The piece must not present any implementation as sufficient, must not name a venue as having verified reserves, and must not describe the technique in a way that suggests it addresses liabilities the venue chooses to omit.

#### 2026-11-27 &middot; `the-trading-bot-allegations`

**The Allegation That Trading on the Venue Was Not All Real**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | The Mt. Gox Trading Bot Allegations _(35 chars)_ |
| description | Independent analyses argued that automated accounts distorted activity on the venue, and the claim remains contested and partly unresolved. _(139 chars)_ |
| lede | Analysts working from leaked trade data argued that a large share of the activity was not what it looked like. |
| Links | `/articles/the-leaked-document-problem/`, `/articles/the-reference-price-problem/`, `/articles/mt-gox-the-halt/` |

Presents a contested claim as contested: what the published analyses argued, what data they relied on, the provenance problems with that data, and which elements were later corroborated by other sources and which were not. Argue that wash trading and self dealing on venues is a real and recurring phenomenon in this industry and that this specific instance is nonetheless not proven to the standard this site uses. Explain why naming the contest is more useful to a reader than a verdict, because the analytical methods involved recur constantly. The piece must not assert the allegations are true, must not name any individual as responsible, must not state volumes or percentages from unauthenticated data, and must not extend the allegation to any other venue.

#### 2026-11-28 &middot; `the-joke-that-did-not-die`

**The Project Launched as a Joke and Still Running**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `profile` |
| Cluster | The clone economy |
| seoTitle | The Joke Project That Never Went Away _(37 chars)_ |
| description | A deliberately unserious clone outlasted almost every serious one, and the reason is a genuine finding about what sustains a network. _(133 chars)_ |
| lede | The least serious project of the era outlived nearly all of the serious ones, which is worth explaining rather than laughing at. |
| Links | `/articles/narrative-as-the-product/`, `/articles/the-parameter-change-fork/` |

A profile of a project and the community around it, arguing that survival in this industry correlates far more strongly with community durability than with technical differentiation, and that this case is the cleanest evidence available. Handle the humour honestly, since the joke framing lowered expectations and removed the pressure to make claims that would later be falsified. Take the position that this is a real finding about network effects rather than an anomaly. The piece must not state any price, market capitalisation or ranking, must not mention any individual endorsement or promotion, must not present the project as an investment in any framing, and must not predict anything about its future.

#### 2026-11-29 &middot; `the-successor-markets`

**Each Takedown Was Followed by Replacements Within Weeks**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | Why Each Takedown Was Followed by Replacements _(46 chars)_ |
| description | Enforcement removed operators and platforms repeatedly without removing the demand, and the replacement cycle is the actual finding. _(132 chars)_ |
| lede | The platforms were removable and the demand was not, which is a distinction enforcement policy took years to absorb. |
| Links | `/articles/the-seizure-and-what-it-proved/`, `/articles/exit-scams-as-market-structure/` |

Sequences the cycle at a structural level, showing that each removal was followed by fragmentation into successors and that the aggregate activity was not obviously reduced by any single action. Argue that this is the strongest available evidence for the proposition that these markets were demand driven rather than platform driven, and that it explains the later shift in enforcement toward the payment and cash out layer. Present the counterargument fairly, that removal imposes real costs and friction even when it does not eliminate activity. The piece must not name any market or individual, must not narrate any offence, must not state activity volumes, and must not evaluate any enforcement policy as effective or ineffective.

#### 2026-11-30 &middot; `the-geographic-migration`

**The Map of Where Mining Happens Has Been Redrawn Repeatedly**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mining becomes an industry |
| seoTitle | How the Mining Map Kept Being Redrawn _(37 chars)_ |
| description | Capacity has concentrated and dispersed across regions in response to power prices and policy, and each move was faster than expected. _(134 chars)_ |
| lede | The industry moved countries faster than most industries move buildings, because the equipment fits in a shipping container. |
| Links | `/articles/mining-as-an-energy-business/`, `/articles/the-hardware-generations/` |

Sequences the major relocations of mining capacity and explains the drivers in each case, cheap or stranded power, policy changes, and the unusual portability of the equipment. Argue that the mobility is the finding: an industry that can relocate on this timescale is very hard to regulate through jurisdiction and very exposed to power markets everywhere it lands. The threshold reading is direct, with regional capacity crossing the line in both directions repeatedly while global capacity barely paused. The piece must not state regional capacity shares without a dated and sourced figure, must not characterise any government's policy motives, and must not predict where capacity will move next.


### December 2026

_31 articles._

#### 2026-12-01 &middot; `the-withdrawal-queue-as-a-signal`

**Withdrawal Delays Are the Only Early Warning Most Users Ever Get**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | Withdrawal Delays as an Early Warning _(37 chars)_ |
| description | Slow withdrawals precede almost every venue failure in this history, and the explanations offered are almost always technical and almost always wrong. _(150 chars)_ |
| lede | The pattern is consistent enough to be boring: withdrawals slow, an explanation is offered, and then withdrawals stop. |
| Links | `/articles/proof-of-solvency-before-it-had-a-name/`, `/articles/the-omnibus-account-problem/` |

Describes the mechanism connecting a liquidity shortfall to a user visible symptom, and catalogues the categories of explanation venues have offered, upgrades, maintenance, banking partners, network congestion, without asserting that any specific instance was dishonest. Argue that the signal is reliable in aggregate and useless individually, because legitimate delays are common and indistinguishable from the other kind at the time. Commit to the position that this asymmetry is the whole problem: the information arrives, and it is not actionable until it is too late. The piece must not identify any current venue as showing this pattern, must not advise a reader to withdraw from anywhere, and must not present the signal as a way to predict a failure.

#### 2026-12-02 &middot; `what-an-audit-would-have-caught`

**What a Real Audit Would Have Found, and Why Nobody Was Doing One**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | What an Exchange Audit Would Have Caught _(40 chars)_ |
| description | Reconciliation between an internal ledger and on chain holdings is routine practice in finance, and it was almost entirely absent here. _(135 chars)_ |
| lede | The gap between the database and the chain is checkable daily by anyone who wants to check it. |
| Links | `/articles/proof-of-solvency-before-it-had-a-name/`, `/articles/mt-gox-in-the-bankruptcy-record/` |

Follows the absence of a basic control to its causes, explaining what reconciliation means operationally, comparing internal customer liabilities against verifiable holdings, and why the exercise is unusually easy for a crypto venue and unusually easy to skip. Argue that the absence of this practice was structural rather than sinister: there was no auditor with relevant competence, no regulator asking, and no customer able to tell. Take the position that the industry's later transparency efforts are a weaker substitute for a control that already existed in every other financial business. The piece must not describe the internal controls of any named venue as fact, must not state what any auditor did or did not do, and must not present any current attestation practice as equivalent to an audit.

#### 2026-12-03 &middot; `tokens-on-top-of-bitcoin`

**Before Anyone Built a New Chain, People Tried Tokens on the Old One**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `primarySource` |
| Cluster | The clone economy |
| seoTitle | The First Attempts at Tokens on Bitcoin _(39 chars)_ |
| description | Early protocols encoded additional assets inside ordinary transactions, and their limitations explain why a new chain was built instead. _(136 chars)_ |
| lede | The first tokens were smuggled into a ledger that had no idea they existed. |
| Links | `/articles/what-the-first-client-actually-did/`, `/articles/the-first-fork-of-the-code/` |

Built around the early specifications for embedding asset data in transactions, explaining what the encoding actually did, why validation had to happen outside consensus, and what that meant for reliability. Argue that these projects deserve more credit than they get, because they proved demand for tokenisation before any purpose built platform existed, and that their technical ceiling is the direct reason the next era happened. Note the first public token sale of this kind as a historically significant fundraising artefact. The piece must not state amounts raised without a verifiable source, must not describe any of these projects' later outcomes as success or failure, and must not paraphrase a specification as though quoting it.

#### 2026-12-04 &middot; `the-shift-to-the-cash-out-layer`

**Enforcement Moved to Where Crypto Touches Banks**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | Why Enforcement Moved to the Cash Out Layer _(43 chars)_ |
| description | The durable pressure point turned out not to be the chain or the platform but the moment holdings convert into ordinary money. _(126 chars)_ |
| lede | The chain is hard to police and the bank account at the end of it is not. |
| Links | `/articles/the-banking-relationship-problem/`, `/articles/chain-analysis-becomes-a-business/`, `/articles/the-successor-markets/` |

Explains the strategic shift: rather than pursuing platforms, obligations were placed on the venues where crypto becomes local currency, which converted exchanges into reporting institutions. Argue that this is the most consequential regulatory decision of the entire period and that it happened quietly, through supervisory expectations rather than through headline legislation. Read it through the threshold: the industry's regulatory perimeter expanded to cover conversion points while the chain itself stayed outside it. The piece must not describe the specific obligations in any jurisdiction as current, must not name any enforcement action, and must not give compliance guidance of any kind to any reader.

#### 2026-12-05 &middot; `hosting-and-the-capital-structure`

**The Business Split Into Machine Owners, Site Operators and Financiers**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `profile` |
| Cluster | Mining becomes an industry |
| seoTitle | How Mining Split Into Three Businesses _(38 chars)_ |
| description | Industrial mining separated into distinct roles with different risks, and most public commentary still treats it as one activity. _(129 chars)_ |
| lede | Owning the machines, running the building and financing either one are three different businesses with three different risks. |
| Links | `/articles/mining-as-an-energy-business/`, `/articles/the-geographic-migration/` |

A profile of the industrial mining operator and the parties around it: hosting providers who sell space, power and management, machine owners who take the revenue risk, and lenders who took collateral in equipment whose value moves with the same variable. Argue that the correlation between the collateral value and the borrower's revenue is the structural weakness, and that it is the same weakness that appears in every crypto lending story later on this site. Keep it descriptive and mechanical. The piece must not name companies, must not state loan terms or amounts, must not describe any bankruptcy, and must not offer any view on mining as a business proposition for a reader.

#### 2026-12-06 &middot; `the-early-exchange-failure-pattern`

**Dozens of Venues Failed in a Few Years, in Four Recognisable Ways**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | How Early Crypto Exchanges Actually Failed _(42 chars)_ |
| description | A sequenced and classified account of venue failures in this era, sorted by mechanism rather than by size or notoriety. _(119 chars)_ |
| lede | The failures look varied until you sort them, and then there are only about four of them. |
| Links | `/articles/bitcoinica-postmortem/`, `/articles/the-withdrawal-queue-as-a-signal/`, `/articles/the-banking-relationship-problem/` |

Sequences the failures of the period and classifies them by mechanism: key compromise, insider misappropriation, insolvency from trading losses, and loss of banking or legal access. Argue that classification is more useful than a list because it shows which mechanisms were addressed by later practice and which were not, and the answer is uncomfortable. Read it through the threshold by noting that the count of operating venues contracted sharply while aggregate activity kept expanding, which is consolidation rather than recovery. The piece must not attribute a failure mechanism to a venue where the cause remains disputed, must not state amounts lost, and must not name individuals in connection with any unproven allegation.

#### 2026-12-07 &middot; `what-we-still-do-not-know`

**The Questions That Are Still Open, Listed Honestly**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | Mt. Gox: The Questions Still Open _(33 chars)_ |
| description | A decade of reporting has left several central questions unresolved, and listing them is more useful than another confident narrative. _(134 chars)_ |
| lede | The confident retellings all agree with each other and none of them agrees with the record. |
| Links | `/articles/the-malleability-explanation-examined/`, `/articles/the-trading-bot-allegations/`, `/articles/the-leaked-document-problem/` |

Enumerates what remains genuinely unresolved: when losses began, how they accumulated, what internal records existed, and how much of the circulating account rests on unauthenticated material. Argue that a history site's most valuable output on a heavily covered subject is a clean statement of the boundary between established and assumed, because everything else is already written. Commit to the position that the popular narrative is more confident than any available source supports and that this is normal in crypto history rather than exceptional. The piece must not resolve any listed question, must not rank the competing accounts by plausibility, and must not name individuals in connection with unproven claims.

#### 2026-12-08 &middot; `coloured-coins-and-the-idea-that-moved`

**Marking Individual Units to Represent Something Else**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | The clone economy |
| seoTitle | Coloured Coins and the Tokenisation Idea _(40 chars)_ |
| description | The proposal to designate specific units as representing an external asset was elegant, limited, and the seed of everything after it. _(133 chars)_ |
| lede | The idea was to agree that certain units stand for something, which works exactly as far as the agreement does. |
| Links | `/articles/tokens-on-top-of-bitcoin/`, `/articles/smart-contracts-before-blockchains/` |

Explains the mechanism and its dependency: the ledger tracks units, the meaning of a unit lives in an off chain agreement, and the whole scheme rests on everyone using the same interpretation software. Argue that this dependency is the permanent problem of tokenising real world assets, unchanged from this era to the present, and that no protocol has ever removed it. Commit to a clear position that the representation problem is legal and institutional rather than technical, which is why it keeps not getting solved. The piece must not claim any current tokenisation scheme has solved custody of an underlying asset, must not give any view on the enforceability of any arrangement, and must not name products.

#### 2026-12-09 &middot; `what-enforcement-learned`

**What Investigators Learned, and What the Industry Learned Back**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `profile` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | What Investigators Learned From the Ledger _(42 chars)_ |
| description | A permanent transaction record turned out to be an investigative asset, and the industry's response reshaped protocol design priorities. _(136 chars)_ |
| lede | The permanence that makes the ledger trustworthy is the same property that makes it evidence. |
| Links | `/articles/chain-analysis-becomes-a-business/`, `/articles/mixers-and-the-privacy-argument/` |

A profile of the financial investigator and the protocol designer as two groups learning from each other: investigators discovered that a complete historical record supports retrospective analysis in a way conventional payments do not, and designers responded by prioritising privacy properties that had previously been an afterthought. Argue that this exchange, rather than any regulation, is what put confidential transactions and zero knowledge work on the roadmap. Present the unresolved tension honestly, because the same properties serve both sides. The piece must not describe investigative techniques operationally, must not reference any specific case or individual, and must not claim any privacy technology defeats analysis.

#### 2026-12-10 &middot; `selling-hash-rate-as-a-product`

**Selling Future Mining Output Instead of Machines**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mining becomes an industry |
| seoTitle | Selling Hash Rate as a Product _(30 chars)_ |
| description | Contracts promising future mining output moved the risk to the buyer and made the seller's obligations very hard for a buyer to verify. _(135 chars)_ |
| lede | A contract for future mining output is a promise about machines the buyer will never see. |
| Links | `/articles/hosting-and-the-capital-structure/`, `/articles/the-preorder-failures/` |

Follows the failure of this product category to its cause: the buyer holds a claim on future output, and the seller's capacity, allocation and costs are all unobservable. Argue that the arrangement is a derivative sold to an audience with no derivatives experience, and that the disputes it produced were about disclosure rather than about mining. Note that later, better regulated versions of the same exposure exist and are structured very differently. The piece must not name any provider, must not describe any specific dispute or proceeding, must not state returns, and must not describe any such contract as worth entering.

#### 2026-12-11 &middot; `why-exchanges-became-the-industry`

**The Protocol Removed the Middleman and the Market Immediately Built a New One**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `explainer` |
| Cluster | Exchanges before exchange was a business |
| seoTitle | Why Exchanges Became the Whole Industry _(39 chars)_ |
| description | A design that eliminated the trusted intermediary produced an industry whose largest firms are trusted intermediaries, and the reason is not hypocrisy. _(151 chars)_ |
| lede | The most centralised businesses in finance were rebuilt on top of the most decentralised ledger, quickly and by popular demand. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/the-early-exchange-failure-pattern/`, `/articles/running-a-node-when-nobody-did/` |

Explains why the intermediary reappeared, covering the genuine difficulties of self custody, the demand for conversion into local currency, the need for a counterparty for leverage, and the ordinary human preference for a password reset. Argue that this is not a betrayal of the design but a demonstration of what the design does and does not address, since it removed the need to trust a settlement operator and did nothing about the need to trust a service provider. Take a clear position that treating exchange centralisation as a moral failure has prevented the industry from engineering around it properly. The piece must not advise any reader on custody, must not name venues, and must not present self custody as safe or unsafe in general terms.

#### 2026-12-12 &middot; `what-mt-gox-changed`

**The Practices That Exist Because of This One Failure**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | Mt. Gox, taken apart |
| seoTitle | What Changed Across the Industry After Mt. Gox _(46 chars)_ |
| description | Cold storage policies, proof of reserves discussion, insurance products and licensing regimes can all be traced to the aftermath of one collapse. _(145 chars)_ |
| lede | A surprising amount of standard industry practice is a direct answer to a single company's failure. |
| Links | `/articles/what-an-audit-would-have-caught/`, `/articles/what-we-still-do-not-know/`, `/articles/why-exchanges-became-the-industry/` |

Sequences the concrete changes that followed, in venue operating practice, in regulatory attention, and in the emergence of custody as a separate business, and assesses honestly which of them addressed the actual failure mechanisms. Argue that the industry adopted the visible fixes, cold storage and public reserve gestures, and left the structural one, the bundling of custody with trading, untouched for another eight years. That is the threshold reading and the setup for the postFtx era of this site. The piece must not claim any specific regulation was enacted in response without a source, must not describe present day practice at any venue, and must not present any of the resulting practices as making a venue safe.

#### 2026-12-13 &middot; `why-most-clones-died`

**Thousands Launched, Almost All Stopped, and the Failures Rhyme**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `timeline` |
| Cluster | The clone economy |
| seoTitle | Why Almost Every Early Altcoin Stopped _(38 chars)_ |
| description | A sequenced and classified account of what actually ends a small chain, which is usually neither an attack nor a bug. _(117 chars)_ |
| lede | Chains rarely die dramatically, they stop having anyone left to run them. |
| Links | `/articles/the-parameter-change-fork/`, `/articles/narrative-as-the-product/`, `/articles/the-asic-resistance-claim/` |

Sequences the rise and disappearance of the clone cohort and classifies the endings: abandonment by the developer, loss of exchange listings, loss of mining support to the point of trivial attack, and simple loss of interest. Argue that the dominant cause is attention rather than technology, which is uncomfortable for an industry that describes itself in engineering terms. The threshold reading is the cleanest on the site, since the number of live chains expanded past any plausible level of demand and then contracted violently without any single event causing it. The piece must not list specific dead projects by name in a way that reads as mockery, must not state how many chains existed at any point, and must not present any surviving project as validated by survival.

#### 2026-12-14 &middot; `the-reputational-inheritance`

**The Industry Spent a Decade Answering for Its First Real Use Case**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Darknet markets and the arrival of law |
| seoTitle | Crypto's First Use Case and Its Long Shadow _(43 chars)_ |
| description | The first sustained real world use of the payment network shaped institutional and public perception for years afterwards, in measurable ways. _(142 chars)_ |
| lede | The first thing a technology is used for tends to define it for everyone who was not paying attention afterwards. |
| Links | `/articles/what-a-darknet-market-was/`, `/articles/the-shift-to-the-cash-out-layer/`, `/articles/the-banking-relationship-problem/` |

Follows a durable cost to its cause, tracing how the early association shaped later institutional caution through bank risk appetite, regulatory framing and the industry's own defensive communication habits. Argue that the association was accurate as history and increasingly inaccurate as a description of usage, and that the industry handled the gap badly by denying the history rather than contextualising it. Take the position that a history site should state the association plainly, because the alternative reads as evasion and is easily falsified. The piece must not quantify illicit usage as a share of activity, since the available estimates are vendor produced and contested, must not name any institution's policy, and must not defend or condemn the industry.

#### 2026-12-15 &middot; `the-decentralisation-metric-problem`

**Nobody Agrees What Would Count as Decentralised**

| | |
| --- | --- |
| Era | `earlyExchange` |
| Kind | `postmortem` |
| Cluster | Mining becomes an industry |
| seoTitle | Nobody Agrees How to Measure Decentralisation _(45 chars)_ |
| description | The industry's central claim has no accepted measurement, and the proxies in common use each measure something convenient instead. _(130 chars)_ |
| lede | The property the whole industry claims is the one property nobody has agreed how to measure. |
| Links | `/articles/mining-pools-and-what-they-centralise/`, `/articles/the-geographic-migration/`, `/articles/what-a-pool-operator-controls/` |

Follows a measurement failure to its causes, taking the common proxies in turn, node counts, pool shares, client diversity, geographic spread and token concentration, and showing what each captures and misses. Argue that the absence of an agreed measure is not an oversight but a convenience, because every participant can select the proxy that flatters them. Commit to the position that decentralisation is a vector rather than a number, and that any single figure quoted for it should be treated as advocacy. The piece must not propose a definitive metric, must not score any network, and must not cite any published index without describing its method and its funder.

#### 2026-12-16 &middot; `what-ethereum-proposed`

**The Proposal Was Not a Better Currency, It Was a Different Question**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | What Ethereum Actually Proposed _(31 chars)_ |
| description | Instead of adding features to a payment ledger, the proposal was a general computer whose state everyone agrees on. _(115 chars)_ |
| lede | The change was to stop asking what else the ledger could record and start asking what it could run. |
| Links | `/articles/coloured-coins-and-the-idea-that-moved/`, `/articles/tokens-on-top-of-bitcoin/`, `/articles/smart-contracts-before-blockchains/` |

States the conceptual shift precisely: from a ledger with special purpose scripts to a general execution environment where the application logic is supplied by whoever deploys it. Argue that the earlier attempts at tokens and coloured coins are the direct evidence of demand for this, which makes the proposal a response to a documented ceiling rather than a leap. Establish the cost of the shift honestly, because a general computer has a much larger surface for both bugs and disagreement. The piece must not present the design as superior to any other, must not state performance characteristics, and must not describe any current version of the network as though it were the launched one.

#### 2026-12-17 &middot; `what-the-dao-actually-was`

**It Was an Investment Club With No Managers and a Withdrawal Mechanism**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The DAO and the fork |
| seoTitle | What The DAO Actually Was _(25 chars)_ |
| description | Stripped of the rhetoric, it pooled contributions, let holders vote on proposals and included a complicated mechanism for leaving. _(130 chars)_ |
| lede | The structure was a pooled fund governed by token holders, with an exit mechanism that turned out to matter more than anything else. |
| Links | `/articles/smart-contracts-before-blockchains/`, `/articles/what-ethereum-proposed/` |

Describes the actual construction: contributions in exchange for governance tokens, proposals voted on by holders, and a splitting mechanism that let a dissenting minority leave with their share. Argue that the splitting mechanism is the part worth understanding, since it is both the most interesting governance idea in the design and the location of the failure. Establish that the ambition was genuine and widely admired at the time, because the retrospective consensus that it was obviously doomed is hindsight. The piece must not state the amount raised or the number of participants without a verified source, must not name individual contributors, and must not characterise anyone's intent.

#### 2026-12-18 &middot; `the-token-standard`

**A Short Interface Specification Created an Entire Asset Class**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The token sale machine |
| seoTitle | The Token Standard That Created an Asset Class _(46 chars)_ |
| description | A handful of function signatures agreed as a convention meant every wallet and exchange could support every new token without custom work. _(138 chars)_ |
| lede | The document that made the token boom possible is a list of about six function names. |
| Links | `/articles/coloured-coins-and-the-idea-that-moved/`, `/articles/what-the-dao-actually-was/`, `/articles/what-ethereum-proposed/` |

Built around the standard as an artefact: what it actually specifies, what it deliberately leaves undefined, and how a voluntary interface convention became the load bearing piece of infrastructure for the next several years. Argue that standardisation, not the virtual machine, is what made the era possible, because it collapsed the integration cost of a new asset to almost zero. Note the specific known weaknesses in the original interface and how later standards addressed them. The piece must not reproduce the specification without it in hand, must not state how many tokens were deployed, and must not describe any token as compliant or non compliant.

#### 2026-12-19 &middot; `the-investment-contract-test`

**The Test Everyone Argues About, Described as a Test**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Regulators arrive |
| seoTitle | The Investment Contract Test, Described _(39 chars)_ |
| description | A decades old analysis for identifying an investment contract became the central question of an industry that had never heard of it. _(132 chars)_ |
| lede | A test written long before any of this was applied to all of it, and the industry learned it the hard way. |
| Links | `/articles/the-token-standard/`, `/articles/what-the-dao-actually-was/`, `/articles/what-ethereum-proposed/` |

Built around the decision that established the framework, read as a document rather than as a slogan: what elements it examines, why it is fact specific, and why that fact dependence is the source of the industry's frustration with it. Argue that the recurring complaint about a lack of clarity is partly a request for a bright line rule that this kind of test structurally cannot provide. Present the industry's counterargument fairly, that fact specific analysis applied through enforcement is a poor way to give notice. The piece must not apply the test to any named asset, must not state that anything is or is not a security, must not give legal advice of any kind, and must not describe the current position of any regulator or court as settled.

#### 2026-12-20 &middot; `the-block-size-constraint`

**A Limit on Block Size Is a Limit on Who Can Verify**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The scaling wars |
| seoTitle | What the Block Size Limit Actually Constrains _(45 chars)_ |
| description | The size of a block determines transaction capacity and also determines the cost of running a node, and those two pull in opposite directions. _(142 chars)_ |
| lede | Every proposal to carry more transactions is also a proposal about how expensive it should be to check them. |
| Links | `/articles/running-a-node-when-nobody-did/`, `/articles/the-decentralisation-metric-problem/` |

Explains the actual trade off: larger blocks carry more transactions and impose higher bandwidth, storage and validation costs on everyone who verifies independently, which affects how many people can. Argue that both sides of the later argument understood this correctly and disagreed about which side of it mattered, and that describing either camp as ignorant is the standard and lazy account. Establish the terms carefully now so the fight itself can be described without re-litigating the technical basics. The piece must not state any specific limit, throughput figure or resource requirement without a source, must not present either position as technically correct, and must not describe current capacity.

#### 2026-12-21 &middot; `reading-the-ethereum-whitepaper`

**Reading the Ethereum Whitepaper as a Design Document**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | Reading the Ethereum Whitepaper Closely _(39 chars)_ |
| description | The document argues from the limitations of existing systems to a specific design, and it names problems it had not solved. _(123 chars)_ |
| lede | The paper spends more time on what was wrong with the alternatives than on what it was proposing. |
| Links | `/articles/what-ethereum-proposed/`, `/articles/reading-the-bitcoin-whitepaper/` |

Works through the document's structure: the critique of scripting limitations, the account and state model it proposes, the fee mechanism, and the section that lists open problems. Argue that the open problems section is the most valuable part for a historian, because it dates precisely what was known to be unsolved and lets a reader check which items were later addressed and which were quietly dropped. Note that the document has been revised over time and that citing it requires naming a version. The piece must not quote the paper without the specific version in hand, must not present later design decisions as though they appeared in the paper, and must not describe the roadmap it sketches as delivered.

#### 2026-12-22 &middot; `code-is-law-as-a-claim`

**The Terms Said the Code Was the Agreement, in Writing**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The DAO and the fork |
| seoTitle | The Claim That the Code Was the Agreement _(41 chars)_ |
| description | Published terms stated that the deployed code governed the arrangement and that other descriptions were merely explanatory, and then it was tested. _(147 chars)_ |
| lede | The published terms said explicitly that the code was the contract, which is a bold thing to write down before an audit. |
| Links | `/articles/what-the-dao-actually-was/`, `/articles/smart-contracts-before-blockchains/` |

Built around the published terms and explanatory materials as artefacts, reading what they actually claimed about the relationship between the code and any other description of the arrangement. Argue that this is the highest quality primary source available on the code is law position, because it is a real contractual assertion rather than a slogan, and the events that followed are the closest thing to a test anyone has run. Handle the outcome with care, since what happened next is contested in its meaning rather than in its facts. The piece must not state whether the terms would be legally enforceable anywhere, must not give any reader legal guidance, and must not quote the terms without the archived document in hand.

#### 2026-12-23 &middot; `why-a-standard-changed-everything`

**Zero Integration Cost Is the Whole Explanation**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The token sale machine |
| seoTitle | Why Zero Integration Cost Changed Everything _(44 chars)_ |
| description | When listing a new asset requires no engineering, the constraint on how many assets exist stops being technical and becomes purely social. _(138 chars)_ |
| lede | Remove the integration cost and the only remaining limit on new assets is how many stories people will believe. |
| Links | `/articles/the-token-standard/`, `/articles/the-parameter-change-fork/` |

Explains the economics of standardisation directly: the marginal cost of supporting one more asset fell to near zero for wallets and venues, which removed the gatekeeping that had previously limited how many assets could exist. Argue that this single change explains the shape of the era better than any account of enthusiasm or greed, and that it is the same mechanism that later produced the equivalent explosion in trading pairs and in collectibles. Read it against the threshold: the count of tradable assets expanded past any level of genuine demand, and the correction was severe. The piece must not state counts of tokens or listings, must not name venues, and must not describe any project as legitimate or otherwise.

#### 2026-12-24 &middot; `reading-the-investigative-report`

**Reading the Report Instead of the Headlines About It**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Regulators arrive |
| seoTitle | Reading the Regulator's Report Directly _(39 chars)_ |
| description | The document is short, specific and narrower than its reputation, and reading it directly corrects several widely repeated claims. _(130 chars)_ |
| lede | The report is a manageable read and almost nobody who cites it has read it. |
| Links | `/articles/the-investment-contract-test/`, `/articles/why-a-standard-changed-everything/`, `/articles/code-is-law-as-a-claim/` |

Works through the document itself: what it investigated, the analysis it set out, the explicit statements about its own scope, and the fact that it announced no enforcement action. Argue that the gap between the document and its reputation is a good measure of how this industry consumes regulatory information, which is through summaries of summaries. Establish the practice this site will follow of citing the filing rather than the coverage. The piece must not summarise the report's holdings without the document in hand, must not extend its analysis to any other asset, must not offer legal guidance, and must not characterise the regulator's intent.

#### 2026-12-25 &middot; `why-the-limit-existed`

**The Limit Was Added Quietly, and the Reason Is Documented**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The scaling wars |
| seoTitle | Why the Block Size Limit Was Added _(34 chars)_ |
| description | The constraint was introduced as an anti spam measure rather than as a monetary policy, and the archived discussion says so. _(124 chars)_ |
| lede | The most fought over number in the industry was introduced without much discussion at all. |
| Links | `/articles/the-block-size-constraint/`, `/articles/the-departure/` |

Built around the archived commit and discussion introducing the constraint, establishing what was actually said about its purpose at the time, which was protection against cheap flooding rather than any long term design intent. Argue that both camps later read intent into this change that the record does not support, one treating it as a temporary measure and the other as a foundational property. Take the position that the record supports neither strong reading and that the argument was always about the future rather than the past. The piece must not paraphrase the archived discussion as a quotation, must not assert the author's intent beyond the archived words, and must not claim the change was or was not controversial at the time without evidence.

#### 2026-12-26 &middot; `the-yellow-paper`

**A Formal Specification Is a Different Kind of Promise**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | The Yellow Paper and Formal Specification _(41 chars)_ |
| description | Publishing a mathematical specification separate from any implementation was unusual and changed what client diversity could mean. _(130 chars)_ |
| lede | A formal specification means a second implementation can be checked against something other than the first implementation. |
| Links | `/articles/reading-the-ethereum-whitepaper/`, `/articles/the-first-alternative-clients/` |

Explains what a formal specification does that prose and code do not: it gives independent implementers a shared reference and makes divergence a detectable error rather than an interpretation. Argue that this decision is the reason multiple independent clients became feasible here in a way they had not elsewhere, and that it is one of the more genuinely important and least discussed choices of the period. Be honest that the specification has lagged the implementation at various points. The piece must not reproduce any formal notation without the document in hand, must not claim the specification is currently complete or current, and must not present formal specification as preventing bugs.

#### 2026-12-27 &middot; `the-reentrancy-bug`

**Reentrancy, Explained by What the Contract Assumed**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The DAO and the fork |
| seoTitle | Reentrancy, Explained Without the Code _(38 chars)_ |
| description | The bug class turns on a contract updating its records after it hands control away, and it has never stopped appearing. _(119 chars)_ |
| lede | The mistake is doing the paperwork after you hand over the money, and it is easy to make. |
| Links | `/articles/what-the-dao-actually-was/`, `/articles/code-is-law-as-a-claim/` |

Makes the mechanism comprehensible without exploitable detail: a contract sends value to another contract, that call can run code, and if the sender has not yet updated its own accounting the call can come back in and be served again. Argue that the underlying error is an ordering assumption that is invisible in ordinary programming because ordinary programs do not hand control to an adversary mid transaction. Note honestly that the bug class had been described publicly before the incident and that the warning existed and was not acted on. The piece must not include working exploit code or a step by step method, must not name individual auditors or developers as at fault, and must not present any mitigation as complete.

#### 2026-12-28 &middot; `the-whitepaper-as-a-genre`

**The Whitepaper Stopped Being a Technical Document and Became a Prospectus**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The token sale machine |
| seoTitle | How the Whitepaper Became a Prospectus _(38 chars)_ |
| description | A format borrowed from engineering was repurposed as a fundraising document without acquiring any of the obligations that go with one. _(134 chars)_ |
| lede | The genre kept the authority of an engineering paper and dropped every duty that a fundraising document carries. |
| Links | `/articles/narrative-as-the-product/`, `/articles/why-a-standard-changed-everything/` |

Follows the corruption of a document format to its causes: the borrowed structure, the appearance of team sections and roadmaps and allocation charts, and the near total absence of the risk disclosure an actual offering document requires. Argue that the form did real persuasive work precisely because it looked like a technical document, and that this is a case study in how presentation substitutes for substance. Take the position that the genre's collapse in credibility was earned and complete. The piece must not name specific projects or quote their documents, must not state amounts raised, must not comment on the legal status of any offering, and must not advise any reader on evaluating such documents.

#### 2026-12-29 &middot; `money-transmission-versus-securities`

**Two Different Regulators Were Asking Two Different Questions**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Regulators arrive |
| seoTitle | Money Transmission Versus Securities Rules _(42 chars)_ |
| description | Payment regulation and securities regulation address different risks, and a business can be squarely inside one and outside the other. _(134 chars)_ |
| lede | The two regimes ask different questions and an industry that conflated them spent years confused about its own obligations. |
| Links | `/articles/the-shift-to-the-cash-out-layer/`, `/articles/the-investment-contract-test/` |

Separates the two frameworks conceptually: one concerned with the movement and safekeeping of value and the risk of illicit finance, the other with the sale of instruments and the disclosure owed to purchasers. Argue that most public argument in the era mixed them, which produced confident claims about legality that were answering the wrong question. Note that the multiplicity of regimes and jurisdictions is itself a structural fact of the industry rather than a temporary state. The piece must not state any jurisdiction's current requirements, must not describe any business as licensed or unlicensed, must not give compliance guidance, and must not name any enforcement action.

#### 2026-12-30 &middot; `the-two-scaling-philosophies`

**Two Coherent Answers to the Same Question**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The scaling wars |
| seoTitle | The Two Scaling Philosophies, Stated Fairly _(43 chars)_ |
| description | Carry more transactions on the base layer, or keep the base layer cheap to verify and build settlement layers above it, and both have costs. _(140 chars)_ |
| lede | The disagreement was never about whether to scale, it was about what to spend to do it. |
| Links | `/articles/the-block-size-constraint/`, `/articles/why-the-limit-existed/` |

States both positions as their proponents would state them, with the strongest version of each and the cost each accepts. Argue that the debate is genuinely a values disagreement about who the system is for, occasional users transacting cheaply or independent verifiers keeping it checkable, and that framing it as a technical dispute made it unresolvable. Commit to the position that the failure to name it as a values disagreement is why it became personal. The piece must not declare either approach correct, must not state fee levels or throughput figures, must not characterise either camp's participants, and must not describe the current state of either approach as vindication.

#### 2026-12-31 &middot; `the-evm-explained`

**The Virtual Machine, Explained Without Any Code**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | The Ethereum Virtual Machine, Explained Plainly _(47 chars)_ |
| description | A deterministic machine that every participant runs identically, with no clock, no network access and no randomness, and each absence is a design choice. _(153 chars)_ |
| lede | Everything the machine cannot do is more informative than everything it can. |
| Links | `/articles/what-ethereum-proposed/`, `/articles/the-yellow-paper/` |

Makes one mechanism comprehensible by explaining the constraints first: determinism, no external input, no time source, no randomness, and why each is required for every participant to reach the same result. Argue that most of the difficulty in this era's applications comes directly from those constraints, since anything that needs outside information needs an oracle and anything that needs randomness needs a scheme. Set up the DeFi era by establishing that the interesting engineering happens at those boundaries. The piece must not state gas costs or opcode specifics without a source, must not describe the machine as unchanged since launch, and must not present any particular execution environment as better.


### January 2027

_31 articles._

#### 2027-01-01 &middot; `the-drain-and-the-week-after`

**The Week Between the Drain and the Decision**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | The DAO and the fork |
| seoTitle | The Week Between the DAO Drain and the Fork _(43 chars)_ |
| description | A sequenced account of the public events between funds beginning to move and the community settling on a response. _(114 chars)_ |
| lede | The most consequential week in the network's history was conducted almost entirely in public, in real time. |
| Links | `/articles/the-reentrancy-bug/`, `/articles/code-is-law-as-a-claim/` |

Sequences the public record: the observation that funds were moving, the delay imposed by the splitting mechanism itself, the proposals floated, the counter proposals, and the narrowing to a decision. Argue that the unusual feature is the delay, since the exit mechanism's own waiting period gave the community a window that almost no financial failure ever gets, and the way that window was used is the actual subject. Note the appearance of a public message claiming to be from the party moving funds and treat its authenticity as unestablished. The piece must not treat any anonymous message as authentic, must not identify the party involved, must not state amounts without a chain verified source, and must not characterise anyone's conduct as criminal.

#### 2027-01-02 &middot; `the-token-sale-mechanics`

**How the Sales Were Actually Structured, Step by Step**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The token sale machine |
| seoTitle | How Token Sales Were Actually Structured _(40 chars)_ |
| description | Caps, tiers, bonus periods, whitelists and gas auctions shaped who got allocation, and each device had a predictable effect. _(124 chars)_ |
| lede | The structure of a sale decided who got in, and almost every structure favoured the same people. |
| Links | `/articles/the-whitepaper-as-a-genre/`, `/articles/why-a-standard-changed-everything/`, `/articles/the-token-standard/` |

Explains the standard mechanisms and what each one actually did: hard and soft caps, early contributor bonuses, whitelisting, and the congestion auctions that decided allocation when demand exceeded capacity. Argue that the recurring outcome, allocation flowing to participants with technical sophistication or private access, was structural rather than accidental, and that the retail participation narrative was largely inverted. Commit to the position that sale design was the least examined and most consequential part of the era. The piece must not describe any sale in a way that reads as instruction, must not state allocation figures or returns, must not name projects, and must not present any structure as fair.

#### 2027-01-03 &middot; `jurisdiction-shopping`

**Incorporating Somewhere Friendly Was the Standard Move, and It Half Worked**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | Regulators arrive |
| seoTitle | Jurisdiction Shopping in the Token Sale Era _(43 chars)_ |
| description | Projects incorporated in accommodating jurisdictions while selling to a global audience, which addresses some exposures and not others. _(135 chars)_ |
| lede | Where the foundation is registered matters less than where the purchasers are, which took the industry a while to absorb. |
| Links | `/articles/money-transmission-versus-securities/`, `/articles/reading-the-investigative-report/`, `/articles/the-investment-contract-test/` |

Follows the failure of a near universal structuring choice to its cause: an entity in a favourable jurisdiction does not determine which other jurisdictions may assert an interest based on where purchasers are located. Argue that this is not a loophole being closed but a straightforward feature of how most financial regulation has always worked, and that the industry's surprise reflected inexperience rather than a change in the rules. Present the legitimate reasons for the same structure alongside the opportunistic ones. The piece must not name jurisdictions as safe or unsafe, must not describe any current legal regime, must not give any structuring guidance, and must not name any entity.

#### 2027-01-04 &middot; `what-segwit-actually-did`

**The Upgrade Was Mostly About Signatures, and Capacity Was a Side Effect**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The scaling wars |
| seoTitle | What the Witness Upgrade Actually Did _(37 chars)_ |
| description | Moving signature data out of the transaction body fixed a longstanding malleability problem and raised effective capacity as a consequence. _(139 chars)_ |
| lede | The headline was capacity and the actual achievement was making transaction identifiers stable. |
| Links | `/articles/transaction-malleability-the-actual-bug/`, `/articles/what-a-soft-fork-actually-is/`, `/articles/the-two-scaling-philosophies/` |

Built around the proposal documents rather than the argument around them: separating signature data from the part of the transaction that determines its identifier, why that eliminates the malleability class, and how the accounting change produces additional effective capacity. Argue that the malleability fix is the more important result and was largely lost in the capacity argument, and that it is what made layered payment channels practical. Connect back to the earlier malleability piece so the reader can see a problem being closed years after it caused damage. The piece must not state capacity multipliers or fee effects, must not describe adoption levels without a source, and must not present the upgrade as having resolved the underlying dispute.

#### 2027-01-05 &middot; `gas-as-a-metering-mechanism`

**Charging for Computation Solves the Halting Problem Commercially**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | Gas: Charging for Computation, Explained _(40 chars)_ |
| description | You cannot know in advance whether a program terminates, so the design charges by the step and stops when the payment runs out. _(127 chars)_ |
| lede | The answer to an unsolvable computer science problem turned out to be a meter. |
| Links | `/articles/the-evm-explained/`, `/articles/the-difficulty-adjustment/` |

Built around the specification's fee schedule as the artefact: an open network cannot allow unbounded computation, cannot determine in advance which programs terminate, and therefore prices each operation and halts when funds are exhausted. Argue that this is an elegant sidestep rather than a solution, and that it converts a computability problem into an economics problem with all the volatility that implies. Note the practical consequences that follow, including failed transactions that still cost the sender. The piece must not state any specific fee levels or gas prices, must not describe the current fee market mechanism as though it were the original one, and must not offer any reader guidance on transaction costs.

#### 2027-01-06 &middot; `the-carbon-vote`

**The Vote That Was Held, and What It Actually Measured**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The DAO and the fork |
| seoTitle | The Carbon Vote and What It Measured _(36 chars)_ |
| description | A rapidly built holder poll was used to gauge sentiment before the fork, and its methodology has been argued about ever since. _(126 chars)_ |
| lede | A poll assembled in days became the closest thing to a mandate, which is worth examining rather than repeating. |
| Links | `/articles/the-drain-and-the-week-after/`, `/articles/rough-consensus-and-running-code/` |

Built around the vote as an artefact: how it worked, what unit it weighted by, what participation it attracted, and therefore what population it actually sampled. Argue that it is the first significant instance of a pattern this site returns to constantly, in which a hastily built measurement becomes the legitimising evidence for a decision that was going to be made anyway. Present the critiques fairly, including that holdings weighted voting measures stake and not agreement. The piece must not state participation figures or results without a source, must not describe the vote as binding or as a mandate, and must not claim it did or did not represent the community.

#### 2027-01-07 &middot; `the-advisor-economy`

**Credibility Was Rented by the Logo**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `profile` |
| Cluster | The token sale machine |
| seoTitle | The Advisor Economy in Token Sales _(34 chars)_ |
| description | Named advisors, partnership announcements and logo walls functioned as borrowed reputation, often with no substantive relationship behind them. _(143 chars)_ |
| lede | A row of familiar logos did more fundraising work than any technical claim. |
| Links | `/articles/the-whitepaper-as-a-genre/`, `/articles/narrative-as-the-product/` |

A profile of the paid advisor as a role in this era: advisory listings compensated in tokens, partnership announcements describing exploratory conversations, and the general absence of any verification path for a reader. Argue that this is a specific and repeatable failure of the information environment rather than a moral failing of individuals, since there was no cost to overstating and no mechanism for correcting. Note the later norms, disclosure of compensation and clearer partnership language, and be honest about how partially they were adopted. The piece must not name any advisor or company, must not state compensation figures, must not describe any relationship as fraudulent, and must not comment on any promotional activity by any named person.

#### 2027-01-08 &middot; `the-restricted-sale-structures`

**The Template That Tried to Split the Sale in Two**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Regulators arrive |
| seoTitle | The Template That Split Token Sales in Two _(42 chars)_ |
| description | A widely circulated instrument tried to separate a private funding round from a later public token delivery, and the reasoning is documented. _(141 chars)_ |
| lede | The idea was to sell a promise to sophisticated purchasers now and deliver a token to everyone later. |
| Links | `/articles/jurisdiction-shopping/`, `/articles/the-investment-contract-test/` |

Built around the published template and the accompanying explanatory paper: what the instrument actually provided for, what analysis it rested on, and the public critiques it attracted almost immediately. Argue that its historical value is as a documented, good faith attempt to reconcile the two regimes, which makes the critiques of it more instructive than the many arrangements that made no attempt at all. Be precise that its approach was contested from the outset and that its use varied widely. The piece must not describe the instrument as effective or ineffective legally, must not give any reader structuring or legal guidance, must not name users of it, and must not quote it without the document in hand.

#### 2027-01-09 &middot; `hashrate-voting-and-why-it-failed`

**Miner Signalling Was Treated as a Vote, and It Is Not One**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The scaling wars |
| seoTitle | Why Miner Signalling Is Not a Vote _(34 chars)_ |
| description | Signalling in blocks was designed as a coordination readiness indicator and was widely reinterpreted as a governance mechanism. _(127 chars)_ |
| lede | A readiness flag became a ballot because people needed something that looked like a ballot. |
| Links | `/articles/what-a-pool-operator-controls/`, `/articles/the-carbon-vote/`, `/articles/what-segwit-actually-did/` |

Follows the failure of a governance mechanism to its cause: signalling was designed to indicate when enough capacity was prepared to enforce a new rule safely, and treating it as consent confused preparation with approval. Argue that the reinterpretation was convenient for everyone involved because there was no legitimate decision procedure and this looked like one, and that the eventual rejection of it was a genuine governance development. Set up the activation fight by making this distinction sharp. The piece must not state signalling percentages or thresholds without a source, must not claim any party signalled in bad faith, and must not present any alternative as a legitimate voting mechanism.

#### 2027-01-10 &middot; `the-state-model-choice`

**Accounts or Coins: A Data Model Choice With Long Consequences**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | Accounts Versus Coins: The Data Model Choice _(44 chars)_ |
| description | Tracking balances per account and tracking individual unspent outputs lead to genuinely different capabilities and different problems. _(134 chars)_ |
| lede | Two ways of writing down who owns what produce two very different systems downstream. |
| Links | `/articles/the-evm-explained/`, `/articles/the-first-transaction-on-chain/` |

Compares the two models plainly: what an unspent output model makes easy, what an account model makes easy, and the specific consequences for privacy, parallel execution, and contract programming. Argue that this is the most consequential technical fork in the industry's design space and that it is usually presented as an implementation detail. Take a position that neither is better in the abstract and that the debate is only meaningful once you name the workload. The piece must not claim either model is more scalable without qualification, must not state throughput figures, and must not describe any chain's current model without checking.

#### 2027-01-11 &middot; `the-fork-decision`

**How a Network With No Decision Procedure Made the Biggest Decision**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The DAO and the fork |
| seoTitle | How the Fork Decision Was Actually Made _(39 chars)_ |
| description | There was no mechanism for deciding this, so one was improvised in days out of clients, miners, exchanges and public argument. _(126 chars)_ |
| lede | Nobody had the authority to make the call, and the call was made anyway, which is worth explaining carefully. |
| Links | `/articles/the-carbon-vote/`, `/articles/the-drain-and-the-week-after/`, `/articles/what-a-hard-fork-actually-is/` |

Follows the decision to its causes: who wrote the code, who released it, who ran it, who chose to point their hash rate at it, and which exchanges assigned which ticker to which chain. Argue that the exchanges' ticker decision was as decisive as any technical step and that this is almost never included in accounts of the fork. Take the position that the episode revealed the real governance of the system, which is a coalition of client maintainers, large miners and large venues, and that this has not changed. The piece must not describe the decision as legitimate or illegitimate, must not name individuals as responsible, must not state vote or hash rate figures without sources, and must not present the outcome as inevitable.

#### 2027-01-12 &middot; `vesting-and-unlock-schedules`

**The Unlock Schedule Is the Part That Determines What Happens Later**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The token sale machine |
| seoTitle | Why Unlock Schedules Determine What Happens _(43 chars)_ |
| description | Who can sell, and when, is written into the allocation at launch, and this single fact governs most of a token's subsequent behaviour. _(134 chars)_ |
| lede | The schedule of who is allowed to sell is decided before launch and explains most of what happens after it. |
| Links | `/articles/the-token-sale-mechanics/`, `/articles/the-premine-question/` |

Explains the mechanics of lockups, cliffs and linear release, and the structural consequence that a token with a large locked allocation has a supply overhang known to insiders and opaque to everyone else. Argue that the information asymmetry here is the sharpest in the entire industry, because the schedule is often published and almost never read, and that this makes it a good example of transparency without comprehension. Keep it entirely structural. The piece must not analyse or reference any specific token's schedule, must not describe price effects with figures, must not tell a reader what to look for as a signal to act on, and must not be phrased as evaluation guidance.

#### 2027-01-13 &middot; `disclosure-was-the-actual-issue`

**Strip Out the Labels and the Complaint Was Always About Disclosure**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | Regulators arrive |
| seoTitle | Why the Real Issue Was Always Disclosure _(40 chars)_ |
| description | Beneath the argument over classification sits a simpler question about what purchasers were told, and that question has an uncomfortable answer. _(144 chars)_ |
| lede | Whatever the correct label, the purchasers were told very little, and that is checkable. |
| Links | `/articles/the-whitepaper-as-a-genre/`, `/articles/the-investment-contract-test/`, `/articles/vesting-and-unlock-schedules/` |

Follows the era's harm to the failure that actually produced it, arguing that the classification debate absorbed the attention while the substantive issue, what a purchaser was told about allocation, control, risk and use of proceeds, was rarely argued because the answer was not in dispute. Show that securities regulation is largely a disclosure regime rather than a permission regime, which reframes the industry's complaint. Commit to a clear position that voluntary disclosure standards were available throughout and were adopted by very few. The piece must not state what disclosure any jurisdiction requires, must not evaluate any project's disclosures, must not give legal guidance, and must not name projects or individuals.

#### 2027-01-14 &middot; `the-agreement-between-companies`

**A Group of Companies Signed an Agreement About a Protocol They Did Not Own**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The scaling wars |
| seoTitle | When Companies Signed a Protocol Agreement _(42 chars)_ |
| description | A private agreement among businesses proposed a two part upgrade path, and the reaction to it defined the governance question sharply. _(134 chars)_ |
| lede | A document signed in a room by companies proposed to settle a public protocol's future. |
| Links | `/articles/hashrate-voting-and-why-it-failed/`, `/articles/the-two-scaling-philosophies/` |

Built around the agreement as an artefact: what it actually committed its signatories to, who signed, and the specific objection raised against it, which was that the parties had no standing to decide. Argue that this document is the clearest available statement of the industry capture question, and that the reaction to it, rather than its content, is what settled the matter. Present both readings, that it was a pragmatic attempt to end a deadlock and that it was a cartel decision, without adjudicating. The piece must not quote the agreement without the archived text, must not characterise signatories' motives, must not state the outcome as a moral verdict, and must not name individuals.

#### 2027-01-15 &middot; `the-ether-presale`

**The Presale Documents Are the Template Everything Copied**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | The Ether Presale as a Fundraising Template _(43 chars)_ |
| description | The published terms of the initial sale established the format, the disclosures and the legal posture that hundreds of later sales imitated. _(140 chars)_ |
| lede | The terms document for this one sale is the most copied legal artefact in crypto. |
| Links | `/articles/reading-the-ethereum-whitepaper/`, `/articles/tokens-on-top-of-bitcoin/` |

Built around the published sale terms and accompanying materials: what was actually offered, what disclaimers were made, how proceeds were described and what jurisdictional posture was taken. Argue that reading it now is uncomfortable and instructive, because the caution in the original documents was progressively discarded by imitators who kept the format and dropped the warnings. Treat it as a primary source rather than as an origin myth. The piece must not state amounts raised or purchaser numbers without a verified source, must not characterise the legal validity of any term, must not give any reader legal or financial guidance, and must not quote the documents without them in hand.

#### 2027-01-16 &middot; `the-minority-chain`

**The Chain That Did Not Fork Kept Running, Which Surprised Nearly Everyone**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | The DAO and the fork |
| seoTitle | The Minority Chain That Kept Running _(36 chars)_ |
| description | The unmodified chain was expected to die within weeks and did not, establishing that a minority chain can persist indefinitely. _(127 chars)_ |
| lede | The assumption was that the old chain would be abandoned in days, and it simply was not. |
| Links | `/articles/the-fork-decision/`, `/articles/what-a-hard-fork-actually-is/` |

Sequences what happened to the unforked chain: continued mining, exchange listings, a distinct community, and the establishment of a durable second asset. Argue that this outcome permanently changed how every later fork was understood, because it proved that a split produces two assets rather than one winner and turned forking into an economic event with its own incentives. Note the practical chaos that followed, including replay issues and the confusion over which chain any given tool was talking to. The piece must not state market values or hash rate for either chain, must not describe either chain as the legitimate one, and must not characterise either community.

#### 2027-01-17 &middot; `the-listing-relationship`

**Exchanges Became the Real Gatekeepers, and Charged Accordingly**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `profile` |
| Cluster | The token sale machine |
| seoTitle | How Exchange Listings Became the Gate _(37 chars)_ |
| description | A token without a venue is not tradable, which made listing decisions the most valuable and least transparent decisions in the market. _(134 chars)_ |
| lede | The venue decides whether an asset exists in practice, which is an enormous amount of power to hold quietly. |
| Links | `/articles/why-exchanges-became-the-industry/`, `/articles/why-a-standard-changed-everything/` |

A profile of the exchange as gatekeeper: a listing converts an issued token into a tradable asset, the criteria were rarely published, and the position created an obvious commercial opportunity. Argue that this recreated, without any of the accompanying rules, the gatekeeping function that listing venues perform in regulated markets, and that the absence of published standards is the difference that matters. Connect back to the earlier era's point that exchanges became the industry. The piece must not allege that any venue charged for listings or acted improperly, must not name venues, must not state fees, and must not describe any current listing process.

#### 2027-01-18 &middot; `the-first-enforcement-wave`

**Enforcement Arrived Late, Selectively, and in a Recognisable Order**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | Regulators arrive |
| seoTitle | How the First Enforcement Wave Unfolded _(39 chars)_ |
| description | Actions arrived years after the conduct, focused on identifiable categories first, and the sequencing tells you what was practical to pursue. _(141 chars)_ |
| lede | The order in which cases were brought says more about capacity than about severity. |
| Links | `/articles/disclosure-was-the-actual-issue/`, `/articles/the-restricted-sale-structures/`, `/articles/jurisdiction-shopping/` |

Sequences enforcement activity at a categorical level: the earliest matters involved outright misrepresentation, the later ones involved classification, and the gap reflects evidentiary difficulty rather than a change of view. Argue that the lag between conduct and consequence, measured in years, is a permanent feature of financial enforcement and one the industry consistently misreads as approval. Read the threshold plainly, since regulatory tolerance contracted long after market activity had already collapsed. The piece must not name any case, defendant, settlement or penalty, must not describe the merits of any matter, must not state amounts, and must not predict any outcome.

#### 2027-01-19 &middot; `the-user-activated-approach`

**The Counter Move Was to Say That Users Enforce the Rules**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The scaling wars |
| seoTitle | The User Activated Approach, Explained _(38 chars)_ |
| description | A strategy in which economically important nodes commit to enforcing a rule regardless of miner support, and what makes it work or not. _(135 chars)_ |
| lede | The counter argument was that miners produce blocks and users decide which blocks count. |
| Links | `/articles/hashrate-voting-and-why-it-failed/`, `/articles/the-agreement-between-companies/` |

Built around the proposal document that set out the approach and the commitments published around it: enough economically significant participants must credibly commit in advance, and the credibility of that commitment is what does the work, not the code. Argue that this was a genuinely novel governance manoeuvre and also an extremely dangerous one, since a failed commitment produces a split, and that its success does not establish that it would work again. Note that the counterfactual is unknowable, which is precisely why both sides claim vindication. The piece must not present this as a general purpose tool for readers or communities, must not state participation figures, must not claim it caused any specific outcome, and must not describe it as settled practice.

#### 2027-01-20 &middot; `the-foundation-question`

**A Foundation Sitting Beside a Protocol Is an Unresolved Arrangement**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `profile` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | The Foundation Problem in Protocol Governance _(45 chars)_ |
| description | A non profit entity that funds development but does not control consensus occupies a position with no clean precedent and recurring criticism. _(142 chars)_ |
| lede | The entity has money and legitimacy and no formal authority, which is a genuinely strange thing to be. |
| Links | `/articles/who-pays-the-developers/`, `/articles/the-ether-presale/`, `/articles/maintainers-not-owners/` |

A profile of the protocol foundation as an institutional form: it can fund, publish, convene and signal, and it cannot compel anyone to run anything. Argue that this ambiguity is permanent rather than transitional, that it recurs across nearly every large protocol in this history, and that both the criticism of foundation influence and the defence of it are describing the same facts. Present the recurring conflict honestly without adjudicating. The piece must not describe any foundation's current funding, holdings, personnel or governance without a published source, must not attribute decisions to individuals, and must not characterise any foundation as controlling or not controlling a network.

#### 2027-01-21 &middot; `replay-and-split-mechanics`

**After a Split, Your Transaction Can Happen Twice**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The DAO and the fork |
| seoTitle | Replay Attacks After a Chain Split _(34 chars)_ |
| description | A transaction valid on both chains can be rebroadcast on the other one, and the fixes for this were retrofitted rather than designed. _(133 chars)_ |
| lede | If the two chains accept the same signed transaction, sending on one can move funds on both. |
| Links | `/articles/the-minority-chain/`, `/articles/what-a-hard-fork-actually-is/` |

Explains the mechanism plainly and then explains the class of fixes, which is to make the two chains reject each other's transactions by including a chain identifier in what gets signed. Argue that the retrofitting is the historically interesting part, since the need was obvious in advance to anyone who thought about it and was addressed only under pressure. Note that later splits handled this with varying competence and that the variation is a useful measure of preparation. The piece must not give operational instructions relevant to any split, must not state losses attributed to replay, and must not claim any specific split had or lacked protection without checking.

#### 2027-01-22 &middot; `the-airdrop`

**Giving Tokens Away Solves Distribution and Creates Everything Else**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `profile` |
| Cluster | The token sale machine |
| seoTitle | The Airdrop: What It Solves and Creates _(39 chars)_ |
| description | Free distribution answers the cold start problem and immediately produces recipients with no attachment and an incentive to sell. _(129 chars)_ |
| lede | Handing tokens to strangers produces holders instantly and produces sellers just as fast. |
| Links | `/articles/faucets-and-the-distribution-problem/`, `/articles/the-token-sale-mechanics/` |

A profile of the airdrop recipient as a population, and of the trade offs in creating one: distribution without a sale sidesteps some fundraising problems, creates a user base by construction, and produces holders whose acquisition cost is zero. Argue that the technique's later refinements, eligibility criteria based on prior usage, are attempts to buy alignment that mostly produced sophisticated gaming instead. Connect it back to the early faucets to show the same idea arriving with a much larger budget and much worse incentives. The piece must not name any airdrop, must not state values received, must not describe eligibility strategies, and must not be written in a way any reader could act on.

#### 2027-01-23 &middot; `why-enforcement-was-slow`

**The Delay Was Structural, Not Permission**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Regulators arrive |
| seoTitle | Why Regulatory Enforcement Took So Long _(39 chars)_ |
| description | Investigations take years, jurisdictions overlap, evidence is technical and international, and none of that delay implies approval. _(131 chars)_ |
| lede | Silence from a regulator is a resourcing fact, and the industry read it as a verdict. |
| Links | `/articles/the-first-enforcement-wave/`, `/articles/money-transmission-versus-securities/` |

Explains the operational reality of enforcement: opening an investigation, gathering evidence across borders, technical analysis, internal approval, and the option to settle, all of which take years by design. Argue that the industry's habit of treating an absence of action as tacit approval is one of the most costly recurring errors on this site, because it encouraged conduct that was later addressed. Take a clear position that the delay was predictable to anyone with experience of any regulated industry. The piece must not describe any agency's internal process without a published source, must not name matters, must not state timelines as rules, and must not offer any reader guidance about their own exposure.

#### 2027-01-24 &middot; `the-fork-that-happened`

**The Split That Followed, Sequenced Without the Partisanship**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | The scaling wars |
| seoTitle | The Scaling Split, Sequenced Neutrally _(38 chars)_ |
| description | A chain split occurred, both chains persisted, and the sequence of events is documented well enough to describe without taking a side. _(134 chars)_ |
| lede | The disagreement ended the way these disagreements end, with two chains and two communities. |
| Links | `/articles/the-user-activated-approach/`, `/articles/the-minority-chain/`, `/articles/replay-and-split-mechanics/` |

Sequences the split at a procedural level: the divergence in rules, the handling of the split by venues and wallets, the replay protection situation, and the establishment of two distinct networks. Argue that the outcome demonstrates the same lesson as the earlier fork, which is that splitting is now a normal available option rather than a catastrophe, and that this changes the negotiating position of every minority in every future dispute. Keep the account strictly procedural. The piece must not describe either chain as legitimate, must not state hash rate, price or adoption for either, must not characterise either community, and must not use partisan naming conventions.

#### 2027-01-25 &middot; `shipping-something-unfinished`

**The Network Launched Explicitly Labelled as Not Ready**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | Launching a Network Labelled Not Ready _(38 chars)_ |
| description | The first release was published with warnings about its own maturity, and people used it for real value immediately anyway. _(123 chars)_ |
| lede | The launch materials said this is experimental, and within weeks real money was on it. |
| Links | `/articles/the-ether-presale/`, `/articles/the-yellow-paper/` |

Sequences the launch phases and the accompanying communications, focusing on the gap between the stated maturity of the software and the actual use it received. Argue that this gap is the defining condition of the entire era and that it recurs at every layer of the stack, since a public network cannot stop people from using it as soon as it works at all. Take the position that warnings are not a control and that treating them as one has caused real harm across this history. The piece must not describe the phases inaccurately or state dates without a source, must not quantify usage at launch, and must not present any warning as having discharged anyone's responsibility.

#### 2027-01-26 &middot; `code-is-law-after-the-fork`

**What Survived of Code Is Law, and What Replaced It**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The DAO and the fork |
| seoTitle | What Survived of Code Is Law _(28 chars)_ |
| description | The strong version of the claim did not survive the fork, and the weaker versions that replaced it are rarely stated as clearly. _(128 chars)_ |
| lede | The absolute version of the claim was tested once and abandoned, and nothing precise took its place. |
| Links | `/articles/code-is-law-as-a-claim/`, `/articles/the-fork-decision/`, `/articles/the-value-overflow-incident/` |

Traces the position before and after: an absolute claim that deployed code defines the arrangement, followed by a range of weaker claims about defaults, expectations and the cost of intervention. Argue that the weaker versions are actually more defensible and much less useful for marketing, which is why they were adopted quietly rather than announced. Commit to a position that the honest formulation is that intervention is possible, expensive and socially constrained, and that saying so is stronger than pretending it is impossible. The piece must not claim the fork proved the claim false as a matter of law, must not offer any view on contract enforceability, and must not characterise either camp's arguments as bad faith.

#### 2027-01-27 &middot; `the-utility-token-theory`

**The Argument That These Were Not Investments, Examined**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The token sale machine |
| seoTitle | The Utility Token Argument, Examined _(36 chars)_ |
| description | Projects argued their tokens were access rights rather than investments, and the structure of that argument is worth understanding on its own. _(142 chars)_ |
| lede | The claim was that you were buying a ticket rather than a stake, and the ticket usually had nothing to admit you to yet. |
| Links | `/articles/the-whitepaper-as-a-genre/`, `/articles/the-airdrop/`, `/articles/the-listing-relationship/` |

Follows the failure of a legal theory to its causes, setting out the argument as its proponents made it, that a token bought for future access is a prepayment rather than an investment, and then the objections it could not answer. Argue that the practical weakness was empirical rather than theoretical: most tokens were purchased before any service existed, by people who never used the service, and traded on venues that priced them as investments. Present the contest and name who is on each side. The piece must not state whether any token is a security in any jurisdiction, must not give legal guidance, must not name projects, and must not predict any regulatory outcome.

#### 2027-01-28 &middot; `the-accommodating-jurisdictions`

**Some Regulators Published Frameworks Instead of Waiting**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | Regulators arrive |
| seoTitle | The Regulators Who Published Frameworks Early _(45 chars)_ |
| description | A handful of jurisdictions responded with published classification guidance, which produced clarity, competition and a set of new problems. _(139 chars)_ |
| lede | A few regulators wrote down how they would analyse these things, which turned out to be its own experiment. |
| Links | `/articles/jurisdiction-shopping/`, `/articles/disclosure-was-the-actual-issue/` |

Follows the partial failure of early published guidance to its cause, describing what such guidance can and cannot deliver and the competitive dynamic it created between financial centres. Argue that published frameworks solved the notice problem and created a substitution problem, since projects tailored their documents to the framework without changing what they were doing. Present the outcome honestly as mixed rather than as a model. The piece must not describe any jurisdiction's current rules, must not name jurisdictions as recommended, must not give any structuring or legal guidance, and must not claim any framework prevented harm.

#### 2027-01-29 &middot; `the-second-split`

**The Chain That Split Then Split Again**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | The scaling wars |
| seoTitle | When the Split Chain Split Again _(32 chars)_ |
| description | A subsequent disagreement produced a further division, which is informative about whether splitting resolves anything. _(118 chars)_ |
| lede | The chain created by a split had a split of its own, which is the part worth thinking about. |
| Links | `/articles/the-fork-that-happened/`, `/articles/what-a-hard-fork-actually-is/` |

Sequences the second division and uses it to test a claim made during the first, that splitting lets each group pursue its vision without further conflict. Argue that the evidence suggests splitting resolves a specific disagreement and does nothing about the underlying absence of a decision procedure, so the next disagreement takes the same course. Note the practical consequences for users and venues, including the hash rate contest that accompanied it. The piece must not describe any chain as the real one, must not state market or capacity figures, must not characterise participants, and must not describe any current status.

#### 2027-01-30 &middot; `the-scheduled-upgrade-model`

**Planned Breaking Changes as a Normal Way to Run a Network**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | Scheduled Hard Forks as Normal Practice _(39 chars)_ |
| description | One network normalised coordinated breaking upgrades on a schedule, while another treated them as a last resort, and both positions are coherent. _(145 chars)_ |
| lede | One community treats a coordinated breaking change as routine maintenance and another treats it as a constitutional crisis. |
| Links | `/articles/what-a-hard-fork-actually-is/`, `/articles/shipping-something-unfinished/` |

Sequences how two upgrade cultures diverged and hardened: routine coordinated changes buy the ability to fix and improve, and the reluctance to make them buys credibility that the rules will not move. Argue that the difference is not technical competence but a genuine disagreement about what property is being sold to users, and that both communities are internally consistent. Set up the scaling wars by establishing the disagreement clearly before it becomes a fight. The piece must not present either culture as correct, must not list upgrade names or dates without a source, and must not claim any upgrade delivered what it promised without evidence.

#### 2027-01-31 &middot; `the-regulatory-report-that-followed`

**A Regulator Published an Analysis of the Whole Arrangement**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | The DAO and the fork |
| seoTitle | The Regulatory Report on The DAO _(32 chars)_ |
| description | An investigative report set out how existing securities analysis applied to a token sale, and it functioned as the industry's first clear notice. _(145 chars)_ |
| lede | The report answered a question the industry had been carefully not asking. |
| Links | `/articles/what-the-dao-actually-was/`, `/articles/the-ether-presale/` |

Built around the report as a document: what it examined, what analytical framework it applied, what conclusion it stated and, importantly, what action it did and did not take. Argue that its significance is as notice rather than as enforcement, since it told every subsequent project what analysis to expect while leaving the outcome of any particular case open. Note that a great deal of subsequent industry structuring was designed around this document, which makes reading it directly more useful than reading commentary about it. The piece must not summarise the report's conclusions without the document in hand, must not state that any specific token is or is not a security, must not offer legal guidance, and must not describe the current position of any regulator.


### February 2027

_28 articles._

#### 2027-02-01 &middot; `what-happened-to-the-money`

**Projects Raised in a Volatile Asset and Spent in Local Currency**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The token sale machine |
| seoTitle | Why Project Treasuries Were So Fragile _(38 chars)_ |
| description | Treasuries held in the same asset the market was pricing them against created a correlation that turned a downturn into an operating crisis. _(140 chars)_ |
| lede | Raising in a volatile asset and paying salaries in local currency is a treasury problem nobody was staffed for. |
| Links | `/articles/the-token-sale-mechanics/`, `/articles/the-banking-relationship-problem/` |

Follows the quiet failure of many projects to its cause: funds raised in a volatile asset, operating costs denominated in ordinary currency, and no hedging capability or mandate, so a market decline is simultaneously a revenue and a runway event. Argue that this correlation, and not fraud, ended a substantial number of projects that were otherwise doing what they said, and that this part of the story is consistently omitted. Note that the projects that converted early were criticised for it at the time. The piece must not name projects, must not state treasury sizes or losses, must not describe any treasury strategy as correct, and must not offer any reader guidance on holding or converting anything.

#### 2027-02-02 &middot; `the-listing-decision-as-regulation`

**Venues Ended Up Making Regulatory Decisions Without Any Mandate**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Regulators arrive |
| seoTitle | How Exchanges Became Accidental Regulators _(42 chars)_ |
| description | When venues decide what to list and what to remove, they perform a gatekeeping function that belongs to regulators elsewhere. _(125 chars)_ |
| lede | The most consequential regulatory decisions of the era were made by commercial venues protecting themselves. |
| Links | `/articles/the-listing-relationship/`, `/articles/why-enforcement-was-slow/` |

Explains how listing and delisting decisions came to function as de facto regulation, driven by venues' own legal exposure rather than by any public standard, and what that produces: inconsistency across venues, no appeal, and criteria that are commercial rather than protective. Argue that this arrangement gives the industry the worst of both worlds, gatekeeping without accountability, and that it has persisted because no participant has an interest in changing it. Connect back to the listing relationship as a commercial matter. The piece must not name venues or delisting events, must not allege improper conduct, must not describe present day listing standards, and must not advise readers.

#### 2027-02-03 &middot; `the-social-layer-fight`

**The Argument Was Conducted in Forums Nobody Neutral Was Running**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The scaling wars |
| seoTitle | The Scaling Fight and Its Moderated Forums _(42 chars)_ |
| description | Moderation policy on the venues where the debate happened became part of the debate, with consequences for what the record now shows. _(133 chars)_ |
| lede | Where the argument happened shaped the argument, and both sides were right about that. |
| Links | `/articles/the-governance-venue-moved/`, `/articles/the-two-scaling-philosophies/` |

Follows the breakdown of the debate to its cause: privately operated forums with their own policies became the main channel, moderation decisions were read as suppression, and participants migrated to venues that agreed with them. Argue that this produced two separated information environments that could not correct each other, which is a mechanism worth naming because it recurs everywhere since. Connect back to the earlier piece on how governance venues shape governance. The piece must not describe any specific moderation decision or name moderators, must not claim either side was suppressed, must not quote posts without archives, and must not characterise either community.

#### 2027-02-04 &middot; `the-difficulty-bomb`

**A Deadline Written Into the Protocol Itself**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `primarySource` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | The Difficulty Bomb: A Deadline in Code _(39 chars)_ |
| description | A mechanism designed to make the network progressively unusable was included deliberately, to force a future upgrade nobody could postpone forever. _(147 chars)_ |
| lede | The protocol contained a slowly tightening screw whose only purpose was to make delay expensive. |
| Links | `/articles/the-scheduled-upgrade-model/`, `/articles/the-first-proof-of-stake-attempts/` |

Built around the proposal that introduced the mechanism and the reasoning published with it: a scheduled degradation forces a coordination decision that would otherwise be deferred indefinitely by people with different interests. Argue that this is one of the very few genuine governance inventions in this history, an attempt to bind a future community to act, and that its repeated postponement is equally informative about how well such commitments hold. Take the position that the mechanism half worked, which is more than most governance devices manage. The piece must not state the mechanism's parameters or any postponement dates without a source, must not claim it was decisive in any transition, and must not describe its current status without checking.

#### 2027-02-05 &middot; `the-audit-industry-that-followed`

**An Entire Security Industry Grew Out of One Bug**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `profile` |
| Cluster | The DAO and the fork |
| seoTitle | The Audit Industry That Grew From One Bug _(41 chars)_ |
| description | Contract auditing became a profession in the years after, along with the recurring question of what an audit actually promises. _(127 chars)_ |
| lede | The industry that reviews contract code exists because of one very expensive ordering mistake. |
| Links | `/articles/the-reentrancy-bug/`, `/articles/the-regulatory-report-that-followed/`, `/articles/code-is-law-after-the-fork/` |

A profile of the contract auditor as a new profession: the first firms, the standardisation of report formats, the bug bounty norms, and the persistent gap between what buyers think an audit certifies and what the reports actually say. Argue that the audit became a marketing artefact faster than it became a control, which is why audited contracts kept failing throughout the next era. Take a clear position that a time boxed review of a codebase is a useful input and never a guarantee, and that the industry's language obscured this deliberately. The piece must not name firms, must not describe any specific audit as good or bad, must not state failure rates, and must not present any audited system as safe.

#### 2027-02-06 &middot; `the-projects-that-shipped`

**Some of Them Actually Built the Thing**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | The token sale machine |
| seoTitle | The Token Sale Projects That Actually Shipped _(45 chars)_ |
| description | A sequenced and honest account of the minority of projects from this period that delivered working systems still in use. _(120 chars)_ |
| lede | The era is remembered as uniformly worthless, and that is not what the record shows. |
| Links | `/articles/what-happened-to-the-money/`, `/articles/the-whitepaper-as-a-genre/` |

Sequences the period from the other direction, identifying categories of project that produced systems still operating, and being precise about what shipped versus what was promised. Argue that a history that treats the entire era as fraud is as unreliable as the promotional material it is reacting against, and that the interesting question is what distinguished the builders, which was usually a working prototype before the sale. Commit to that finding and state its limits, since survivorship makes this hard to establish rigorously. The piece must not name specific projects as successes in a way that reads as endorsement, must not state any current status, valuation or usage figures, and must not recommend anything.

#### 2027-02-07 &middot; `the-clarity-that-never-came`

**Every Year Someone Announced That Clarity Was Coming**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | Regulators arrive |
| seoTitle | The Regulatory Clarity That Kept Not Arriving _(45 chars)_ |
| description | Proposed frameworks, safe harbour concepts and draft rules were announced repeatedly across this period without producing a settled position. _(141 chars)_ |
| lede | The phrase regulatory clarity has been six months away for most of this industry's existence. |
| Links | `/articles/why-enforcement-was-slow/`, `/articles/the-accommodating-jurisdictions/` |

Sequences the recurring announcements of forthcoming frameworks and safe harbour proposals at a structural level, without asserting the status of any specific one, and asks why the pattern repeats. Argue that the demand and the supply are mismatched, because the industry wants a categorical rule and the institutions involved produce fact specific analysis and negotiated positions. Take the position that planning around imminent clarity has been a reliably bad assumption for over a decade. The piece must not state the current status of any proposal or rule, must not name legislation, must not predict any outcome, and must not tell a reader what any rule will require.

#### 2027-02-08 &middot; `the-layered-answer`

**The Layered Approach Took Years and Changed What the Question Was**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The scaling wars |
| seoTitle | The Layered Scaling Answer, Explained _(37 chars)_ |
| description | Payment channels move most activity off the base layer and settle occasionally, which trades one set of properties for another. _(127 chars)_ |
| lede | The answer that won the argument took years to build and does not do what the base layer does. |
| Links | `/articles/what-segwit-actually-did/`, `/articles/the-two-scaling-philosophies/` |

Explains the mechanism: two parties open a channel, transact between themselves without publishing, and settle a final state, with routing letting payments traverse channels they did not open. Argue honestly about what is given up, including liquidity management, online requirements and a different failure model, and about what is gained. Take the position that describing this as scaling understates how different it is, since it is a different product with different guarantees. The piece must not state capacity, fee or adoption figures, must not present the approach as complete or as having resolved the dispute, and must not advise any reader to use anything.

#### 2027-02-09 &middot; `the-language-choice`

**The Contract Language Made Some Mistakes Very Easy to Make**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | How the Contract Language Shaped the Bugs _(41 chars)_ |
| description | A language designed to feel familiar to web developers inherited defaults that turned out to be dangerous in an adversarial setting. _(132 chars)_ |
| lede | The language was made easy to pick up, and that is exactly how it went wrong. |
| Links | `/articles/the-evm-explained/`, `/articles/smart-contracts-before-blockchains/` |

Follows a class of expensive bugs back to design decisions in the language, familiar syntax, implicit behaviours and defaults favouring convenience, in an environment where every deployed program is permanently exposed to a motivated adversary with the source. Argue that the resulting bug classes were not developer carelessness but a predictable consequence of importing ordinary programming ergonomics into a setting with no patching and no undo. Note the later languages and tooling that responded to this and be careful not to claim they solved it. The piece must not present any language or tool as safe, must not include exploitable code, and must not blame named developers for any incident.

#### 2027-02-10 &middot; `what-the-fork-precedent-established`

**The Precedent Was Not About Refunds, It Was About Who Can Act**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The DAO and the fork |
| seoTitle | The Real Precedent Set by the DAO Fork _(38 chars)_ |
| description | The lasting consequence is a demonstrated procedure for intervention, and every later crisis has been argued against that template. _(131 chars)_ |
| lede | The fork established that intervention is available, which changed every subsequent argument about whether to use it. |
| Links | `/articles/the-fork-decision/`, `/articles/code-is-law-after-the-fork/`, `/articles/the-value-overflow-incident/` |

Argues that the precedent people cite, that losses can be reversed, is the less important one, and that the durable precedent is procedural: a coalition of maintainers, miners and venues can change the rules in days when sufficiently motivated. Show how this template has been invoked and declined in later incidents, and that the declining is as informative as the doing. Connect back to the value overflow incident to establish that this was a rediscovery rather than an invention. The piece must not claim any specific later incident should or should not have been reversed, must not describe any current network's willingness to intervene, and must not present intervention as available to any reader.

#### 2027-02-11 &middot; `the-exit-pattern`

**The Failure Pattern Was Consistent Enough to Describe Generically**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The token sale machine |
| seoTitle | The Consistent Token Sale Failure Pattern _(41 chars)_ |
| description | Sales that ended badly did so in a recognisable sequence, and describing it generically is more useful than any individual case study. _(134 chars)_ |
| lede | The bad outcomes followed a script so consistent it can be written down without naming anyone. |
| Links | `/articles/exit-scams-as-market-structure/`, `/articles/what-happened-to-the-money/` |

Follows the generic failure to its causes: a sale completed against a promise, no obligation attached to the proceeds, no reporting requirement, a roadmap that slips, communication that thins, and eventually silence. Argue that the absence of any continuing obligation is the entire mechanism, and that this distinguishes the era from ordinary fundraising far more than any question about intent. Take the position that a structure with no reporting duty will produce this outcome at scale regardless of who participates. The piece must not name any project or individual, must not describe any specific case, must not state amounts, and must not characterise anyone's intent as criminal.

#### 2027-02-12 &middot; `the-compliance-cost-of-being-first`

**The Firms That Tried to Comply Early Paid for the Privilege**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | Regulators arrive |
| seoTitle | The Cost of Trying to Comply Early _(34 chars)_ |
| description | Businesses that sought licences and built controls competed against businesses that did neither, which is a structural disadvantage. _(132 chars)_ |
| lede | Doing it properly was slower and more expensive, and the market did not reward it until much later. |
| Links | `/articles/the-clarity-that-never-came/`, `/articles/the-listing-decision-as-regulation/`, `/articles/the-banking-relationship-problem/` |

Follows a competitive failure to its cause: compliance imposes real cost and slows product, non compliance imposes a contingent future cost, and in a fast moving market the discount rate on that future cost is effectively infinite. Argue that this is the strongest argument for regulation arriving early rather than late, and that it is an argument regulators themselves rarely make. Note the eventual reversal, when the contingent costs came due and compliant firms inherited the market. The piece must not name firms, must not describe any licence or approval as held or refused, must not state costs, and must not present compliance as guaranteeing anything.

#### 2027-02-13 &middot; `what-the-scaling-wars-settled`

**What Was Actually Settled, and What Was Only Exhausted**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The scaling wars |
| seoTitle | What the Scaling Wars Actually Settled _(38 chars)_ |
| description | The dispute ended without a decision procedure being agreed, which means it was concluded rather than resolved. _(111 chars)_ |
| lede | The fight stopped, which is not the same thing as being decided. |
| Links | `/articles/the-fork-that-happened/`, `/articles/the-layered-answer/`, `/articles/the-social-layer-fight/` |

Follows the dispute to its actual conclusion, separating what was determined, which rules the largest network runs and which approach received development attention, from what was left untouched, which is any agreed method for making such decisions. Argue that the outcome was produced by attrition, capital allocation and the availability of exit, and that a system with those as its governance mechanism will produce the same experience every time a genuine disagreement arises. Commit to that as the finding of the whole cluster. The piece must not declare a winner, must not state any current network metrics, must not characterise participants, and must not predict any future dispute.

#### 2027-02-14 &middot; `what-ethereum-borrowed`

**Almost Every Component Came From Somewhere, and the Sources Are Documented**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | Ethereum: the idea and the launch |
| seoTitle | Where Ethereum's Ideas Actually Came From _(41 chars)_ |
| description | Tracing the design back to earlier proposals, academic work and prior chains shows a synthesis rather than an invention, which is not a criticism. _(146 chars)_ |
| lede | Tracing where each part came from makes the achievement clearer, not smaller. |
| Links | `/articles/reading-the-ethereum-whitepaper/`, `/articles/the-first-proof-of-stake-attempts/`, `/articles/coloured-coins-and-the-idea-that-moved/` |

Sequences the provenance of the main design components using citations and published discussion, distinguishing what was adapted from earlier chains, what came from academic literature, and what was genuinely new here. Argue that the industry's habit of describing every project as an invention obscures the actual skill involved, which is selection and integration under constraint. Commit to the position that a documented lineage is a mark of quality rather than a debunking. The piece must not assert influence without a citation, must not adjudicate any priority dispute between individuals, and must not present the synthesis as diminishing anyone's contribution.

#### 2027-02-15 &middot; `what-remains-disputed-about-the-dao`

**The Facts Are Settled and the Meaning Is Not**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | The DAO and the fork |
| seoTitle | What Is Still Disputed About The DAO _(36 chars)_ |
| description | Almost every factual question here is answerable from the chain, and almost every interpretive question is still actively argued. _(129 chars)_ |
| lede | This is the rare episode where the record is clear and the argument is permanent. |
| Links | `/articles/code-is-law-after-the-fork/`, `/articles/the-drain-and-the-week-after/`, `/articles/what-the-fork-precedent-established/` |

Separates the settled from the contested: the chain records what moved and when, the archives record what was said, and the disputes are about whether the intervention was correct, what it implies about immutability, and whether the exit mechanism's use was an exploit or a permitted action. Argue that this last question is genuinely open and that both readings are defensible from the published terms. Commit to a position on method rather than on outcome: a history site should describe the disagreement precisely and refuse to resolve what the participants have not. The piece must not characterise the party who moved the funds, must not describe any legal proceeding, must not pick a side on the exploit question, and must not present community consensus where none exists.

#### 2027-02-16 &middot; `the-bust`

**The Funding Stopped Faster Than It Started**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `timeline` |
| Cluster | The token sale machine |
| seoTitle | How the Token Sale Boom Actually Ended _(38 chars)_ |
| description | Sales slowed, listings dried up, treasuries shrank and projects wound down, in an order that is more informative than the aggregate. _(132 chars)_ |
| lede | The end came in a specific order, and the order tells you what was actually holding the thing up. |
| Links | `/articles/the-exit-pattern/`, `/articles/the-projects-that-shipped/`, `/articles/why-a-standard-changed-everything/` |

Sequences the contraction in the order it happened: sale participation falling, secondary market depth thinning, listings slowing, project communication thinning, and wind downs. Argue that the sequence identifies the binding constraint, which was continuous inflow of new participants rather than anything about the technology, and that this is the clearest threshold crossing in the era. Be careful to describe the contraction structurally rather than by market level. The piece must not state prices, index levels, or amounts raised by period, must not name projects, and must not present the contraction as a buying or selling opportunity in any framing.

#### 2027-02-17 &middot; `how-to-read-a-regulatory-document`

**How to Read a Regulatory Document Without Being Misled by Coverage**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `explainer` |
| Cluster | Regulators arrive |
| seoTitle | How to Read a Regulatory Document Properly _(42 chars)_ |
| description | Guidance, no action letters, reports, complaints, settlements and rules are different instruments with different force, and coverage flattens them. _(147 chars)_ |
| lede | A complaint is an allegation, a settlement is not a finding, and guidance is not a rule, and headlines treat all three identically. |
| Links | `/articles/reading-the-investigative-report/`, `/articles/the-clarity-that-never-came/` |

Makes one thing comprehensible: the taxonomy of regulatory instruments and what force each carries, so a reader can tell the difference between an allegation, a negotiated resolution, a statement of staff views and a binding rule. Argue that the industry's information environment collapses these distinctions constantly and that this single reading habit prevents most of the resulting errors. Establish this as method for the whole site rather than as commentary on any matter. The piece must not describe any specific document, must not give legal advice, must not state what any instrument requires of a reader, and must not characterise any agency.

#### 2027-02-18 &middot; `the-cost-of-the-argument`

**The Years the Argument Consumed Are the Part Nobody Counts**

| | |
| --- | --- |
| Era | `icoEra` |
| Kind | `postmortem` |
| Cluster | The scaling wars |
| seoTitle | The Real Cost of the Scaling Argument _(37 chars)_ |
| description | Development attention, contributor retention and institutional credibility were spent on the dispute, and none of it appears in any metric. _(139 chars)_ |
| lede | The bill for the argument was paid in attention and people, which nobody puts in a chart. |
| Links | `/articles/what-the-scaling-wars-settled/`, `/articles/the-social-layer-fight/`, `/articles/rough-consensus-and-running-code/` |

Follows the dispute to a cost nobody counted: senior contributors left, adjacent work was deferred, and a period of institutional attention was spent on a public fight. Be careful and fair, since the dispute was about something real and the cost was not obviously avoidable, and the counterfactual is unknowable. Take the position that a community with no decision procedure pays this cost every time, which makes procedure worth more than any individual outcome. The piece must not name individuals who left or attribute reasons to them, must not quantify any cost, must not claim the dispute was unnecessary, and must not blame either camp.

#### 2027-02-19 &middot; `the-first-amm-proposal`

**The Post That Proposed Replacing the Order Book With a Formula**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `primarySource` |
| Cluster | The primitives |
| seoTitle | The Post That Proposed the AMM _(30 chars)_ |
| description | A short public proposal suggested pricing trades with a formula against a pool instead of matching buyers to sellers, and it worked. _(132 chars)_ |
| lede | The idea that replaced the order book was published as a forum post, not as a paper. |
| Links | `/articles/order-books-without-market-makers/`, `/articles/the-token-standard/`, `/articles/constant-product-is-an-inequality/` |

Built around the published proposal and the discussion around it, establishing what was actually suggested, what objections were raised at the time and which of them turned out to matter. Argue that the informality of the origin is characteristic of this whole era, where consequential financial infrastructure was designed in public in short documents by people who were not financial engineers. Note the earlier academic and prediction market work that anticipated parts of it, with citations rather than assertions. The piece must not quote the proposal without the archived text in hand, must not claim priority for any individual over any other, and must not state any volume or usage figure.

#### 2027-02-20 &middot; `what-a-stablecoin-promises`

**A Stablecoin Is a Promise, and the Interesting Question Is Whose**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | What a Stablecoin Actually Promises _(35 chars)_ |
| description | The unit trades near a dollar because somebody has undertaken to make it so, and identifying who and how is the whole analysis. _(127 chars)_ |
| lede | The peg is not a property of the token, it is a commitment by somebody, and commitments have counterparties. |
| Links | `/articles/the-token-standard/`, `/articles/the-first-amm-proposal/` |

Establishes the framing for the whole cluster: a stable unit maintains its value through a mechanism, that mechanism has an operator or a set of incentives behind it, and the credibility of the peg is the credibility of that arrangement. Argue that the industry's habit of treating all stable units as interchangeable dollars is the most dangerous simplification in the subject, since the failure modes are entirely different. Set out the questions this cluster will answer for each model. The piece must not name any issuer as safe or unsafe, must not state reserve compositions, must not advise a reader which to use, and must not describe any peg as guaranteed.

#### 2027-02-21 &middot; `the-anatomy-of-an-exploit`

**Every Exploit Has the Same Four Parts**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Exploits, taken apart |
| seoTitle | The Four Parts of Every DeFi Exploit _(36 chars)_ |
| description | A flawed assumption, a way to reach it, capital to make it worthwhile and a route out, and removing any one of them prevents the loss. _(134 chars)_ |
| lede | The individual incidents look different and the structure underneath them almost never does. |
| Links | `/articles/the-reentrancy-bug/`, `/articles/what-a-stablecoin-promises/`, `/articles/the-first-amm-proposal/` |

Establishes the analytical frame for the whole cluster: an incorrect assumption in the code or its inputs, an execution path that reaches it, sufficient capital to make exploitation profitable, and an exit that survives scrutiny. Argue that this decomposition is more useful than any incident narrative because it shows which defences address which component and why most of the industry's defences address only the last one. Commit to the position that reading exploits as morality tales about attackers has consistently prevented the industry from fixing anything. The piece must not describe any real incident operationally, must not name projects or attackers, must not state amounts, and must not include code that could be adapted.

#### 2027-02-22 &middot; `what-an-nft-actually-records`

**The Token Records an Identifier, and the Identifier Points Somewhere Else**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | NFTs and on-chain culture |
| seoTitle | What an NFT Actually Records _(28 chars)_ |
| description | The chain holds an owner and a token number, and everything a buyer thinks they are getting usually lives outside the chain entirely. _(133 chars)_ |
| lede | The chain records who holds token number seven, and almost nothing about what token number seven is. |
| Links | `/articles/the-token-standard/`, `/articles/coloured-coins-and-the-idea-that-moved/` |

Establishes what is actually stored on chain, an owner address and a token identifier, usually with a pointer to metadata held elsewhere, and separates that from what buyers understood themselves to be acquiring. Argue that the gap between these two is the origin of nearly every subsequent problem in the category, including dead images, disputed rights and unenforceable terms. Commit to the position that the technology was described in a way that invited the misunderstanding and that this was not accidental. The piece must not state prices, sales figures or market sizes, must not name collections, must not comment on what rights any purchase conveys legally, and must not advise a reader about anything.

#### 2027-02-23 &middot; `what-a-dao-became`

**The Word Came Back Meaning Something Much Vaguer**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | DAOs after The DAO |
| seoTitle | What the Word DAO Came to Mean _(30 chars)_ |
| description | The label was reused for everything from a treasury with a voting contract to a group chat with a shared wallet, which makes the category hard to analyse. _(154 chars)_ |
| lede | The term returned attached to arrangements that share almost nothing with the original. |
| Links | `/articles/what-the-dao-actually-was/`, `/articles/what-an-nft-actually-records/`, `/articles/the-anatomy-of-an-exploit/` |

Establishes what the label actually covers in this era, from protocol parameter governance to collective purchasing groups to communities with a shared treasury, and argues that the category has no useful boundary as commonly used. Propose a workable distinction based on what the votes actually control, which separates the arrangements where governance is consequential from the ones where it is decorative. Take the position that most of the disappointment in this area comes from applying expectations from one type to another. The piece must not name any organisation, must not state treasury sizes or membership counts, must not comment on the legal status of any arrangement, and must not advise a reader on participating in anything.

#### 2027-02-24 &middot; `the-constant-product-mechanism`

**How a Pool With No Buyer on the Other Side Quotes a Price**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | The primitives |
| seoTitle | How an Automated Market Maker Prices Trades _(43 chars)_ |
| description | A pool holding two assets under an invariant produces a quote for any size trade, with slippage that rises as the trade gets larger. _(132 chars)_ |
| lede | The pool always quotes, and the price it quotes gets worse the more you want. |
| Links | `/articles/the-first-amm-proposal/`, `/articles/order-books-without-market-makers/`, `/articles/constant-product-is-an-inequality/` |

Makes the mechanism comprehensible: two assets in a pool, an invariant that must hold after every trade, and the resulting property that a price exists for any size while large trades move it against the trader. Argue that the genuine innovation is availability rather than efficiency, since the pool will always trade and an order book will not, and that this is what made long tail assets tradable. Explain the arbitrage relationship that keeps the pool aligned with external markets, because without it the mechanism makes no sense. The piece must not include any worked numeric example that implies a real market, must not state fee levels or returns, and must not describe providing liquidity as an activity a reader should consider. Do not restate the point that the invariant is enforced as an inequality on fee adjusted balances, which the published constant product piece already establishes, and link to it rather than repeating it.

#### 2027-02-25 &middot; `the-three-collateral-models`

**Three Ways to Hold a Peg, With Three Different Ways to Lose It**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | The Three Stablecoin Models, Compared _(37 chars)_ |
| description | Backed by conventional assets, backed by crypto with excess margin, or backed by an incentive scheme, and each fails differently. _(129 chars)_ |
| lede | Sort them by what backs them and the failure modes sort themselves. |
| Links | `/articles/what-a-stablecoin-promises/`, `/articles/the-constant-product-mechanism/`, `/articles/what-a-dao-became/` |

Sets out the three families and, for each, the specific dependency: an issuer holding assets and honouring redemption, a collateral system that must liquidate faster than prices fall, and an incentive design that must attract capital exactly when confidence is lowest. Argue that the third depends on the behaviour of participants under stress while the first two depend on assets, which is the difference that matters. Commit to the position that the models should never be discussed in the same sentence without the distinction. The piece must not name specific issuers or protocols, must not state reserve or collateral figures, must not rank the models by safety for a reader, and must not predict any outcome.

#### 2027-02-26 &middot; `oracle-manipulation-taken-apart`

**The Failure Class Where Nothing Was Hacked at All**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | Exploits, taken apart |
| seoTitle | Oracle Manipulation: Nothing Was Hacked _(39 chars)_ |
| description | In this class of loss every contract behaved exactly as written, and the input it relied on was moved by someone who could afford to move it. _(141 chars)_ |
| lede | The code did what it said, and what it was told was wrong. |
| Links | `/articles/the-anatomy-of-an-exploit/`, `/articles/the-three-collateral-models/`, `/articles/the-constant-product-mechanism/` |

Follows this failure class to its causes at a structural level: a protocol reads a price from a market it does not control, that market is shallow enough to move, and the protocol acts on the moved price before it can revert. Argue that calling this a hack obscures the actual defect, which is a design decision to trust a manipulable input, and that the losses are therefore a pricing failure rather than a security breach. Explain the mitigations, averaging over time and using deeper sources, and be honest that both trade responsiveness for resistance. The piece must not narrate any specific incident, must not name protocols or amounts, must not describe manipulation operationally, and must not present any oracle configuration as safe.

#### 2027-02-27 &middot; `the-non-fungible-standard`

**The Standard Left the Most Important Part Undefined**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `primarySource` |
| Cluster | NFTs and on-chain culture |
| seoTitle | The NFT Standard and What It Left Out _(37 chars)_ |
| description | The interface specifies ownership and transfer and deliberately says nothing about what a token represents or where its content lives. _(134 chars)_ |
| lede | The specification is about moving tokens, and everything people argued about later is outside its scope. |
| Links | `/articles/what-an-nft-actually-records/`, `/articles/the-token-standard/` |

Built around the standard as a document: what it defines, what it explicitly leaves to implementers, and the optional extension that introduced the metadata pointer which turned out to carry all the weight. Argue that the standard is well written for what it set out to do and was pressed into service as though it defined an asset class, which it never claimed to. Note the parallel with the fungible token standard, where the same pattern of a minimal interface producing a maximal market occurred. The piece must not quote the specification without it in hand, must not claim any collection is or is not compliant, and must not state deployment counts.

#### 2027-02-28 &middot; `token-weighted-voting-and-its-failure`

**One Token One Vote Produces the Outcome You Would Expect**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | DAOs after The DAO |
| seoTitle | Why One Token One Vote Fails _(28 chars)_ |
| description | Weighting votes by holdings concentrates decisions among the largest holders, which is the mechanism working correctly rather than failing. _(139 chars)_ |
| lede | The system does exactly what it is designed to do, and people are surprised every time. |
| Links | `/articles/what-a-dao-became/`, `/articles/the-carbon-vote/`, `/articles/the-premine-question/` |

Follows a governance failure to its cause and finds it is not a malfunction: weighting by stake gives control to concentrated holders, and since distributions were concentrated at launch, so is control. Argue that the alternatives, quadratic schemes, reputation weighting and identity based voting, each require solving a harder problem, which is establishing that two accounts are two people. Commit to the position that no one has solved this and that acknowledging it would improve the honesty of every governance claim in the industry. The piece must not name organisations or holders, must not state concentration figures, must not present any voting scheme as solving the problem, and must not advise participation.


### March 2027

_31 articles._

#### 2027-03-01 &middot; `impermanent-loss-explained`

**The Badly Named Effect That Determines Whether Pooling Made Sense**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | The primitives |
| seoTitle | Impermanent Loss, Explained Without the Name _(44 chars)_ |
| description | Supplying two assets to a pool produces a different outcome than holding them, and the difference depends only on how the prices diverge. _(137 chars)_ |
| lede | The name is wrong in both words, and the effect underneath it is straightforward. |
| Links | `/articles/the-constant-product-mechanism/`, `/articles/the-first-amm-proposal/` |

Explains the mechanism structurally: the pool rebalances continuously as the relative price moves, so a supplier ends up holding more of whichever asset fell, and the resulting position differs from simply holding. Argue that the term is one of the industry's worst pieces of naming, since the effect is neither impermanent nor a loss in the ordinary sense, and that the naming did real damage to comprehension. Keep the explanation entirely mechanical and comparative. The piece must not quantify the effect with figures, must not compare it to fee income as though evaluating a decision, must not tell a reader when pooling is worthwhile, and must not use the word yield in any recommending sense.

#### 2027-03-02 &middot; `redemption-is-the-only-real-test`

**The Only Thing That Proves a Peg Is Someone Being Paid Out**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Redemption Is the Only Real Peg Test _(36 chars)_ |
| description | Secondary market price is not evidence of backing, and the only demonstration that matters is redemption actually functioning at scale. _(135 chars)_ |
| lede | A token trading at a dollar proves that somebody will buy it at a dollar, and nothing else. |
| Links | `/articles/the-three-collateral-models/`, `/articles/what-a-stablecoin-promises/` |

Explains the distinction between market price and redeemability: an arbitrageur will hold the price near par as long as redemption is believed to work, which means the market price is a measure of belief rather than of reserves. Argue that this makes secondary market stability a lagging and unreliable indicator, and that the terms of redemption, who is eligible, at what size and with what fee, are the actual subject. Take a clear position that a peg without accessible redemption is a peg held by expectation alone. The piece must not describe any issuer's redemption terms, must not name issuers, must not state historical peg deviations, and must not tell a reader how to assess anything they hold.

#### 2027-03-03 &middot; `the-bridge-problem`

**A Bridge Is a Pile of Collateral Guarded by an Assumption**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Exploits, taken apart |
| seoTitle | Why Bridges Are the Weakest Point _(33 chars)_ |
| description | Moving an asset between chains usually means locking it in one place and issuing a claim in another, which concentrates value behind a single mechanism. _(152 chars)_ |
| lede | Nothing actually crosses, the original is locked and a claim is issued, and the lock is where the money sits. |
| Links | `/articles/the-anatomy-of-an-exploit/`, `/articles/oracle-manipulation-taken-apart/` |

Explains the mechanism honestly: assets do not move between chains, they are immobilised on one side while a representation is created on the other, and the safety of that representation depends entirely on whatever authorises the mint. Argue that this concentrates enormous value behind a verification mechanism that is often a small committee, which makes bridges structurally the most attractive target in the industry. Take the position that the losses here were predictable from the architecture without knowing anything about any specific implementation. The piece must not name bridges or incidents, must not state amounts locked or lost, must not describe any verification scheme as secure, and must not advise a reader about transferring anything.

#### 2027-03-04 &middot; `off-chain-storage-and-the-dead-link`

**A Permanent Token Pointing at an Impermanent File**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | NFTs and on-chain culture |
| seoTitle | When the Token Outlives the File _(32 chars)_ |
| description | Metadata and images usually sit on ordinary web servers or content addressed networks that require somebody to keep paying to store them. _(137 chars)_ |
| lede | The token lasts forever and the picture lasts as long as somebody pays the hosting bill. |
| Links | `/articles/what-an-nft-actually-records/`, `/articles/the-non-fungible-standard/` |

Follows a slow failure to its cause, going through the storage options in turn, a plain web address, a content addressed hash that still requires someone to hold the data, and fully on chain encoding, and stating honestly what each costs and guarantees. Argue that the industry sold permanence while overwhelmingly choosing the least permanent option, and that this is checkable rather than a matter of opinion. Note the projects that stored everything on chain and what that decision required of them. The piece must not name collections or hosting providers, must not state how many collections use which method, must not claim any specific work has been lost, and must not advise readers about anything they hold.

#### 2027-03-05 &middot; `voter-apathy-and-delegation`

**Almost Nobody Votes, and Delegation Recreates a Board**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | DAOs after The DAO |
| seoTitle | Voter Apathy and the Return of the Board _(40 chars)_ |
| description | Participation in on chain governance is consistently low, and delegation solves the turnout problem by concentrating decisions in a few professionals. _(150 chars)_ |
| lede | Turnout is low everywhere, and the fix is to hand your vote to somebody who will use it. |
| Links | `/articles/token-weighted-voting-and-its-failure/`, `/articles/rough-consensus-and-running-code/` |

A profile of the professional delegate, beginning with the rational basis for low participation, which is that reading proposals costs time and a small holder's vote is unlikely to be decisive, and then treating delegation as the role that filled the gap. Argue that widespread delegation produces a small set of professional delegates who function as a board without being appointed as one, and that this is neither hidden nor obviously bad, but it is not what was described. Note that the same dynamics govern shareholder voting and that proxy advisers exist for the same reason. The piece must not name delegates or organisations, must not state turnout figures, must not evaluate any delegate, and must not describe governance participation as available or advisable to a reader.

#### 2027-03-06 &middot; `lending-pools-and-overcollateralisation`

**Lending Without Knowing Who You Are Lending To**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | The primitives |
| seoTitle | How On Chain Lending Pools Actually Work _(40 chars)_ |
| description | Anonymous lending is only possible if the borrower posts more than they take, which limits what the system can be used for. _(123 chars)_ |
| lede | If you cannot assess the borrower, the only thing left to rely on is the collateral. |
| Links | `/articles/the-constant-product-mechanism/`, `/articles/escrow-and-reputation-without-law/` |

Explains the design constraint that shapes everything: without identity, credit history or legal recourse, a lender can only rely on collateral worth more than the loan, which makes the system useful for leverage and useless for credit. Argue that this is the sharpest limitation of the entire era and that the repeated attempts to escape it, through reputation systems and undercollateralised pools, are where most of the losses happened. Commit to the position that a system without recourse cannot extend credit, only liquidity. The piece must not state rates or ratios, must not describe borrowing or lending as something a reader might do, must not name protocols, and must not present any collateral arrangement as safe.

#### 2027-03-07 &middot; `attestation-versus-audit`

**An Attestation and an Audit Are Not the Same Document**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Attestation Versus Audit, Explained _(35 chars)_ |
| description | A point in time report on stated holdings and a full statement audit differ in scope, standard and assurance, and the difference is routinely elided. _(149 chars)_ |
| lede | One is a snapshot of what management said on one day, the other is a much longer and more demanding exercise. |
| Links | `/articles/what-an-audit-would-have-caught/`, `/articles/redemption-is-the-only-real-test/` |

Explains what each engagement type actually covers, the standards under which each is performed, the period each addresses and the level of assurance each provides. Argue that the industry's use of the words interchangeably was not accidental and that readers who understand the distinction can evaluate disclosure claims without any special expertise. Keep it strictly about the nature of the documents rather than about any issuer. The piece must not describe any specific issuer's reports, must not name accounting firms, must not state what any jurisdiction requires, and must not offer any accounting, audit or tax guidance of any kind to any reader.

#### 2027-03-08 &middot; `a-bridge-failure-taken-apart`

**How the Largest Category of Loss Actually Happens**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | Exploits, taken apart |
| seoTitle | How Bridge Failures Actually Happen _(35 chars)_ |
| description | Bridge losses cluster into a small number of mechanisms, and the dominant one is not a clever contract bug at all. _(114 chars)_ |
| lede | The biggest losses in this industry came from someone obtaining the keys, not from outsmarting the code. |
| Links | `/articles/the-bridge-problem/`, `/articles/hot-wallets-and-the-operational-reality/`, `/articles/the-anatomy-of-an-exploit/` |

Follows the failure class to its causes and reports the uncomfortable finding: the largest bridge losses have generally involved compromise of the authorising keys or the validation set rather than a subtle flaw in contract logic. Argue that this makes them operational security failures dressed as protocol failures, and that the industry's investment in contract auditing was therefore aimed at the smaller problem. Commit to that finding and explain what it implies about where security spending should go. The piece must not name any incident, project or attacker, must not describe any compromise technique, must not state amounts, and must not attribute any incident to any state or group.

#### 2027-03-09 &middot; `royalties-were-never-enforceable`

**The Royalty Was Always a Marketplace Convention, Never a Rule**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | NFTs and on-chain culture |
| seoTitle | Why NFT Royalties Were Never Enforceable _(40 chars)_ |
| description | Creator royalties were paid because marketplaces chose to pay them, and when competition made that optional they largely stopped. _(129 chars)_ |
| lede | The royalty existed because the venues honoured it, and venues stopped when a rival did. |
| Links | `/articles/what-an-nft-actually-records/`, `/articles/smart-contracts-before-blockchains/` |

Follows the collapse of royalty payment to its cause: the standard transfer function carries no payment obligation, so royalties were collected by marketplaces at the point of sale purely as a matter of policy. Argue that the collapse of royalty payment was a predictable outcome of competition among venues rather than a betrayal, and that the technical remedies proposed afterwards all reintroduce a gatekeeper. Take a clear position that this episode is the best available demonstration that on chain does not mean enforced. The piece must not name marketplaces or creators, must not state royalty rates or revenue figures, must not comment on any legal right to a royalty, and must not advise creators on anything.

#### 2027-03-10 &middot; `the-multisig-behind-the-curtain`

**Behind Most On Chain Governance Sits a Small Group With Keys**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | DAOs after The DAO |
| seoTitle | The Multisig Behind Most Governance _(35 chars)_ |
| description | Execution of governance decisions, and often emergency powers, rests with a small set of signers whose identities and thresholds vary widely. _(141 chars)_ |
| lede | Somebody has to actually execute the decision, and that somebody is usually a handful of people with keys. |
| Links | `/articles/voter-apathy-and-delegation/`, `/articles/maintainers-not-owners/` |

A profile of the signer set that sits behind most on chain governance: votes produce an outcome, execution requires a transaction, and that transaction is signed by a threshold group which frequently also holds pause or upgrade authority. Argue that this arrangement is a reasonable operational compromise and that describing systems built this way as decentralised without qualification is simply inaccurate. Take the position that publishing the signer set and the threshold should be a minimum standard and often is not. The piece must not name any organisation or signer, must not state thresholds, must not allege misuse, and must not describe any arrangement as safe.

#### 2027-03-11 &middot; `liquidation-mechanics`

**Liquidation Is an Auction Run by Strangers Against a Clock**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | The primitives |
| seoTitle | How On Chain Liquidations Actually Work _(39 chars)_ |
| description | When collateral falls below a threshold the position must be closed by third parties incentivised to do it, and the incentive design is everything. _(147 chars)_ |
| lede | Nobody is watching your position except the people paid to close it. |
| Links | `/articles/lending-pools-and-overcollateralisation/`, `/articles/impermanent-loss-explained/`, `/articles/the-constant-product-mechanism/` |

Explains the mechanism: a health threshold, a public signal, an incentive paid to whoever executes the liquidation, and the assumption that competition among liquidators produces prompt execution. Argue that the design works well in ordinary conditions and has a known failure mode under congestion, when the same conditions that trigger liquidations also make executing them expensive or impossible. Connect it to the site's thesis directly, since a liquidation cascade is a threshold crossing that is visible in advance and unstoppable once begun. The piece must not state thresholds, penalties or historical cascade sizes, must not describe liquidation as a strategy, and must not offer any reader guidance on managing a position.

#### 2027-03-12 &middot; `the-reserve-disclosure-history`

**Disclosure Improved Only When It Was Forced**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | How Stablecoin Reserve Disclosure Improved _(42 chars)_ |
| description | Reserve reporting moved from nothing to periodic breakdowns over several years, and every improvement followed pressure rather than initiative. _(143 chars)_ |
| lede | The sector's disclosure improved in steps, and every step came after something went wrong. |
| Links | `/articles/attestation-versus-audit/`, `/articles/the-three-collateral-models/` |

Sequences the general improvement in reserve reporting practice across the sector at a structural level, showing the pattern that disclosure followed doubt, enforcement or a competitor's move rather than preceding any of them. Argue that this is the expected outcome when disclosure is voluntary and costly, and that it is an argument for standards rather than a criticism of any firm. Read it through the threshold: the credibility of the sector expanded as disclosure did, with a lag long enough to matter. The piece must not name issuers, must not describe any specific settlement or enforcement matter, must not state reserve figures, and must not characterise anyone's past disclosures as false.

#### 2027-03-13 &middot; `governance-attacks`

**If Votes Are Purchasable, Governance Is an Attack Surface**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | Exploits, taken apart |
| seoTitle | Governance Attacks: Buying the Votes _(36 chars)_ |
| description | When control is held by transferable tokens, acquiring enough of them is a valid path to controlling a treasury, and it is not a bug. _(133 chars)_ |
| lede | You do not have to break the contract if you can buy the thing that controls it. |
| Links | `/articles/the-anatomy-of-an-exploit/`, `/articles/a-bridge-failure-taken-apart/`, `/articles/the-bridge-problem/` |

Follows the failure class to its cause: governance rights represented by liquid transferable tokens can be accumulated or borrowed, and if the value under governance control exceeds the cost of acquiring control, the attack is rational. Argue that this is a design consequence rather than an exploit, and that the defences adopted, time locks and quorum requirements, buy time rather than remove the incentive. Note that the same mechanism appears in conventional finance and has a century of law around it, which crypto does not. The piece must not name any protocol or incident, must not describe acquisition strategies, must not state treasury sizes, and must not present any governance design as attack resistant.

#### 2027-03-14 &middot; `the-marketplace-was-the-product`

**The Businesses That Worked Were the Ones Selling Access to the Market**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | NFTs and on-chain culture |
| seoTitle | Why the Marketplace Was the Real Business _(41 chars)_ |
| description | As in earlier eras, the durable business was the venue taking a fee on every transaction rather than the assets being transacted. _(129 chars)_ |
| lede | The reliable revenue was the fee on the sale, exactly as it had been for a decade. |
| Links | `/articles/why-exchanges-became-the-industry/`, `/articles/the-listing-relationship/`, `/articles/royalties-were-never-enforceable/` |

A profile of the marketplace operator as the era's durable business, making the structural point that recurs across this whole site, that the intermediary between buyers and sellers captures reliable revenue while the assets themselves are volatile. Show that the technical requirement to route trades through a marketplace contract recreated the same gatekeeping power described in earlier eras. Commit to the position that this pattern is the industry's most reliable regularity. The piece must not name marketplaces, must not state fee rates or revenues, must not describe any venue's current position, and must not present any business as a model to follow.

#### 2027-03-15 &middot; `the-treasury-problem`

**A Treasury Held Entirely in Your Own Token Is Not a Treasury**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | DAOs after The DAO |
| seoTitle | Why Most DAO Treasuries Were Not Treasuries _(43 chars)_ |
| description | Holdings denominated in the organisation's own token fall in value exactly when the organisation needs to spend, which is the same trap as the token sale era. _(158 chars)_ |
| lede | A war chest that is worth most when you need it least is not much of a war chest. |
| Links | `/articles/what-happened-to-the-money/`, `/articles/the-multisig-behind-the-curtain/` |

Follows the failure of these treasuries to its cause: an organisation whose treasury consists of its own governance token faces an asset that declines with its own prospects, and selling it into the market to fund operations is self defeating. Argue that this is a straight repetition of the token sale era's treasury failure with the same absent expertise, and that the organisations that diversified were criticised for it by their own holders. Take a clear position that the governance structure made prudent treasury management politically impossible. The piece must not name organisations, must not state treasury compositions or sizes, must not recommend any treasury policy, and must not offer financial or accounting guidance.

#### 2027-03-16 &middot; `oracles-the-hardest-problem`

**The Chain Cannot See Outside Itself, and Everything Depends on What It Is Told**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | The primitives |
| seoTitle | Oracles: The Hardest Problem in DeFi _(36 chars)_ |
| description | A deterministic machine has no access to external information, so every price it uses arrives through a mechanism someone designed and someone can attack. _(154 chars)_ |
| lede | The contract knows nothing except what somebody puts on the chain for it to read. |
| Links | `/articles/the-evm-explained/`, `/articles/liquidation-mechanics/`, `/articles/the-constant-product-mechanism/` |

Explains the problem and the families of answers: single reporters, committees, on chain market prices, and time weighted averages, and states the specific attack each is vulnerable to. Argue that this is the genuine unsolved problem of the era and that every approach trades manipulation resistance against latency, which is a real and permanent tension rather than an engineering gap. Establish that a large share of the exploits later on this site are oracle problems wearing a different label. The piece must not present any oracle design as secure, must not name providers, must not describe manipulation techniques operationally, and must not state any figure for losses.

#### 2027-03-17 &middot; `the-crypto-collateralised-model`

**Backing a Stable Unit With a Volatile One Requires a Lot of Margin**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | How Crypto Backed Stablecoins Work _(34 chars)_ |
| description | Overcollateralised issuance produces a stable unit without an issuer holding conventional assets, at the cost of capital efficiency and cascade risk. _(149 chars)_ |
| lede | You can back a stable unit with a volatile one if you insist on enough margin, and the margin is the whole design. |
| Links | `/articles/lending-pools-and-overcollateralisation/`, `/articles/liquidation-mechanics/`, `/articles/the-three-collateral-models/` |

Explains the mechanism: positions are opened against excess collateral, the system liquidates as values fall, and the peg is maintained by arbitrage against the redemption right. Argue that this model's honesty is its main virtue, since the collateral is publicly verifiable in a way an issuer's bank balance is not, and its weakness is that it depends on liquidations executing during exactly the conditions that make execution hard. Note the later drift of these systems toward holding conventional collateral and what that concedes. The piece must not name protocols, must not state ratios or historical events with figures, must not advise on using any such system, and must not present verifiability as equivalent to safety.

#### 2027-03-18 &middot; `the-upgradeable-contract-risk`

**If the Contract Can Be Changed, the Audit Describes the Past**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Exploits, taken apart |
| seoTitle | Upgradeable Contracts and What Audits Cover _(43 chars)_ |
| description | Upgrade mechanisms let teams fix bugs and let whoever controls the upgrade key replace the entire system at will. _(113 chars)_ |
| lede | An upgradeable contract is only as trustworthy as whoever holds the key to change it. |
| Links | `/articles/the-anatomy-of-an-exploit/`, `/articles/the-audit-industry-that-followed/` |

Explains the proxy pattern and its consequence: the reviewed code is what is deployed today, and the upgrade authority can replace it, so the security question moves from the code to the key management and governance around it. Argue that this is where most users' assumptions break, since they evaluate a system by its code and are exposed to its administrators. Be fair that immutability has its own severe cost, which is that a discovered bug cannot be fixed. The piece must not name protocols or their upgrade arrangements, must not describe any specific key setup, must not present either choice as correct, and must not advise a reader about anything they hold.

#### 2027-03-19 &middot; `provenance-as-the-real-use-case`

**The Genuinely Novel Capability Was an Unbroken Ownership Record**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | NFTs and on-chain culture |
| seoTitle | Provenance: The Genuinely Novel Capability _(42 chars)_ |
| description | A complete and public chain of custody from issuance onward is something the art and collectibles world has never had, and that part is real. _(141 chars)_ |
| lede | Whatever else was oversold, a public unbroken ownership record is a real thing that did not exist before. |
| Links | `/articles/what-an-nft-actually-records/`, `/articles/the-first-transaction-on-chain/` |

Isolates the capability that survives the critique: an issuance event and every subsequent transfer recorded publicly and permanently, which addresses a problem that has cost the physical art market enormously. Argue that this was the strongest available claim and was consistently drowned out by claims about scarcity and value that were much weaker. Be precise about the limit, since provenance from issuance says nothing about the relationship between the issuer and whatever the token depicts. The piece must not name collections, must not state prices or sales, must not claim the technology prevents forgery of anything physical, and must not advise readers.

#### 2027-03-20 &middot; `the-legal-wrapper-question`

**An Unincorporated Group Holding Assets Together Is a Familiar Legal Shape**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | DAOs after The DAO |
| seoTitle | The Legal Wrapper Question for DAOs _(35 chars)_ |
| description | Groups acting collectively without an entity may find that a default legal characterisation applies to them anyway, and that has consequences for members. _(154 chars)_ |
| lede | Choosing not to incorporate is not the same as having no legal form. |
| Links | `/articles/what-a-dao-became/`, `/articles/jurisdiction-shopping/` |

Explains the general issue without giving advice: legal systems have long standing default categories for groups acting in common, and declining to choose an entity does not exempt a group from being characterised. Argue that the industry's initial position, that these arrangements existed outside legal categories, was never well supported and that the later adoption of purpose built entity forms in some jurisdictions reflects that. Present the tension between the entity forms available and the properties participants wanted. The piece must not give legal advice, must not state the law in any jurisdiction, must not name any organisation or proceeding, and must not tell any reader what their exposure is.

#### 2027-03-21 &middot; `flash-loans-what-they-actually-are`

**Borrowing Without Collateral Works If You Must Repay in the Same Transaction**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | The primitives |
| seoTitle | Flash Loans, Explained Properly _(31 chars)_ |
| description | A loan that is void unless repaid before the transaction ends removes credit risk entirely, and creates a very different set of problems. _(137 chars)_ |
| lede | If the whole thing unwinds unless you repay, there is no credit risk and no reason to check who you are. |
| Links | `/articles/lending-pools-and-overcollateralisation/`, `/articles/oracles-the-hardest-problem/` |

Explains the mechanism cleanly: atomic execution means a transaction either completes entirely or does not happen, so a loan repaid within the same transaction carries no default risk and requires no collateral or identity. Argue that this is a genuine and elegant invention with no analogue in conventional finance, and that its reputation as a hacking tool confuses the loan with the vulnerability it makes cheap to exploit. Commit to the position that flash loans do not create vulnerabilities, they remove the capital requirement for exploiting existing ones. The piece must not describe any exploit operationally, must not name incidents or state amounts, and must not present flash loans as something a reader could or should use.

#### 2027-03-22 &middot; `the-algorithmic-assumption`

**The Model That Requires Confidence Exactly When Confidence Is Gone**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | The Assumption Inside Algorithmic Stablecoins _(45 chars)_ |
| description | Designs that maintain a peg by issuing a second token depend on demand for that token, which is lowest precisely when the peg is under pressure. _(144 chars)_ |
| lede | The mechanism needs somebody to buy the absorbing asset at the moment nobody wants it. |
| Links | `/articles/the-three-collateral-models/`, `/articles/redemption-is-the-only-real-test/` |

Explains the general structure of designs that defend a peg by expanding or contracting a paired token, and isolates the assumption they all share, which is that market demand for the second token persists under stress. Argue that this assumption is not a bug in any particular implementation but the defining property of the category, and that the repeated failures across many years and many teams are evidence about the category rather than about the teams. Present the strongest version of the counterargument fairly. The piece must not name any specific design or its outcome, must not state any figures, must not describe any such system as viable or non viable in a forward looking way, and must not advise a reader about anything.

#### 2027-03-23 &middot; `key-compromise-versus-code-bug`

**Two Very Different Failures Are Reported With the Same Word**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Exploits, taken apart |
| seoTitle | Key Compromise Versus Code Bug _(30 chars)_ |
| description | Reporting calls both a hack, and they require completely different defences, different disclosures and different conclusions about the team. _(140 chars)_ |
| lede | One means the code was wrong and the other means somebody got the keys, and the coverage says hack for both. |
| Links | `/articles/a-bridge-failure-taken-apart/`, `/articles/the-anatomy-of-an-exploit/` |

Separates the two categories and explains why the distinction changes everything downstream: a code defect implies a review failure, a key compromise implies an operational security failure, and the remediation, the disclosure obligations and the likelihood of recurrence differ entirely. Argue that the industry's undifferentiated vocabulary has made it impossible to learn from its own incident history at an aggregate level. Commit to the position that any incident report that does not make this distinction in its first paragraph is not a report. The piece must not name incidents or classify any real event, must not describe compromise techniques, must not state amounts, and must not blame named individuals.

#### 2027-03-24 &middot; `generative-art-on-chain`

**The Artists Who Treated the Chain as the Medium**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | NFTs and on-chain culture |
| seoTitle | The Artists Who Made the Chain the Medium _(41 chars)_ |
| description | A body of work uses the deterministic execution environment itself as the material, which is a genuine artistic development rather than a market one. _(149 chars)_ |
| lede | Some of the work of this period only exists because the chain runs the same program the same way for everyone. |
| Links | `/articles/provenance-as-the-real-use-case/`, `/articles/the-evm-explained/` |

A group profile of a practice: artists producing algorithmic work where the output is generated deterministically at mint time and stored or reproduced from chain state, and what that constraint offers as a medium. Argue that this is the part of the period most likely to be taken seriously in twenty years and the part least discussed at the time, because it was drowned out by the market. Ground the argument in the properties of the medium rather than in any valuation. The piece must not name artists or works in a way that reads as endorsement, must not state prices or sales, must not evaluate any work's artistic merit as though authoritative, and must not treat market attention as a measure of quality.

#### 2027-03-25 &middot; `the-proposal-process`

**The Path From an Idea to an Executed Change Is Long and Mostly Off Chain**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | DAOs after The DAO |
| seoTitle | How a Governance Proposal Actually Works _(40 chars)_ |
| description | Forum discussion, temperature checks, formal drafting, an on chain vote and a time lock, with most of the filtering happening before any vote. _(142 chars)_ |
| lede | By the time anything reaches a vote, the decision has usually already been made in a forum. |
| Links | `/articles/voter-apathy-and-delegation/`, `/articles/the-bip-process/` |

Makes the process comprehensible end to end and locates where the real filtering happens, which is in the informal stages where a proposal either attracts support from large holders or quietly does not proceed. Argue that this makes the on chain vote a ratification step in most cases, which is worth knowing before treating vote results as evidence of anything. Note that this structure closely resembles how decisions are made in conventional organisations. The piece must not name organisations or proposals, must not state vote outcomes, must not present any process as best practice, and must not advise readers on participating.

#### 2027-03-26 &middot; `composability-and-the-lego-claim`

**Composability Is a Feature and a Shared Fate**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | The primitives |
| seoTitle | Composability: The Feature and the Shared Fate _(46 chars)_ |
| description | Protocols calling each other permissionlessly produced fast innovation and an interdependence nobody mapped or could shut off. _(126 chars)_ |
| lede | Anything can call anything, which is why it was built so fast and why it broke together. |
| Links | `/articles/oracles-the-hardest-problem/`, `/articles/flash-loans-what-they-actually-are/` |

Follows the correlated failures of this era to a shared cause: a contract can use another without permission or integration, producing a dependency graph that nobody maintains and nobody can see in full. Argue that the marketing image of interlocking blocks obscured that the connections are load bearing and untested under stress, and that the correlated failures of the era are the direct evidence. Take a clear position that permissionless integration is a real advance and that the absence of any dependency inventory was a serious and avoidable failure. The piece must not name protocols or incidents, must not state values at risk, and must not describe any integration as safe.

#### 2027-03-27 &middot; `the-peg-defence-mechanism`

**Defending a Peg Is an Old Problem With a New Vocabulary**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Defending a Peg: An Old Problem Renamed _(39 chars)_ |
| description | Currency boards and managed pegs have a long history outside crypto, and the failure patterns transfer almost unchanged. _(120 chars)_ |
| lede | Central banks have been losing pegs for a century and the mechanics are the same ones. |
| Links | `/articles/the-algorithmic-assumption/`, `/articles/redemption-is-the-only-real-test/` |

Draws the analogy to conventional pegged currency arrangements carefully: a defended peg requires reserves, a credible commitment and the ability to absorb one sided flow, and it fails when any of the three runs out. Argue that the crypto sector rediscovered this literature slowly and expensively, and that reading the older material would have been cheaper. Be precise about where the analogy holds and where it does not, particularly around convertibility and legal tender status. The piece must not name any country's currency episode as a prediction, must not offer macroeconomic forecasts, must not name crypto issuers, and must not present any peg as defensible or indefensible.

#### 2027-03-28 &middot; `the-whitehat-grey-zone`

**Taking the Money to Keep It Safe Is a Position With No Settled Status**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | Exploits, taken apart |
| seoTitle | The Grey Zone of Rescuing Funds _(31 chars)_ |
| description | Researchers have removed funds from vulnerable contracts intending to return them, which is defensible, useful and legally unclear everywhere. _(142 chars)_ |
| lede | Somebody drains a contract to stop somebody else draining it, and nobody has a settled name for that. |
| Links | `/articles/disclosure-without-a-company/`, `/articles/key-compromise-versus-code-bug/` |

A profile of the security researcher in an adversarial setting, built around the dilemma the role carries: somebody who finds a live vulnerability in a contract holding funds has no good options, since disclosure may be exploited before a fix and inaction may allow the same. Argue that the ad hoc norms that emerged, rescue and return, negotiated bounties and public post incident accounting, are a real institutional achievement of this era and remain legally exposed. Present the unresolved question rather than answering it. The piece must not give any legal characterisation or advice, must not name individuals or incidents, must not describe how such an operation is conducted, and must not encourage or endorse the practice.

#### 2027-03-29 &middot; `the-wash-trading-problem`

**When Trading With Yourself Is Free, Reported Volume Means Nothing**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | NFTs and on-chain culture |
| seoTitle | Why Reported NFT Volume Meant Little _(36 chars)_ |
| description | Self trading is cheap, visible and hard to distinguish from genuine activity, which makes volume figures for this market close to unusable. _(139 chars)_ |
| lede | You can sell something to yourself all day, and the chart cannot tell. |
| Links | `/articles/why-early-adoption-figures-are-unknowable/`, `/articles/the-marketplace-was-the-product/` |

Follows the failure of this market's reported figures to its causes: transferable assets, no identity, low fees, and in some periods incentive programmes that paid per transaction, which together make self trading rational and undetectable at scale. Argue that this invalidates most of the market size reporting from the period and that the analytics firms producing those figures knew it. Connect back to the earlier era's point about proxies being reported as measurements. The piece must not name collections, marketplaces or analytics firms, must not state volume figures even as examples, must not accuse any party of wash trading, and must not describe how it is done.

#### 2027-03-30 &middot; `off-chain-signalling`

**Most Voting Does Not Happen On Chain at All**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | DAOs after The DAO |
| seoTitle | Why Most DAO Voting Is Off Chain _(32 chars)_ |
| description | Signed messages recorded off chain became the standard voting method because on chain voting is expensive, and that choice has consequences. _(140 chars)_ |
| lede | The votes are usually signed messages stored on somebody's server, not transactions. |
| Links | `/articles/the-proposal-process/`, `/articles/the-multisig-behind-the-curtain/` |

Explains the mechanism and the trade off: signature based voting removes the transaction cost that suppressed participation, and it moves the record and its availability into the hands of whoever operates the service. Argue that this is a reasonable engineering decision with an under discussed dependency, since a governance record held by one provider is exactly the kind of single point the industry claims to avoid. Note that execution still requires an on chain step regardless. The piece must not name providers or organisations, must not state participation figures, must not describe any provider as reliable, and must not present the method as binding.

#### 2027-03-31 &middot; `liquidity-mining-as-customer-acquisition`

**Paying Users to Show Up, Priced in a Token You Print**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | The primitives |
| seoTitle | Liquidity Mining as Customer Acquisition _(40 chars)_ |
| description | Distributing a new token to users who supply capital is a marketing spend denominated in an asset the issuer creates, and the incentives are obvious. _(149 chars)_ |
| lede | The customer acquisition budget was denominated in something the company could print. |
| Links | `/articles/the-airdrop/`, `/articles/composability-and-the-lego-claim/` |

Sequences the arrival and spread of incentive distribution programmes and analyses them as what they were, a marketing cost paid in newly issued tokens rather than a return generated by the business. Argue that this made customer acquisition appear free and made retention impossible to measure, since the population attracted by an incentive leaves when the incentive does. Read it against the threshold, since deposits expanded on incentives and contracted the moment they were withdrawn, which is a measurement of the incentive rather than of the product. The piece must not state incentive rates, deposit figures or returns, must not name programmes, and must not describe participation as available or advisable to a reader.


### April 2027

_30 articles._

#### 2027-04-01 &middot; `depegs-that-recovered`

**Most Peg Breaks Recover, Which Is Why the Ones That Do Not Are Surprising**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Why Most Peg Breaks Recover _(27 chars)_ |
| description | Temporary deviations are common and usually resolve, which trains observers to treat them as noise until one does not resolve. _(126 chars)_ |
| lede | Deviations happen often enough that people stopped treating them as information, which is the trap. |
| Links | `/articles/the-peg-defence-mechanism/`, `/articles/the-withdrawal-queue-as-a-signal/` |

Sequences the general pattern of temporary peg deviations at a structural level and explains the mechanisms that resolve them: arbitrage, redemption, and liquidity returning after a shock passes. Argue that the frequency of recovery creates a genuine epistemic problem, since the signal is common and the catastrophic instance looks identical at the start. Connect it to the withdrawal queue piece, because the structure of the problem is the same one. The piece must not name any specific deviation, issuer or protocol, must not state deviation sizes or durations, must not tell a reader how to distinguish the cases, and must not present any deviation as a trading opportunity.

#### 2027-04-02 &middot; `the-bug-bounty-economics`

**A Bounty Only Works If It Beats the Alternative**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Exploits, taken apart |
| seoTitle | Why Bug Bounties Are Priced Wrong _(33 chars)_ |
| description | The value of a vulnerability to whoever finds it is the amount at risk, and a bounty that is a fraction of that is a weak offer. _(128 chars)_ |
| lede | The researcher is being offered a fraction of what the bug is worth to somebody else. |
| Links | `/articles/the-whitehat-grey-zone/`, `/articles/the-audit-industry-that-followed/` |

Explains the economics precisely: a bounty competes against the value of exploiting the vulnerability, which in a public contract is the full amount reachable, so a bounty that is a small percentage is asking for goodwill rather than making an offer. Argue that the industry's bounty programmes were largely priced as marketing rather than as risk transfer, and that the ones which improved did so after losses. Note the practical constraints honestly, since very large bounties have their own perverse effects. The piece must not name programmes or state bounty amounts, must not describe how to claim anything, must not present any programme as adequate, and must not encourage anyone to search for vulnerabilities.

#### 2027-04-03 &middot; `the-collection-as-a-social-club`

**What People Were Actually Buying Was Membership**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | NFTs and on-chain culture |
| seoTitle | When the Collection Was Really a Membership _(43 chars)_ |
| description | The successful collections functioned as membership tokens for a group, and understanding them as clubs explains more than any account of the artwork. _(150 chars)_ |
| lede | The picture was a membership card, and the club was the product. |
| Links | `/articles/the-marketplace-was-the-product/`, `/articles/narrative-as-the-product/` |

A profile of the collection community as a social institution: a token conferring access to a group, an identity marker displayed publicly, and a shared interest among holders in the group's standing, which is a club rather than an art market. Argue that this framing explains the observed behaviour, including coordinated promotion and the emotional intensity of the community, far better than any account based on collecting. Note honestly that clubs whose membership is tradable have a structural instability that ordinary clubs do not. The piece must not name any collection or holder, must not state prices, must not mention any celebrity participation, and must not characterise participants.

#### 2027-04-04 &middot; `governance-capture`

**Recurring Votes on Where Incentives Flow Create a Permanent Lobby**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | DAOs after The DAO |
| seoTitle | How Recurring Votes Create a Lobby _(34 chars)_ |
| description | When a vote decides where rewards are directed, participants organise to influence it, and the resulting market for votes is entirely predictable. _(146 chars)_ |
| lede | Give people a repeated vote on where money goes and a lobbying industry appears within months. |
| Links | `/articles/token-weighted-voting-and-its-failure/`, `/articles/liquidity-mining-as-customer-acquisition/`, `/articles/governance-attacks/` |

Follows this failure to its incentive structure: a periodic vote allocating incentives creates a return on acquiring voting power, producing vote accumulation, bribery markets and coalitions, all conducted openly because nothing prohibits them. Argue that this is the most intellectually interesting thing to come out of on chain governance, because it made visible a set of dynamics that are normally hidden in political and corporate settings. Take the position that the transparency is genuinely valuable and the outcomes are not. The piece must not name any protocol, market or participant, must not state amounts spent, must not describe how to participate, and must not present any of it as an opportunity.

#### 2027-04-05 &middot; `governance-tokens-as-distribution`

**The Governance Token Solved a Distribution Problem, Not a Governance One**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | The primitives |
| seoTitle | What Governance Tokens Were Actually For _(40 chars)_ |
| description | Issuing a token framed as governance created something to distribute while avoiding the language of an investment, and governance came second. _(142 chars)_ |
| lede | The governance framing arrived because something had to be handed out and it could not look like a share. |
| Links | `/articles/liquidity-mining-as-customer-acquisition/`, `/articles/the-utility-token-theory/` |

Follows the shortfall between what governance tokens promised and what they delivered to its cause: a token conferring voting rights can be distributed to users without an obvious offering, which solved bootstrapping and positioning before it solved governance. Argue that the governance rights were frequently thin, over parameters that mattered little, and that the actual function was distribution and alignment signalling. Present the counterargument, that some of these systems developed real and consequential governance, and note where it applies. The piece must not name tokens, must not state distributions or holdings, must not comment on the legal characterisation of any token, and must not advise readers.

#### 2027-04-06 &middot; `stablecoins-as-payment-rails`

**The Use Case That Actually Arrived Was Moving Dollars**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Stablecoins as Actual Payment Rails _(35 chars)_ |
| description | The clearest real world adoption in this history is the use of dollar denominated tokens to move value across borders and between venues. _(137 chars)_ |
| lede | The thing that got used at scale was not a new currency, it was a faster way to move an old one. |
| Links | `/articles/what-a-stablecoin-promises/`, `/articles/the-shift-to-the-cash-out-layer/` |

Describes the actual usage pattern that emerged: settlement between trading venues, cross border transfers, and access to dollar denominated balances in places where that access is difficult. Argue that this is the most substantial and least celebrated adoption story in the subject, because it is unglamorous and because it consists of the technology being used to deliver a conventional product better. Take the position that the industry undersold this for years while overselling everything else. The piece must not state transaction volumes or user figures, must not name issuers or corridors, must not describe the practice as available or advisable to any reader, and must not comment on any jurisdiction's currency controls.

#### 2027-04-07 &middot; `what-happens-after-an-exploit`

**The Twenty Four Hours After Are Almost Always the Same**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | Exploits, taken apart |
| seoTitle | The First Day After an Exploit _(30 chars)_ |
| description | Detection, pause attempts, a public statement, tracing, an on chain message to the attacker, and a decision about reimbursement, in that order. _(143 chars)_ |
| lede | The sequence after an incident has become a ritual, complete with a message written to the attacker on the chain. |
| Links | `/articles/the-anatomy-of-an-exploit/`, `/articles/chain-analysis-becomes-a-business/`, `/articles/key-compromise-versus-code-bug/` |

Sequences the standardised response pattern that emerged across many incidents: detection by outside observers, attempts to pause, an initial statement, tracing by analytics firms, a public negotiation conducted in transaction data, and a decision about whether users are made whole. Argue that the emergence of a shared playbook is genuine institutional learning, and that the reimbursement decision is the one part that remains entirely discretionary and unregulated. Note what that discretion implies for users. The piece must not narrate any specific incident, must not name protocols or firms, must not quote any on chain message, and must not state amounts recovered or reimbursed.

#### 2027-04-08 &middot; `the-intellectual-property-confusion`

**Almost Nobody Knew What Rights They Had Bought**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | NFTs and on-chain culture |
| seoTitle | The Rights Confusion Around NFT Purchases _(41 chars)_ |
| description | Ownership of a token and ownership of rights in an underlying work are different things, and the licences involved varied enormously. _(133 chars)_ |
| lede | Holding the token and holding rights in the image are two separate questions with two separate answers. |
| Links | `/articles/what-an-nft-actually-records/`, `/articles/royalties-were-never-enforceable/`, `/articles/smart-contracts-before-blockchains/` |

Follows a widespread failure of understanding to its cause: the chain records token ownership, any rights in an underlying work arise from a licence granted by whoever holds them, and those licences ranged from broad to nonexistent and were often published as web pages that could change. Argue that this confusion was widespread, foreseeable and largely uncorrected by anyone with an interest in the market continuing. Note the attempts at standardised licences and their partial adoption. The piece must not give any legal advice or opinion on rights, must not name projects or licences, must not state what any purchaser acquired, and must not comment on any dispute.

#### 2027-04-09 &middot; `contributor-compensation`

**Paying People Without an Employer Is Harder Than It Sounds**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | DAOs after The DAO |
| seoTitle | Paying Contributors Without an Employer _(39 chars)_ |
| description | Organisations without an entity struggled with continuity, accountability and the ordinary machinery of employment, and contributors bore the cost. _(147 chars)_ |
| lede | Working for something with no employer means no contract, no continuity and no recourse. |
| Links | `/articles/who-pays-the-developers/`, `/articles/the-treasury-problem/`, `/articles/the-legal-wrapper-question/` |

A profile of the unincorporated contributor: the arrangements they worked under, grants, streaming payments, working groups and periodic renewal votes, and the problems each left unsolved for the people doing the work. Argue that the flexibility celebrated by these organisations was largely a transfer of risk onto contributors, and that the better run ones eventually reintroduced most of the structures they had set out to avoid. Take a clear position without moralising about any specific group. The piece must not name organisations or individuals, must not state compensation figures, must not give any employment, payroll or tax guidance of any kind, and must not characterise any arrangement's legal status.

#### 2027-04-10 &middot; `ordering-value-and-front-running`

**Whoever Orders the Transactions Can Take a Cut of Every One**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | The primitives |
| seoTitle | Transaction Ordering and Extractable Value _(42 chars)_ |
| description | The right to decide sequence within a block has measurable value, and the industry took years to admit this was structural rather than an abuse. _(144 chars)_ |
| lede | The sequence of transactions in a block is worth money, and somebody always chooses it. |
| Links | `/articles/what-a-pool-operator-controls/`, `/articles/composability-and-the-lego-claim/` |

A profile of the block builder and the searcher as roles that did not exist before: block producers choose ordering, ordering affects outcomes for pending transactions, and that discretion is therefore an asset somebody captures. Argue that the reframing from an abuse to be stopped into a structural property to be managed is one of the more intellectually honest turns in this history, and that the resulting infrastructure changed who captures the value rather than whether it exists. Connect back to the earlier point about pool operators building block templates. The piece must not describe extraction techniques operationally, must not state extracted values, must not name searchers or builders, and must not present any mitigation as effective.

#### 2027-04-11 &middot; `the-issuer-as-a-chokepoint`

**The Freeze Function Is the Quiet Centre of the Whole Thing**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | The Freeze Function Inside Stablecoins _(38 chars)_ |
| description | Most issuer backed tokens include the ability to immobilise balances, which reintroduces exactly the control the base layer was built to remove. _(144 chars)_ |
| lede | The token contract usually contains a function that lets the issuer stop your balance moving. |
| Links | `/articles/stablecoins-as-payment-rails/`, `/articles/the-shift-to-the-cash-out-layer/`, `/articles/what-a-stablecoin-promises/` |

Explains the capability plainly, what it is for, why an issuer with conventional obligations needs it, and what it means that the most used assets on permissionless chains have an administrator. Argue that this is the most concrete example on the site of the industry's central compromise, and that both the criticism and the necessity are real. Present the alternative designs and be honest that they trade the control for a different set of risks. The piece must not name issuers or specific freeze events, must not describe any legal obligation as current, must not advise readers on what to hold, and must not characterise any freeze as justified or unjustified.

#### 2027-04-12 &middot; `the-cover-that-did-not-cover`

**The Protection Products Mostly Did Not Pay When It Mattered**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | Exploits, taken apart |
| seoTitle | Why On Chain Cover Products Disappointed _(40 chars)_ |
| description | Products offering protection against contract failure struggled with definitions, capital adequacy and correlation, which is the same list as any insurer. _(154 chars)_ |
| lede | The hard part of insurance is defining the event, and these products discovered that the expensive way. |
| Links | `/articles/what-happens-after-an-exploit/`, `/articles/composability-and-the-lego-claim/` |

Follows the failure of this product category to its causes: ambiguous definitions of a covered event, claims assessment by token holders with an interest in the outcome, capital pools far smaller than the exposure, and correlation between the events being covered. Argue that this is a rediscovery of why insurance is capital intensive and heavily regulated, and that the sector met each requirement only after failing to. Be fair that some products paid claims and functioned as intended. The piece must not name any product or claim, must not state payout figures, must not describe any product as offering real protection, and must not advise a reader on protecting anything.

#### 2027-04-13 &middot; `the-liquidity-collapse`

**The Market Did Not Fall So Much as Stop**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | NFTs and on-chain culture |
| seoTitle | How the NFT Market Actually Stopped _(35 chars)_ |
| description | Activity in a market of unique items ends by bids disappearing rather than by prices declining, and the two look very different in the data. _(140 chars)_ |
| lede | For unique items there is often no price at all, because there is nobody bidding. |
| Links | `/articles/the-wash-trading-problem/`, `/articles/order-books-without-market-makers/`, `/articles/the-collection-as-a-social-club/` |

Sequences the contraction and explains why a market in non fungible items behaves differently from one in fungible assets: with no continuous two sided market, a decline in interest produces an absence of bids rather than a lower price, so the last recorded sale stays on the screen. Argue that this makes reported floor levels and portfolio values in this market especially misleading, and that the contraction was therefore under reported as it happened. Read it directly against the site's threshold. The piece must not state prices, floors or volumes, must not name collections, must not describe the market as recovering or not, and must not offer any valuation framing.

#### 2027-04-14 &middot; `the-collective-purchase-groups`

**Groups Formed Quickly to Buy One Thing, and Then Had to Exist Afterwards**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | DAOs after The DAO |
| seoTitle | The Groups That Formed to Buy One Thing _(39 chars)_ |
| description | Rapid collective fundraising for a single purchase demonstrated real coordination capability and left behind organisations with no purpose. _(139 chars)_ |
| lede | Raising the money took days and deciding what to do next took years. |
| Links | `/articles/the-legal-wrapper-question/`, `/articles/what-a-dao-became/` |

Sequences the pattern at a structural level: a shared objective attracts contributions quickly, the objective is achieved or not, and the group is left holding assets and obligations with no continuing purpose and no exit procedure. Argue that the speed of formation was a genuine demonstration of what these tools do well, and that the absence of a dissolution mechanism is the clearest evidence of what they do badly. Note that ordinary partnership and company law has dissolution procedures for exactly this reason. The piece must not name any group or purchase, must not state amounts raised, must not describe any outcome for contributors, and must not give legal guidance.

#### 2027-04-15 &middot; `the-anonymous-team-norm`

**Building Under a Pseudonym Became Normal, and the Trade Offs Are Real**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | The primitives |
| seoTitle | The Norm of Building Under a Pseudonym _(38 chars)_ |
| description | A significant share of this era's infrastructure was built by people using pseudonyms, which changed accountability in both directions. _(135 chars)_ |
| lede | A lot of what people trusted with real money was written by people whose names nobody knew. |
| Links | `/articles/the-cypherpunks-list/`, `/articles/the-authorship-question/`, `/articles/composability-and-the-lego-claim/` |

A group profile of a practice rather than of individuals: why builders adopted pseudonyms, what it protected them from, and what it removed for users, which is any recourse and any reputational cost for abandonment. Argue that the practice inherits directly from the earliest era of this site and that the difference is scale, since pseudonymous publishing of ideas is not the same as pseudonymous custody of capital. Present the strongest defence of the norm alongside its cost. The piece must not attempt to identify any pseudonymous person, must not repeat any speculation about anyone's identity, must not name any project, and must not characterise pseudonymity as a warning sign.

#### 2027-04-16 &middot; `why-dollars-won-on-chain`

**A System Built to Escape a Currency Denominated Almost Everything In It**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Why the Dollar Won on Chain _(27 chars)_ |
| description | The dominant unit of account on public chains is a foreign national currency, and the reasons are practical rather than ideological. _(132 chars)_ |
| lede | The most used unit on chains built as an alternative to national money is a national currency. |
| Links | `/articles/stablecoins-as-payment-rails/`, `/articles/the-issuer-as-a-chokepoint/` |

Explains why pricing, quoting and settling converged on one currency: liquidity concentrates, a unit of account is a network effect, and volatility makes anything else impractical for ordinary commerce. Argue that this outcome is genuinely awkward for the industry's founding rhetoric and that acknowledging it plainly is more credible than the usual evasions. Note the smaller efforts to denominate in other currencies and why they have stayed small. The piece must not comment on any currency's prospects, must not offer macroeconomic views, must not name issuers, and must not present this outcome as good or bad for anyone's holdings.

#### 2027-04-17 &middot; `reused-code-and-shared-fate`

**Forked Code Inherits Forked Bugs, Sometimes Months Later**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | Exploits, taken apart |
| seoTitle | Forked Code Inherits Its Bugs _(29 chars)_ |
| description | Copying a working protocol copies its vulnerabilities and, crucially, does not copy the patches applied to the original afterwards. _(131 chars)_ |
| lede | The copy keeps the bug and does not get the fix. |
| Links | `/articles/the-license-choice/`, `/articles/the-anatomy-of-an-exploit/`, `/articles/the-upgradeable-contract-risk/` |

Follows a failure class to its cause: forking a codebase creates an unmaintained instance whose defects are discoverable by reading a public repository, and a fix applied upstream does not propagate. Argue that this produced clusters of near simultaneous incidents across unrelated projects and that the pattern is fully predictable from the practice. Connect it to the licence choice in the earliest era, since this is the same permissive copying with much larger sums attached. The piece must not name any fork or incident, must not describe how to locate vulnerable deployments, must not state amounts, and must not name any codebase as vulnerable.

#### 2027-04-18 &middot; `what-survived-the-collapse`

**Some Uses Outlived the Market Entirely**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | NFTs and on-chain culture |
| seoTitle | What Survived the NFT Market Collapse _(37 chars)_ |
| description | Ticketing, credentials, in game items and artist direct sales continued quietly after the speculative market ended, which is the more interesting story. _(152 chars)_ |
| lede | The uses that had nothing to do with resale carried on after the resale market stopped. |
| Links | `/articles/the-liquidity-collapse/`, `/articles/provenance-as-the-real-use-case/` |

Sequences what continued after the speculative period: uses where the token functions as a credential, an entitlement or a record rather than as a tradable asset. Argue that this cohort is the honest answer to whether the technology was useful, and that it is small, unglamorous and real. Take the position that the industry's inability to talk about modest working uses without inflating them is a recurring self inflicted wound. The piece must not name projects or companies, must not state adoption figures, must not present any use as a growth opportunity, and must not predict anything about the category.

#### 2027-04-19 &middot; `a-dissolution-taken-apart`

**Winding One Up Turns Out to Be the Hardest Part**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | DAOs after The DAO |
| seoTitle | Why Winding Up a DAO Is So Hard _(31 chars)_ |
| description | Dissolution requires agreeing who is owed what, executing distributions and closing obligations, none of which the governance design anticipated. _(145 chars)_ |
| lede | Starting one takes an afternoon and ending one can take years. |
| Links | `/articles/the-collective-purchase-groups/`, `/articles/contributor-compensation/`, `/articles/the-treasury-problem/` |

Follows the dissolution problem to its causes generically: no defined membership at a point in time, no procedure for valuing claims, assets that may be illiquid, and unresolved questions about obligations that survive. Argue that the absence of a wind up procedure is the single most consistent design omission across this entire category, and that it is directly traceable to founding documents written as manifestos rather than as constitutions. Commit to that as the finding. The piece must not name any organisation or dissolution, must not state distributions or amounts, must not give legal guidance, and must not characterise any participant's conduct.

#### 2027-04-20 &middot; `why-defi-worked-at-all`

**The Pieces Arrived in an Order That Made the Whole Thing Possible**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `timeline` |
| Cluster | The primitives |
| seoTitle | Why the DeFi Pieces Fitted Together _(35 chars)_ |
| description | Stable units of account, a token standard, pooled market making and lending arrived in a sequence where each unlocked the next. _(127 chars)_ |
| lede | None of the pieces was useful alone, and the order they arrived in is the reason it worked. |
| Links | `/articles/composability-and-the-lego-claim/`, `/articles/the-token-standard/`, `/articles/liquidity-mining-as-customer-acquisition/` |

Sequences the dependencies rather than the launches: a widely accepted stable unit made pricing possible, the token standard made integration free, pooled market making made anything tradable, and lending made positions financeable. Argue that this ordering explains why earlier attempts at on chain finance went nowhere despite similar ideas, and that the enabling condition was infrastructure rather than insight. Read the threshold honestly, noting that the same composability that made the expansion fast made the contraction correlated. The piece must not state total value figures for any period, must not name protocols, must not present the sequence as inevitable, and must not describe the period as a success or a bubble in valuation terms.

#### 2027-04-21 &middot; `the-issuer-regulatory-question`

**An Issuer Holding Reserves Against Redeemable Claims Is a Familiar Shape**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | Stablecoins as a mechanism |
| seoTitle | Why Regulators Recognised the Stablecoin Shape _(46 chars)_ |
| description | Taking deposits of value against redeemable claims resembles activities that are regulated everywhere, which is why supervisory attention arrived here first. _(157 chars)_ |
| lede | This part of crypto looked like something regulators already had a category for. |
| Links | `/articles/money-transmission-versus-securities/`, `/articles/why-dollars-won-on-chain/`, `/articles/the-reserve-disclosure-history/` |

Explains why this particular structure attracted supervisory attention ahead of the rest of the industry: it resembles arrangements that existing frameworks were built for, and the questions asked, about reserve quality, redemption and segregation, are the standard ones. Argue that the sector's relative regulatory progress compared with the rest of crypto is a direct consequence of being legible to existing categories. Note the unresolved question of which category actually applies, which differs by jurisdiction. The piece must not state any jurisdiction's current requirements, must not name legislation or issuers, must not give compliance or tax guidance, and must not predict any regulatory outcome.

#### 2027-04-22 &middot; `why-the-same-bugs-recur`

**The Industry Keeps Making Mistakes It Has Already Documented**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `postmortem` |
| Cluster | Exploits, taken apart |
| seoTitle | Why the Same Bugs Keep Recurring _(32 chars)_ |
| description | Known bug classes reappear years after being catalogued, and the reasons are structural rather than a matter of individual competence. _(134 chars)_ |
| lede | The same handful of mistakes keeps arriving, long after somebody wrote them all down. |
| Links | `/articles/reused-code-and-shared-fate/`, `/articles/the-audit-industry-that-followed/`, `/articles/the-anatomy-of-an-exploit/` |

Follows a recurring failure to its causes: continuous entry of new developers with no exposure to the incident history, incentives that reward shipping speed, forked code carrying old defects, and the absence of any licensing or certification gate. Take a clear position that this is not a knowledge problem, since the knowledge is public and well organised, but an incentive and turnover problem, which means better documentation will not fix it. Name the uncomfortable implication that a permissionless deployment environment guarantees a supply of unreviewed code holding real value. The piece must not name any incident or project, must not present any process as preventing recurrence, must not blame individuals, and must not offer readers security guidance.

#### 2027-04-23 &middot; `the-artist-side-of-it`

**For Some Artists It Was the First Time Selling Directly Worked**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `profile` |
| Cluster | NFTs and on-chain culture |
| seoTitle | The Artists for Whom Direct Sales Worked _(40 chars)_ |
| description | Independent creators reached buyers without galleries or platforms for a period, and what happened to that access afterwards matters. _(133 chars)_ |
| lede | A number of artists sold directly to buyers for the first time, and then the intermediaries came back. |
| Links | `/articles/what-survived-the-collapse/`, `/articles/royalties-were-never-enforceable/`, `/articles/the-marketplace-was-the-product/` |

A group profile of independent creators during and after the period, describing what changed about distribution and what did not, including the reappearance of curation, gatekeeping and platform fees as the market matured. Argue that the direct access was real while it lasted and that its erosion followed the ordinary logic of platform consolidation rather than anything specific to crypto. Handle the subject without romanticism, since the period was also punishing for many participants. The piece must not name artists, must not state earnings or sales, must not characterise anyone's financial outcome, and must not present the period as an opportunity for any reader.

#### 2027-04-24 &middot; `what-daos-are-good-at`

**The Honest Answer About What These Tools Actually Do Well**

| | |
| --- | --- |
| Era | `defiSummer` |
| Kind | `explainer` |
| Cluster | DAOs after The DAO |
| seoTitle | What DAOs Are Genuinely Good At _(31 chars)_ |
| description | Transparent treasuries, rapid formation, and public decision records are real capabilities, and everything else has been overclaimed. _(133 chars)_ |
| lede | Strip out the claims that did not survive and a short, real list remains. |
| Links | `/articles/a-dissolution-taken-apart/`, `/articles/governance-capture/`, `/articles/what-a-dao-became/` |

Sets out the capabilities that hold up under examination: a treasury anyone can inspect, formation without institutional permission, an auditable record of decisions, and a credible commitment to parameter rules. Argue that this is a genuinely useful set of properties that would have been an impressive claim on its own, and that the category damaged itself by claiming to replace the corporation. Commit to a position that the modest version is the durable one, and note which existing organisations have quietly adopted these properties. The piece must not name organisations, must not present any structure as suitable for a reader, must not give legal or organisational advice, and must not predict the category's future.

#### 2027-04-25 &middot; `what-custody-actually-means`

**Custody of a Bearer Asset Is a Different Job**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The custody problem |
| seoTitle | What Custody of a Bearer Asset Means _(36 chars)_ |
| description | Conventional custody rests on registries and reversibility, and holding a key that moves value irreversibly is a genuinely different problem. _(141 chars)_ |
| lede | Custody elsewhere means being on a register, and here it means physically controlling a secret. |
| Links | `/articles/the-omnibus-account-problem/`, `/articles/hot-wallets-and-the-operational-reality/` |

Sets out the difference precisely: a conventional custodian holds a position on a register that can be corrected, while a crypto custodian holds key material whose use is final and whose loss is permanent. Argue that this is why the industry could not simply hire existing custodians, and why the institutional entry took years longer than anyone expected. Establish that the hard part is process and controls rather than cryptography, which is the theme of the whole cluster. The piece must not name any custodian, must not describe any specific key management arrangement, must not advise a reader on holding anything, and must not present any approach as secure.

#### 2027-04-26 &middot; `why-a-wrapper-was-needed`

**Most Large Pools of Capital Can Only Buy Things in Certain Shapes**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | Why the Asset Needed a Wrapper _(30 chars)_ |
| description | Mandates, custody rules and operational systems mean many holders can buy a fund or a note but cannot buy the underlying asset at all. _(134 chars)_ |
| lede | The demand was never blocked by belief, it was blocked by the shape of the instrument. |
| Links | `/articles/what-custody-actually-means/`, `/articles/what-daos-are-good-at/`, `/articles/the-artist-side-of-it/` |

Explains the constraint plainly: investment mandates specify permitted instrument types, back office systems handle securities identifiers, and custody rules specify approved holders, so an asset that fits none of those is unbuyable regardless of anyone's view. Argue that this is why the wrapper story dominates the era, and why so much effort went into structures rather than into the asset itself. Establish the frame for the cluster without any market commentary. The piece must not describe any product as suitable for anyone, must not name products or issuers, must not state fund sizes or flows, and must not give investment guidance of any kind.

#### 2027-04-27 &middot; `the-corporate-treasury-decision`

**A Company Holding a Volatile Asset Has Changed What It Is**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | Treasuries and states |
| seoTitle | When a Company Holds a Volatile Asset _(37 chars)_ |
| description | A treasury allocation into a volatile asset changes a company's reported results and how its shares are analysed, regardless of the operating business. _(151 chars)_ |
| lede | Once the balance sheet moves with an asset price, the company is partly a fund whether it says so or not. |
| Links | `/articles/what-happened-to-the-money/`, `/articles/why-a-wrapper-was-needed/`, `/articles/what-custody-actually-means/` |

A profile of the corporate treasurer facing this decision and of what it does to the company: a material holding introduces a driver of reported results and share behaviour unrelated to the operating business, and analysts respond by valuing the two parts separately. Argue that this reframing, from an operating company to a hybrid, is the substantive change and it is rarely how these announcements were discussed. Keep everything at the level of what changes structurally. The piece must not name any company, must not state holdings, prices or results, must not give any accounting, reporting or tax treatment guidance, and must not offer any view on any company or its shares.

#### 2027-04-28 &middot; `what-a-central-bank-digital-currency-is`

**A Direct Claim on the Central Bank, Available to Everyone**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | What a Central Bank Digital Currency Is _(39 chars)_ |
| description | The defining feature is who the liability belongs to, not the technology used, and almost all popular coverage gets this backwards. _(131 chars)_ |
| lede | The novelty is whose promise it is, and everything else is implementation. |
| Links | `/articles/why-dollars-won-on-chain/`, `/articles/the-corporate-treasury-decision/`, `/articles/why-a-wrapper-was-needed/` |

Establishes the definition properly: currency in circulation is already a direct claim on the central bank and deposits are a claim on a commercial bank, so the proposal is to make a digital direct claim available. Argue that framing this as a blockchain project is the single most common error in the coverage, and that the design questions that actually matter are institutional. Set the frame for the cluster and note that this is where crypto's ideas met the institutions they were built to route around. The piece must not describe any specific project's status, must not name countries or systems, must not offer any view on monetary policy, and must not predict any implementation.

#### 2027-04-29 &middot; `identity-checks-for-a-bearer-asset`

**Identity Requirements Sit at the Edges, Not on the Network**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | Where Identity Checks Actually Happen _(37 chars)_ |
| description | The chain has no concept of a person, so every identity obligation attaches to the businesses at the boundary, which shapes the whole industry. _(143 chars)_ |
| lede | The protocol cannot know who you are, so the rules attach to whoever you deal with. |
| Links | `/articles/the-shift-to-the-cash-out-layer/`, `/articles/the-pseudonymity-misunderstanding/` |

Explains where obligations actually attach and why: the network is indifferent to identity, so requirements land on regulated intermediaries at the points where value enters or leaves. Argue that this produces a system in which the perimeter is heavily supervised and the interior is not, which is neither an oversight nor a loophole but a direct consequence of the architecture. Set the frame for the cluster. The piece must not describe any jurisdiction's current requirements, must not name firms, must not give any compliance guidance to a reader, and must not describe how to avoid any obligation.

#### 2027-04-30 &middot; `the-qualified-custodian-question`

**Many Institutions Cannot Hold It Themselves, By Rule**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The custody problem |
| seoTitle | Why Institutions Cannot Self Custody _(36 chars)_ |
| description | Fiduciary rules require certain holders to use an approved custodian, which made custody a licensing question before it was a technical one. _(140 chars)_ |
| lede | Many of the buyers everyone was waiting for were not permitted to hold the keys at all. |
| Links | `/articles/what-custody-actually-means/`, `/articles/money-transmission-versus-securities/` |

Explains why the identity of the custodian, rather than the quality of the custody, was the binding constraint for many potential holders, because rules for fiduciaries specify approved categories of custodian. Argue that this reframes the entire institutional adoption story, since the delay was a regulatory approval queue rather than a hesitation about the asset. Note that this is why banks entering the space was a bigger event than any price move. The piece must not state any jurisdiction's current requirements, must not name custodians or institutions, must not give any compliance or investment guidance, and must not describe any entity as approved.


### May 2027

_31 articles._

#### 2027-05-01 &middot; `the-trust-structure`

**A Closed Structure Where Shares Can Be Created but Not Easily Redeemed**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | The Closed Trust Structure, Explained _(37 chars)_ |
| description | A vehicle that issues shares against deposits but has no ordinary redemption mechanism will trade away from the value of what it holds. _(135 chars)_ |
| lede | If shares can go in and cannot come out, the share price and the holdings can drift apart indefinitely. |
| Links | `/articles/why-a-wrapper-was-needed/`, `/articles/order-books-without-market-makers/` |

Explains the mechanism carefully: creation without redemption breaks the arbitrage that normally keeps a fund's price close to its holdings, so the traded price is set by supply and demand for the shares themselves. Argue that this structural detail, and not sentiment, is the explanation for the persistent divergences these vehicles displayed, and that a great deal of commentary treated the divergence as a signal about the underlying asset. Keep it strictly mechanical. The piece must not state any premium or discount figure, must not name vehicles or sponsors, must not describe any period as an opportunity, and must not give investment guidance.

#### 2027-05-02 &middot; `adoption-that-was-mostly-announcement`

**The Gap Between Announcing Support and Actually Supporting It**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | Treasuries and states |
| seoTitle | Announced Adoption Versus Actual Adoption _(41 chars)_ |
| description | Corporate announcements about accepting or holding crypto frequently described pilots, intentions or intermediated arrangements rather than direct activity. _(156 chars)_ |
| lede | The press release and the implementation were often two very different things. |
| Links | `/articles/the-first-merchants/`, `/articles/why-early-adoption-figures-are-unknowable/` |

Follows a measurement failure to its cause by describing what corporate adoption announcements actually contained: acceptance intermediated by a processor with instant conversion, pilots limited in scope, or holdings held through a third party. Argue that this is the same measurement failure as the early merchant era, arriving with a much larger audience, and that the industry had every reason not to correct it. Read it against the threshold, since announced adoption expanded while implemented adoption is not measurable at all. The piece must not name companies, must not state adoption figures, must not characterise any company's announcement as dishonest, and must not offer any view on any business.

#### 2027-05-03 &middot; `wholesale-versus-retail`

**Two Completely Different Projects Share One Name**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | Wholesale Versus Retail Digital Currency _(40 chars)_ |
| description | One version settles between financial institutions and is largely uncontroversial, the other reaches the public and carries every difficult question. _(149 chars)_ |
| lede | One of these is plumbing between banks and the other is a change to what money the public holds. |
| Links | `/articles/what-a-central-bank-digital-currency-is/`, `/articles/adoption-that-was-mostly-announcement/`, `/articles/the-trust-structure/` |

Separates the two clearly: settlement between institutions is an upgrade to existing infrastructure with modest political content, while a version available to the public raises questions about privacy, bank funding and the state's relationship with individual payments. Argue that conflating them, which happens constantly, makes almost all public argument on the subject incoherent. Note that most actual work has been on the first while nearly all the argument has been about the second. The piece must not describe any project as active or abandoned, must not name systems or countries, must not take a position on any policy, and must not forecast anything.

#### 2027-05-04 &middot; `the-travel-rule-problem`

**Sending Customer Information Alongside a Transfer Is Harder Than It Sounds**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | Why the Travel Rule Was Hard to Implement _(41 chars)_ |
| description | Requiring originator and beneficiary details to accompany a transfer assumes both sides are identifiable institutions, which is often not the case here. _(152 chars)_ |
| lede | The rule assumes there is an institution at the other end, and frequently there is not. |
| Links | `/articles/identity-checks-for-a-bearer-asset/`, `/articles/the-shift-to-the-cash-out-layer/` |

Explains the requirement's origin in conventional payments, where both ends are regulated institutions with an established messaging network, and the specific difficulties of applying it where the counterparty may be a self hosted address or a business in another regime. Argue that the resulting proliferation of competing messaging solutions is a predictable outcome of an obligation without a standard, and that interoperability remains the unsolved part. Keep it descriptive. The piece must not state any jurisdiction's thresholds or requirements, must not name solutions or providers, must not give compliance guidance, and must not describe any workaround.

#### 2027-05-05 &middot; `key-splitting-and-thresholds`

**Removing the Single Person Who Could Take Everything**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The custody problem |
| seoTitle | Key Splitting and Threshold Signing _(35 chars)_ |
| description | Requiring several parties to cooperate before a transaction can be signed is the core control that makes institutional custody possible. _(136 chars)_ |
| lede | The whole discipline comes down to making sure no one person can move the money. |
| Links | `/articles/what-custody-actually-means/`, `/articles/the-multisig-behind-the-curtain/` |

Explains the two main approaches, on chain multiple signature schemes and off chain threshold computation, and states what each gives up, principally transparency in one case and protocol independence in the other. Argue that the underlying principle is the oldest control in finance, separation of duties, arriving in a new form, and that framing it that way is what eventually made the practice legible to auditors and regulators. Keep the explanation conceptual. The piece must not describe any specific configuration in use, must not name vendors, must not present any scheme as unbreakable, and must not give any reader operational guidance.

#### 2027-05-06 &middot; `the-arbitrage-that-was-not-there`

**Why Two Prices for the Same Thing Can Persist for Years**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | Why Two Prices Can Persist for Years _(36 chars)_ |
| description | Divergence between a vehicle and its holdings persists whenever the mechanism that would close it is blocked, and identifying the blockage is the analysis. _(155 chars)_ |
| lede | A gap that nobody can close is not a mispricing, it is a description of the structure. |
| Links | `/articles/the-trust-structure/`, `/articles/the-reference-price-problem/` |

Generalises the previous piece into a reusable mechanism: prices converge when somebody can profitably trade both sides, and they do not when creation, redemption, borrowing or settlement is unavailable. Argue that this single idea explains a surprising share of crypto market behaviour, including venue price differences during banking disruptions and derivative basis during periods of constrained credit. Commit to teaching the mechanism rather than describing any instance. The piece must not state any price differences or basis levels, must not name venues or instruments, must not describe any gap as tradable, and must not be written in a way any reader could act on.

#### 2027-05-07 &middot; `the-consultant-report-genre`

**The Institutional Research That Appeared Was Mostly Commissioned**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | Treasuries and states |
| seoTitle | Who Paid for the Institutional Research _(39 chars)_ |
| description | Reports making the case for institutional adoption were often produced or funded by parties with an interest in the conclusion, and rarely said so. _(147 chars)_ |
| lede | A lot of the serious looking research had somebody with an interest paying for it. |
| Links | `/articles/adoption-that-was-mostly-announcement/`, `/articles/why-early-adoption-figures-are-unknowable/` |

A profile of the institutional research provider in this sector, working through the genre it produced: survey based reports on institutional intentions, allocation studies and market sizing, and the funding and methodology disclosures that accompanied them. Argue that the recurring weaknesses are self selecting samples, questions about intention rather than behaviour, and sponsorship that appears in small print, and that these reports were then cited as independent evidence. Establish a reading habit for the site rather than attacking anyone. The piece must not name any report, firm or author, must not repeat any survey figure, must not accuse anyone of misconduct, and must not present any research as reliable or unreliable individually.

#### 2027-05-08 &middot; `the-disintermediation-problem`

**If Everyone Can Hold Central Bank Money, What Funds the Banks**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | The Bank Disintermediation Problem _(34 chars)_ |
| description | Deposits fund lending, and a safe alternative available to everyone could move deposits at exactly the wrong moment. _(116 chars)_ |
| lede | The design problem is that the safest option becomes most attractive precisely during a crisis. |
| Links | `/articles/wholesale-versus-retail/`, `/articles/what-a-central-bank-digital-currency-is/` |

Explains the mechanism: commercial bank deposits fund credit, a risk free digital alternative competes with them, and the competition is strongest during stress, which is when deposit flight is most damaging. Argue that this is the central design constraint behind the holding limits and tiered remuneration that appear in nearly every published design, and that those features are not arbitrary. Present the counterargument that the effect may be smaller than modelled. The piece must not state any figures or model results, must not name systems, must not offer any view on banking policy, and must not predict outcomes.

#### 2027-05-09 &middot; `screening-and-the-tainted-coin-problem`

**Fungibility Breaks When Some Units Are Treated as Suspect**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | The Tainted Coin Problem, Explained _(35 chars)_ |
| description | If venues screen incoming transfers against transaction history, identical units stop being interchangeable, which changes the asset's properties. _(146 chars)_ |
| lede | Two units of the same thing stop being the same thing once somebody starts checking where they have been. |
| Links | `/articles/chain-analysis-becomes-a-business/`, `/articles/the-issuer-as-a-chokepoint/` |

Explains the mechanism and its consequence: screening against transaction graphs means a unit's acceptability depends on its history, which undermines fungibility, a property money is generally assumed to have. Argue that this is a genuine and underdiscussed consequence of transparency, that it creates a burden on innocent recipients with no process for challenge, and that it recurs in every jurisdiction that adopts screening. Present the countervailing argument that screening serves real objectives. The piece must not name vendors, venues or lists, must not describe how screening is evaded, must not state error rates, and must not give any reader guidance about anything they hold.

#### 2027-05-10 &middot; `the-operational-controls-nobody-had`

**The Hard Part Was Never the Cryptography**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | The custody problem |
| seoTitle | Why Custody Is an Operations Problem _(36 chars)_ |
| description | Access reviews, dual control, tested recovery, physical security and staff vetting are what separate a custodian from a company with a hardware wallet. _(151 chars)_ |
| lede | The cryptography was solved decades ago and the operating procedures were not. |
| Links | `/articles/key-splitting-and-thresholds/`, `/articles/what-an-audit-would-have-caught/` |

Follows the operational failures across this site to their common cause: the differentiator between a custodian and an amateur is a control environment covering personnel, physical access, tested recovery, change management and independent review. Argue that the crypto industry spent a decade discussing key schemes and almost none discussing these, which is why so many failures were operational. Take the position that this discipline is unglamorous, well documented in other industries, and was simply not read. The piece must not describe any organisation's controls, must not present any control set as sufficient, must not give operational or audit guidance to a reader, and must not name firms.

#### 2027-05-11 &middot; `futures-and-cash-settlement`

**A Contract That Never Delivers Anything Still Needs a Real Price**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | Cash Settled Futures and the Reference Price _(44 chars)_ |
| description | Cash settled contracts avoid custody entirely and therefore depend completely on the index they settle against, which becomes the sensitive component. _(150 chars)_ |
| lede | If nothing is delivered, everything rests on the number used to settle. |
| Links | `/articles/the-reference-price-problem/`, `/articles/why-a-wrapper-was-needed/` |

Explains why regulated venues reached for cash settlement first, since it avoids the custody problem entirely, and why that displaces the difficulty onto index construction and its manipulation resistance. Argue that this is the moment reference rate methodology stopped being a convenience and became a supervised matter, which is a genuine maturation. Connect back to the early era where a single venue's tape served as the world's price. The piece must not state contract specifications, volumes or prices, must not name venues or indexes, must not describe any contract as available to a reader, and must not give trading or investment guidance.

#### 2027-05-12 &middot; `a-country-makes-it-legal-tender`

**One Government Made It Legal Tender, and the Details Matter**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | Treasuries and states |
| seoTitle | When a Country Made It Legal Tender _(35 chars)_ |
| description | A national law requiring acceptance was a genuine first, and what the law actually required differs from how it was widely reported. _(132 chars)_ |
| lede | The law said specific things, and almost nobody reporting on it read them. |
| Links | `/articles/how-to-read-a-regulatory-document/`, `/articles/stablecoins-as-payment-rails/` |

Sequences the legislative and implementation steps using the published law and official communications, being precise about what obligations were created, for whom, and with what exceptions and state provided mechanisms. Argue that the reporting on both sides was unusually poor and that the primary documents settle several disputed points. Establish what a legal tender designation does and does not mean as a matter of law generally. The piece must not characterise the government or its motives, must not state adoption or usage figures, must not comment on the country's finances or borrowing, must not give any view on the policy's wisdom, and must not predict any outcome.

#### 2027-05-13 &middot; `the-two-tier-design`

**Nearly Every Design Keeps the Banks in the Middle**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | Why Every Design Keeps Banks in the Middle _(42 chars)_ |
| description | Published designs almost universally distribute through existing institutions, which preserves the current structure and answers several problems at once. _(154 chars)_ |
| lede | Almost nobody proposed that the central bank open accounts for the public directly. |
| Links | `/articles/the-disintermediation-problem/`, `/articles/wholesale-versus-retail/` |

Explains the intermediated architecture and what it resolves: the central bank does not take on customer service, identity verification or fraud handling, and the existing distribution and compliance machinery is reused. Argue that this design choice makes the proposals far more conservative than the debate implies, and that it also blunts most of the claimed benefits. Note that this is the direct opposite of the design philosophy in every earlier era of this site. The piece must not describe any project's chosen architecture without a published source, must not name systems, must not evaluate any design, and must not offer policy views.

#### 2027-05-14 &middot; `the-sanctions-question`

**Applying Restrictions to Software Rather Than to People**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | When Restrictions Apply to Software _(35 chars)_ |
| description | Measures aimed at code rather than at persons raised questions about scope, developer exposure and enforceability that remain unsettled. _(136 chars)_ |
| lede | The novel question is what it means to restrict a piece of software that anyone can copy. |
| Links | `/articles/mixers-and-the-privacy-argument/`, `/articles/screening-and-the-tainted-coin-problem/` |

Describes the general legal and practical question at a conceptual level: restrictions are ordinarily directed at persons and entities, and applying them to publicly available software raises questions about scope, about parties who merely interact with it, and about enforceability when the code is replicable. Argue that this is a genuinely novel institutional problem rather than a familiar one, and that reasonable people in both compliance and civil liberties have taken it seriously. Present the positions and refuse to resolve them. The piece must not describe any specific measure, designation, case or individual, must not give legal advice, must not state anyone's exposure, and must not take a position on any government action.

#### 2027-05-15 &middot; `insurance-for-digital-assets`

**Insuring Something That Can Be Taken Instantly and Never Returned**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | The custody problem |
| seoTitle | Insuring Digital Assets, Explained _(34 chars)_ |
| description | Cover for custodied holdings exists but is narrower than usually understood, and the exclusions are where the substance sits. _(125 chars)_ |
| lede | The word insured does a lot of work in this industry and the policy usually does less. |
| Links | `/articles/the-operational-controls-nobody-had/`, `/articles/the-cover-that-did-not-cover/` |

Follows the failure of a trust signal to its cause by reading what such policies typically address, generally crime and physical loss of key material, against what they generally do not, including protocol failure and losses at parties other than the custodian. Argue that the marketing use of the word insured, without naming the insured party, the perils or the limits, is one of the industry's most persistent misleading practices. Note the capacity constraint honestly, since the market for this cover is small relative to the assets. The piece must not name insurers, brokers or custodians, must not state coverage limits or premiums, must not describe any holdings as insured, and must not advise a reader on cover.

#### 2027-05-16 &middot; `the-applications-and-the-queue`

**A Decade of Applications, Withdrawals and Refilings**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | The Long Queue of Product Applications _(38 chars)_ |
| description | Exchange traded product applications were filed, amended, withdrawn and refiled over many years, and the sequence is a documented public record. _(144 chars)_ |
| lede | The paperwork trail runs for about a decade and is one of the better documented parts of this history. |
| Links | `/articles/futures-and-cash-settlement/`, `/articles/how-to-read-a-regulatory-document/` |

Sequences the filing history at a structural level, showing the pattern of application, request for comment, amendment and withdrawal, and what each round of amendments reveals about the concerns being addressed. Argue that this record is unusually good history, because it is dated, public and written by the parties themselves, and that almost nobody reads it. Establish that a queue of this length is normal for a novel product type rather than evidence of anything. The piece must not name applicants or state outcomes without the filings in hand, must not characterise any regulator's motives, must not predict any approval, and must not give investment guidance.

#### 2027-05-17 &middot; `the-legal-tender-experiment-examined`

**What Can Actually Be Established About How It Went**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | Treasuries and states |
| seoTitle | What Can Be Established About the Experiment _(44 chars)_ |
| description | Claims about usage, downloads and merchant acceptance come from interested parties, and the verifiable record is thinner than either side suggests. _(147 chars)_ |
| lede | Both the enthusiastic account and the dismissive one rest on numbers nobody can check. |
| Links | `/articles/a-country-makes-it-legal-tender/`, `/articles/the-consultant-report-genre/` |

Follows the evidence rather than the outcome: identifies which claims about usage have a verifiable basis, which come from surveys with methodological limits, and which come from parties with an interest. Argue that the honest position is that the experiment is under measured, and that both the celebratory and the dismissive accounts are built on the same weak data. Name the contest and refuse to resolve it. The piece must not repeat any usage or download figure as fact, must not characterise the government or any official, must not comment on the country's public finances, and must not present the experiment as a success or a failure.

#### 2027-05-18 &middot; `privacy-in-a-state-ledger`

**The Privacy Question Is the One Nobody Has Answered Well**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | Privacy in a State Issued Digital Currency _(42 chars)_ |
| description | Cash is anonymous by construction, and every digital replacement must decide how much of that to preserve and how. _(114 chars)_ |
| lede | Replacing cash means deciding, deliberately, how much anonymity to leave in the system. |
| Links | `/articles/the-two-tier-design/`, `/articles/the-pseudonymity-misunderstanding/`, `/articles/mixers-and-the-privacy-argument/` |

Sets out the genuine tension: obligations around illicit finance require traceability, cash provides anonymity that the public is accustomed to, and the technical approaches to partial privacy, tiered thresholds and cryptographic schemes, are real but partial. Argue that this is the substantive core of the political opposition and that dismissing it as paranoia misreads a legitimate design question. Name the contest and describe both positions accurately. The piece must not take a position on surveillance policy, must not name any project or country, must not characterise any government, and must not present any privacy technology as sufficient.

#### 2027-05-19 &middot; `the-licensing-regimes`

**Jurisdictions Built Licensing Regimes at Very Different Speeds**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | The compliance layer |
| seoTitle | How Licensing Regimes Actually Developed _(40 chars)_ |
| description | Some regulators built bespoke frameworks early, others applied existing categories, and the divergence shaped where businesses located. _(135 chars)_ |
| lede | The map of where crypto businesses are registered is a map of who wrote rules first. |
| Links | `/articles/the-accommodating-jurisdictions/`, `/articles/identity-checks-for-a-bearer-asset/` |

Sequences the general development of licensing approaches at a structural level: bespoke regimes, adaptation of existing money services categories, and comprehensive frameworks arriving later. Argue that the sequence explains business location decisions far better than tax or talent, and that the first movers acquired durable concentrations of activity. Read it against the threshold, since regulatory tolerance expanded in some places and contracted in others at the same moment. The piece must not name jurisdictions as favourable, must not describe any current regime, must not name any licensed business, and must not give any structuring or compliance guidance.

#### 2027-05-20 &middot; `custody-as-a-separate-business`

**The Unbundling That Should Have Happened Ten Years Earlier**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | The custody problem |
| seoTitle | When Custody Became Its Own Business _(36 chars)_ |
| description | Separating who holds the assets from who runs the market is standard everywhere else, and it arrived in crypto slowly and incompletely. _(135 chars)_ |
| lede | Splitting the custodian from the exchange is the oldest control in market structure and it took a decade. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/the-qualified-custodian-question/`, `/articles/what-mt-gox-changed/` |

Sequences the emergence of standalone custody providers and the entry of established financial institutions into the role, and assesses how far the separation actually went. Argue that this is the single most important structural change of the era and that its incompleteness, with major venues still holding customer assets, is what left the industry exposed to what came next. Read it against the threshold directly, since the separation expanded for institutional flows while retail activity stayed bundled. The piece must not name providers or institutions, must not state assets under custody, must not describe any current arrangement, and must not present separation as guaranteeing safety.

#### 2027-05-21 &middot; `the-stated-objections`

**The Objections Were Written Down, Repeatedly and Specifically**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `primarySource` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | Reading the Stated Objections to Approval _(41 chars)_ |
| description | Published orders set out concerns about market manipulation, surveillance and custody in detail, and reading them beats reading commentary about them. _(150 chars)_ |
| lede | The reasons were published in full and most commentary summarised the summaries. |
| Links | `/articles/the-applications-and-the-queue/`, `/articles/how-to-read-a-regulatory-document/` |

Built around the published orders as documents: what concerns were actually stated, how they were framed analytically, and how the reasoning developed across successive decisions. Argue that these documents are the clearest available statement of what a supervisor considers necessary for a market to support a retail product, and that they are useful far beyond this one asset class. Establish the practice of citing the order rather than the coverage. The piece must not summarise any order without the document in hand, must not characterise any regulator's intent, must not predict outcomes, and must not give any reader investment or legal guidance.

#### 2027-05-22 &middot; `states-that-hold-seized-assets`

**Governments Became Significant Holders Without Deciding To**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Treasuries and states |
| seoTitle | How Governments Became Large Holders _(36 chars)_ |
| description | Forfeiture and seizure made several states substantial holders, which raises questions about custody, disposal and market effect that nobody planned for. _(153 chars)_ |
| lede | The largest state holdings were acquired by enforcement, not by policy. |
| Links | `/articles/when-a-government-becomes-a-seller/`, `/articles/the-seizure-and-what-it-proved/` |

Explains the mechanism and the resulting institutional problem: assets acquired through legal process must be custodied, accounted for and eventually disposed of by agencies with no experience of any of it. Argue that the disposal question, whether to sell promptly or hold, is a genuine policy question that has largely been answered by procedure rather than by deliberation. Connect back to the earliest forfeiture auctions to show how the scale changed. The piece must not state holdings or values for any government, must not name specific seizures or cases, must not predict any disposal, and must not describe any government holding as a market factor.

#### 2027-05-23 &middot; `the-offline-requirement`

**Cash Works When the Power Is Out, and That Is a Hard Requirement**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | The Offline Payment Requirement _(31 chars)_ |
| description | Any credible cash replacement must work without connectivity, which is a demanding constraint that most digital payment systems do not meet. _(140 chars)_ |
| lede | The thing being replaced works in a blackout, which turns out to be a difficult specification. |
| Links | `/articles/the-double-spend-problem/`, `/articles/privacy-in-a-state-ledger/` |

Explains why offline capability is treated as a requirement rather than a feature, covering resilience, inclusion and the double spend problem that reappears exactly as it did in the earliest era of this site. Argue that this is the most technically interesting part of the work, because preventing double spending without a network is the original problem in a new setting, and the answers involve secure hardware and deferred settlement. Draw the connection back to the site's opening cluster explicitly. The piece must not describe any implementation, must not name projects or vendors, must not present any approach as solved, and must not offer policy views.

#### 2027-05-24 &middot; `the-compliance-vendor-industry`

**A Supplier Industry Grew Up Between the Rules and the Businesses**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | The compliance layer |
| seoTitle | The Compliance Vendor Industry _(30 chars)_ |
| description | Screening, monitoring and reporting became products sold by specialist firms, which concentrated interpretive judgement in private hands. _(137 chars)_ |
| lede | The interpretation of the rules is increasingly embedded in software somebody sells. |
| Links | `/articles/chain-analysis-becomes-a-business/`, `/articles/screening-and-the-tainted-coin-problem/` |

A profile of the compliance vendor as an institution, describing how the supplier industry grew and the structural consequence that when compliance is purchased as a product the vendor's methodology becomes the effective standard across many firms at once, without ever being published or examined. Argue that this concentration of interpretive authority in commercial hands is a genuine governance question that neither regulators nor the industry has addressed. Note that the same pattern exists in conventional finance and is better scrutinised there. The piece must not name vendors, must not describe any methodology, must not state accuracy figures, and must not evaluate any product.

#### 2027-05-25 &middot; `self-custody-as-a-product`

**Making Key Management Usable Is a Twenty Year Failure**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | The custody problem |
| seoTitle | Why Self Custody Stayed Hard to Use _(35 chars)_ |
| description | Seed phrases, recovery, device loss and inheritance remain unsolved as consumer experiences, and every proposed fix reintroduces a third party. _(143 chars)_ |
| lede | The design problem is that the safe option is unforgiving and every friendly option adds someone to trust. |
| Links | `/articles/lost-keys-and-unverifiable-losses/`, `/articles/running-a-node-when-nobody-did/` |

Follows a twenty year design failure to its cause: absolute control means no recovery, and every mechanism that restores recoverability, social recovery, backup services or account abstraction, introduces a party who could be compromised or compelled. Argue that this is a genuine hard trade off and not a matter of designers being careless, and that the industry's habit of blaming users for losses has obscured it. Take the position that key management usability, not throughput, is the actual adoption constraint. The piece must not recommend any wallet, method or product, must not describe any recovery scheme as safe, must not give any reader operational guidance, and must not state loss statistics.

#### 2027-05-26 &middot; `the-surveillance-sharing-argument`

**The Argument Turned on Whether Anyone Was Watching the Underlying Market**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | The Surveillance Argument, Explained _(36 chars)_ |
| description | A listing venue is expected to be able to detect manipulation in the market it references, which is difficult when that market is global and unregulated. _(153 chars)_ |
| lede | The question was not whether the asset was risky, it was whether anyone could see manipulation if it happened. |
| Links | `/articles/the-stated-objections/`, `/articles/the-reference-price-problem/` |

Explains the concept of surveillance sharing between related markets, why it is a standard expectation for listed products, and why a global market of independent venues made the ordinary answer unavailable. Argue that this was the substantive core of the disagreement and that public debate was overwhelmingly about sentiment instead. Note how the eventual arrangements addressed it and be careful not to overstate their completeness. The piece must not describe any current arrangement as adequate, must not name venues or products, must not state market share or volume figures, and must not give investment guidance.

#### 2027-05-27 &middot; `mining-as-industrial-policy`

**Some Governments Treated Mining as an Export Industry**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Treasuries and states |
| seoTitle | When Mining Became Industrial Policy _(36 chars)_ |
| description | Jurisdictions with surplus power have courted mining as a way to monetise energy that cannot easily be exported any other way. _(126 chars)_ |
| lede | For a country with stranded power, an industry that can be built next to the generator is an interesting proposition. |
| Links | `/articles/mining-as-an-energy-business/`, `/articles/the-geographic-migration/` |

Explains the policy logic without endorsing it: energy that cannot be transmitted or stored has little value, and an interruptible, location indifferent load can monetise it, which is a genuine argument that deserves to be stated properly. Present the counterarguments, including grid effects, employment intensity and the concentration of benefit, at the same level of seriousness. Argue that the debate has been conducted almost entirely in slogans on both sides. The piece must not name jurisdictions or companies, must not state energy or employment figures, must not take a position on any energy policy, and must not describe mining as beneficial or harmful.

#### 2027-05-28 &middot; `why-a-blockchain-is-usually-not-used`

**A Known Operator Does Not Need Permissionless Consensus**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | Why These Projects Skip the Blockchain _(38 chars)_ |
| description | Consensus among mutually distrusting strangers solves a problem a central bank does not have, so most designs use conventional databases. _(137 chars)_ |
| lede | The expensive part of the design exists to remove an operator, and here the operator is the point. |
| Links | `/articles/byzantine-fault-tolerance-plainly/`, `/articles/what-a-central-bank-digital-currency-is/` |

Explains the reasoning directly: the machinery of open consensus exists to allow agreement without a trusted operator, and a central bank is a trusted operator by definition, so the machinery is a cost with no corresponding benefit. Argue that this is the cleanest available demonstration of when a blockchain is the wrong tool, and that being able to say so is a mark of technical seriousness rather than hostility. Note where distributed ledger techniques genuinely are used, in settlement between multiple institutions. The piece must not name projects or their architectures without a source, must not disparage any technology choice, must not present any design as correct, and must not offer policy views.

#### 2027-05-29 &middot; `the-de-risking-effect`

**The Cheapest Way to Manage the Risk Is to Refuse the Customer**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | The compliance layer |
| seoTitle | Why Banks Simply Refused the Sector _(35 chars)_ |
| description | When supervisory expectations are uncertain and penalties are large, declining a whole category of customer is the rational institutional response. _(147 chars)_ |
| lede | Faced with an unclear rule and a large penalty, an institution says no to the entire category. |
| Links | `/articles/the-banking-relationship-problem/`, `/articles/the-licensing-regimes/` |

A profile of the bank compliance function as the decisive actor: the upside of a customer is bounded and the downside of a supervisory finding is not, so uncertainty produces categorical refusal rather than case by case assessment. Argue that this explains the sector's banking difficulties far better than any account of hostility, and that the same dynamic affects other sectors and other countries. Connect it back to the earliest era, where losing a bank account ended more businesses than any hack. The piece must not name banks or affected firms, must not characterise any institution's decisions as improper, must not describe any current banking policy, and must not give any reader guidance.

#### 2027-05-30 &middot; `the-inheritance-problem`

**A Bearer Asset With No Registry Is a Problem for Every Estate**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The custody problem |
| seoTitle | The Inheritance Problem for Bearer Assets _(41 chars)_ |
| description | Assets with no register and no issuer cannot be located or recovered by anyone who does not already know they exist and how to reach them. _(138 chars)_ |
| lede | If nobody knows it exists and nobody has the key, it is simply gone. |
| Links | `/articles/self-custody-as-a-product/`, `/articles/lost-keys-and-unverifiable-losses/` |

Explains the structural problem for estates and successors generally: no institution holds a record to be discovered, no issuer can reissue, and the security properties that protect a holder also defeat any legitimate successor. Argue that the industry's proposed solutions all involve disclosing key material to someone in advance, which is the same trade off as recovery. Keep it entirely at the level of the property's characteristics. The piece must not give legal, estate, probate or tax advice of any kind, must not describe any planning arrangement, must not name any service, and must not tell a reader what to do about their own holdings.

#### 2027-05-31 &middot; `the-compromise-products`

**The Products That Shipped First Were the Ones That Avoided the Hard Part**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | The Products That Avoided the Hard Part _(39 chars)_ |
| description | Vehicles holding regulated derivatives rather than the asset itself cleared the approval path earlier and carry different mechanics as a result. _(144 chars)_ |
| lede | The first products through the door held contracts rather than the thing itself, and that is not a detail. |
| Links | `/articles/futures-and-cash-settlement/`, `/articles/the-applications-and-the-queue/` |

Explains the structural difference between holding an asset and holding contracts referencing it, including the effects of rolling positions and of the relationship between contract prices at different maturities. Argue that these products were widely reported as equivalent to holding the asset and are not, and that the distinction is exactly the sort of thing a history site should make plain. Keep the explanation mechanical and comparative. The piece must not state performance differences, roll costs or returns, must not name products or issuers, must not describe any product as suitable, and must not give investment guidance.


### June 2027

_30 articles._

#### 2027-06-01 &middot; `remittances-as-the-claimed-use`

**The Remittance Argument Was Made Constantly and Tested Rarely**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | Treasuries and states |
| seoTitle | The Remittance Argument, Examined _(33 chars)_ |
| description | Cross border transfers were the most cited use case for a decade, and the last mile problem is where the argument usually stops being examined. _(143 chars)_ |
| lede | The transfer is the easy part and the cash at the other end is the hard part. |
| Links | `/articles/stablecoins-as-payment-rails/`, `/articles/adoption-that-was-mostly-announcement/` |

Follows the failure of the most cited use case to its cause by separating the claim into moving value across a border, converting into local currency, and delivering it to someone without a bank account, of which the technology addresses only the first. Argue that this is why the use case kept being cited and kept not arriving at scale, and that the stablecoin corridors that did work are a partial answer that changes the shape of the claim. Take the position that the industry oversold this specific case more than any other. The piece must not state remittance costs, volumes or corridor figures, must not name providers or corridors, must not describe any service as available or advisable, and must not comment on any country's currency controls.

#### 2027-06-02 &middot; `fast-payments-as-the-real-competitor`

**Instant Bank Transfers Solved Most of the Problem First**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | The state's own answer |
| seoTitle | How Fast Payment Systems Got There First _(40 chars)_ |
| description | Domestic instant transfer systems delivered most of the practical benefits without any new form of money, which reshaped the case for everything else. _(150 chars)_ |
| lede | In many countries the payment problem was quietly solved by upgrading the bank rails. |
| Links | `/articles/why-a-blockchain-is-usually-not-used/`, `/articles/stablecoins-as-payment-rails/` |

Sequences the arrival of modern instant payment systems alongside the crypto payments story and argues that they addressed most of the everyday case that both crypto payments and retail digital currency proposals were built to serve. Take the position that this is the most consequential and least discussed development in payments during this whole period, and that its existence changes what the remaining problems are, which are largely cross border. Note that it does nothing for the properties crypto was built for. The piece must not name systems or countries, must not state adoption or cost figures, must not evaluate any system, and must not offer policy views.

#### 2027-06-03 &middot; `onboarding-as-a-bottleneck`

**The Slowest Step Was Always Opening the Account**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | Why Onboarding Was the Real Bottleneck _(38 chars)_ |
| description | Institutional entry required counterparty due diligence, documentation and approvals that took months, and this was the actual pace of adoption. _(144 chars)_ |
| lede | The delay everyone described as caution was mostly a queue of documents. |
| Links | `/articles/the-de-risking-effect/`, `/articles/the-compliance-vendor-industry/`, `/articles/the-licensing-regimes/` |

Describes the practical process an institution goes through to begin dealing with a new counterparty and why each step takes as long as it does, from documentation through credit and operational review to internal approval. Argue that this administrative reality is the real explanation for the pace of institutional participation, and that the industry consistently narrated it as sentiment. Connect back to the piece on what institutions actually asked for. The piece must not name institutions or providers, must not state timelines as rules, must not give compliance or onboarding guidance, and must not describe any process as current.

#### 2027-06-04 &middot; `the-address-verification-problem`

**Sending to the Wrong Address Is Final and Common**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The custody problem |
| seoTitle | Why Sending to the Wrong Address Is Final _(41 chars)_ |
| description | Irreversibility means an ordinary clerical error becomes a permanent loss, and the industry's answers to this are conventions rather than protections. _(150 chars)_ |
| lede | There is no beneficiary bank to call and no reversal window. |
| Links | `/articles/self-custody-as-a-product/`, `/articles/what-custody-actually-means/` |

Explains the class of loss and the partial mitigations that emerged, checksummed formats, name services, allow listed destinations and small test transfers, and states clearly that these are conventions rather than guarantees. Argue that irreversibility, presented as a headline feature, is experienced by ordinary users primarily as the absence of an error correction process that every other payment system has. Note that institutions solved this with process controls rather than technology. The piece must not give operational instructions to a reader, must not name tools or services, must not state error rates or losses, and must not describe any mitigation as reliable.

#### 2027-06-05 &middot; `the-approval-and-what-changed`

**Approval Changed the Plumbing More Than It Changed the Asset**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | What Product Approval Actually Changed _(38 chars)_ |
| description | The significant change was access through ordinary brokerage and reporting systems, not anything about the underlying network. _(126 chars)_ |
| lede | Nothing about the protocol changed, and everything about who could reach it did. |
| Links | `/articles/the-stated-objections/`, `/articles/the-surveillance-sharing-argument/`, `/articles/the-compromise-products/` |

Sequences the approval and the operational changes that followed, focusing on distribution, custody arrangements and the appearance of the asset inside conventional reporting and advisory systems. Argue that the substance of the change is plumbing and that describing it as validation confuses a regulatory determination about a product's structure with a view about an asset. Read it against the threshold, since access expanded enormously while nothing about the underlying network moved at all. The piece must not state flows, prices or fund sizes, must not name products or issuers, must not describe the approval as an endorsement, and must not give investment guidance.

#### 2027-06-06 &middot; `the-multilateral-response`

**International Bodies Framed This as Financial Stability, Not Innovation**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | Treasuries and states |
| seoTitle | How International Bodies Framed the Question _(44 chars)_ |
| description | Multilateral institutions approached crypto through financial stability, capital flows and monetary sovereignty, which is a different conversation entirely. _(156 chars)_ |
| lede | The institutions with a global view were asking about capital flows, not about technology. |
| Links | `/articles/why-dollars-won-on-chain/`, `/articles/the-issuer-regulatory-question/` |

A profile of the multilateral institution as a participant in this history, explaining the analytical frame it uses and why that produces different conclusions from a technology or consumer protection frame, particularly around dollarisation, capital flow management and monetary policy transmission. Argue that the industry has mostly not engaged with this literature and has therefore been surprised by positions that were entirely predictable from it. Present the concerns as arguments to be understood rather than as opposition. The piece must not name institutions or reports without the document in hand, must not summarise any position without a source, must not offer macroeconomic views, and must not characterise any body's motives.

#### 2027-06-07 &middot; `the-cbdc-pilots`

**A Great Deal of Research, Very Little Deployment**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | The state's own answer |
| seoTitle | The Pilots, Sequenced Honestly _(30 chars)_ |
| description | Many central banks have published research and run limited trials, and the number of full public deployments remains very small. _(128 chars)_ |
| lede | The gap between the volume of research and the amount of deployment is the finding. |
| Links | `/articles/fast-payments-as-the-real-competitor/`, `/articles/the-two-tier-design/` |

Sequences the general pattern of activity, from research programmes to limited pilots to the small number of live systems, at a structural level rather than by naming projects. Argue that the discrepancy between attention and deployment reflects genuine unresolved design questions rather than institutional slowness, and that the pilots have largely functioned as a way to learn what the hard parts are. Read it against the threshold, since research activity expanded rapidly while deployment barely moved. The piece must not name any country or system, must not state numbers of projects, must not describe any pilot's results, and must not predict any launch.

#### 2027-06-08 &middot; `self-hosted-wallet-rules`

**The Rules Struggle Most at the Boundary With Personal Control**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | Rules at the Self Hosted Wallet Boundary _(40 chars)_ |
| description | Obligations designed for transfers between institutions get difficult when one side is a person holding their own keys, and proposals here are contested. _(153 chars)_ |
| lede | The framework works between institutions and gets hard when one end is a person with a key. |
| Links | `/articles/identity-checks-for-a-bearer-asset/`, `/articles/the-travel-rule-problem/`, `/articles/self-custody-as-a-product/` |

Explains the boundary problem: obligations assume an identifiable institution on both ends, and personal key holding is the case that breaks the assumption, producing proposals ranging from ownership attestation to transfer restrictions. Argue that this boundary is where the compliance framework and the technology's core property meet directly, and that it is the most likely site of the next decade's arguments. Present the positions rather than adjudicating. The piece must not describe any jurisdiction's current or proposed rules, must not give any compliance guidance, must not tell a reader anything about their own holdings, and must not take a position.

#### 2027-06-09 &middot; `what-institutions-actually-asked-for`

**The Institutional Buyer Wanted Boring Things, and Waited for Them**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | The custody problem |
| seoTitle | What Institutional Buyers Actually Asked For _(44 chars)_ |
| description | The requirements that delayed entry were unglamorous: an approved custodian, a reference price, reporting formats and a compliance sign off. _(140 chars)_ |
| lede | The list of blockers was administrative, and the industry kept answering with technology. |
| Links | `/articles/custody-as-a-separate-business/`, `/articles/the-qualified-custodian-question/`, `/articles/the-reference-price-problem/` |

A group profile of the institutional allocator as a category, describing the actual approval path a new asset must clear and why each step took as long as it did. Argue that the industry consistently misread this delay as scepticism about the technology when it was a queue through operational due diligence, custody approval and committee process. Take the position that the people who understood this were building infrastructure while everyone else was arguing on social platforms. The piece must not name any institution or individual, must not state allocation sizes, must not describe any allocation decision as sound, and must not offer investment framing of any kind.

#### 2027-06-10 &middot; `index-construction-becomes-regulated`

**Somebody Now Has to Answer for How the Price Is Calculated**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | When Index Construction Became Supervised _(41 chars)_ |
| description | Benchmark methodology, source venue selection and manipulation controls moved from a vendor decision to a supervised process with published rules. _(146 chars)_ |
| lede | The number everybody quotes now has a documented method and somebody responsible for it. |
| Links | `/articles/the-reference-price-problem/`, `/articles/futures-and-cash-settlement/` |

Explains what benchmark governance involves, published methodology, source selection criteria, handling of outliers and a process for changes, and why this matters more than it sounds when contracts settle against the output. Argue that this is one of the clearest genuine improvements in the industry's history and one of the least noticed, because it is administrative. Connect it back to the early era's single venue reference price to show the distance travelled. The piece must not name index providers or methodologies, must not state index levels, must not describe any benchmark as reliable, and must not give investment guidance.

#### 2027-06-11 &middot; `the-pension-and-endowment-question`

**Fiduciaries Face a Different Question From Everyone Else**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `profile` |
| Cluster | Treasuries and states |
| seoTitle | The Fiduciary Question, Explained _(33 chars)_ |
| description | A fiduciary must justify a decision by process rather than by outcome, which changes what evidence is required before anything can be considered. _(145 chars)_ |
| lede | The fiduciary question is not whether it goes up, it is whether the process was defensible. |
| Links | `/articles/what-institutions-actually-asked-for/`, `/articles/the-qualified-custodian-question/` |

A profile of the fiduciary allocator as a decision maker: the standard is prudence of process, documented analysis and suitability to the mandate, which means the absence of established analysis is itself a barrier. Argue that this explains the very slow movement of long horizon institutional capital far better than any narrative about conviction. Keep it entirely about the decision framework. The piece must not name institutions, must not state allocations, must not describe any allocation as prudent or imprudent, must not give investment, fiduciary or legal advice, and must not forecast anything.

#### 2027-06-12 &middot; `the-political-argument`

**The Objections Are Political, and Naming Them Properly Is the Job**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The state's own answer |
| seoTitle | The Political Argument, Stated Fairly _(37 chars)_ |
| description | Opposition rests on concerns about surveillance, programmability and the state's role in individual transactions, and those are arguments rather than noise. _(156 chars)_ |
| lede | The objection is about what a state could do with the system, not about whether it would work. |
| Links | `/articles/privacy-in-a-state-ledger/`, `/articles/the-cbdc-pilots/`, `/articles/the-network-asked-to-take-a-side/` |

States the opposing positions in their strongest form: proponents point to inclusion, resilience and payment system competition, and opponents point to the capabilities a state acquires when it can see and potentially condition individual payments. Argue that the second concern is about capability rather than intent, which is a coherent way to reason about institutional design and is routinely dismissed as conspiracy. Name the contest and refuse to adjudicate it. The piece must not endorse either position, must not name any country, government or official, must not repeat any specific political claim as fact, and must not predict any policy.

#### 2027-06-13 &middot; `the-privacy-compliance-deadlock`

**Both Sides Are Right, Which Is Why It Does Not Resolve**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | The Privacy and Compliance Deadlock _(35 chars)_ |
| description | Financial privacy and financial transparency are both defensible objectives, and no technology has delivered a version of both that satisfies either camp. _(154 chars)_ |
| lede | This argument does not resolve because both positions are coherent and they genuinely conflict. |
| Links | `/articles/mixers-and-the-privacy-argument/`, `/articles/privacy-in-a-state-ledger/`, `/articles/what-enforcement-learned/` |

States the deadlock precisely: a public ledger makes ordinary financial privacy unusually weak, privacy technology makes ordinary supervision unusually weak, and the proposed middle grounds, selective disclosure and proof of compliance schemes, require an authority to define what is being proved. Argue that this is the industry's most durable unresolved question and that anyone claiming to have solved it has usually just chosen a side. Name the contest and describe the strongest version of each position. The piece must not endorse either position, must not name technologies or projects as solutions, must not describe any tool's effectiveness, and must not give any reader guidance.

#### 2027-06-14 &middot; `the-cost-of-getting-custody-wrong`

**Every Large Failure in This History Is a Custody Failure**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | The custody problem |
| seoTitle | Every Large Failure Was a Custody Failure _(41 chars)_ |
| description | Sort the collapses by mechanism and the same answer appears: somebody held assets for other people and the arrangement did not hold. _(132 chars)_ |
| lede | Different eras, different vocabulary, and underneath it the same failure every time. |
| Links | `/articles/custody-as-a-separate-business/`, `/articles/the-early-exchange-failure-pattern/`, `/articles/the-omnibus-account-problem/` |

Follows the major failures across the whole site back to a single common element, which is a third party holding assets for others without adequate segregation, controls or verification. Argue that this makes custody the central subject of crypto history rather than a technical footnote, and that the industry's attention has been persistently misallocated. Commit to that as the site's strongest structural claim, and be explicit that it is a claim rather than a settled finding. The piece must not name any failure or firm, must not state amounts, must not describe any current arrangement as safe, and must not advise a reader on where or how to hold anything.

#### 2027-06-15 &middot; `what-the-wrapper-does-not-change`

**The Wrapper Solves Access and Leaves the Asset Exactly As It Was**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | Wall Street builds a wrapper |
| seoTitle | What the Wrapper Does Not Change _(32 chars)_ |
| description | Approval addresses the structure of a product, not the properties of what it holds, and conflating the two produced a lot of confused commentary. _(145 chars)_ |
| lede | A regulator approving a product's structure is not a statement about what the product holds. |
| Links | `/articles/the-approval-and-what-changed/`, `/articles/why-enforcement-was-slow/`, `/articles/why-a-wrapper-was-needed/` |

Draws the cluster to a close by separating what changed, access, custody arrangements and reporting integration, from what did not, which is every property of the underlying network. Argue that the industry's tendency to read approvals as validation is the same error as reading enforcement silence as permission, and that both come from wanting an authority to have an opinion. Commit to that as a general reading rule for the site. The piece must not describe the asset as having any investment characteristics, must not name products, must not state prices or flows, and must not offer any forecast or recommendation.

#### 2027-06-16 &middot; `what-institutional-adoption-measured`

**The Phrase Institutional Adoption Was Never Defined**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `postmortem` |
| Cluster | Treasuries and states |
| seoTitle | What Institutional Adoption Actually Measured _(45 chars)_ |
| description | The term covered a bank building a desk, a fund buying a product and a company issuing a press release, which are not the same event. _(133 chars)_ |
| lede | The phrase was used for everything, which is a good sign that it measured nothing. |
| Links | `/articles/adoption-that-was-mostly-announcement/`, `/articles/the-consultant-report-genre/`, `/articles/what-the-wrapper-does-not-change/` |

Follows a term's failure as a measurement to its cause by taking it apart into the distinct events it described, which carry entirely different weight: infrastructure being built, capital being allocated, and statements being made. Argue that the conflation was commercially useful to almost everyone involved and that a history site should refuse the term and name the specific event instead. Commit to that as the cluster's conclusion and as a rule for the whole site. The piece must not state any adoption figure, must not name institutions or products, must not describe adoption as growing or shrinking in market terms, and must not offer any investment framing.

#### 2027-06-17 &middot; `what-the-state-borrowed`

**The Institutions Took the Ideas and Left the Politics**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `timeline` |
| Cluster | The state's own answer |
| seoTitle | What Central Banks Borrowed From Crypto _(39 chars)_ |
| description | Programmable settlement, atomic exchange and cryptographic privacy techniques were absorbed into institutional work without the accompanying arguments. _(151 chars)_ |
| lede | The techniques travelled into the institutions and the ideology did not. |
| Links | `/articles/why-a-blockchain-is-usually-not-used/`, `/articles/the-political-argument/`, `/articles/flash-loans-what-they-actually-are/` |

Sequences what was actually adopted and when, including settlement finality by construction, exchange without a settlement intermediary, and cryptographic techniques for selective disclosure, noting that each arrived stripped of any claim about removing intermediaries. Argue that this is the most common fate of a radical technology and that it is neither a betrayal nor a vindication, which is an uncomfortable conclusion for both camps. Commit to that reading and close the cluster on it. The piece must not name projects or institutions, must not claim any specific borrowing without a published source, must not evaluate the outcome as good or bad, and must not offer policy views.

#### 2027-06-18 &middot; `what-compliance-actually-catches`

**Nobody Publishes What Any of This Actually Prevents**

| | |
| --- | --- |
| Era | `institutional` |
| Kind | `explainer` |
| Cluster | The compliance layer |
| seoTitle | What the Compliance Layer Actually Catches _(42 chars)_ |
| description | Enormous resources go into screening and reporting, and there is very little public evidence about what the whole apparatus prevents. _(133 chars)_ |
| lede | The system is expensive, universal and almost entirely unmeasured. |
| Links | `/articles/the-compliance-vendor-industry/`, `/articles/the-reputational-inheritance/`, `/articles/why-early-adoption-figures-are-unknowable/` |

Argues that the effectiveness question is genuinely open: outputs such as reports filed and accounts refused are measured, outcomes such as harm prevented are not, and this is true of financial crime compliance generally rather than of crypto specifically. Take a clear position that a control regime with no published effectiveness measure should be described as unmeasured rather than as effective, and that this applies equally to the industry's critics and defenders. Close the cluster on the measurement theme that runs through the whole site. The piece must not state any effectiveness or illicit activity figure, must not cite vendor estimates as data, must not name any jurisdiction or firm, and must not argue for or against any compliance requirement.

#### 2027-06-19 &middot; `how-a-cascade-propagates`

**A Cascade Is Just Collateral Falling Into Other People's Margin Calls**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | The 2022 credit cascade |
| seoTitle | How a Credit Cascade Actually Propagates _(40 chars)_ |
| description | Forced selling lowers a price, the lower price triggers more forced selling elsewhere, and the loop runs until somebody with unlevered capital steps in. _(152 chars)_ |
| lede | One forced seller creates the price that forces the next one, and that is the whole mechanism. |
| Links | `/articles/liquidation-mechanics/`, `/articles/hosting-and-the-capital-structure/` |

Establishes the mechanism for the cluster: leverage against volatile collateral, thresholds that trigger liquidation, and the reflexive loop where selling produces the price that triggers more selling. Argue that nothing about this is specific to crypto and that the literature on it is a century old, which makes the industry's surprise a failure to read rather than a novel event. Note the two features that made this instance faster, which are continuous markets and automated liquidation. The piece must not state any price, loss or exposure figure, must not name firms, must not describe any position as a trade, and must not offer any market view.

#### 2027-06-20 &middot; `what-the-business-actually-was`

**Four Businesses, One Group, No Wall Between Them**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | FTX, taken apart |
| seoTitle | What the Business Actually Was _(30 chars)_ |
| description | An exchange, a broker, a proprietary trading firm and a token issuer inside one group is a structure regulated markets separate deliberately. _(141 chars)_ |
| lede | Every function that regulated markets keep in separate companies was in one group here. |
| Links | `/articles/what-an-exchange-actually-is/`, `/articles/the-omnibus-account-problem/`, `/articles/custody-as-a-separate-business/` |

Describes the group structure from the public record and maps each function to how it is separated in a regulated market, including who is normally prohibited from trading against customers and why. Argue that the structure alone, without any allegation about conduct, was sufficient to guarantee a conflict, and that its existence was publicly known and treated as unremarkable. Set the frame for the cluster, which is that the structure is the story and the personalities are not. The piece must not describe any charge, plea, trial or verdict, must not characterise any individual, must not state financial figures, and must not assert what anyone knew or intended.

#### 2027-06-21 &middot; `the-merkle-tree-approach`

**How a Customer Can Check They Were Counted**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `primarySource` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | How a Customer Can Check They Were Counted _(42 chars)_ |
| description | Committing to a set of balances in a structure each customer can verify is the working half of proving solvency, and it works well. _(131 chars)_ |
| lede | The part that works lets you confirm your own balance was in the total without seeing anyone else's. |
| Links | `/articles/proof-of-solvency-before-it-had-a-name/`, `/articles/what-the-business-actually-was/`, `/articles/how-a-cascade-propagates/` |

Built around the published scheme and a worked description of it: balances are committed into a tree, a root is published, and each customer receives a path proving their balance is included in the committed total without revealing others. Argue that this component is genuinely sound and solves a real problem, which makes it worth understanding before the cluster explains why the overall scheme still falls short. Note that participation is partial by construction, since only customers who check are protected. The piece must not name any venue or implementation, must not present any published proof as verified, must not state figures, and must not tell a reader that any venue is solvent.

#### 2027-06-22 &middot; `the-enforcement-wave`

**The Cases Arrived Together Because the Conduct Did**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | Enforcement and the courts |
| seoTitle | Why the Enforcement Cases Arrived Together _(42 chars)_ |
| description | A concentration of actions followed a concentration of failures, with the usual multi year lag between conduct and consequence. _(127 chars)_ |
| lede | The cases clustered because the conduct clustered, several years earlier. |
| Links | `/articles/the-first-enforcement-wave/`, `/articles/why-enforcement-was-slow/` |

Sequences the general pattern of enforcement activity in this period at a categorical level, distinguishing matters arising from failures from matters arising from classification questions. Argue that the apparent intensity reflects a lag catching up rather than a change of policy, and that this is the same dynamic documented after the earlier token sale period. Read it against the threshold, with regulatory tolerance contracting well after market activity had already contracted. The piece must not name any matter, defendant, settlement or penalty, must not describe the merits of anything, must not state amounts, and must not predict any outcome.

#### 2027-06-23 &middot; `why-insolvency-produces-the-best-records`

**The Best Sources in This History Are Bankruptcy Filings**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | Why Insolvency Produces the Best Records _(40 chars)_ |
| description | Insolvency compels disclosure that no journalist could obtain, under oath, on a schedule, and into a public docket anyone can read. _(131 chars)_ |
| lede | A failed company discloses more in six months than a working one does in ten years. |
| Links | `/articles/mt-gox-in-the-bankruptcy-record/`, `/articles/the-enforcement-wave/`, `/articles/the-merkle-tree-approach/` |

Sets up the cluster by explaining why insolvency proceedings are the richest documentary source available on this industry: statutory disclosure duties, sworn statements, professionals with investigative mandates and a public filing system. Argue that this makes the failures better documented than the successes, which systematically distorts any history written from available sources, including this one. Name that distortion openly as a limitation of the site's own method. The piece must not describe any specific proceeding or party, must not state amounts, must not give legal advice, and must not treat any filing's contents as adjudicated fact.

#### 2027-06-24 &middot; `the-separation-that-finally-happened`

**Custody and Trading Are Being Pulled Apart, Slowly**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | What settled and what did not |
| seoTitle | The Separation That Is Finally Happening _(40 chars)_ |
| description | The structural change the industry avoided for a decade is arriving through licensing and institutional demand rather than through any single decision. _(151 chars)_ |
| lede | The change everyone identified after the first great failure is arriving fifteen years later. |
| Links | `/articles/custody-as-a-separate-business/`, `/articles/the-cost-of-getting-custody-wrong/` |

Sequences the structural movement toward separating asset holding from market operation, driven by licensing regimes, institutional requirements and the practical consequences of the failures. Argue that this is the single most consequential structural change in the industry's history and that it arrived not through insight but through repeated loss. Read it against the threshold as the site's closing example, since the arrangement crossed the line only when the cost of not crossing it became undeniable. The piece must not name firms or jurisdictions, must not describe any current arrangement as complete or safe, must not state figures, and must not predict any further development.

#### 2027-06-25 &middot; `the-yield-that-funded-it`

**Where the Returns Were Coming From, When Anybody Asked**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | Where the Yields Were Actually Coming From _(42 chars)_ |
| description | Advertised returns were generated by lending, by basis trades, by token emissions or by new deposits, and only the last one is a problem by construction. _(153 chars)_ |
| lede | There are only a few places a return can come from, and one of them is the next depositor. |
| Links | `/articles/how-a-cascade-propagates/`, `/articles/liquidity-mining-as-customer-acquisition/`, `/articles/the-algorithmic-assumption/` |

Follows the failure of these products to a question nobody asked, enumerating the possible sources of an advertised return and what each requires to be sustainable: borrower demand, a persistent price relationship, newly issued tokens, or inflow. Argue that the industry's marketing routinely declined to specify which, and that the single most useful question a depositor could ask was answerable and almost never asked. Take the position that this is a disclosure failure rather than a complexity problem, because the answer fits in a sentence. The piece must not state any rate, must not name any platform or product, must not describe any yield as sustainable or otherwise, and must not give any reader guidance about depositing anything anywhere.

#### 2027-06-26 &middot; `the-affiliated-trading-firm`

**A Venue Trading Against Its Own Customers Is an Old Prohibited Thing**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | FTX, taken apart |
| seoTitle | Why Venues Cannot Trade Against Customers _(41 chars)_ |
| description | Rules separating market operators from proprietary traders exist because the operator sees the order flow and controls the rules of the venue. _(142 chars)_ |
| lede | The operator knows what everyone is doing, which is exactly why it is not allowed to trade. |
| Links | `/articles/what-the-business-actually-was/`, `/articles/what-a-pool-operator-controls/` |

Follows a structural conflict to its consequences: a venue operator sees pending orders, position data and liquidation levels and sets the rules of the venue, so an affiliated trading firm has advantages no other participant can obtain. Argue that this is why the separation is mandatory in regulated markets rather than a matter of good practice, and that the industry treated its absence as a technicality. Keep the analysis about the structure and its known consequences. The piece must not allege any specific conduct, must not describe any legal proceeding or finding, must not name or characterise individuals, and must not state trading figures.

#### 2027-06-27 &middot; `liabilities-are-the-hard-half`

**Proving You Have Assets Is Easy, Proving You Listed Every Debt Is Not**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | Why Liabilities Are the Hard Half _(33 chars)_ |
| description | Showing control of assets is straightforward on a public chain, and demonstrating that the liability side is complete is not possible from the chain at all. _(156 chars)_ |
| lede | You can prove what you hold and you cannot prove what you owe. |
| Links | `/articles/the-merkle-tree-approach/`, `/articles/what-an-audit-would-have-caught/` |

Explains the asymmetry at the centre of the whole subject: control of assets is demonstrable with signatures, while completeness of liabilities depends on the venue's own records and cannot be checked externally. Argue that this makes every reserve exercise fundamentally an assertion about liabilities dressed in cryptography, and that the cryptography is on the easy side of the problem. Commit to that as the cluster's central finding. The piece must not name venues or attestations, must not describe any published proof as adequate, must not state figures, and must not offer any reader a way to assess a venue.

#### 2027-06-28 &middot; `the-registration-theory`

**The Core Argument Was About Registration, Not About Crypto**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | The Registration Argument, Explained _(36 chars)_ |
| description | The central contested question was whether certain activities required registration under existing rules, a narrower dispute than coverage suggested. _(149 chars)_ |
| lede | The argument was procedural and the coverage made it existential. |
| Links | `/articles/the-investment-contract-test/`, `/articles/the-enforcement-wave/`, `/articles/how-to-read-a-regulatory-document/` |

Explains what a registration requirement actually entails, disclosure, conduct rules and supervision, and why the question of whether an activity falls inside an existing category is a legal one rather than a technological one. Argue that framing the dispute as being about whether crypto should exist made it impossible to follow, and that reading the filings makes it considerably more tractable. Present both sides' positions as they were argued. The piece must not state whether any activity or asset requires registration, must not give legal advice, must not name any matter or party, and must not predict any outcome.

#### 2027-06-29 &middot; `the-first-day-filings`

**The Opening Filings Set the Narrative for Everything After**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `primarySource` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | How Opening Filings Set the Narrative _(37 chars)_ |
| description | Initial declarations explain the business, the causes of failure and the immediate plan, and they are written by one party for a purpose. _(137 chars)_ |
| lede | The opening filing is the first draft of history and it has an author with an objective. |
| Links | `/articles/why-insolvency-produces-the-best-records/`, `/articles/the-registration-theory/`, `/articles/liabilities-are-the-hard-half/` |

Explains what these documents are for, which is to obtain immediate relief and orient the court, and why that purpose shapes what they emphasise. Argue that they are simultaneously the most useful and most over relied upon documents in this history, because they arrive first, read authoritatively and are written by a party with an interest. Establish the reading habit of noting who filed a document and what they were seeking. The piece must not quote any filing without the document in hand, must not name any case or party, must not treat any assertion as a finding, and must not give legal advice.

#### 2027-06-30 &middot; `what-survived-structurally`

**The Things That Are Still Running After Everything**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | What settled and what did not |
| seoTitle | What Is Still Running After Fifteen Years _(41 chars)_ |
| description | A small set of systems has operated continuously through every collapse in this history, and identifying what they have in common is worthwhile. _(144 chars)_ |
| lede | A handful of things have simply kept running through all of it. |
| Links | `/articles/the-separation-that-finally-happened/`, `/articles/why-most-clones-died/`, `/articles/the-cost-of-getting-custody-wrong/` |

Identifies what has operated continuously and asks what those systems share: minimal discretionary administration, no dependence on a single operator's solvency, and a narrow function. Argue that the common factor is the absence of a party who can fail, which is the original design proposition arriving as an empirical result rather than a claim. Be careful to distinguish continuous operation from usefulness or from value, since they are different questions. The piece must not name any system as an investment or an endorsement, must not state prices, market values or usage figures, must not predict continued operation, and must not advise readers.


### July 2027

_31 articles._

#### 2027-07-01 &middot; `reflexive-collateral`

**Borrowing Against Something You Also Issued**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | The Problem With Self Issued Collateral _(39 chars)_ |
| description | When the collateral is a token the borrower controls or created, the value of the collateral moves with the borrower's own solvency. _(132 chars)_ |
| lede | Collateral that falls precisely when the borrower is in trouble is not collateral. |
| Links | `/articles/how-a-cascade-propagates/`, `/articles/the-treasury-problem/`, `/articles/the-algorithmic-assumption/` |

Follows this failure class to its structural defect: collateral is supposed to be independent of the borrower's condition, and a self issued or closely held token is perfectly correlated with it, so the protection disappears exactly when it is needed. Argue that this arrangement appeared repeatedly across the era in different guises and was described as innovation each time. Take the position that this is the single most identifiable warning sign in the whole history, and that it is visible without any inside information. The piece must not name any firm or token, must not state loan or collateral values, must not describe any arrangement as fraudulent, and must not offer any reader an evaluation framework to act on.

#### 2027-07-02 &middot; `the-collateral-that-was-its-own-token`

**A Balance Sheet Supported by an Asset the Group Issued**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | FTX, taken apart |
| seoTitle | When the Collateral Was Self Issued _(35 chars)_ |
| description | Holding a large position in a thinly traded token you issued means the quoted value and the realisable value are different numbers. _(131 chars)_ |
| lede | A market price for an asset almost nobody trades is not a number you can rely on. |
| Links | `/articles/reflexive-collateral/`, `/articles/the-affiliated-trading-firm/`, `/articles/order-books-without-market-makers/` |

Follows a valuation failure to its cause: a large holding of a token with limited float and limited depth cannot be sold at the quoted price, so marking it at market overstates what it could realise. Argue that this is a standard and well understood issue in illiquid securities with established haircut practice, and that the absence of any such discipline here was structural. Connect it directly to the reflexive collateral piece, since this is the same defect at institutional scale. The piece must not state any valuation, holding or price, must not describe any legal finding, must not characterise anyone's intent, and must not name individuals.

#### 2027-07-03 &middot; `borrowed-assets-and-snapshot-gaming`

**A Snapshot Can Be Arranged in Advance**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | Why a Reserve Snapshot Can Be Arranged _(38 chars)_ |
| description | A demonstration of control at a moment can be satisfied with assets borrowed for that moment, which is a known and old problem. _(127 chars)_ |
| lede | Showing you hold something on Tuesday says nothing about who you borrowed it from on Monday. |
| Links | `/articles/liabilities-are-the-hard-half/`, `/articles/the-merkle-tree-approach/` |

Follows a known weakness in these exercises to its cause: a point in time demonstration can be satisfied by temporarily obtained assets, a practice with a long history in conventional finance under other names. Argue that continuous or randomised verification addresses this partially and that no venue has adopted an arrangement that removes it, because doing so would constrain ordinary operations. Note that this weakness is well known and rarely mentioned alongside the publications. The piece must not allege that any venue has done this, must not name venues or events, must not state figures, and must not present any verification schedule as sufficient.

#### 2027-07-04 &middot; `settlement-without-admission`

**A Settlement Is a Negotiated End, Not a Finding of Fact**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | Why a Settlement Is Not a Finding _(33 chars)_ |
| description | Most matters end by agreement without admitted findings, which means they establish far less than headlines about them imply. _(125 chars)_ |
| lede | A negotiated resolution decides that the matter is over, not what happened. |
| Links | `/articles/how-to-read-a-regulatory-document/`, `/articles/the-registration-theory/` |

Explains the mechanics and incentives: a firm may settle to remove uncertainty regardless of the merits, an agency may settle to conserve resources, and the resulting document typically contains no admission. Argue that treating settlements as established facts, which the industry and its critics both do, produces a badly distorted history. Establish this as one of the site's most important reading rules and connect it to the instrument taxonomy piece. The piece must not describe any specific settlement, must not name parties, must not state penalty amounts, must not characterise any party's conduct, and must not give legal advice.

#### 2027-07-05 &middot; `the-examiner`

**Sometimes a Court Appoints Somebody Whose Only Job Is to Find Out**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | The Examiner and What They Produce _(34 chars)_ |
| description | An independent investigator with access to records and testimony produces the closest thing this industry gets to a neutral account. _(132 chars)_ |
| lede | An investigator with subpoena power and no client is a rare thing in this subject. |
| Links | `/articles/the-first-day-filings/`, `/articles/why-insolvency-produces-the-best-records/` |

A profile of the court appointed examiner as a role: appointment, scope, powers, and the resulting report, and why such a report differs in kind from a party's filing or from journalism. Argue that these reports are the most valuable documents produced about any crypto failure and are read by almost nobody because they are long and undramatic. Note the limits honestly, since scope is defined by the court and cost constrains depth. The piece must not describe any specific examination or report, must not name cases or individuals, must not treat any report's conclusions as legally binding, and must not give legal advice.

#### 2027-07-06 &middot; `the-comprehensive-frameworks-arrive`

**Several Jurisdictions Now Have Actual Rulebooks**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | What settled and what did not |
| seoTitle | When Actual Rulebooks Finally Arrived _(37 chars)_ |
| description | Bespoke regimes covering issuance, venues, custody and stable units have been adopted in several places, which changes the nature of the industry's complaint. _(158 chars)_ |
| lede | The clarity that was always six months away arrived in some places and not others. |
| Links | `/articles/the-clarity-that-never-came/`, `/articles/the-licensing-regimes/` |

Sequences the general arrival of comprehensive regimes at a structural level and describes the categories they typically address, without stating any specific provision. Argue that the arrival changes the industry's position fundamentally, since a sector that spent a decade asking for rules must now decide whether it wanted rules or wanted an exemption. Take the position that the answer will differ by firm and that watching which firms comply and which relocate is the most informative signal available. The piece must not describe any framework's provisions or status, must not name jurisdictions or legislation, must not give compliance guidance, and must not predict outcomes.

#### 2027-07-07 &middot; `rehypothecation-explained`

**The Same Assets Can Support Several Claims at Once**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | The 2022 credit cascade |
| seoTitle | Rehypothecation, Explained Plainly _(34 chars)_ |
| description | Pledged assets that are re pledged onward create chains of claims on the same property, which is invisible until the chain is tested. _(133 chars)_ |
| lede | Your collateral can be posted onward by whoever holds it, and then again. |
| Links | `/articles/reflexive-collateral/`, `/articles/the-omnibus-account-problem/` |

Explains the practice, why it exists in conventional finance, the limits and disclosures that constrain it there, and what happens when the same practice occurs without those constraints. Argue that this is the mechanism that turned several separate failures into one connected event, and that its invisibility was a documentation choice rather than a technical necessity. Note that on chain positions were visible while the off chain arrangements were not, which is why the chain data misled observers. The piece must not name firms, must not state exposures, must not describe any arrangement as unlawful, and must not give any reader guidance about counterparty risk.

#### 2027-07-08 &middot; `customer-funds-and-segregation`

**Segregation Is a System, Not a Promise**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | FTX, taken apart |
| seoTitle | Why Segregation Is a System, Not a Promise _(42 chars)_ |
| description | Keeping customer assets separate requires separate accounts, reconciliation and controls that make commingling detectable, and none of it is automatic. _(151 chars)_ |
| lede | Saying customer assets are segregated means nothing unless something makes commingling impossible to hide. |
| Links | `/articles/what-the-business-actually-was/`, `/articles/the-omnibus-account-problem/`, `/articles/what-an-audit-would-have-caught/` |

Follows the failure class to its causes: segregation in regulated markets is enforced by separate accounts, daily reconciliation, independent verification and reporting, and a statement of segregation without those mechanisms is an assertion. Argue that the industry adopted the language of segregation without any of the machinery, and that customers had no way to test the claim. Take the position that verifiable segregation was technically achievable throughout and commercially unattractive. The piece must not describe any specific conduct, code path or system at any firm, must not state amounts, must not describe any legal proceeding or finding, and must not characterise individuals.

#### 2027-07-09 &middot; `the-off-chain-liability-problem`

**Debts to People Who Are Not Customers Do Not Appear Anywhere**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | The Liabilities That Never Appear _(33 chars)_ |
| description | Loans, guarantees and obligations to parties outside the customer base sit entirely outside any reserve exercise and can exceed everything in it. _(145 chars)_ |
| lede | The obligations that sink a venue are usually owed to somebody who is not a customer. |
| Links | `/articles/liabilities-are-the-hard-half/`, `/articles/rehypothecation-explained/` |

Follows the failure of reserve exercises to its cause, which is scope: they address customer balances, while borrowings, guarantees, related party obligations and contingent liabilities sit entirely outside them. Argue that this is the gap through which every major failure in this history has passed, and that it is a scope problem rather than an execution problem, which means better cryptography cannot close it. Take the position that only a full financial statement audit addresses it and that the sector has largely not obtained one. The piece must not name venues or their obligations, must not state figures, must not give accounting or audit guidance, and must not describe any venue as solvent or insolvent.

#### 2027-07-10 &middot; `criminal-versus-civil`

**Two Different Systems, Two Different Standards, One Word in the Headline**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | Criminal and Civil Matters Are Not the Same _(43 chars)_ |
| description | Different burdens of proof, different consequences and different parties, routinely reported with identical language. _(117 chars)_ |
| lede | The two proceedings answer different questions to different standards and the coverage calls both a case. |
| Links | `/articles/settlement-without-admission/`, `/articles/how-to-read-a-regulatory-document/` |

Explains the distinction in general terms: who brings each type of proceeding, what standard applies, what remedies are available, and why the same conduct can produce one, both or neither. Argue that the conflation is the single most common error in crypto reporting on legal matters and that it makes it impossible for a reader to weight anything correctly. Keep it entirely general and jurisdiction neutral. The piece must not describe any specific matter, must not name any party or individual, must not state outcomes, must not give legal advice, and must not comment on any pending proceeding.

#### 2027-07-11 &middot; `customer-property-versus-estate-property`

**Whether It Was Ever Yours Is the Question That Decides Everything**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | Customer Property Versus Estate Property _(40 chars)_ |
| description | Whether deposited assets belong to the customer or to the failed company determines recovery, and the answer depends on documents and on conduct. _(145 chars)_ |
| lede | The whole outcome turns on whether the assets were held for you or owed to you. |
| Links | `/articles/customer-funds-and-segregation/`, `/articles/the-omnibus-account-problem/`, `/articles/dollarised-claims-and-a-moving-asset/` |

Explains the distinction generically: property held in trust for a customer may be returnable, while a claim against a company shares in whatever the estate has, and which applies depends on the terms, the actual handling and the applicable law. Argue that this is where the earlier cluster on segregation becomes concrete, because segregation is what makes the first characterisation available. Emphasise that the answer is fact and jurisdiction specific and cannot be generalised. The piece must not state the outcome in any case, must not give legal advice, must not tell any reader what their position would be, and must not name proceedings or parties.

#### 2027-07-12 &middot; `the-institutional-re-entry`

**Institutions Came Back Through the Regulated Door**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | What settled and what did not |
| seoTitle | How Institutions Came Back In _(29 chars)_ |
| description | Renewed participation arrived through approved products, licensed venues and established custodians rather than through the channels that failed. _(145 chars)_ |
| lede | They came back, and they came back through completely different plumbing. |
| Links | `/articles/the-approval-and-what-changed/`, `/articles/what-institutional-adoption-measured/`, `/articles/the-separation-that-finally-happened/` |

Sequences the pattern of renewed institutional participation and notes that it flowed through regulated wrappers, licensed venues and established custodians rather than through the offshore and unregulated channels that dominated earlier. Argue that this is the clearest evidence that the failures changed behaviour, and that it also means the industry that returned is a different industry from the one that collapsed. Keep it strictly structural with no market commentary. The piece must not state flows, prices or allocations, must not name products, firms or institutions, must not describe participation as validation, and must not offer any investment framing or forecast.

#### 2027-07-13 &middot; `the-lenders-and-what-they-did`

**The Lending Businesses Were Banks Without Any of the Apparatus**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | The 2022 credit cascade |
| seoTitle | What the Crypto Lenders Actually Were _(37 chars)_ |
| description | Taking deposits, promising a return and lending onward is a recognisable business, and this version had no capital rules, no supervision and no backstop. _(153 chars)_ |
| lede | The shape was a bank and none of the machinery that makes a bank survivable was present. |
| Links | `/articles/rehypothecation-explained/`, `/articles/the-yield-that-funded-it/`, `/articles/what-an-exchange-actually-is/` |

A profile of the crypto lender as an institution, mapping each element of the business model to its conventional counterpart and naming what was missing: capital requirements, liquidity rules, supervision, deposit protection and a lender of last resort. Argue that the absence of all five was described as an advantage during the expansion and that the failure mode was therefore entirely conventional. Take the position that this is the clearest case on the site of an old structure being rebuilt without knowing what the safeguards were for. The piece must not name any lender, must not state deposit or loan figures, must not describe any firm's conduct, and must not advise a reader about any platform.

#### 2027-07-14 &middot; `the-week-it-ended`

**The Collapse Took Days and the Public Record Is Unusually Complete**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | FTX, taken apart |
| seoTitle | The Week It Ended, Sequenced _(28 chars)_ |
| description | Public statements, on chain movements and filings from a very short period make this one of the best documented corporate failures anywhere. _(140 chars)_ |
| lede | Very few corporate failures leave a public record this dense and this fast. |
| Links | `/articles/customer-funds-and-segregation/`, `/articles/the-collateral-that-was-its-own-token/`, `/articles/the-affiliated-trading-firm/` |

Sequences the period strictly from dated public artefacts: published statements, exchange announcements, observable chain movements and the initial filings. Argue that the density of the record is itself historically significant, because a comparable conventional failure would have produced almost none of it in public, and that this creates an unusual opportunity and an unusual temptation to over interpret. Mark clearly where the public record is silent. The piece must not quote any statement without an archived source, must not state balances or flows, must not describe any charge or proceeding, and must not assert what anyone knew at any point.

#### 2027-07-15 &middot; `zero-knowledge-proofs-of-solvency`

**Better Cryptography Improves the Half That Was Already Working**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | What Cryptographic Solvency Proofs Improve _(42 chars)_ |
| description | Newer schemes let a venue prove properties of its balance set without revealing individual balances, which is real progress on a real problem. _(142 chars)_ |
| lede | The new techniques are genuinely good and they improve the part that was never the problem. |
| Links | `/articles/the-off-chain-liability-problem/`, `/articles/liabilities-are-the-hard-half/` |

Explains what these schemes accomplish, principally proving statements about a committed set of balances without disclosing them, which addresses the privacy objection that limited earlier approaches. Argue that the improvement is real and is concentrated on the asset and privacy side, leaving the completeness of liabilities exactly where it was. Commit to the position that the industry's enthusiasm for cryptographic answers to institutional problems is the recurring pattern of this whole site. The piece must not name any scheme or implementation as adequate, must not describe any venue as verified, must not state figures, and must not present any proof as evidence of solvency.

#### 2027-07-16 &middot; `the-cross-border-problem`

**A Business With No Location Still Has to Be Somewhere**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | The Cross Border Enforcement Problem _(36 chars)_ |
| description | Distributed teams, offshore entities and global customers create genuine jurisdictional complexity that slows every stage of any proceeding. _(140 chars)_ |
| lede | The company is nowhere and the servers, the staff and the customers are all somewhere. |
| Links | `/articles/jurisdiction-shopping/`, `/articles/criminal-versus-civil/`, `/articles/the-enforcement-wave/` |

Explains the practical difficulties: establishing jurisdiction, obtaining evidence across borders, coordinating between agencies in different countries and enforcing any outcome. Argue that these frictions explain much of the delay that the industry read as tolerance, and that international coordination improved substantially over the period in ways that are rarely reported. Keep it structural and general. The piece must not describe any specific matter or extradition, must not name jurisdictions in connection with any case, must not name individuals, must not give legal advice, and must not predict outcomes.

#### 2027-07-17 &middot; `clawbacks-and-preferences`

**Getting Your Money Out First Does Not Always Mean Keeping It**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | Clawbacks: Getting Out First Is Not Enough _(42 chars)_ |
| description | Insolvency regimes can reverse payments made before a failure so that similar creditors are treated alike, which surprises people every time. _(141 chars)_ |
| lede | Withdrawing before the doors shut can be undone months later. |
| Links | `/articles/customer-property-versus-estate-property/`, `/articles/why-insolvency-produces-the-best-records/` |

Explains the general principle behind avoidance and preference rules, which is equal treatment of similar creditors, and why regimes look back at transfers made before a filing. Argue that this is one of the most consequential and least understood aspects of these failures for ordinary participants, and that the industry's advice culture ignored it entirely. Stress that the rules, periods and defences vary enormously by jurisdiction and by facts. The piece must not state any jurisdiction's rules or periods, must not give legal advice, must not tell any reader what their exposure is, and must not name any proceeding or party.

#### 2027-07-18 &middot; `what-the-technology-actually-does`

**After Fifteen Years, the Short and Honest Capability List**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | What settled and what did not |
| seoTitle | What the Technology Actually Does _(33 chars)_ |
| description | Settlement without a settlement operator, verifiable issuance and transfer, and programmable conditions on those transfers, and that is close to all of it. _(155 chars)_ |
| lede | The list of things this technology genuinely does is short and it is not nothing. |
| Links | `/articles/what-survived-structurally/`, `/articles/the-double-spend-problem/`, `/articles/what-the-state-borrowed/` |

States the capability list plainly and argues that it is both shorter than the industry claims and more significant than the critics allow: transfer without a clearing intermediary, publicly verifiable issuance and holding, and conditions enforced by execution rather than by a party. Argue that everything on this site that worked is an application of one of these and everything that failed involved reintroducing a trusted party while claiming otherwise. Commit to that as the site's central technical conclusion. The piece must not describe any use case as an opportunity, must not name systems or products, must not state adoption figures, and must not offer any forecast or recommendation.

#### 2027-07-19 &middot; `the-margin-call-you-cannot-see`

**On Chain Positions Are Visible and the Ones That Mattered Were Not**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | The Positions Nobody Could See _(30 chars)_ |
| description | Observers watched public lending positions closely while the decisive exposures sat in private bilateral agreements nobody could inspect. _(137 chars)_ |
| lede | Everyone was watching the transparent half of a system whose dangerous half was private. |
| Links | `/articles/the-lenders-and-what-they-did/`, `/articles/rehypothecation-explained/` |

Follows a failure of observation to its cause: on chain lending is public and was monitored in real time, while bilateral institutional lending sat in private agreements, so the visible data gave a systematically incomplete picture. Argue that this produced confident public analysis that was wrong in a specific and predictable direction, and that transparency in one layer can create false confidence about the whole. Commit to that as a general reading lesson. The piece must not name firms or positions, must not state exposure figures, must not describe any analysis as having predicted anything, and must not present on chain data as a risk tool for readers.

#### 2027-07-20 &middot; `the-controls-declaration`

**The Court Filing That Described the Control Environment**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `primarySource` |
| Cluster | FTX, taken apart |
| seoTitle | The Filing That Described the Controls _(38 chars)_ |
| description | A sworn filing by incoming management set out findings about recordkeeping and controls, and it is a far better source than any reporting about it. _(147 chars)_ |
| lede | The most quoted document in this story is a court filing that very few people have read. |
| Links | `/articles/the-week-it-ended/`, `/articles/how-to-read-a-regulatory-document/`, `/articles/mt-gox-in-the-bankruptcy-record/` |

Built around the filing as a document: who made it, in what capacity, what it states about records, controls and governance, and the important limitation that a filing by one party is an account rather than an adjudicated finding. Argue that reading it directly corrects several widely circulated paraphrases and also shows how much of the popular account rests on this single document. Establish the distinction between a sworn account and a finding as a general reading rule. The piece must not quote the filing without the document in hand, must not state its contents as adjudicated fact, must not describe any charge, plea or verdict, and must not characterise any individual.

#### 2027-07-21 &middot; `the-auditor-refusal`

**Firms Willing to Sign These Engagements Have Been Scarce**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | Why Few Firms Will Sign These Engagements _(41 chars)_ |
| description | Professional firms have been cautious about engagements in this sector, and the reasons are about liability, competence and scope rather than about crypto. _(155 chars)_ |
| lede | The scarcity of firms willing to sign is itself a piece of information. |
| Links | `/articles/attestation-versus-audit/`, `/articles/the-off-chain-liability-problem/` |

A profile of the professional accounting firm as a reluctant participant, tracing entries into and withdrawals from this work and the reasons behind them: unfamiliar subject matter, difficulty verifying control of keys, exposure if a client fails, and uncertainty about what standard applies. Argue that this scarcity is a structural constraint on the entire transparency project rather than a temporary condition. Note the emergence of specialist firms and what their smaller balance sheets mean for the value of an opinion. The piece must not name firms or clients, must not describe any specific engagement or withdrawal, must not allege professional failure, and must not evaluate any provider.

#### 2027-07-22 &middot; `the-venue-as-defendant`

**When the Exchange Itself Is the Subject, Everything Else Waits**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | When the Exchange Itself Is the Subject _(39 chars)_ |
| description | Proceedings against a venue affect its customers, its listings and its banking, which makes the collateral effects larger than the matter itself. _(145 chars)_ |
| lede | A proceeding against a venue reaches everyone who ever used it. |
| Links | `/articles/the-listing-decision-as-regulation/`, `/articles/criminal-versus-civil/`, `/articles/the-registration-theory/` |

Explains the structural consequences when a market operator rather than an issuer is the subject of proceedings: customers face uncertainty about access, listed assets face delisting decisions, and banking partners reassess. Argue that this makes venue level matters a form of market intervention regardless of their outcome, which is an argument for speed that cuts against the usual arguments for care. Present the tension without resolving it. The piece must not describe any specific matter, must not name venues or parties, must not state figures, must not give legal advice, and must not advise readers about any venue.

#### 2027-07-23 &middot; `the-claims-market`

**Claims Against a Failed Company Become Something You Can Sell**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | The Market in Bankruptcy Claims _(31 chars)_ |
| description | Buyers purchase creditor claims at a discount, providing early liquidity to creditors and concentrating the eventual recovery in specialist hands. _(146 chars)_ |
| lede | Somebody will buy your claim today for less than it might be worth in five years. |
| Links | `/articles/clawbacks-and-preferences/`, `/articles/the-decade-long-creditor-process/` |

A profile of the distressed claims buyer and the creditor on the other side: one needs certainty now and can sell, the other has legal expertise and patience and takes the outcome risk. Argue that this market performs a genuine function and also concentrates the eventual recovery among parties who are best placed to assess it, which is a familiar pattern rather than a scandal. Note the information asymmetry between the parties honestly. The piece must not state any claim prices or recovery rates, must not name any proceeding, buyer or seller, must not describe claim sale as advisable or otherwise, and must not give legal, financial or investment advice.

#### 2027-07-24 &middot; `the-ideas-that-were-right-too-early`

**Several Ideas Were Correct and Arrived Before Anything Could Support Them**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | What settled and what did not |
| seoTitle | The Ideas That Were Right Too Early _(35 chars)_ |
| description | Proof of solvency, formal specification, separated custody and privacy by construction were all proposed years before anyone would adopt them. _(142 chars)_ |
| lede | The good ideas were mostly published early and ignored until something expensive happened. |
| Links | `/articles/proof-of-solvency-before-it-had-a-name/`, `/articles/the-yellow-paper/` |

Sequences the proposals documented across this site that were correct, published and ignored, in the order they appeared, and asks what they had in common, which is that adopting them cost something immediately and saved something contingently. Argue that this is the most consistent pattern in fifteen years and that it is a governance and incentive finding rather than a technical one. Take the position plainly that the industry has never adopted a preventive measure before the loss it prevents. The piece must not present any idea as a solution to any current problem, must not name projects or people, must not predict adoption, and must not offer any recommendation.

#### 2027-07-25 &middot; `the-algorithmic-failure`

**The Design Failed the Way Its Critics Said It Would**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | How the Algorithmic Design Actually Failed _(42 chars)_ |
| description | A large peg system unwound through the exact mechanism that had been described publicly in advance, which makes it a useful case rather than a mystery. _(151 chars)_ |
| lede | The failure mode was written down in advance by people who were ignored, which is the interesting part. |
| Links | `/articles/the-algorithmic-assumption/`, `/articles/the-yield-that-funded-it/`, `/articles/the-peg-defence-mechanism/` |

Follows the failure to its causes using only the public record and chain data: an incentive that attracted deposits, a stabilising mechanism dependent on demand for a paired asset, and an unwinding once that demand reversed. Argue that the most useful thing about this case is that the mechanism was described publicly beforehand and dismissed, which makes it a study in why warnings do not work rather than in why designs fail. Handle the human consequences seriously without sensationalism. The piece must not state amounts, prices or holder numbers, must not name or characterise any individual, must not describe any legal proceeding, and must not assert anyone's intent.

#### 2027-07-26 &middot; `the-auditor-question`

**What an Audit Opinion Covers, and Who It Is For**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | FTX, taken apart |
| seoTitle | What an Audit Opinion Actually Covers _(37 chars)_ |
| description | An opinion addresses whether statements are fairly presented under a framework, which is narrower than the assurance most readers assume it gives. _(146 chars)_ |
| lede | An audit opinion answers a specific question, and it is not the question most people think. |
| Links | `/articles/attestation-versus-audit/`, `/articles/what-an-audit-would-have-caught/`, `/articles/customer-funds-and-segregation/` |

Explains what an audit engagement covers, the scope and materiality concepts involved, who the opinion is addressed to, and what it does not undertake to detect. Argue that the industry's use of an audit as a general trust signal was a misunderstanding that suited everybody, and that the same misunderstanding recurs with attestations and reserve reports. Keep the discussion entirely about the nature of the engagement in general terms. The piece must not name any firm or engagement, must not describe any specific audit or auditor, must not state any accounting or tax treatment, must not give accounting or audit guidance to any reader, and must not allege professional failure by anyone.

#### 2027-07-27 &middot; `why-firms-stopped-publishing`

**A Wave of Publications, Then Quiet**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | Why the Reserve Publications Stopped _(36 chars)_ |
| description | Reserve publication surged after the largest failure and then thinned, which is the same voluntary transparency pattern documented across this site. _(148 chars)_ |
| lede | Everybody published for a while, and then most of them stopped. |
| Links | `/articles/the-reserve-disclosure-history/`, `/articles/the-auditor-refusal/`, `/articles/proof-of-solvency-before-it-had-a-name/` |

Sequences the pattern at a structural level: a burst of publication in response to a crisis, then declining frequency as attention moved, which is precisely what happened after earlier failures a decade before. Argue that this is the expected behaviour of voluntary disclosure and the strongest available argument that the practice needs to be required rather than encouraged. Read it against the threshold, since disclosure expanded sharply and contracted quietly. The piece must not name venues or their publication history, must not state how many venues published, must not characterise any firm's decision, and must not advise readers.

#### 2027-07-28 &middot; `the-staking-question`

**A Service That Pays a Return Looks Like Something Regulators Recognise**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | Why Staking Services Attracted Attention _(40 chars)_ |
| description | Offering a managed return on deposited assets is a familiar arrangement, and the distinction between running a validator and selling a product matters. _(151 chars)_ |
| lede | Running a validator yourself and buying a product that pays you a return are not the same thing. |
| Links | `/articles/the-first-proof-of-stake-attempts/`, `/articles/the-registration-theory/`, `/articles/the-yield-that-funded-it/` |

Explains the underlying mechanism, that networks using stake based consensus pay validators, and then distinguishes participating directly from purchasing a service in which somebody else operates and promises a return. Argue that the second has a shape that existing frameworks recognise and the first largely does not, and that most public argument ignored the distinction entirely. Present the industry's counterargument fairly. The piece must not state whether any arrangement requires registration anywhere, must not name providers or matters, must not state any return, must not give legal, investment or tax guidance, and must not advise a reader on participating.

#### 2027-07-29 &middot; `crypto-denominated-claims-again`

**The Same Valuation Problem, Ten Years Later, Still Unresolved**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | The Same Claim Valuation Problem Returns _(40 chars)_ |
| description | Fixing claims in currency at a filing date produces contested outcomes when the estate holds the same asset the claim was denominated in. _(137 chars)_ |
| lede | The problem from the first great exchange failure came back unchanged. |
| Links | `/articles/dollarised-claims-and-a-moving-asset/`, `/articles/customer-property-versus-estate-property/` |

Returns to the valuation problem introduced a decade earlier on this site and shows that it recurred in essentially identical form, with the same arguments and no settled answer. Argue that the persistence of an unresolved legal question across a decade of repeated failures is itself the finding, and that it reflects how rarely these matters reach a decision that binds anyone. Present the competing positions and mark the question open. The piece must not state the rule in any jurisdiction as settled, must not use prices to illustrate the effect, must not give legal advice, must not name any proceeding, and must not predict any outcome.

#### 2027-07-30 &middot; `the-promises-that-were-not-kept`

**The Claims That Fifteen Years Have Falsified**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | What settled and what did not |
| seoTitle | The Promises That Were Not Kept _(31 chars)_ |
| description | Banking the unbanked, replacing intermediaries, cheap global payments and code as enforcement have each been tested, and the results are documented. _(148 chars)_ |
| lede | Several of the founding claims have now been tested for long enough to answer. |
| Links | `/articles/remittances-as-the-claimed-use/`, `/articles/why-exchanges-became-the-industry/`, `/articles/code-is-law-after-the-fork/` |

Follows the industry's recurring promises to their outcomes without softening: intermediaries returned and grew, payment costs were addressed mainly by conventional systems, and enforcement by code proved conditional. Argue that a history site that cannot say this plainly is not a history site, and that stating it is compatible with taking the technology seriously. Commit to the position that the gap between claim and outcome is the industry's central credibility problem and it is self inflicted. The piece must not overcorrect into claiming the technology is useless, must not name firms or people, must not state figures, and must not make any prediction.

#### 2027-07-31 &middot; `the-fund-that-was-everywhere`

**One Borrower With Many Lenders and No Aggregate View**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | The Borrower Nobody Could See Whole _(35 chars)_ |
| description | A single large borrower dealing bilaterally with many lenders leaves nobody able to see the total, which is a structural problem rather than a deception. _(153 chars)_ |
| lede | Every lender saw their own exposure and nobody saw the sum. |
| Links | `/articles/the-margin-call-you-cannot-see/`, `/articles/the-lenders-and-what-they-did/`, `/articles/how-a-cascade-propagates/` |

Follows this failure class to its cause: bilateral lending without any credit bureau, central counterparty or reporting mechanism means aggregate leverage is unknowable to every participant individually. Argue that conventional markets built exactly these institutions in response to exactly this failure, and that the crypto credit market had none of them by design. Take the position that the absence of aggregate visibility, rather than any individual decision, is what made a single failure systemic. The piece must not name the firms or individuals involved, must not state exposures or losses, must not describe any legal or insolvency proceeding's findings, and must not characterise anyone's conduct.


### August 2027

_27 articles._

#### 2027-08-01 &middot; `the-diligence-question`

**What Investor Diligence Normally Covers, and What It Cannot Reach**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | FTX, taken apart |
| seoTitle | What Investor Diligence Can and Cannot Reach _(44 chars)_ |
| description | Venture diligence examines what it is given, and a minority investor without board control has limited ability to verify internal controls. _(139 chars)_ |
| lede | Diligence looks at what management provides, which is a real limitation and not a secret one. |
| Links | `/articles/the-auditor-question/`, `/articles/what-the-business-actually-was/` |

A profile of the venture investor in this sector: what investment diligence typically covers and its structural limits, reliance on management representations, limited access to systems, and the difference between governance rights and operational visibility. Argue that the retrospective criticism often assumes powers that minority investors do not have, while the fair criticism is about the governance terms accepted rather than about failing to detect anything. Present both carefully. The piece must not name any investor or firm, must not describe any specific investment or its terms, must not allege any breach of duty, must not state amounts, and must not give investment guidance.

#### 2027-08-02 &middot; `proof-of-reserves-as-marketing`

**The Phrase Did More Work Than the Practice**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | When Proof of Reserves Became Marketing _(39 chars)_ |
| description | A partial technical exercise was presented as a comprehensive guarantee, and the naming of it did most of the persuasive work. _(126 chars)_ |
| lede | The words proof and reserves both promise more than the exercise delivers. |
| Links | `/articles/why-firms-stopped-publishing/`, `/articles/insurance-for-digital-assets/`, `/articles/the-audit-industry-that-followed/` |

Follows the failure of a trust signal to its cause, starting with the term itself: proof implies completeness, reserves implies the whole balance sheet, and the exercise delivers neither. Argue that this is the clearest example on the site of terminology doing persuasive work, and that the industry has form for this with terms like trustless, audited and insured. Take the position that a history site should name the vocabulary problem explicitly because it recurs. The piece must not name any venue or provider, must not describe any publication as misleading, must not state figures, and must not tell a reader how to evaluate any venue.

#### 2027-08-03 &middot; `the-comprehensive-framework-approach`

**Writing a Whole New Rulebook Instead of Applying the Old One**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | The Comprehensive Rulebook Approach _(35 chars)_ |
| description | Some jurisdictions responded by drafting bespoke regimes covering issuance, venues and stable units, which is a different bet from enforcement. _(143 chars)_ |
| lede | One approach applies the existing rules through cases, the other writes a new rulebook and waits. |
| Links | `/articles/the-accommodating-jurisdictions/`, `/articles/the-clarity-that-never-came/`, `/articles/the-licensing-regimes/` |

Contrasts the two regulatory strategies structurally: applying existing categories through enforcement produces fact specific development and poor notice, while drafting a bespoke regime produces clarity and the risk of being written for a market that changes. Argue that both bets are defensible and that the comparison between jurisdictions over the coming years is the most interesting natural experiment in the subject. Present it as an open question. The piece must not describe any framework's current provisions or status, must not name legislation or jurisdictions, must not give compliance guidance, and must not predict which approach will work.

#### 2027-08-04 &middot; `the-cost-of-the-process`

**Somebody Has to Pay for the Investigation, and It Is the Creditors**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | Who Pays for the Bankruptcy Process _(35 chars)_ |
| description | Professional fees in a complex insolvency come out of the estate, which means the quality of the record is paid for by the people owed money. _(141 chars)_ |
| lede | The excellent public record these cases produce is funded by the creditors' recovery. |
| Links | `/articles/the-examiner/`, `/articles/the-claims-market/`, `/articles/why-insolvency-produces-the-best-records/` |

A profile of the insolvency professional and the tension the role creates: thorough investigation produces better outcomes and better history, and it reduces the pool available for distribution. Argue that this is a real trade off rather than a scandal, and that the crypto cases are unusually expensive because of asset tracing, cross border complexity and reconstructing records that were never properly kept. Note the uncomfortable implication for the site's own reliance on these records. The piece must not state fee amounts or percentages, must not name professionals or firms, must not characterise any fee as excessive, and must not give legal advice.

#### 2027-08-05 &middot; `the-people-who-paid`

**The Losses Landed Mostly on People With No Way to Assess Any of It**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | What settled and what did not |
| seoTitle | Who Actually Bore the Losses _(28 chars)_ |
| description | Across every failure documented here, the parties least able to evaluate the arrangements were the ones holding the claims at the end. _(134 chars)_ |
| lede | The people who could least assess these arrangements are the ones who were left holding them. |
| Links | `/articles/the-promises-that-were-not-kept/`, `/articles/the-lenders-and-what-they-did/`, `/articles/why-early-adoption-figures-are-unknowable/` |

A group profile of the ordinary participant across fifteen years, written without condescension: what information was actually available, what the marketing said, and what recourse existed afterwards. Argue that treating these losses as the price of financial education is the least defensible position in the whole subject, since the information required to assess the arrangements was frequently not available to anyone outside. Handle it seriously and without sentimentality. The piece must not name any individual or use any personal account, must not state loss figures, must not characterise participants as foolish or as victims, and must not offer any guidance about participating in anything.

#### 2027-08-06 &middot; `correlation-in-a-crisis`

**Diversification Inside One Asset Class Is Not Diversification**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | Why Diversification Failed in the Crisis _(40 chars)_ |
| description | Positions that appeared independent turned out to share the same funding, the same collateral and the same holders, which is one exposure wearing many names. _(157 chars)_ |
| lede | Holding twenty different things that all move together is holding one thing. |
| Links | `/articles/the-fund-that-was-everywhere/`, `/articles/composability-and-the-lego-claim/` |

Follows the failure of apparent diversification to its cause: positions moved together because they shared collateral, lenders, venues and a largely shared holder base. Argue that the industry's construction of apparently diverse portfolios rested on labels rather than on exposures, and that the mechanism was identifiable in advance from the funding structure. Keep it structural and avoid anything resembling portfolio advice. The piece must not state correlations, returns or losses, must not name assets or funds, must not describe any portfolio construction as sound or unsound, and must not give investment guidance of any kind.

#### 2027-08-07 &middot; `the-endorsement-question`

**Paid Promotion of Financial Products Has Rules for a Reason**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | FTX, taken apart |
| seoTitle | Why Paid Financial Promotion Has Rules _(38 chars)_ |
| description | Disclosure requirements for compensated promotion of financial products exist across jurisdictions, and enforcement in this sector arrived late. _(144 chars)_ |
| lede | The requirement to say you were paid is old and was widely treated as optional here. |
| Links | `/articles/the-advisor-economy/`, `/articles/disclosure-was-the-actual-issue/` |

Follows a recurring disclosure failure to the principle it breached, which is that compensated endorsement of a financial product must be disclosed so an audience can weight it. Argue that the sector's promotional culture treated this as a formality and that the eventual attention to it was predictable rather than novel. Keep the discussion entirely at the level of the rule and its rationale. The piece must not name any promoter, celebrity, athlete or public figure, must not describe any specific promotion, must not reference any proceeding or settlement, must not state compensation, and must not characterise anyone.

#### 2027-08-08 &middot; `what-would-actually-work`

**The Arrangement That Would Actually Settle This Is Not Technical**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | What Would Actually Prove Solvency _(34 chars)_ |
| description | Independent custody, full financial statement audit and supervised reporting would settle the question, and each is an institutional arrangement. _(145 chars)_ |
| lede | The answer that works is the boring one that other markets adopted a century ago. |
| Links | `/articles/proof-of-reserves-as-marketing/`, `/articles/custody-as-a-separate-business/`, `/articles/the-cost-of-getting-custody-wrong/` |

Sets out what would actually resolve the question: assets held by an independent custodian, liabilities covered by a full audit under a recognised framework, and periodic reporting to a supervisor with inspection powers. Argue that each element already exists elsewhere, that none requires new technology, and that the industry's preference for cryptographic answers reflects what it can do unilaterally rather than what would work. Commit to that as the cluster's conclusion. The piece must not name any venue as meeting these conditions, must not describe any jurisdiction's requirements as current, must not give compliance, audit or accounting guidance, and must not advise a reader on where to hold anything.

#### 2027-08-09 &middot; `the-travel-of-precedent`

**A Decision in One Jurisdiction Changes Behaviour in Twenty**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Enforcement and the courts |
| seoTitle | How One Decision Changes Twenty Markets _(39 chars)_ |
| description | Global businesses adopt the most restrictive applicable position across their footprint, so one jurisdiction's decision propagates far beyond it. _(145 chars)_ |
| lede | A firm operating everywhere ends up following whichever rule is strictest. |
| Links | `/articles/the-cross-border-problem/`, `/articles/the-comprehensive-framework-approach/`, `/articles/jurisdiction-shopping/` |

Explains the propagation mechanism: a multinational business generally cannot maintain different product designs per jurisdiction economically, so it converges on the most restrictive requirement, which exports that jurisdiction's position. Argue that this gives certain regulators influence far beyond their borders without any formal mechanism, and that the industry's jurisdiction shopping was always partly futile for this reason. Keep it structural. The piece must not name jurisdictions, decisions or firms, must not describe any current rule, must not give compliance guidance, and must not predict any regulatory development.

#### 2027-08-10 &middot; `cross-border-insolvency`

**Several Courts, Several Estates, One Set of Assets**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | When Several Courts Claim the Same Estate _(41 chars)_ |
| description | Group structures spanning jurisdictions produce parallel proceedings that must be coordinated, which adds years and cost to every question. _(139 chars)_ |
| lede | When the group spans five jurisdictions, so does the insolvency. |
| Links | `/articles/jurisdiction-shopping/`, `/articles/the-cross-border-problem/`, `/articles/the-cost-of-the-process/` |

Explains the general machinery for coordinating parallel proceedings, recognition of a main proceeding and cooperation between courts, and why crypto groups are unusually prone to needing it. Argue that the structures adopted for regulatory reasons during the growth years directly produced this complexity during the failures, which is a cost of jurisdiction shopping that was never counted. Draw that connection explicitly. The piece must not describe any specific proceeding or jurisdiction, must not give legal advice, must not name parties, and must not predict outcomes.

#### 2027-08-11 &middot; `what-fifteen-years-established`

**The Findings That Would Survive Being Argued With**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | What settled and what did not |
| seoTitle | What Fifteen Years Actually Established _(39 chars)_ |
| description | A short list of conclusions supported by the documented record rather than by anyone's position, stated so they could be argued against. _(136 chars)_ |
| lede | Here is the short list that the record actually supports, stated so somebody could disagree with it properly. |
| Links | `/articles/the-promises-that-were-not-kept/`, `/articles/the-cost-of-getting-custody-wrong/`, `/articles/the-ideas-that-were-right-too-early/` |

States the site's conclusions explicitly: intermediation returns wherever it is convenient, custody failure is the dominant loss mechanism, voluntary disclosure follows crises rather than preventing them, and governance disputes resolve by exit rather than by procedure. Argue each briefly with reference to the documented cases across the site, and mark clearly which conclusions rest on strong evidence and which are interpretations. Take the position that a history that cannot be argued with has not said anything. The piece must not present any conclusion as settled beyond what the record supports, must not use any figure without a source, must not name firms or people, and must not extend any conclusion into a prediction.

#### 2027-08-12 &middot; `who-stopped-withdrawals-and-when`

**The Sequence of Suspensions, Which Is the Cleanest Record We Have**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | The 2022 credit cascade |
| seoTitle | The Sequence of Withdrawal Suspensions _(38 chars)_ |
| description | Public suspension announcements are dated, unambiguous and self reported, which makes them the most reliable spine for this period. _(131 chars)_ |
| lede | The suspension announcements are the one part of this story that is dated and undisputed. |
| Links | `/articles/the-withdrawal-queue-as-a-signal/`, `/articles/the-fund-that-was-everywhere/`, `/articles/the-algorithmic-failure/` |

Sequences the period using the public suspension announcements as the primary spine, because they are dated, published by the firms themselves, and not subject to interpretation. Argue that building the timeline from these rather than from reporting produces a materially different picture of the order of events, and that the order matters for understanding what caused what. Establish this as a method the site prefers, which is to build chronology from self published dated statements. The piece must not name any firm's announcement without the archived text, must not state amounts frozen or affected user counts, must not characterise any firm's conduct, and must not describe any legal proceeding.

#### 2027-08-13 &middot; `what-the-record-establishes`

**Separating What Is Documented From What Is Widely Believed**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | FTX, taken apart |
| seoTitle | What the Record Establishes, and What It Does Not _(49 chars)_ |
| description | A great deal of the popular account rests on a small number of documents and a large amount of repetition, and the difference is checkable. _(139 chars)_ |
| lede | Sort the claims by what document supports them and the pile gets much smaller. |
| Links | `/articles/the-controls-declaration/`, `/articles/the-week-it-ended/`, `/articles/what-we-still-do-not-know/` |

Takes the widely repeated claims about this collapse and sorts them by evidentiary basis: filings, self published statements, chain data, contemporaneous reporting, and unsourced repetition. Argue that this exercise is the most useful thing a history site can do with a heavily covered event, since narrative is abundant and evidentiary discipline is not. Be explicit about which important claims sit in the weakest category. The piece must not adjudicate any disputed claim, must not describe any charge, plea, verdict or sentence, must not name or characterise individuals, and must not state figures without a cited document.

#### 2027-08-14 &middot; `the-verification-habit`

**Ask What Is Being Proved, to Whom, and by Whom**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Proof of reserves and what it does not prove |
| seoTitle | Three Questions to Ask of Any Proof _(35 chars)_ |
| description | A short reading method for any transparency claim in this industry, applicable to reserves, audits, insurance and security reviews alike. _(137 chars)_ |
| lede | Three questions dispose of most transparency claims in this industry in under a minute. |
| Links | `/articles/what-would-actually-work/`, `/articles/how-to-read-a-regulatory-document/`, `/articles/proof-of-reserves-as-marketing/` |

Generalises the cluster into a reusable method: identify the precise proposition being asserted, identify who is asserting it and what they are exposed to if it is wrong, and identify who could check it independently. Argue that this method disposes of most of the trust signals catalogued across this site, and that its simplicity is the point. Close the cluster by connecting it to the site's broader argument about measurement and vocabulary. The piece must not evaluate any specific claim, venue or provider, must not be framed as advice about where to hold assets, must not state figures, and must not present the method as a way to determine safety.

#### 2027-08-15 &middot; `the-industry-response`

**The Sector Built a Lobbying Apparatus, Which Is What Industries Do**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | Enforcement and the courts |
| seoTitle | How the Sector Built Its Lobbying Apparatus _(43 chars)_ |
| description | Trade associations, policy campaigns and political spending appeared, which is unremarkable for a large industry and was reported as remarkable. _(144 chars)_ |
| lede | An industry with money and a regulatory problem hires people to argue about rules, which is entirely ordinary. |
| Links | `/articles/the-compliance-cost-of-being-first/`, `/articles/the-comprehensive-framework-approach/` |

A profile of the sector's policy apparatus as an institution: trade bodies, research funding, policy staff and organised advocacy, which is the normal trajectory of any industry facing regulation. Argue that the interesting question is not whether the sector lobbies but how its arguments changed as its membership shifted from startups to large regulated firms, since the two want different rules. Take that as the finding. The piece must not name any organisation, campaign, individual, candidate or political party, must not state spending figures, must not describe any political matter, and must not take any political position.

#### 2027-08-16 &middot; `what-creditors-actually-recover`

**Recovery Is a Long Process With a Distribution at the End**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `profile` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | How Creditor Recovery Actually Works _(36 chars)_ |
| description | Recovery depends on what the estate collects, the priority of each claim and how long the process runs, and none of it is knowable at the start. _(144 chars)_ |
| lede | The answer to how much you get back is unknown for years and then arrives as a percentage. |
| Links | `/articles/the-claims-market/`, `/articles/the-decade-long-creditor-process/`, `/articles/cross-border-insolvency/` |

A profile of the creditor waiting through an insolvency, following the structure of recovery generically: asset collection and litigation, claim classification and priority, reserves for disputed claims, and distributions over time. Argue that the industry's habit of reporting expected recoveries early is close to meaningless, since the estimate depends on unresolved litigation, and that the honest position is that nobody knows until the distribution. Keep it entirely general. The piece must not state any recovery percentage or amount, must not name any proceeding, must not describe any distribution as likely, must not give legal or financial advice, and must not predict outcomes.

#### 2027-08-17 &middot; `the-questions-still-open`

**The Questions This History Cannot Answer Yet**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | What settled and what did not |
| seoTitle | The Questions Still Genuinely Open _(34 chars)_ |
| description | Privacy against supervision, governance without procedure, and whether separation holds under pressure remain unresolved after fifteen years. _(141 chars)_ |
| lede | Several of the central questions are exactly as open as they were at the beginning. |
| Links | `/articles/what-fifteen-years-established/`, `/articles/the-privacy-compliance-deadlock/`, `/articles/what-the-scaling-wars-settled/` |

Enumerates the genuinely unresolved questions documented across the site and explains why each has resisted resolution, which in each case is that the disagreement is about values rather than about facts. Argue that a history site's most useful final act is to hand a reader an accurate map of the open questions rather than a conclusion, because the conclusions on offer are mostly positions. Mark clearly which questions might be settled by evidence and which will not be. The piece must not resolve any listed question, must not predict how any will be settled, must not name parties, and must not present any position as the emerging consensus.

#### 2027-08-18 &middot; `what-a-run-looks-like-on-chain`

**For Once, the Run Was Partly Visible While It Happened**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | The 2022 credit cascade |
| seoTitle | What a Bank Run Looks Like On Chain _(35 chars)_ |
| description | Outflows from public addresses were observable in real time, which is genuinely new, and interpreting them correctly was still very difficult. _(142 chars)_ |
| lede | People watched the money leave in real time and still could not tell what it meant. |
| Links | `/articles/who-stopped-withdrawals-and-when/`, `/articles/the-margin-call-you-cannot-see/`, `/articles/chain-analysis-becomes-a-business/` |

Explains what chain observation actually showed during this period, which is movement between addresses, and what it could not show, which is whose assets were moving, why, and what obligations sat behind them. Argue that this is the first financial crisis with a partially public ledger and that the experience is a useful corrective to the assumption that transparency produces understanding. Commit to the position that data without provenance and context produced confident errors at scale. The piece must not name firms or addresses, must not state flow figures, must not present chain analysis as a risk tool for readers, and must not describe any interpretation as having been correct.

#### 2027-08-19 &middot; `what-remains-unknown-ftx`

**The Questions the Documents Do Not Answer**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | FTX, taken apart |
| seoTitle | The Questions the Documents Do Not Answer _(41 chars)_ |
| description | Several central questions about how this operated remain outside the public record, and listing them is more honest than another confident retelling. _(149 chars)_ |
| lede | The confident accounts all stop at the same place, which is where the documents stop. |
| Links | `/articles/what-the-record-establishes/`, `/articles/what-we-still-do-not-know/` |

Enumerates what remains outside the public record: internal decision making, the sequence by which arrangements developed, and the completeness of the reconstructed records themselves. Argue that a history site adds more by mapping the boundary of the known than by joining the many attempts to narrate across it. Note that some of these questions may be answered later and that the piece should be written so that a future update is an addition rather than a correction. The piece must not speculate about any unanswered question, must not name or characterise individuals, must not describe any legal proceeding, and must not present any account as likely.

#### 2027-08-20 &middot; `reading-a-court-record`

**How to Find and Read the Documents Everybody Is Paraphrasing**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `primarySource` |
| Cluster | Enforcement and the courts |
| seoTitle | How to Read the Documents Directly _(34 chars)_ |
| description | Court and regulatory dockets are public, findable and readable, and going to them directly removes most of the errors in circulation. _(133 chars)_ |
| lede | The documents are public and almost nobody writing about them has opened one. |
| Links | `/articles/how-to-read-a-regulatory-document/`, `/articles/settlement-without-admission/`, `/articles/the-controls-declaration/` |

A practical method piece: what a docket is, what the common document types are, how to tell an allegation from an order, and how to check whether a document being quoted has been superseded. Argue that this single habit does more to improve the quality of crypto history than any amount of expertise, because the errors in circulation are overwhelmingly errors of transmission. Close the cluster by making the method explicit and reusable. The piece must not reference any specific case, party or individual as an example, must not give legal advice, must not interpret any document's meaning for a reader, and must not suggest anyone act on what they find.

#### 2027-08-21 &middot; `the-record-that-outlives-the-company`

**The Docket Will Still Be There When Everything Else Is Gone**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | Bankruptcy as a discovery process |
| seoTitle | The Record That Outlives the Company _(36 chars)_ |
| description | Court filings survive when websites, forums and company records disappear, which makes them the durable foundation of this history. _(131 chars)_ |
| lede | The website goes, the forum goes, the filings stay. |
| Links | `/articles/why-insolvency-produces-the-best-records/`, `/articles/the-forum-as-the-only-record/`, `/articles/the-leaked-document-problem/` |

Closes the cluster on the site's methodological argument: crypto history is built on sources that vanish, and the insolvency record is one of the few categories with institutional permanence. Argue that this creates a real and structural bias in what can be documented, favouring failures over successes and litigation over ordinary operation, and that a responsible history should say so rather than pretend to balance. Commit to that as a statement of the site's own limitations. The piece must not name any proceeding or party, must not give legal advice, must not treat any filing as adjudicated fact, and must not claim any particular record is complete.

#### 2027-08-22 &middot; `how-to-read-the-next-one`

**A Method for Reading Whatever Happens Next**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | What settled and what did not |
| seoTitle | A Method for Reading Whatever Comes Next _(40 chars)_ |
| description | The reading habits assembled across this site, applied as a checklist to any new claim, mechanism or failure in this industry. _(126 chars)_ |
| lede | The useful output of fifteen years of history is a way of reading, not a view. |
| Links | `/articles/the-verification-habit/`, `/articles/reading-a-court-record/`, `/articles/what-fifteen-years-established/` |

Collects the site's recurring reading rules into one method: identify who holds the assets, ask what is being proved and by whom, distinguish an allegation from a finding, check whether a figure has a method behind it, and ask what would have to be true for the claim to fail. Argue that this method is the only durable takeaway from a history whose specifics keep changing, and that it is deliberately not a way to decide what to do with money. State that explicitly. The piece must not contain any forecast, market view, price expectation or recommendation of any kind, must not name any current project or firm, must not tell a reader whether to participate in anything, and must not be framed as investment or financial guidance.

#### 2027-08-23 &middot; `the-warnings-that-existed`

**The Warnings Were Public, Specific and Ignored**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `postmortem` |
| Cluster | The 2022 credit cascade |
| seoTitle | The Warnings That Were Public and Ignored _(41 chars)_ |
| description | Analysts described several of these failure mechanisms in advance and in public, which raises the question of why warning does not work. _(136 chars)_ |
| lede | Several of these were called in advance, in public, by people nobody listened to. |
| Links | `/articles/what-a-run-looks-like-on-chain/`, `/articles/the-algorithmic-failure/`, `/articles/the-withdrawal-queue-as-a-signal/` |

Follows the failure of accurate public warning to its causes, establishing first that specific mechanisms were described publicly before they failed, then asking why that had no effect. Argue that the reasons are structural: warnings are indistinguishable from noise at the time, the warner has no standing, the cost of being early is high, and everyone participating has a reason not to look. Take the position that improving warnings is not the answer and that changing structures is, which is uncomfortable but supported by the record. The piece must not name any analyst or firm, must not quote any warning without an archived source, must not claim anyone predicted anything precisely, and must not present any warning as investment advice.

#### 2027-08-24 &middot; `what-changed-because-of-it`

**The Practices That Exist Now Because of This**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | FTX, taken apart |
| seoTitle | What Changed Across the Industry Afterwards _(43 chars)_ |
| description | Reserve publication, custody separation, supervisory attention and institutional caution all moved after this, in ways that can be described structurally. _(154 chars)_ |
| lede | The industry changed several practices quickly, and it is worth checking which ones were the important ones. |
| Links | `/articles/what-mt-gox-changed/`, `/articles/custody-as-a-separate-business/`, `/articles/what-the-record-establishes/` |

Sequences the structural changes that followed and assesses which addressed the actual failure mechanisms and which were visible gestures. Argue that the pattern established after the first great exchange failure repeated exactly: the industry adopted the demonstrable measures and left the structural one, bundled custody and trading, only partially addressed. Draw the parallel explicitly across a decade. The piece must not name firms or their current practices, must not claim any regulation was enacted in response without a source, must not state figures, and must not present any current arrangement as safe.

#### 2027-08-25 &middot; `what-enforcement-changed`

**The Effects Showed Up in Product Design Before They Showed Up in Law**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | Enforcement and the courts |
| seoTitle | How Enforcement Changed Product Design First _(44 chars)_ |
| description | Firms altered products, geofenced services and rewrote terms long before any question was settled, which is where the real effect appeared. _(139 chars)_ |
| lede | Nothing was decided and everything changed, because firms move before the law does. |
| Links | `/articles/the-industry-response/`, `/articles/the-travel-of-precedent/`, `/articles/the-venue-as-defendant/` |

Sequences the effects of enforcement activity in the order they actually appeared, which was in commercial behaviour first, through withdrawn products, restricted access by location and rewritten terms, and only much later in any settled legal principle. Show that this makes the industry's demand for clarity partly beside the point, since firms respond to risk rather than to rules. Take the position that this dynamic gives enforcement more power than legislation over short horizons, which is worth naming plainly. The piece must not name firms, products or matters, must not describe any jurisdiction's rules, must not give compliance guidance, and must not predict anything.

#### 2027-08-26 &middot; `the-contagion-map`

**Drawing the Connections With Only What Can Be Verified**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `timeline` |
| Cluster | The 2022 credit cascade |
| seoTitle | Mapping the Contagion With Verified Links _(41 chars)_ |
| description | A map of which failures were connected to which, built only from filings and self published statements rather than from reporting. _(130 chars)_ |
| lede | Build the map only from documents and it is smaller, thinner and much more useful. |
| Links | `/articles/who-stopped-withdrawals-and-when/`, `/articles/the-fund-that-was-everywhere/`, `/articles/correlation-in-a-crisis/` |

Sequences and connects the period's failures using only relationships evidenced in insolvency filings, regulatory documents and firms' own statements, and marks explicitly where a widely repeated connection has no such evidence. Argue that the resulting map is less dramatic and considerably more reliable than the versions in circulation, and that the gaps are themselves informative about what remains unknown. Establish that this is the site's standard for connecting events. The piece must not assert any relationship without a cited document, must not state exposure figures, must not name individuals, and must not characterise any party's conduct or intent.

#### 2027-08-27 &middot; `the-comparison-that-actually-holds`

**The Useful Comparison Is Not the One Everybody Reaches For**

| | |
| --- | --- |
| Era | `postFtx` |
| Kind | `explainer` |
| Cluster | FTX, taken apart |
| seoTitle | The Historical Comparison That Actually Holds _(45 chars)_ |
| description | Comparisons to famous frauds are popular and mostly unhelpful, while the comparison to earlier crypto custody failures is exact and instructive. _(144 chars)_ |
| lede | The comparison that teaches you something is the one to the last time this happened in the same industry. |
| Links | `/articles/what-changed-because-of-it/`, `/articles/the-cost-of-getting-custody-wrong/`, `/articles/what-mt-gox-changed/` |

Argues that the widely used comparisons to famous financial frauds obscure more than they reveal, because the mechanisms differ, and that the precise comparison is to the earlier custody failures documented elsewhere on this site. Show the shared mechanism, an intermediary holding customer assets without verifiable segregation, and the shared aftermath, a long insolvency and partial recovery. Commit to the position that the industry's failure to treat its own history as evidence is the deepest problem the site has identified. The piece must not describe any legal characterisation of any event, must not name or characterise individuals, must not state amounts, and must not assert intent.


---

## Maintaining this plan

`plan-365.json` is the source of truth. This document is generated from it by
`render-plan.mjs`, so edit the JSON rather than this file, then run both:

```
node docs/content-plan/render-plan.mjs
node docs/content-plan/validate-plan.mjs
```

The validator asserts the count, the exact inclusive date range with no gaps or
duplicates, date ordering, unique kebab-case slugs with no years and no collision
with anything already in `content/articles/`, unique titles and seoTitles, every
`seoTitle` inside 62 characters, every `description` between 50 and 158, every
`lede` at 20 or more, every `era` and `kind` inside its closed set, every angle
between three and five sentences and stating at least one prohibition, two to
four internal links per entry all resolving backwards in time, no crypto tax
vocabulary and no recommendation language in any reader facing field, no estate
name in any title, and no em or en dash anywhere in the file. It prints every
failure rather than stopping at the first, and exits non-zero.

### The pipeline

`sources/*.json` is what a human edits, one file per cluster. Then:

```
node docs/content-plan/assemble.mjs      sources  ->  plan-365.json
node docs/content-plan/render-plan.mjs   json     ->  PLAN-365.md
node docs/content-plan/validate-plan.mjs            checks everything
```

`assemble.mjs` assigns the dates and resolves the internal links, which is why
the link graph is correct by construction rather than by review. Ordering inside
a source file is load bearing: an entry's `pref` targets are its earlier cluster
mates, so the file order is what keeps those links pointing backwards. Add an
entry at the end of its cluster, not the middle, unless you move its `pref`
targets with it.

Publishing an entry does not remove it from this file. Leave the record intact so
a future editor can see what was planned, what shipped and what changed.
