/**
 * Regenerates PLAN-365.md from plan-365.json.
 *
 * plan-365.json is the source of truth. This document is the readable view of
 * it, and a readable view maintained by hand diverges from its data inside a
 * month, which is exactly the failure this plan exists to avoid elsewhere.
 * Edit the JSON, run this, then run validate-plan.mjs.
 *
 * Run:  node docs/content-plan/render-plan.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const plan = JSON.parse(fs.readFileSync(path.join(HERE, "plan-365.json"), "utf8"));
const E = plan.entries;

const PUBLISHED = fs
  .readdirSync(path.join(REPO, "content", "articles"))
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ""))
  .sort();

const ERA_ORDER = ["origins", "earlyExchange", "icoEra", "defiSummer", "institutional", "postFtx"];
const ERA_LABEL = {
  origins: "origins",
  earlyExchange: "earlyExchange",
  icoEra: "icoEra",
  defiSummer: "defiSummer",
  institutional: "institutional",
  postFtx: "postFtx",
};
const ERA_BLURB = {
  origins: "What had to be true before any of it could work, the document itself, the first users, and the invention of a way to decide anything.",
  earlyExchange: "The intermediary reappears immediately, holds everyone's money, and starts failing. Mining becomes an industry and the law arrives.",
  icoEra: "A general purpose chain, a fork that proved intervention was available, a fundraising machine built on a six function interface, and a governance war.",
  defiSummer: "Financial primitives assembled in public, a stable unit that made pricing possible, a catalogue of exploits, and a collectibles market.",
  institutional: "Custody becomes a separate business, Wall Street builds a wrapper, states answer with their own designs, and a compliance layer forms at the edges.",
  postFtx: "A credit cascade, the largest custody failure yet, a transparency exercise that proves the easy half, the courts, and what actually settled.",
};

const monthKey = (d) => d.slice(0, 7);
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthLabel = (k) => `${MONTHS[Number(k.slice(5, 7)) - 1]} ${k.slice(0, 4)}`;

const tally = (key) => {
  const out = {};
  for (const e of E) out[e[key]] = (out[e[key]] || 0) + 1;
  return out;
};
const kinds = tally("kind");
const eras = tally("era");

/* Clusters, in the order they first appear in the plan, grouped by era. */
const clustersByEra = new Map(ERA_ORDER.map((x) => [x, new Map()]));
for (const e of E) {
  const m = clustersByEra.get(e.era);
  m.set(e.cluster, (m.get(e.cluster) || 0) + 1);
}
const clusterCount = ERA_ORDER.reduce((n, era) => n + clustersByEra.get(era).size, 0);

const head = `# The 365 day editorial plan for ism50.com

One article a day, from **${plan.range.start}** to **${plan.range.end}** inclusive. Three
hundred and sixty five entries, one per calendar date, no gaps and no
duplicates. The machine readable version of everything below is
\`plan-365.json\` in this directory, and \`validate-plan.mjs\` checks both against
the frozen schema in \`src/content.config.ts\`.

---

## The thesis, which is the reason this plan is not 365 encyclopedia entries

${plan.thesis}

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
   \`validate-plan.mjs\` fails on the vocabulary and so does the build.

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

\`src/content.config.ts\` is enforced at build time and again by
\`scripts/verify-content.mjs\` against the shipped HTML. The fields below are
supplied per entry and must be carried into the frontmatter unchanged unless you
have a reason and you recount the characters.

| Field | Rule |
| --- | --- |
| \`title\` | The on-page H1. Uncapped. |
| \`seoTitle\` | The complete \`<title>\`. **62 characters maximum.** Nothing is appended. |
| \`description\` | 50 to 158 characters. |
| \`date\` | As planned. One article per date. It drives the publication gate. |
| \`author\` | Khaled Hawari. |
| \`era\` | \`origins\`, \`earlyExchange\`, \`icoEra\`, \`defiSummer\`, \`institutional\`, \`postFtx\`. Closed set. |
| \`kind\` | \`timeline\`, \`postmortem\`, \`explainer\`, \`primarySource\`, \`profile\`. Closed set. |
| \`lede\` | One sentence, 20 characters minimum. |

\`cluster\`, \`angle\` and \`internalLinks\` are planning fields. They direct the
writing and do not appear in frontmatter.

### The five kinds mean something

A \`timeline\` is genuinely sequenced and every step carries a date or an ordering
you can check. A \`postmortem\` follows **one** failure to its causes and does not
wander into general advice. An \`explainer\` makes **one** mechanism comprehensible
and is still true in three years. A \`primarySource\` is built around a document or
an artefact and reports what it actually said, with the document open. A
\`profile\` is about a person or a group and what changed because of them, sourced,
and it must survive that person reading it.

If a draft has drifted from its planned kind, change the draft rather than the
frontmatter. The listing page and the reader both expect what the label promises.

### Writing about people

No hagiography and no hit pieces. A \`profile\` covers what somebody actually did
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

${PUBLISHED.length} articles are on disk and dated before this plan's first entry, so they are
live anchors from day one.

${PUBLISHED.map((s) => `- \`${s}\``).join("\n")}

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
${ERA_ORDER.map((era) => {
  const rows = E.filter((e) => e.era === era);
  return `| ${rows[0].date} to ${rows[rows.length - 1].date} | \`${ERA_LABEL[era]}\` | ${rows.length} |`;
}).join("\n")}

