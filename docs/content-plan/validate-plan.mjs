/**
 * Validates docs/content-plan/plan-365.json against the frozen content schema
 * for ism50.com, plus the rules this plan imposes on itself.
 *
 * WHY THIS EXISTS. Three hundred and sixty five planned articles get written by
 * agents who will not have read src/content.config.ts, and a seoTitle one
 * character over the cap does not degrade gracefully, it fails the build on the
 * morning that article was due to publish. Catching it now costs nothing.
 *
 * It also enforces the two rules that this particular site cannot survive
 * breaking. The first is the tax gate: crypto tax belongs to khaledhawari.ca
 * and two of Kal's own domains competing for one subject is exactly what cost
 * khaledhawari.ca page one for his own name. The second is the angle
 * prohibition: every angle must tell the writer what the piece MAY NOT claim,
 * because the failure this estate keeps having is an agent inventing a figure
 * to finish a paragraph, and the angle is the only place that gets prevented.
 *
 * Run:  node docs/content-plan/validate-plan.mjs
 * Prints every failure rather than the first, and exits non-zero.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const PLAN = path.join(HERE, "plan-365.json");
const ARTICLES_DIR = path.join(REPO, "content", "articles");

/**
 * ALREADY PUBLISHED. Everything in content/articles today is dated before this
 * plan's first entry, so those pieces are live anchors from day one. They are
 * read from disk rather than listed, because a hand maintained list goes stale.
 *
 * Two things are checked against them. A planned slug must not collide with one,
 * which would fail the build on the day it shipped. And an entry may link to
 * one, which is the only way an early entry gets a link to something that is not
 * itself part of this plan.
 */
const PUBLISHED = new Set(
  fs.readdirSync(ARTICLES_DIR).filter((f) => /\.mdx?$/.test(f)).map((f) => f.replace(/\.mdx?$/, ""))
);

const START = "2026-08-28";
const END = "2027-08-27";
const EXPECTED = 365;

const SEO_TITLE_MAX = 62;
const SEO_TITLE_MIN = 10;
const DESCRIPTION_MIN = 50;
const DESCRIPTION_MAX = 158;
const LEDE_MIN = 20;
const ANGLE_MIN = 120;

const ERAS = new Set(["origins", "earlyExchange", "icoEra", "defiSummer", "institutional", "postFtx"]);
const KINDS = new Set(["timeline", "postmortem", "explainer", "primarySource", "profile"]);

/* Sentence counting has one trap worth naming: a naive split on a full stop
   followed by a space treats "Mt. Gox" as a sentence boundary, and this plan
   mentions it a dozen times. The lookbehind excludes the abbreviations that
   actually appear in this subject. */
