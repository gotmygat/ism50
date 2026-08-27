# CANONICAL Person node values. Copy verbatim. Do not paraphrase.

Every one of the FIVE domains must emit these EXACT strings. A property that
differs by a word between two domains is two competing claims about one person,
which is worse than not emitting it at all. If you think a string should change,
STOP and report it rather than changing it locally.

```
"@type": "Person"
"@id":   "https://khaledhawari.ca/#person"
"name":  "Khaled Hawari"
"alternateName": ["Kal Hawari", "Khaled (Kal) Hawari", "Khaled Kal Hawari"]
"url":   "https://khaledhawari.ca/"
"mainEntityOfPage": {"@id": "https://khaledhawari.ca/about-khaled-hawari/#webpage"}
"disambiguatingDescription": "Tax and financial consultant in Ottawa, Ontario, and the founder of Kodelytics Inc. and KNA Group."
```

## mainEntityOfPage carries the #webpage FRAGMENT. Corrected 2026-08-26.

My first version froze it as a bare URL string with no fragment. That was
wrong, and the kodelytics.ca agent was right to refuse it and report instead
of complying: changing its domain to match my sheet would have BROKEN a real
cross-domain agreement in the name of protecting one.

Verified live on four routes across two domains, all four identical:

    kodelytics.ca/                          {"@id": ".../about-khaled-hawari/#webpage"}
    kodelytics.ca/about/                    same
    khaledhawari.ca/                        same
    khaledhawari.ca/about-khaled-hawari/    same

The fragment form is also the more correct one. It is an `@id` REFERENCE to
the WebPage node, which is what `@id` references are for, and it stays
constant on every page of every domain rather than tracking whichever page the
reader happens to be on. A bare string would also bypass a graph resolver: the
kodelytics verifier found that a bare string slipped past every check on main,
because the dangling-@id resolver only inspects {@id} objects.

LESSON, and it applies to everything in this file: a frozen value that
contradicts what is already shipping in agreement is not a standard, it is a
regression waiting to be applied by four agents at once. Verify against the
live sites before freezing, not after.

## url vs mainEntityOfPage. Pinned 2026-08-26.

The khaledhawari.ca agent found a live contradiction: .ca emitted
`url: https://khaledhawari.ca/` while kna-group.com emitted
`url: https://khaledhawari.ca/about-khaled-hawari/` for THE SAME `@id`. One
entity, two url values, which is exactly the split this sheet exists to stop.

Resolved as: `url` is the person's website ROOT, `mainEntityOfPage` is the
page that is ABOUT him. That is what the two properties mean, and it is what
.ca main already did. Both values above are frozen on all four domains.

Note the hub lives at `/about-khaled-hawari/`, NOT `/khaled-hawari/`. The bare
path 404s on the three sibling domains and 301s to the hub on .ca. Do not link
`/khaled-hawari/` cross-domain.

## alternateName is an ARRAY. Corrected 2026-08-26.

The first version of this sheet froze it as the single string "Kal Hawari".
That was my error and two agents were right to push back rather than truncate
their repo to match. `alternateName` is an ALIAS DECLARATION, not prose: the
parenthesised and space-separated forms cost nothing there and are exactly the
strings that appear in the branded wordmark, so declaring them helps matching.
Dropping two aliases loses signal for no gain. khaledhawari.ca already carried
the array with a reasoned comment at content/site.ts:306. The array wins,
in this exact order, on all four domains.

The parenthesis trap still applies to PROSE, TITLES, DESCRIPTIONS and
BYLINES, where `Khaled (Kal) Hawari` contains neither searchable phrase. It
does not apply to an alias list. Do not confuse the two rules.

## Why exactly this wording

- It opens with the OCCUPATION, not the name, because the name is the ambiguous
  part and the occupation is the discriminator.
- "Ottawa, Ontario" is the city plus the province, because "Ottawa" alone is
  also a surname and a place in Illinois and Kansas.
- Both firms are named, because the corporate names are the hardest identity
  primitives available. Kodelytics Inc. is a registered Ontario corporation,
  Ontario Corporation Number 702876368, which is a registry-backed fact.
- It claims NO designation. He holds none. "Consultant" is accurate and the
  content verifiers on these repos gate on the alternative.
- It references no other person, no matter, and no outlet. It is a positive
  statement of who he is and nothing else. See ENTITY-BRIEF.md.
- One sentence. Schema.org specifies a SHORT description for this property.
- No em dash. Fails the build on all four repos.

## Honest scope note, so nobody oversells this internally

