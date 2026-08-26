/**
 * Shared helpers for the post-build verifiers.
 *
 * THEY PARSE THE BUILT HTML, NOT THE SOURCE. What a crawler, a screen reader
 * and a browser receive is the shipped bytes, so that is what gets checked. A
 * verifier that reads the same module the page was generated from cannot catch
 * the page being generated wrongly, which is the whole class of bug these exist
 * to find.
 *
 * NO HTML PARSER DEPENDENCY. The extraction below is deliberately narrow: it
 * pulls the <title>, the meta description, and the JSON-LD blocks, all three of
 * which this repository generates itself from a single component. A regex over
 * arbitrary third-party html would be a mistake; a regex over html we emit, in
 * a shape we control, is a dependency we do not have to carry or update.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const DIST = resolve(ROOT, "dist");

export function requireDist() {
  if (!existsSync(DIST)) {
    console.error("dist/ not found. Run `astro build` first.");
    process.exit(1);
  }
}

/** Every .html file in dist, as paths relative to dist, sorted. */
export async function listHtmlFiles(dir = DIST, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await listHtmlFiles(full, out);
    else if (entry.name.endsWith(".html")) out.push(relative(DIST, full).split(sep).join("/"));
  }
  return out.sort();
}

/**
 * The URL path Firebase serves a built file at.
 * `build.format: "directory"` plus `trailingSlash: "always"`.
 */
export function routeFor(file) {
  if (file === "index.html") return "/";
  if (file.endsWith("/index.html")) return `/${file.slice(0, -"index.html".length)}`;
  /* 404.html is served directly for unmatched paths, not as a directory. */
  return `/${file}`;
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&middot;/g, "·")
    .replace(/&copy;/g, "©")
    .replace(/&nbsp;/g, " ");

/** One built page: its file, route, raw html, title, description and graphs. */
export async function loadPage(file) {
  const html = await readFile(resolve(DIST, file), "utf8");

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);

  const graphs = [];
  const blockRe =
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = blockRe.exec(html))) {
    try {
      graphs.push(JSON.parse(decode(m[1])));
    } catch (error) {
      graphs.push({ __parseError: error.message });
    }
  }

  return {
    file,
    route: routeFor(file),
    html,
    title: titleMatch ? decode(titleMatch[1]).trim() : null,
    description: descMatch ? decode(descMatch[1]).trim() : null,
    canonical: canonMatch ? canonMatch[1] : null,
    robots: robotsMatch ? robotsMatch[1] : null,
    graphs,
  };
}

/** Every built page. */
export async function loadAllPages() {
  requireDist();
  const files = await listHtmlFiles();
  return Promise.all(files.map(loadPage));
}

/**
 * The 404 is excluded from the indexable checks that most verifiers run: it is
 * noindexed, it carries no breadcrumb, and it is served at a path that is not a
 * route. Excluding it here, once, keeps that exception out of three scripts.
 */
export const isIndexable = (page) => page.file !== "404.html";

/** A small, consistent pass/fail reporter so every verifier reads the same. */
export function createReporter(label) {
  const errors = [];
  const warnings = [];

  return {
    error(where, message) {
      errors.push(`${where}: ${message}`);
    },
    warn(where, message) {
      warnings.push(`${where}: ${message}`);
    },
    /** Returns the process exit code. */
    finish(checked) {
      console.log(`${label}  checked ${checked} page${checked === 1 ? "" : "s"}`);

      if (warnings.length) {
        console.warn(`\n  ${warnings.length} warning${warnings.length === 1 ? "" : "s"}:`);
        for (const w of warnings.slice(0, 40)) console.warn(`    ${w}`);
        if (warnings.length > 40) console.warn(`    and ${warnings.length - 40} more.`);
      }

      if (errors.length) {
        console.error(`\n  ${errors.length} ERROR${errors.length === 1 ? "" : "S"}:\n`);
        for (const e of errors.slice(0, 60)) console.error(`    ${e}`);
        if (errors.length > 60) console.error(`    and ${errors.length - 60} more.`);
        console.error("");
        return 1;
      }

      console.log(`${label}  clean.`);
      return 0;
    },
  };
}
