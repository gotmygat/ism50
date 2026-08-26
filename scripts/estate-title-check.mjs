/**
 * THE ESTATE TITLE CHECK.
 *
 *   node scripts/estate-title-check.mjs            fetch the four live sites
 *   node scripts/estate-title-check.mjs --offline  use docs/estate-titles.tsv
 *
 * ===========================================================================
 * WHAT THIS IS FOR
 * ===========================================================================
 *
 * In August 2026 khaledhawari.ca fell off page one for its owner's own name.
 * Not a penalty and not a competitor: two domains he owns were offering
 * themselves as the answer to one query, so Google kept one and filtered the
 * rest, and the one it filtered was the tax practice. The mechanism is recorded
 * in khaledhawari-com/src/lib/seo.ts, and kna-group.com/scripts/seo-doctor was
 * built to detect it across the four live sites.
 *
 * ism50.com is the fifth property, and it ships with a rule: every title leads
 * with its SUBJECT and never with a person's name, with one deliberate exception
 * on /about/, which carries the name AFTER the divider because it is the only
 * page on this domain that can ever answer a query about a person.
 *
 * This script proves that rule holds against what the other four are actually
 * serving, rather than against what anybody remembers them serving.
 *
 * ===========================================================================
 * IT USES kna-group's OWN CHECK, NOT A REIMPLEMENTATION
 * ===========================================================================
 *
 * `checkCannibalisation` in kna-group/scripts/seo-doctor/lib/checks.mjs is the
 * detector this group already trusts, it is the one that would have caught the
 * incident, and copying its logic here would create a second implementation that
 * drifts from the first. So this imports it.
 *
 * The import is a relative path to a SIBLING CHECKOUT, which is unusual and is
 * the reason this is NOT part of `npm run build`. A build that fails because
 * another repository is not cloned is a build that fails on a fresh machine for
 * no good reason. This is a tool a human runs before shipping a title set, and
 * it says clearly what to do when the sibling is missing.
 *
 * Its findings are written to docs/ESTATE-TITLE-CHECK.md, which is committed, so
 * the comparison as of the last run is readable without running anything.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const KNA = resolve(ROOT, "../kna-group");
const CHECKS = resolve(KNA, "scripts/seo-doctor/lib/checks.mjs");
const CACHE = resolve(ROOT, "docs/estate-titles.tsv");
const REPORT = resolve(ROOT, "docs/ESTATE-TITLE-CHECK.md");

if (!existsSync(CHECKS)) {
  console.error(
    `estate:titles cannot run.\n` +
      `  It imports the shared detector from ${CHECKS},\n` +
      `  which is not present. Clone kna-group beside this repository:\n\n` +
      `    git clone https://github.com/gotmygat/kna-group ${KNA}\n\n` +
      `  This check is deliberately NOT part of \`npm run build\`, so nothing is\n` +
      `  broken by it being unavailable. docs/ESTATE-TITLE-CHECK.md holds the\n` +
      `  comparison as of the last run.`
  );
  process.exit(1);
}

const { checkCannibalisation, sharedLeadingWords, isCollidingPrefix, firstSegment } = await import(
  CHECKS
);

/* --------------------------------------------------------- the estate --- */

/**
 * The routes that matter, which is to say the ones most likely to contest a
 * query about a person. Home pages, about pages and the two hub pages that name
 * him. A full crawl is seo-doctor's job; this is the pre-flight.
 */
const ESTATE_URLS = [
  "https://khaledhawari.ca/",
  "https://khaledhawari.ca/about-khaled-hawari/",
  "https://khaledhawari.com/",
  "https://khaledhawari.com/about/",
  "https://kodelytics.ca/",
  "https://kodelytics.ca/about",
  "https://kna-group.com/",
  "https://kna-group.com/about/",
  "https://kna-group.com/team/khaled-hawari/",
];

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

async function fetchTitle(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      /* A browser user agent. Several of these hosts, and several of the hosts
         these sites cite, return 403 or a gate page to a bare fetch, and a 403
         is not evidence that a page is missing. */
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
    },
    signal: AbortSignal.timeout(30_000),
  });
  const html = await res.text();
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return { url, status: res.status, title: m ? decode(m[1]).trim() : null };
}

const offline = process.argv.includes("--offline");

let live;
if (offline) {
  if (!existsSync(CACHE)) {
    console.error(`--offline needs ${CACHE}, which does not exist. Run without --offline once.`);
    process.exit(1);
  }
  live = readFileSync(CACHE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [url, title] = line.split("\t");
      return { url, title, status: 200 };
    });
  console.log(`estate:titles  read ${live.length} titles from ${CACHE} (offline)\n`);
} else {
  console.log(`estate:titles  fetching ${ESTATE_URLS.length} live titles...\n`);
  live = await Promise.all(ESTATE_URLS.map(fetchTitle));
  writeFileSync(CACHE, live.map((p) => `${p.url}\t${p.title ?? ""}`).join("\n") + "\n");
}

/* ------------------------------------------------------ this site's own --- */

/* Read out of the BUILD, not out of the source, so the comparison is against
   what actually ships rather than against what a registry says should. */
const { readdirSync } = await import("node:fs");
function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const DIST = resolve(ROOT, "dist");
if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first, so this compares what SHIPS.");
  process.exit(1);
}