Within an era the clusters are interleaved, so consecutive days change subject
while the order inside a cluster is preserved. That preservation is what keeps
every link pointing backwards.

---

## The clusters

${clusterCount} clusters across the six eras.

${ERA_ORDER.map((era) => {
  const m = clustersByEra.get(era);
  return `### \`${ERA_LABEL[era]}\` (${eras[era]} articles)

${ERA_BLURB[era]}

| Cluster | Articles |
| --- | --- |
${[...m.entries()].map(([c, n]) => `| ${c} | ${n} |`).join("\n")}`;
}).join("\n\n")}

### Kind balance

| Kind | Articles |
| --- | --- |
${Object.entries(kinds).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| \`${k}\` | ${v} |`).join("\n")}

**Total: ${E.length}.**

---

## The plan

Each entry gives the writer the slug, the date, the era, the kind, the H1, the
\`seoTitle\` and \`description\` already inside their caps, the lede, the angle, the
cluster and the internal links.

**Read the angle twice.** The final sentence of every angle states what the piece
may not claim. That sentence is the whole reason this plan can be handed to a
writer eleven months from now.
`;

let body = "";
let current = "";
for (const e of E) {
  const k = monthKey(e.date);
  if (k !== current) {
    current = k;
    const n = E.filter((x) => monthKey(x.date) === k).length;
    body += `\n### ${monthLabel(k)}\n\n_${n} articles._\n\n`;
  }
  body += `#### ${e.date} &middot; \`${e.slug}\`\n\n`;
  body += `**${e.title}**\n\n`;
  body += `| | |\n| --- | --- |\n`;
  body += `| Era | \`${e.era}\` |\n`;
  body += `| Kind | \`${e.kind}\` |\n`;
  body += `| Cluster | ${e.cluster} |\n`;
  body += `| seoTitle | ${e.seoTitle} _(${e.seoTitle.length} chars)_ |\n`;
  body += `| description | ${e.description} _(${e.description.length} chars)_ |\n`;
  body += `| lede | ${e.lede} |\n`;
  body += `| Links | ${e.internalLinks.map((u) => `\`${u}\``).join(", ")} |\n\n`;
  body += `${e.angle}\n\n`;
}

const tail = `
---

## Maintaining this plan

\`plan-365.json\` is the source of truth. This document is generated from it by
\`render-plan.mjs\`, so edit the JSON rather than this file, then run both:

\`\`\`
node docs/content-plan/render-plan.mjs
node docs/content-plan/validate-plan.mjs
\`\`\`

The validator asserts the count, the exact inclusive date range with no gaps or
duplicates, date ordering, unique kebab-case slugs with no years and no collision
with anything already in \`content/articles/\`, unique titles and seoTitles, every
\`seoTitle\` inside 62 characters, every \`description\` between 50 and 158, every
\`lede\` at 20 or more, every \`era\` and \`kind\` inside its closed set, every angle
between three and five sentences and stating at least one prohibition, two to
four internal links per entry all resolving backwards in time, no crypto tax
vocabulary and no recommendation language in any reader facing field, no estate
name in any title, and no em or en dash anywhere in the file. It prints every
failure rather than stopping at the first, and exits non-zero.

### The pipeline

\`sources/*.json\` is what a human edits, one file per cluster. Then:

\`\`\`
node docs/content-plan/assemble.mjs      sources  ->  plan-365.json
node docs/content-plan/render-plan.mjs   json     ->  PLAN-365.md
node docs/content-plan/validate-plan.mjs            checks everything
\`\`\`

\`assemble.mjs\` assigns the dates and resolves the internal links, which is why
the link graph is correct by construction rather than by review. Ordering inside
a source file is load bearing: an entry's \`pref\` targets are its earlier cluster
mates, so the file order is what keeps those links pointing backwards. Add an
entry at the end of its cluster, not the middle, unless you move its \`pref\`
targets with it.

Publishing an entry does not remove it from this file. Leave the record intact so
a future editor can see what was planned, what shipped and what changed.
`;

const md = head + body + tail;
if (/[—–]/.test(md)) {
  console.error("FAILED: em or en dash in generated markdown");
  process.exit(1);
}
fs.writeFileSync(path.join(HERE, "PLAN-365.md"), md);
console.log("wrote PLAN-365.md", (md.length / 1024).toFixed(0) + "KB");