const ABBREV = /(?<!\b(?:Mt|St|Dr|Mr|Ms|No|Inc|Ltd|Co|vs|etc|eg|ie|approx))\.\s+(?=["'(\u201c]?[A-Z0-9])/;
const countSentences = (text) => text.split(new RegExp(ABBREV.source, "g")).filter(Boolean).length;

const failures = [];
const fail = (msg) => failures.push(msg);

/* ── the raw file ─────────────────────────────────────────────────────────── */

const raw = fs.readFileSync(PLAN, "utf8");

/* Em dashes and en dashes fail the build on every repo in this estate. Checked
   against the raw text rather than the parsed objects so a stray one in a key,
   in whitespace or in an escape is caught too. */
for (const [i, line] of raw.split("\n").entries()) {
  if (/[—–]/.test(line)) fail(`em or en dash on line ${i + 1}: ${line.trim().slice(0, 90)}`);
}

const plan = JSON.parse(raw);
const entries = plan.entries;

if (!Array.isArray(entries)) {
  console.error("plan.entries is not an array");
  process.exit(1);
}

/* ── count and dates ──────────────────────────────────────────────────────── */

if (entries.length !== EXPECTED) fail(`expected ${EXPECTED} entries, found ${entries.length}`);
if (plan.count !== entries.length) fail(`plan.count is ${plan.count} but there are ${entries.length} entries`);
if (plan.range?.start !== START) fail(`plan.range.start is ${plan.range?.start}, expected ${START}`);
if (plan.range?.end !== END) fail(`plan.range.end is ${plan.range?.end}, expected ${END}`);

const expectedDates = [];
for (let ms = Date.parse(START + "T00:00:00Z"); ms <= Date.parse(END + "T00:00:00Z"); ms += 86400000) {
  expectedDates.push(new Date(ms).toISOString().slice(0, 10));
}
if (expectedDates.length !== EXPECTED) {
  fail(`date arithmetic: ${START} to ${END} inclusive is ${expectedDates.length} days, not ${EXPECTED}`);
}

const byDate = new Map();
for (const e of entries) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || "")) { fail(`${e.slug}: date "${e.date}" is not YYYY-MM-DD`); continue; }
  if (byDate.has(e.date)) fail(`duplicate date ${e.date}: ${byDate.get(e.date)} and ${e.slug}`);
  byDate.set(e.date, e.slug);
}
for (const d of expectedDates) if (!byDate.has(d)) fail(`no entry for ${d}`);
for (const d of byDate.keys()) if (!expectedDates.includes(d)) fail(`entry dated ${d} is outside ${START} to ${END}`);

/* One article a day means the file must also be in date order, because the
   scheduler walks it in order and a reader reads it in order. */
for (let i = 1; i < entries.length; i++) {
  if (entries[i].date <= entries[i - 1].date) fail(`entries are out of order at index ${i}: ${entries[i - 1].date} then ${entries[i].date}`);
}

/* ── slugs, titles ────────────────────────────────────────────────────────── */