const ours = walk(DIST)
  .map((file) => {
    const html = readFileSync(file, "utf8");
    if (/name="robots"\s+content="[^"]*noindex/i.test(html)) return null;
    const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const c = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const d = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (!t || !c) return null;
    return { url: c[1], title: decode(t[1]).trim(), description: d ? decode(d[1]) : null };
  })
  .filter(Boolean)
  .sort((a, b) => a.url.localeCompare(b.url));

/* ------------------------------------------------------------- the run --- */

const hostOf = (url) => new URL(url).host.replace(/^www\./, "");

const pages = [
  ...live
    .filter((p) => p.title)
    .map((p) => ({ site: hostOf(p.url), url: p.url, title: p.title, status: 200, robots: "" })),
  ...ours.map((p) => ({
    site: hostOf(p.url),
    url: p.url,
    title: p.title,
    description: p.description,
    status: 200,
    robots: "",
  })),
];

const findings = checkCannibalisation(pages).filter(
  (f) => f.severity === "critical" || f.severity === "warning"
);

/* Findings that involve ism50.com at all. A collision between two OTHER domains
   is a real problem and is seo-doctor's to report; it is not this repo's to fix
   and burying the one that is would defeat the purpose. */
const involvesUs = (finding) =>
  (finding.evidence ?? "").includes("ism50.com") || (finding.url ?? "").includes("ism50.com");

const mine = findings.filter(involvesUs);
const theirs = findings.filter((f) => !involvesUs(f));

/* ---------------------------------------------------------- the report --- */

const lines = [];
const say = (s = "") => {
  lines.push(s);
  console.log(s);
};

say("# Estate title check");
say();
say(
  "Generated by `npm run estate:titles`, which imports `checkCannibalisation` from"
);
say("`kna-group/scripts/seo-doctor/lib/checks.mjs` and feeds it the titles the four");
say("sibling domains are serving live, plus every indexable title this build ships.");
say();
say(`Last run: ${new Date().toISOString().slice(0, 10)}`);
say();
say("## The four live domains");
say();
say("| Domain | Route | Live title | Leading segment |");
say("| --- | --- | --- | --- |");
for (const p of live.filter((x) => x.title)) {
  const u = new URL(p.url);
  say(
    `| ${hostOf(p.url)} | \`${u.pathname}\` | ${p.title} | ${firstSegment(p.title)} |`
  );
}
say();
say("## ism50.com, as built");
say();
say("| Route | Title | Chars | Leading segment |");
say("| --- | --- | --- | --- |");
for (const p of ours) {
  say(
    `| \`${new URL(p.url).pathname}\` | ${p.title} | ${p.title.length} | ${firstSegment(p.title)} |`
  );
}
say();
say("## Longest shared opening, every ism50 title against every estate title");
say();
say(
  "`sharedLeadingWords` cut back to whole words, exactly as the shared detector computes it."
);
say("A run is a COLLISION when it is at least two words AND either covers one title's");
say("entire headline claim or reaches 20 characters.");
say();
say("| ism50 route | Estate page | Shared opening | Words | Collision |");
say("| --- | --- | --- | --- | --- |");

let worst = { prefix: "", ours: "", theirs: "" };
for (const a of ours) {
  for (const b of live.filter((x) => x.title)) {
    const prefix = sharedLeadingWords(a.title, b.title);
    const collides = isCollidingPrefix(prefix, a.title, b.title);
    const words = prefix ? prefix.split(/\s+/).filter(Boolean).length : 0;
    if (prefix.length > worst.prefix.length) {
      worst = { prefix, ours: a.url, theirs: b.url };
    }
    if (prefix || collides) {
      say(
        `| \`${new URL(a.url).pathname}\` | ${hostOf(b.url)}\`${new URL(b.url).pathname}\` | ${
          prefix ? `"${prefix}"` : "(none)"
        } | ${words} | ${collides ? "**YES**" : "no"} |`
      );
    }
  }
}
if (!lines.at(-1).startsWith("|")) say("| (no ism50 title shares any opening with any estate title) | | | | |");
say();
say(
  `**Longest shared opening anywhere:** ${
    worst.prefix ? `"${worst.prefix}" (${worst.prefix.length} chars)` : "none, zero characters"
  }`
);
say();
say("## Findings involving ism50.com");
say();
if (mine.length === 0) {
  say("**None.** No critical or warning finding from the shared detector involves this domain.");
} else {
  for (const f of mine) {
    say(`### ${f.severity.toUpperCase()}: ${f.summary}`);
    say();
    say(f.detail);
    say();
    say("```");
    say(f.evidence ?? "");
    say("```");
    say();
  }
}
say();
say("## Pre-existing findings between the four sibling domains");
say();
say(
  "Reported rather than hidden, because a collision between two other domains is real and"
);
say("is seo-doctor's to action. It is not this repository's to fix.");
say();
if (theirs.length === 0) {
  say("None among the routes sampled here.");
} else {
  for (const f of theirs) say(`- **${f.severity}**: ${f.summary}`);
}
say();

writeFileSync(REPORT, lines.join("\n") + "\n");
console.log(`\nestate:titles  wrote ${REPORT}`);

if (mine.length) {
  console.error(
    `\nestate:titles  ${mine.length} finding(s) involve ism50.com. A title on this domain has to change.`
  );
  process.exit(1);
}
console.log("estate:titles  clean for ism50.com.");