Google does not document `disambiguatingDescription` as a property it consumes
for any rich result. This is not a switch that separates two entities. It is one
more cheap, correct, consistent attribute in the pile that entity extraction
reads. Ship it because it is free and right, not because it is the fix. The
heavy lifting is the single `@id`, the author edges, the hub pages, and
independent third-party corroboration.

## `description` is a SEPARATE property and may differ per domain

`disambiguatingDescription` is the identity claim and is frozen above.
`description` is contextual copy and SHOULD differ per site, because on
kna-group.com he is the founder of a finance operations firm and on
khaledhawari.ca he is a tax practitioner. Do not copy the frozen string into
`description`.


## RESOLVED 2026-08-26: he founded KNA Group. It is his own firm.

Raised independently by the khaledhawari.com and kodelytics.ca agents. The
evidence points both ways and I will not publish a claim about a real person's
role on four domains on a guess.

FOR founder:
  - khaledhawari.ca/testimonials calls KNA Group "an earlier brand of the same
    practice", and four real client reviews name KNA Group by name.
  - "KNA Tax and Business Advisors, Kanata" is recorded as SELF-EMPLOYED,
    2014 to 2020.
  - He owns kna-group.com and the repo, and directed the site to be built as
    his firm.

AGAINST founder:
  - khaledhawari.com content/site.ts:838 records "KNA-Group, Senior Accountant,
    April 2023 to February 2024, Ottawa", transcribed from LinkedIn. That reads
    as employment at someone else's firm, and it is PUBLIC on LinkedIn, where a
    contradiction is visible to anyone checking.

KAL'S ANSWER, given directly on 2026-08-26: "I founded it, it's my own firm."
The frozen clause stands and ships on all four domains.

CONSEQUENCE THAT MUST BE FOLLOWED THROUGH. The LinkedIn-transcribed record at
khaledhawari.com content/site.ts:838 says role "Senior Accountant" at
org "KNA-Group". That now contradicts the entity claim, and it is PUBLIC on
LinkedIn where anyone checking can see both. An unresolved contradiction
between a person's own two properties is a signal AGAINST entity confidence,
which is the opposite of what this whole programme is for. Three things have to
move together:
  1. khaledhawari.com content/site.ts record entry, role corrected
  2. khaledhawari.ca, wherever the same history is asserted
  3. LinkedIn itself, https://www.linkedin.com/in/khaledhawariottawa/
Item 3 is Kal's to do. Items 1 and 2 are ours. Do not do 1 and 2 without
telling him 3 is now outstanding, because a site that disagrees with LinkedIn
is no better than a site that disagrees with itself.

The dates should also be reconciled honestly rather than smoothed over: the
record shows KNA Tax and Business Advisors (Kanata, self-employed) 2014 to
2020, and KNA-Group 2023 to 2024. Write the real history. Do not invent a
continuous founding date to make the timeline look tidier.


## FIVE domains, not four. And the estate `sameAs` graph is now complete. 2026-08-27.

This sheet said "four domains" from the day it was written, because ism50.com
did not exist yet. It does, it publishes under his name every day, and it
declares this Person `@id`. It is the fifth domain and it is covered by every
rule above.

### What was actually wrong

ism50.com appeared in NOBODY's `sameAs`, including its own. kna-group.com
appeared only in khaledhawari.ca's. So of the twenty possible cross-edges
between five domains, five were missing, and the two newest properties were the
ones being under-declared.

That is the weaker-witness problem. Every domain declares the SAME `@id`, so a
crawler that reads only kodelytics.ca and a crawler that reads only
khaledhawari.ca were being told two different-sized identities for one person.
`sameAs` exists to stop exactly that.

All twenty edges are now present and verified in the built HTML of all five
sites, not in the source.

### The ruling that had to be made first, because two domains disagreed

ism50.com excluded company domains from the Person's `sameAs` on the argument
that a firm's home page is not a profile of its owner. That argument is
coherent and it is the more literal reading of the spec.

It lost, on two grounds.

It contradicted itself. It excluded ism50.com and kna-group.com on principle
while carrying kodelytics.ca, a third company domain, in the same list. A rule
with an unexplained exception is not being applied.

And it contradicted four shipped domains, which is what the LESSON at the top of
this file is about. khaledhawari.ca states the opposing reasoning and it holds:
the claim "this practice IS that firm" is false and belongs nowhere, but the
claim "this person operates that domain" is TRUE, and the Person node is where
it is true. A local improvement that contradicts a shipped agreement is not a
standard, it is a regression waiting to be applied by five agents at once.

**If this convention is ever revisited it changes on all five domains in one
pass, never on one first.**
