# ism50.com

Fifteen years of crypto, read as a diffusion index.

Fifty is the point at which a diffusion index shows as many respondents
reporting expansion as contraction. It is a threshold rather than a value. The
argument this site makes is that fifteen years of crypto is a sequence of things
crossing that line in both directions, and that almost nobody living through a
crossing could tell which side they had landed on.

Every piece is written to answer three questions: what was expanding, what was
contracting, and who could tell at the time.

## Running it

    npm install
    npm run dev        # localhost:4321
    npm run build      # the full gate, then dist/

Node 26. Astro, static output, directory format, trailing slashes, MDX content,
deployed to Firebase Hosting.

## The gate

`npm run build` runs, in order:

| Step | What fails the build |
| --- | --- |
| `verify:emdash` | an em dash anywhere under `src/`, `content/` or `scripts/` |
| `sync:person` | `docs/CANONICAL-PERSON.md` has been restructured |
| `astro build` | frontmatter outside the collection schema, metadata outside the caps |
| `fix:sitemap-xsl` | no `xml-stylesheet` in the built sitemap |
| `fix:sitemap-lastmod` | a sitemap route with no built page, unbalanced rail markup |
| `verify:links` | an internal link that would 404 in production |
| `verify:content` | a missing, over-long or DUPLICATED title or description; no H1; a bad canonical |
| `verify:subject` | crypto tax vocabulary, investment advice, a designation claim, denial language, the parenthesised name form |
| `verify:schema` | more than one Person `@id`; any drift from the frozen identity values; a missing author edge |

`npm run estate:titles` is separate and is run by a human before shipping a title
set. It imports the shared detector from `kna-group/scripts/seo-doctor` and
compares this build's titles against what the four sibling domains are serving
live. See `docs/ESTATE-TITLE-CHECK.md`.

## The three rules that are not negotiable

**Never write an em dash.** It fails the build on all five sites in this group.

**Invent nothing.** No date, no figure, no quote and no claim about what a named
person said or did unless it can be checked. Where a claim is contested, name the
contest. Where a source is dead, say so and say what it said. A site whose whole
premise is documenting history correctly cannot make things up, and crypto
history is the easiest subject in the world to get confidently wrong.

**No tax, no advice, no forecast.** `docs/THE-SPLIT.md` explains why the first of
those is a build check rather than a style note.

## Where things are

    content/articles/        the articles, MDX, one file per piece
    docs/CANONICAL-PERSON.md the shared identity sheet, five domains emit it verbatim
    docs/THE-SPLIT.md        why this site does not write about tax
    docs/DEPLOY.md           Firebase, and the DNS records the apex still needs
    launchd/                 the publisher agent, and how to install it
    src/content.config.ts    THE FROZEN SCHEMA. Several authors write against it.
    src/lib/publication.ts   the date gate
    src/lib/collections.ts   the one door every reader of the collection goes through
    src/lib/schema.ts        the entity graph
    src/lib/eras.ts          the six eras and their reading copy
    scripts/verify-subject.mjs  the vocabulary gates, and why each one is scoped as it is

## Scheduling

There is no server, so an article dated tomorrow is absent from today's build and
present in the build that runs on its date. The thing that runs daily is the
launchd agent in `launchd/`. The two are a pair: delete one and every scheduled
piece stays invisible forever.
