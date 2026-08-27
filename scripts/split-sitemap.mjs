/**
 * Split the single generated sitemap into one file per content type.
 *
 * WHY, AND WHAT THIS DOES NOT DO. Splitting buys nothing for ranking and
 * nothing for crawling. The 50,000-URL and 50MB limits are three orders of
 * magnitude away from this site. The one thing it does buy is DIAGNOSIS:
 * Search Console reports index coverage per submitted sitemap, so instead of a
 * single blended "n of m indexed" the report reads
 *
 *     sitemap-articles.xml   340 submitted, 331 indexed
 *     sitemap-pages.xml        4 submitted,   4 indexed
 *
 * and the gap is visible at a glance. On a site heading for hundreds of
 * scheduled articles, "are my articles actually getting indexed" is a question
 * worth being able to answer without guessing.
 *
 * RUNS AFTER fix:sitemap-lastmod, never before. That script is the thing that
 * decides what each `lastmod` says; this one only moves URLs between files and
 * must inherit those dates verbatim rather than compute its own.
 *
 * sitemap-0.xml is DELETED rather than left behind. Leaving it would mean every
 * URL appears in two sitemaps Google knows about, which double-counts coverage
 * and defeats the only reason to split at all. Google drops a sitemap that has
 * left the index on its next read of the index.
 */

import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const ORIGIN = "https://ism50.com";

/**
 * First path segment -> sitemap name. Anything not listed lands in "pages",
 * which is deliberate: a new top-level section shows up in a file that already
 * exists rather than silently vanishing from the sitemap.
 */
const BUCKETS = {
  articles: "articles",
};
const DEFAULT_BUCKET = "pages";

const src = join(DIST, "sitemap-0.xml");
if (!existsSync(src)) {
  console.error(
    "split-sitemap: dist/sitemap-0.xml not found. Did astro build run?",
  );
  process.exit(1);
}

const xml = readFileSync(src, "utf8");

/* Whole <url> blocks, kept byte-for-byte. Re-serialising them would risk
   dropping a field this script does not know about. */
const entries = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((m) => m[0]);
if (entries.length === 0) {
  console.error("split-sitemap: no <url> entries in dist/sitemap-0.xml");
  process.exit(1);
}

const bucketed = new Map();
for (const entry of entries) {
  const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) {
    console.error(`split-sitemap: a <url> block has no <loc>:\n${entry}`);
    process.exit(1);
  }
  const path = loc.replace(ORIGIN, "").replace(/^\//, "");
  const segment = path.split("/")[0];
  const bucket = BUCKETS[segment] ?? DEFAULT_BUCKET;
  if (!bucketed.has(bucket)) bucketed.set(bucket, []);
  bucketed.get(bucket).push(entry);
}

const header =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

const children = [];
for (const [bucket, list] of [...bucketed].sort((a, b) =>
  a[0].localeCompare(b[0]),
)) {
  const file = `sitemap-${bucket}.xml`;
  writeFileSync(
    join(DIST, file),
    `${header}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${list.join("")}</urlset>`,
    "utf8",
  );
  /* The index entry's lastmod is the newest lastmod inside the file. A child
     sitemap claiming to be newer than anything it contains is the same lie this
     estate spent a day removing from the URL level. */
  const dates = list
    .map((e) => e.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1])
    .filter(Boolean)
    .sort();
  children.push({ file, lastmod: dates.at(-1), count: list.length });
}

writeFileSync(
  join(DIST, "sitemap-index.xml"),
  `${header}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    children
      .map(
        (c) =>
          `<sitemap><loc>${ORIGIN}/${c.file}</loc>` +
          (c.lastmod ? `<lastmod>${c.lastmod}</lastmod>` : "") +
          `</sitemap>`,
      )
      .join("") +
    `</sitemapindex>`,
  "utf8",
);

rmSync(src);

/* Any stale sitemap-N.xml from an earlier build shape would still be served and
   would still be double-counted. Remove them too. */
for (const name of readdirSync(DIST)) {
  if (/^sitemap-\d+\.xml$/.test(name)) rmSync(join(DIST, name));
}

const total = children.reduce((n, c) => n + c.count, 0);
if (total !== entries.length) {
  console.error(
    `split-sitemap: ${entries.length} URLs in, ${total} out. Refusing to ship.`,
  );
  process.exit(1);
}

console.log(
  `split-sitemap: ${entries.length} URLs across ${children.length} files`,
);
for (const c of children)
  console.log(
    `  ${c.file.padEnd(26)} ${String(c.count).padStart(4)}  ${c.lastmod ?? ""}`,
  );
