/**
 * Internal link integrity.
 *
 * Runs against dist/, so it validates what actually ships rather than what the
 * source intended. A link to a route that does not exist FAILS THE BUILD: it
 * must never reach production and 404 there.
 *
 * A link that resolves only through a redirect declared in firebase.json is a
 * warning rather than an error. It works, but every hop costs a little link
 * equity and it should be repointed at the final destination.
 *
 *   node scripts/verify-links.mjs
 */

import { readFile } from "node:fs/promises";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

import { DIST, ROOT, listHtmlFiles, requireDist, routeFor } from "./lib/dist.mjs";

requireDist();

/* --- every path the build actually emitted -------------------------------- */

const routes = new Set();

function walkAll(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkAll(full);
    } else {
      const rel = path.relative(DIST, full).split(path.sep).join("/");
      /* A page is reachable at its directory route, and every file is also
         reachable at its own literal path. Both are legal link targets. */
      if (rel.endsWith(".html")) routes.add(routeFor(rel));
      routes.add(`/${rel}`);
    }
  }
}
walkAll(DIST);

/* --- the redirect map ------------------------------------------------------ */

const redirectSources = new Set();
try {
  const config = JSON.parse(await readFile(path.join(ROOT, "firebase.json"), "utf8"));
  for (const rule of config.hosting?.redirects ?? []) redirectSources.add(rule.source);
} catch {
  console.warn("  firebase.json not readable, redirect-aware checks skipped.");
}

/* --- scan every emitted page ----------------------------------------------- */

const files = await listHtmlFiles();
const broken = [];
const viaRedirect = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(path.join(DIST, file), "utf8");
  const from = routeFor(file);

  for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
    let href = match[1].trim();

    if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    if (!href.startsWith("/")) continue;

    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    checked++;

    /* A route needs a trailing slash on this site. A path with an extension is
       a file and keeps whatever it has. */
    const target = href.endsWith("/") || path.extname(href) ? href : `${href}/`;

    if (routes.has(target) || routes.has(href)) continue;
    if (redirectSources.has(target) || redirectSources.has(href)) {
      viaRedirect.push({ from, href: target });
      continue;
    }
    broken.push({ from, href: target });
  }
}

/* --- report ---------------------------------------------------------------- */

console.log(`verify:links   pages ${files.length}, internal links ${checked}`);

if (viaRedirect.length) {
  const grouped = new Map();
  for (const item of viaRedirect) grouped.set(item.href, (grouped.get(item.href) ?? 0) + 1);
  console.warn("\n  warning, these resolve only through a redirect hop:");
  for (const [href, count] of [...grouped].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
    console.warn(`    ${String(count).padStart(4)}x  ${href}`);
  }
}

if (broken.length) {
  const grouped = new Map();
  for (const item of broken) {
    if (!grouped.has(item.href)) grouped.set(item.href, []);
    grouped.get(item.href).push(item.from);
  }
  console.error("\nBROKEN INTERNAL LINKS. These would 404 in production.\n");
  for (const [href, sources] of [...grouped].sort((a, b) => b[1].length - a[1].length)) {
    console.error(`  ${href}   (${sources.length} page${sources.length > 1 ? "s" : ""})`);
    for (const source of sources.slice(0, 3)) console.error(`      from ${source}`);
    if (sources.length > 3) console.error(`      and ${sources.length - 3} more`);
  }
  process.exit(1);
}

console.log("verify:links   all internal links resolve.");