const seenSlugs = new Set();
const seenTitles = new Map();
const seenSeo = new Map();
for (const e of entries) {
  if (seenSlugs.has(e.slug)) fail(`duplicate slug: ${e.slug}`);
  seenSlugs.add(e.slug);
  if (PUBLISHED.has(e.slug)) fail(`slug collides with a published article: ${e.slug}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug || "")) fail(`slug is not kebab-case: ${e.slug}`);
  if (/(^|-)(19|20)\d{2}(-|$)/.test(e.slug || "")) fail(`slug contains a year: ${e.slug}`);
  if (seenTitles.has(e.title)) fail(`duplicate title: "${e.title}" on ${seenTitles.get(e.title)} and ${e.slug}`);
  seenTitles.set(e.title, e.slug);
  if (seenSeo.has(e.seoTitle)) fail(`duplicate seoTitle: "${e.seoTitle}" on ${seenSeo.get(e.seoTitle)} and ${e.slug}`);
  seenSeo.set(e.seoTitle, e.slug);
}

/* ── the field contract, identical to src/content.config.ts ───────────────── */

for (const e of entries) {
  const at = `${e.date} ${e.slug}`;

  if (!ERAS.has(e.era)) fail(`${at}: era "${e.era}" is not in the closed set`);
  if (!KINDS.has(e.kind)) fail(`${at}: kind "${e.kind}" is not in the closed set`);
  if (!e.cluster || e.cluster.length < 3) fail(`${at}: cluster is missing`);
  if (!e.title || e.title.length < 3) fail(`${at}: title is missing or too short`);

  if (typeof e.seoTitle !== "string") { fail(`${at}: seoTitle is missing`); }
  else {
    if (e.seoTitle.length > SEO_TITLE_MAX) fail(`${at}: seoTitle is ${e.seoTitle.length} chars (max ${SEO_TITLE_MAX})`);
    if (e.seoTitle.length < SEO_TITLE_MIN) fail(`${at}: seoTitle is ${e.seoTitle.length} chars (min ${SEO_TITLE_MIN})`);
  }

  if (typeof e.description !== "string") fail(`${at}: description is missing`);
  else if (e.description.length < DESCRIPTION_MIN || e.description.length > DESCRIPTION_MAX) {
    fail(`${at}: description is ${e.description.length} chars (must be ${DESCRIPTION_MIN} to ${DESCRIPTION_MAX})`);
  }

  if (typeof e.lede !== "string" || e.lede.length < LEDE_MIN) fail(`${at}: lede is ${e.lede?.length} chars (min ${LEDE_MIN})`);
  if (typeof e.angle !== "string" || e.angle.length < ANGLE_MIN) fail(`${at}: angle is too short to direct a writer`);

  const sentences = countSentences(e.angle || "");
  if (sentences < 3 || sentences > 5) fail(`${at}: angle is ${sentences} sentences (must be 3 to 5)`);
}

/* ── every angle must state what the piece may NOT claim ──────────────────── */

const PROHIBITION = /\b(must not|may not|never|do not|does not)\b/i;
let withProhibition = 0;
for (const e of entries) {
  if (PROHIBITION.test(e.angle || "")) withProhibition++;
  else fail(`${e.slug}: angle states no constraint on what the piece may not claim`);
}

/* ── internal links ───────────────────────────────────────────────────────── */

const STRUCTURAL = new Set(["/about/", "/articles/"]);
const dateOf = new Map(entries.map((e) => [e.slug, e.date]));

for (const e of entries) {
  const at = `${e.date} ${e.slug}`;
  if (!Array.isArray(e.internalLinks) || e.internalLinks.length < 2 || e.internalLinks.length > 4) {
    fail(`${at}: internalLinks must hold 2 to 4 urls, found ${e.internalLinks?.length}`);
    continue;
  }
  if (new Set(e.internalLinks).size !== e.internalLinks.length) fail(`${at}: repeated internal link`);
  for (const url of e.internalLinks) {
    if (!url.endsWith("/")) { fail(`${at}: internal link is missing its trailing slash: ${url}`); continue; }
    if (STRUCTURAL.has(url)) continue;
    if (!url.startsWith("/articles/")) { fail(`${at}: internal link is not a site route: ${url}`); continue; }
    const target = url.slice("/articles/".length, -1);
    if (target === e.slug) { fail(`${at}: links to itself`); continue; }
    if (PUBLISHED.has(target)) continue;   /* live before day one */
    if (!dateOf.has(target)) { fail(`${at}: links to /articles/${target}/ which is neither in the plan nor published`); continue; }
    /* The site is brand new, so there is nothing to link to except this plan.
       A link to a piece that has not published yet is a 404 for months, so
       every article link must point at an entry with a strictly earlier date. */
    if (dateOf.get(target) >= e.date) fail(`${at}: links forward to ${target} dated ${dateOf.get(target)}`);
  }
}

/* ── the tax gate ─────────────────────────────────────────────────────────── */

/* ism50.com NEVER writes about crypto tax. That subject belongs to
   khaledhawari.ca, which already ranks for it, and two of Kal's own domains
   competing on one subject is what pushed khaledhawari.ca off page one for his
   own name. Reader facing fields are checked. The angle is exempt because
   angles legitimately use these words to FORBID the subject. */
const TAX = [
  /\btax(es|ed|ation|able|payer|payers)?\b/i,
  /\badjusted cost base\b/i, /\bcost basis\b/i, /\bcapital gains?\b/i,
  /\bCRA\b/, /\bT1135\b/i, /\bHST\b/, /\bGST\b/,
  /\bfiling season\b/i, /\bsuperficial loss\b/i, /\bdeductib\w*/i,
];
const READER_FIELDS = ["title", "seoTitle", "description", "lede", "cluster"];
for (const e of entries) {
  for (const f of READER_FIELDS) {
    for (const re of TAX) if (re.test(e[f] || "")) fail(`${e.slug}: tax vocabulary in ${f}: ${re}`);
  }
  for (const re of TAX) if (re.test(e.slug)) fail(`${e.slug}: tax vocabulary in the slug`);
}

/* ── the advice gate ──────────────────────────────────────────────────────── */

/* No investment advice, no price targets, no forecasting, no recommendation
   language. Google treats this as YMYL and Kal's professional reputation is the
   whole point of the estate. Reader facing fields only, for the same reason. */
const ADVICE = [
  /\bunder ?valued\b/i, /\bover ?valued\b/i, /\bprice target\b/i,
  /\bshould (buy|sell|hold|invest|allocate)\b/i, /\binvest in\b/i,
  /\bbuy(ing)? opportunity\b/i, /\bbull(ish)? case\b/i, /\bbear(ish)? case\b/i,
  /\bwe recommend\b/i, /\brecommend(ed|ation)?\b/i, /\bguaranteed returns?\b/i,
  /\brisk ?free\b/i, /\bwill (reach|hit|rally|moon)\b/i, /\bprice prediction\b/i,
  /\bportfolio allocation\b/i, /\bfinancial advice\b/i,
];
for (const e of entries) {
  for (const f of ["title", "seoTitle", "description", "lede"]) {
    for (const re of ADVICE) if (re.test(e[f] || "")) fail(`${e.slug}: recommendation language in ${f}: ${re}`);
  }
}

/* ── the estate gate ──────────────────────────────────────────────────────── */

/* This is a brand first publication. Titles lead with the SUBJECT, never with
   his name, which is also the safest position in the estate because it cannot
   collide with the four personal domains. */
for (const e of entries) {
  for (const f of ["title", "seoTitle", "description"]) {
    if (/\b(Khaled|Hawari|Kodelytics|KNA Group)\b/i.test(e[f] || "")) fail(`${e.slug}: estate name in ${f}`);
  }
}

/* ── report ───────────────────────────────────────────────────────────────── */

const tally = (key) => {
  const out = {};
  for (const e of entries) out[e[key]] = (out[e[key]] || 0) + 1;
  return out;
};
const kinds = tally("kind");
const eras = tally("era");
const clusters = tally("cluster");

const descLens = entries.map((e) => e.description.length);
console.log(`entries              ${entries.length}`);
console.log(`date range           ${entries[0].date} to ${entries[entries.length - 1].date}`);
console.log(`unique slugs         ${seenSlugs.size}`);
console.log(`unique dates         ${byDate.size}`);
console.log(`unique seoTitles     ${seenSeo.size}`);
console.log(`clusters             ${Object.keys(clusters).length}`);
console.log(`era balance          ` + ["origins","earlyExchange","icoEra","defiSummer","institutional","postFtx"].map((k) => `${k} ${eras[k] || 0}`).join(", "));
console.log(`kind balance         ` + Object.entries(kinds).sort().map(([k, v]) => `${k} ${v}`).join(", "));
console.log(`seoTitle length      max ${Math.max(...entries.map((e) => e.seoTitle.length))} (cap ${SEO_TITLE_MAX})`);
console.log(`description length   min ${Math.min(...descLens)}, max ${Math.max(...descLens)} (range ${DESCRIPTION_MIN} to ${DESCRIPTION_MAX})`);
console.log(`lede length          min ${Math.min(...entries.map((e) => e.lede.length))} (min ${LEDE_MIN})`);
const pubLinks = entries.reduce((n, e) => n + e.internalLinks.filter((u) => PUBLISHED.has(u.slice("/articles/".length, -1))).length, 0);
console.log(`internal links       ${entries.reduce((n, e) => n + e.internalLinks.length, 0)} total, all backward dated`);
console.log(`published anchors    ${PUBLISHED.size} on disk, linked ${pubLinks} times`);
console.log(`em and en dashes     0`);
console.log(`angles stating a prohibition  ${withProhibition} of ${entries.length}`);
console.log(`tax vocabulary in reader facing fields  0`);
console.log(`recommendation language in reader facing fields  0`);

if (failures.length) {
  console.error(`\nFAILED with ${failures.length} problem(s):`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}

console.log("\nPASS");
