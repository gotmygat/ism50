/**
 * Builds plan-365.json from the per cluster sources in sources/.
 *
 * WHY THIS EXISTS RATHER THAN A HAND WRITTEN plan-365.json. Two things in this
 * plan are easy to get wrong by hand and impossible to get wrong here.
 *
 * DATES. Three hundred and sixty five entries, one per calendar date, no gaps
 * and no duplicates, is an arithmetic claim. Assigning dates by walking an
 * ordered list makes it true by construction instead of true by review.
 *
 * LINKS. The site is new, so there is almost nothing to link to except this
 * plan, and a link to a piece that has not published yet is a 404 for months.
 * Every internal link therefore has to point BACKWARDS in time. Each source
 * entry names its preferred targets in a `pref` array; this script keeps only
 * the ones already dated earlier, fills any shortfall from the nearest earlier
 * cluster mate, then era mate, then a structural route, and drops `pref`. The
 * link graph is correct by construction and validate-plan.mjs proves it again.
 *
 * THE PIPELINE. sources/*.json is what a human edits. Then:
 *
 *   node docs/content-plan/assemble.mjs      sources  ->  plan-365.json
 *   node docs/content-plan/render-plan.mjs   json     ->  PLAN-365.md
 *   node docs/content-plan/validate-plan.mjs            checks everything
 *
 * Ordering inside a source file is load bearing: an entry's `pref` targets are
 * its earlier cluster mates, so the file order is what keeps those links
 * pointing backwards. Add an entry at the end of its cluster, not the middle,
 * unless you also move its `pref` targets.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");

/* Articles already on disk publish BEFORE this plan's first entry, so they are
   anchors the plan can link to from day one. Read them rather than listing them,
   because a hand maintained list goes stale in a week. */
const PUBLISHED = new Set(
  fs.readdirSync(path.join(REPO, "content", "articles"))
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""))
);

const ERA_ORDER = ["origins","earlyExchange","icoEra","defiSummer","institutional","postFtx"];
const START = "2026-08-28";
const SOURCES = path.join(HERE, "sources");
const files = fs.readdirSync(SOURCES).filter(f=>/^\d\d-.+\.json$/.test(f)).sort();

const byEra = new Map(ERA_ORDER.map(e=>[e,[]]));
for (const f of files) {
  const arr = JSON.parse(fs.readFileSync(path.join(SOURCES, f),"utf8"));
  const era = arr[0].era;
  byEra.get(era).push(arr);           // one queue per cluster, file order preserved
}

/* Round robin across the clusters of each era so consecutive days change subject,
   while the order inside a cluster is preserved. That ordering is load bearing:
   every entry's preferred links point at earlier entries of the same cluster, so
   preserving cluster order keeps those links pointing backwards in time. */
const ordered = [];
for (const era of ERA_ORDER) {
  const queues = byEra.get(era).map(a=>a.slice());
  let placed = 0;
  const total = queues.reduce((n,q)=>n+q.length,0);
  while (placed < total) {
    for (const q of queues) {
      if (!q.length) continue;
      ordered.push(q.shift());
      placed++;
    }
  }
}

for (const e of ordered) {
  if (PUBLISHED.has(e.slug)) { console.error(`plan slug collides with a published article: ${e.slug}`); process.exit(1); }
}

if (ordered.length !== 365) { console.error("expected 365, got", ordered.length); process.exit(1); }

const dayMs = 86400000;
const t0 = Date.parse(START + "T00:00:00Z");
ordered.forEach((e,i)=>{ e.date = new Date(t0 + i*dayMs).toISOString().slice(0,10); });

const pos = new Map(ordered.map((e,i)=>[e.slug,i]));
const STRUCTURAL = ["/about/","/articles/"];

for (let i=0;i<ordered.length;i++){
  const e = ordered[i];
  const links = [];
  const push = u => { if (links.length < 4 && !links.includes(u)) links.push(u); };

  for (const s of (e.pref||[])) {
    if (PUBLISHED.has(s)) { push(`/articles/${s}/`); continue; }
    const p = pos.get(s);
    if (p === undefined) { console.error(`${e.slug}: pref "${s}" is neither a plan slug nor a published article`); process.exit(1); }
    if (p < i) push(`/articles/${s}/`);
  }
  if (links.length < 2) {                       // nearest earlier cluster mates
    for (let j=i-1;j>=0 && links.length<3;j--) if (ordered[j].cluster === e.cluster) push(`/articles/${ordered[j].slug}/`);
  }
  if (links.length < 2) {                       // nearest earlier era mates
    for (let j=i-1;j>=0 && links.length<3;j--) if (ordered[j].era === e.era) push(`/articles/${ordered[j].slug}/`);
  }
  if (links.length < 2) {                       // nearest earlier anything
    for (let j=i-1;j>=0 && links.length<3;j--) push(`/articles/${ordered[j].slug}/`);
  }
  for (const s of STRUCTURAL) if (links.length < 2) push(s);
  e.internalLinks = links;
  delete e.pref;
}

const plan = {
  site: "ism50.com",
  thesis: "An ISM reading of 50 is the line between expansion and contraction. Every entry answers what was expanding, what was contracting, and who could tell at the time.",
  range: { start: ordered[0].date, end: ordered[ordered.length-1].date },
  count: ordered.length,
  entries: ordered.map(e=>({
    slug:e.slug, date:e.date, era:e.era, kind:e.kind,
    title:e.title, seoTitle:e.seoTitle, description:e.description,
    lede:e.lede, angle:e.angle, cluster:e.cluster, internalLinks:e.internalLinks
  }))
};
fs.writeFileSync(path.join(HERE, "plan-365.json"), JSON.stringify(plan,null,2) + "\n");
console.log("wrote plan-365.json", plan.range.start, "to", plan.range.end, plan.count, "entries");
const structuralUsers = plan.entries.filter(e=>e.internalLinks.some(u=>STRUCTURAL.includes(u)));
console.log("entries using a structural route:", structuralUsers.length, structuralUsers.map(e=>e.slug).join(", "));
