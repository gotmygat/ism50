/**
 * Give every sitemap URL a `lastmod`, derived from the page's RENDERED OUTPUT.
 *
 *   node scripts/sitemap-lastmod.mjs        (runs from npm run build)
 *
 * -------------------------------------------------- why this exists at all --
 *
 * @astrojs/sitemap emits `lastmod` only when it is given one, and a sitemap of
 * several hundred URLs carrying no dates costs recrawl priority on a domain
 * that publishes one article a day for a year. Every sibling site in this group
 * shipped without the field and had to add it later; this one has it from the
 * first deploy.
 *
 * --------------------------------------------------- the obvious wrong fix --
 *
 * Stamp the build time. Every URL then advertises a change on every deploy, and
 * this site deploys four times a day whether or not anything moved. A crawler
 * that learns a host's `lastmod` is a build clock stops reading the field, and
 * a field that is ignored is worse than a field that is absent, because absent
 * at least costs nothing to have been wrong about.
 *
 * The next-most-obvious fix is the git date of the route's own source file.
 * Three sibling sites shipped that and all three wrote up why it fails: it is a
 * proxy for the question that matters and it fails in both directions. A
 * rewrite in a shared component changes what many pages SAY while their own
 * files sit untouched, and a comment-only edit to a page file moves that page's
 * date without changing one byte a reader receives.
 *
 * ------------------------------------------------------------- the answer --
 *
 * Ask the real question. After the build, hash what each page ACTUALLY renders
 * and compare it against a committed manifest of the last hash published.
 * Output changed, so the date moves. Output identical, so the stored date
 * stands, no matter which files were touched to get there.
 *
 * The manifest, content/sitemap-hashes.json, is committed, and
 * scripts/publish-scheduled.sh commits it again after every successful deploy.
 * That is the whole mechanism: it is the only memory of what the last deploy
 * really served. Delete it and every page looks new. See "seeding" below.
 *
 * ----------------------------------------- what gets hashed, and why not --
 *
 * IN: the page's own <head> metadata (title, description, canonical, robots),
 *     its page-specific JSON-LD nodes, and everything inside <main>.
 *     src/layouts/Base.astro gives every route exactly one <main id="main">.
 *
 * OUT, and every exclusion below was checked against this repository's own
 * built HTML rather than inherited from a sibling:
 *
 *   <header class="site-header"> and <footer class="site-footer">. Both sit
 *     outside <main> in Base.astro, so hashing <main> excludes them for free.
 *     Google's guidance is that `lastmod` reflects a significant change to the
 *     page, not to its boilerplate, and the footer makes the point concretely:
 *     it prints `new Date().getFullYear()`, so on 1 January every URL in this
 *     sitemap would otherwise claim to have been modified, every year, over a
 *     copyright line.
 *
 *   The related-articles rail at the foot of an article page, marked in
 *     src/pages/articles/[slug].astro with `data-lastmod-rail`. THIS IS THE
 *     LOAD-BEARING ONE ON THIS SITE. That template renders the three newest
 *     OTHER articles, so publishing tomorrow's piece rewrites a card on every
 *     article page that already exists. Hashed, one publish would restamp the
 *     entire archive, and after a year of daily publishing that is seven
 *     hundred URLs claiming to have changed every morning: the build-clock
 *     failure above, arriving by a different road. The rail is a signpost to
 *     other documents, not a change to this one.
 *
 *   Asset content hashes inside /_astro/ filenames. One stylesheet is linked
 *     from every page and is built from src/styles/*.css, so editing one shared
 *     token rewrites that filename on every page at once. The un-hashed
 *     basename is kept, so swapping WHICH asset a page loads still registers as
 *     a change.
 *
 *   <style> and <script> bodies, <link rel="stylesheet|preload|modulepreload|
 *     prefetch|icon|apple-touch-icon|manifest|mask-icon">, and
 *     <meta name="generator">. Astro inlines the font @font-face rules and the
 *     critical CSS into every page's <head>, so both move with any global
 *     stylesheet edit; the generator tag literally embeds the Astro version
 *     ("Astro v7.x.y"), so a patch upgrade would restamp every route.
 *
 *   data-astro-cid-* scope attributes. Astro derives these from the
 *     component's file path, so renaming a component rewrites the attribute on
 *     every page that renders it, with no change to a single visible
 *     character.
 *
 *   JSON-LD nodes that serialise byte-identically on every page in the build.
 *     COMPUTED, not a hardcoded list, so the day one of those nodes starts
 *     differing per page it is counted again automatically with no edit here.
 *     The reason is the footer's reason: a node that is the same everywhere
 *     cannot describe what any one page is about, so counting it could only
 *     ever move all 31 dates at once.
 *
 *   The HOME PAGE's recent-articles strip, also marked `data-lastmod-rail`,
 *     and this site differs from its siblings here on purpose. kna-group.com
 *     deliberately hashes its equivalent strip, on the argument that on the day
 *     a new piece publishes the home page really has changed in its most
 *     prominent block. That argument depends on the strip BEING the most
 *     prominent block. On this site it is not: the home page's claim is the
 *     thesis and the era table, both of which are structural and stable, and
 *     the recent strip is a signpost sitting underneath them. Hashing it would
 *     move the home page's date every single publishing day for a year, which
 *     is the build-clock failure above arriving by a slower road.
 *
 * WHAT IS DELIBERATELY LEFT IN, and is worth knowing about:
 *
 *   The /articles/ index. Unlike the rails, the list IS that page: adding a
 *     piece to it is a real change to the document, and it is the one URL on
 *     this site that SHOULD report a change on a publishing day.
 *
 * ------------------------------------------- content dates are a FLOOR --
 *
 * An article carries `date` and optionally `updated` in its frontmatter. Those
 * are facts about the writing rather than about the repository, so they are not
 * thrown away: those routes take the LATER of the declared date and the hash
 * date.
 *
 * In normal operation the floor never binds, because an editorial change is
 * also a rendered change: [slug].astro prints the publication date in the meta
 * row, renders an "Updated <date>" line as soon as `updated` is set, and emits
 * both into the Article node, so the hash sees them. The floor is there for the
 * case the hash cannot see: a manifest that is stale, hand-edited or restored
 * from an older commit must still never advertise a date EARLIER than the one
 * the author declared.
 *
 * ------------------------------------------------------------ future dates --
 *
 * Nothing here can emit a date later than today, and the clamp is applied to
 * every URL in the file. A crawler that reads a modification date which has not
 * happened yet is being told the file is untrustworthy, and the usual response
 * is to discount every date in it. The risk is concrete on this site rather
 * than theoretical: articles are scheduled by future-dating their frontmatter,
 * and a sibling site once published 2027-04-01 into its sitemap index eight
 * months early exactly that way. astro.config.mjs already filters scheduled
 * articles out of the sitemap; this is the belt to that brace.
 *
 * ---------------------------------------------------------------- seeding --
 *
 * With no manifest every route looks changed and would take today's date, which
 * is the blanket stamp this whole design exists to avoid. Neither sibling had
 * to solve this, because both had a config-derived date already in the file to
 * seed from. This site has none, so the seed is built from the most defensible
 * real date known about each route, in this order:
 *
 *   1. THE DECLARED CONTENT DATE, for an article (`updated` or `date`) and for
 *      the articles index (the newest live article). This is an editorial fact,
 *      stated by the author, and it is the reason the articles do not all get
 *      stamped "today" on a site whose articles have real publication dates.
 *
 *   2. THE GIT DATE OF THE ROUTE'S OWN SOURCE, for everything else: the last
 *      commit touching src/pages/<route>.astro and, for a collection route, its
 *      content file. This is the proxy the header above rejects, used ONCE, to
 *      seed, and never consulted again. Its failure mode is under-reporting,
 *      which is safe: the hash corrects it at the first genuine change. Blanket
 *      "today" over-reports, which is the failure that cannot be corrected,
 *      because by then the crawler has already been told a lie it can check.
 *
 *   3. TODAY, only if git is unavailable (a tarball build, a clone with no
 *      history). Reported loudly rather than silently, because a seed that
 *      falls all the way through is a blanket stamp and the operator should
 *      know the file was built that way.
 *
 * Git is consulted only for routes that reach step 2, so a normal daily build,
 * where every route is already in the manifest, never shells out at all.
 *
 * A route appearing for the first time AFTER seeding is recorded the same way,
 * and for a genuinely new page every one of the three steps says "today"
 * anyway, which is correct: it is new today.
 *
 * On the run that created this file every route was genuinely new, because the
 * repository was created that day. Every URL taking today's date on the seeding
 * run is, on this site on that day, the fact rather than a blanket stamp. The
 * rule is written for the second year, not the first morning.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

import { DIST, ROOT } from "./lib/dist.mjs";

const MANIFEST = resolve(ROOT, "content/sitemap-hashes.json");

/* -------------------------------------------------------------------- date -- */

/**
 * Today's LOCAL calendar date, matching astro.config.mjs and
 * src/lib/publication.ts.
 *
 * Not the UTC one. On an Ottawa machine those disagree between 20:00 and
 * midnight, and a UTC date here would hand tomorrow's date to a page that
 * changed today, which is a future `lastmod` by another route. This group has
 * the scar: src/lib/publication.ts documents an article that published a day
 * early for exactly this reason.
 */
const localDate = (d = new Date()) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);

const TODAY = localDate();

/**
 * Noon UTC, so the stamp names the same calendar day in every timezone a
 * crawler might read it from. Midnight UTC is already the previous day
 * everywhere west of Greenwich, including here.
 */
const iso = (day) => `${day}T12:00:00.000Z`;
const dayOf = (isoString) => (isoString ?? "").slice(0, 10);

/* ------------------------------------------------------------- the sitemap -- */

const urlFiles = readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f));
if (urlFiles.length === 0) {
  console.error("sitemap-lastmod: no dist/sitemap-N.xml found. Did astro build run?");
  process.exit(1);
}

/** Every `<url>` block, in file order, with its loc and any existing lastmod. */
function readEntries(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
    const block = m[1];
    const loc = (block.match(/<loc>(.*?)<\/loc>/) ?? [])[1];
    const lastmod = (block.match(/<lastmod>(.*?)<\/lastmod>/) ?? [])[1];
    return { loc, lastmod, route: loc ? new URL(loc).pathname : undefined };
  });
}

/* ------------------------------------------------------- declared content -- */

/**
 * Frontmatter dates, read straight off disk with a regex rather than through
 * `astro:content`.
 *
 * The same choice astro.config.mjs makes and for the same reason: this runs
 * outside the app's module graph, it needs one or two scalars out of a handful
 * of small files, and a YAML dependency added here is a dependency in the
 * build's critical path. The schema in src/content.config.ts is what actually
 * enforces these fields; a value this misses simply falls through to the git
 * seed, which is a worse date rather than a wrong one.
 */
function frontmatterDates(dir, keys) {
  const out = new Map();
  const base = resolve(ROOT, dir);
  if (!existsSync(base)) return out;
  for (const file of readdirSync(base).filter((f) => /\.mdx?$/.test(f))) {
    const text = readFileSync(resolve(base, file), "utf8");
    const found = {};
    for (const key of keys) {
      const m = text.match(new RegExp(`^${key}:\\s*"?(\\d{4}-\\d{2}-\\d{2})`, "m"));
      if (m) found[key] = m[1];
    }
    out.set(file.replace(/\.mdx?$/, ""), found);
  }
  return out;
}

const ARTICLE_DATES = frontmatterDates("content/articles", ["date", "updated"]);

/**
 * The date an author declared for this route, or "" when nobody declared one.
 *
 * `/articles/` is handled after the loop below, because the newest LIVE article
 * is whichever article routes actually reached the sitemap, and astro.config.mjs
 * has already dropped the scheduled ones from it.
 */
function declaredDay(route) {
  const article = route.match(/^\/articles\/([^/]+)\/$/);
  if (article) {
    const d = ARTICLE_DATES.get(article[1]);
    return d ? d.updated || d.date || "" : "";
  }
  return "";
}

/* -------------------------------------------------------------- git seeds -- */

/**
 * file path (repo-relative) -> the date of the most recent commit touching it.
 *
 * Built from ONE `git log` and only when something actually needs it, so a
 * normal build, where every route is already in the manifest, never runs git.
 * Every failure is caught: no repository, no git binary, a shallow clone with
 * no history. The caller falls through to today and says so.
 */
let gitDatesCache;
function gitDates() {
  if (gitDatesCache !== undefined) return gitDatesCache;
  try {
    const log = execFileSync(
      "git",
      ["log", "--date=short", "--format=%x00%ad", "--name-only", "--no-renames"],
      { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }
    );
    const map = new Map();
    let day = "";
    for (const line of log.split("\n")) {
      if (line.startsWith("\0")) {
        day = line.slice(1).trim();
      } else if (line.trim() && day) {
        /* Newest commit first, so the first date a path is seen with is its
           most recent one. */
        if (!map.has(line.trim())) map.set(line.trim(), day);
      }
    }
    gitDatesCache = map.size ? map : null;
  } catch {
    gitDatesCache = null;
  }
  return gitDatesCache;
}

/**
 * The files that produce this route, by Astro's own file-routing convention.
 *
 * Deliberately narrow: the page file that rendered it and, for a collection
 * route, the content entry it rendered. Widening this to the components and
 * libraries a page imports would put today's date on every route at once,
 * which is the failure the whole script exists to prevent, and it would put it
 * there on the one run where nothing can correct it.
 */
function sourceFiles(route) {
  const rel = route.replace(/^\//, "").replace(/\/$/, "");
  const out = [];
  if (rel === "") {
    out.push("src/pages/index.astro");
  } else {
    out.push(`src/pages/${rel}.astro`, `src/pages/${rel}/index.astro`);
    const parts = rel.split("/");
    if (parts.length === 2) {
      out.push(`src/pages/${parts[0]}/[slug].astro`);
      for (const ext of ["md", "mdx"]) out.push(`content/${parts[0]}/${parts[1]}.${ext}`);
    }
  }
  return out;
}

let gitUnavailable = false;

/** The seed date for a route with no declared content date. See the header. */
function seedDay(route) {
  const dates = gitDates();
  if (!dates) {
    gitUnavailable = true;
    return TODAY;
  }
  let newest = "";
  for (const file of sourceFiles(route)) {
    const day = dates.get(file);
    if (day && day > newest) newest = day;
  }
  /* A route whose source files are all untracked is genuinely new in this
     working tree, and today is the honest answer for it. */
  return newest || TODAY;
}

/* ------------------------------------------------------------- extraction -- */

const stripAssetHashes = (s) =>
  s.replace(/\/_astro\/([A-Za-z0-9._-]+?)\.[A-Za-z0-9_-]{8,}(\.[A-Za-z0-9]+)/g, "/_astro/$1$2");

const stripScopeIds = (s) => s.replace(/\s?data-astro-cid-[a-z0-9]+(="[^"]*")?/g, "");

const collapse = (s) => s.replace(/\s+/g, " ").trim();

/**
 * Remove every element carrying `data-lastmod-rail`, including its contents.
 *
 * Tag-balanced rather than regex-matched to the first close, because the rail
 * is a <section> that contains a <div> that contains <article> cards, and a
 * lazy match would stop at the first </section> inside it. Unbalanced markup
 * throws rather than silently hashing the wrong region: a silent fallback here
 * would freeze a page's date forever and nothing downstream would notice.
 */
function stripRails(html) {
  let out = html;
  for (let guard = 0; guard < 50; guard++) {
    const open = out.match(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\sdata-lastmod-rail\b[^>]*>/);
    if (!open) return out;

    const tag = open[1].toLowerCase();
    const start = open.index;
    const scan = new RegExp(`<(/?)${tag}\\b`, "gi");
    scan.lastIndex = start + open[0].length;

    let depth = 1;
    let end = -1;
    let hit;
    while ((hit = scan.exec(out))) {
      depth += hit[1] ? -1 : 1;
      if (depth === 0) {
        const close = out.indexOf(">", hit.index);
        end = close === -1 ? out.length : close + 1;
        break;
      }
    }
    if (end === -1) throw new Error(`sitemap-lastmod: unbalanced <${tag} data-lastmod-rail>`);
    out = out.slice(0, start) + out.slice(end);
  }
  throw new Error("sitemap-lastmod: more than 50 data-lastmod-rail elements on one page");
}

/** Deep key sort, so JSON-LD compares on meaning rather than on key order. */
function sortDeep(value) {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = sortDeep(value[k]);
    return out;
  }
  return value;
}

/**
 * The page's JSON-LD nodes, serialised one per entry and keyed by `@id`.
 *
 * Returned unfiltered. The boilerplate filter has to see every page before it
 * can know which nodes are identical everywhere, so that is a second pass.
 */
function jsonLdNodes(head, route) {
  const out = [];
  for (const m of head.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch {
      /* Unparseable JSON-LD is a real problem, but it is verify:schema's
         problem rather than this script's. Hash the raw text so the change is
         still seen, and carry on. */
      out.push({ key: `raw:${route}:${out.length}`, text: collapse(m[1]) });
      continue;
    }
    const graph = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
    for (const [i, node] of graph.entries()) {
      const key = typeof node?.["@id"] === "string" ? node["@id"] : `${route}#node${i}`;
      out.push({ key, text: JSON.stringify(sortDeep(node)) });
    }
  }
  return out;
}

/**
 * The parts of a page that are about THAT page: head metadata and <main>.
 *
 * Throws rather than guessing if a sitemap route has no <main>, because a
 * silent fallback would hash the wrong region and quietly freeze the date.
 * Every route reaches production through Base.astro, which always emits one.
 */
function extract(route) {
  const file = resolve(DIST, `.${route}index.html`);
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");

  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
  if (!headMatch) throw new Error(`sitemap-lastmod: no <head> in ${file}`);
  const rawHead = headMatch[1];

  const mainOpen = html.search(/<main[\s>]/);
  const mainClose = html.lastIndexOf("</main>");
  if (mainOpen === -1 || mainClose === -1) throw new Error(`sitemap-lastmod: no <main> in ${file}`);
  const rawMain = html.slice(mainOpen, mainClose + "</main>".length);

  const ld = jsonLdNodes(rawHead, route);

  const head = collapse(
    stripScopeIds(
      stripAssetHashes(
        rawHead
          .replace(/<style[\s\S]*?<\/style>/g, "")
          .replace(/<script[\s\S]*?<\/script>/g, "")
          .replace(
            /<link\b[^>]*\brel="(?:stylesheet|preload|modulepreload|prefetch|icon|apple-touch-icon|manifest|mask-icon)"[^>]*>/g,
            ""
          )
          .replace(/<meta\b[^>]*\bname="generator"[^>]*>/g, "")
      )
    )
  );

  const main = collapse(
    stripScopeIds(
      stripAssetHashes(
        stripRails(rawMain)
          .replace(/<style[\s\S]*?<\/style>/g, "")
          .replace(/<script[\s\S]*?<\/script>/g, "")
      )
    )
  );

  return { head, main, ld };
}

/* --------------------------------------------------------------- pass one -- */

const files = urlFiles.map((f) => ({ name: f, xml: readFileSync(resolve(DIST, f), "utf8") }));
const entries = files.flatMap((f) => readEntries(f.xml).map((e) => ({ ...e, file: f.name })));

const parts = new Map();
const missing = [];
for (const e of entries) {
  if (!e.route) continue;
  const p = extract(e.route);
  if (!p) {
    missing.push(e.route);
    continue;
  }
  parts.set(e.route, p);
}
if (missing.length) {
  console.error(`sitemap-lastmod: ${missing.length} sitemap route(s) have no built page:`);
  for (const r of missing) console.error(`  ${r}`);
  process.exit(1);
}

/**
 * Site-wide JSON-LD, found rather than declared.
 *
 * A node counts as boilerplate only when it serialises identically on EVERY
 * page that carries JSON-LD. The floor of 10 pages stops a tiny build, or a
 * half-built dist, from declaring its only page's schema to be boilerplate.
 */
const BOILERPLATE_LD = (() => {
  const seen = new Map();
  let pagesWithLd = 0;
  for (const p of parts.values()) {
    if (p.ld.length === 0) continue;
    pagesWithLd++;
    for (const node of p.ld) {
      const rec = seen.get(node.key);
      if (!rec) seen.set(node.key, { text: node.text, count: 1, stable: true });
      else {
        rec.count++;
        if (rec.text !== node.text) rec.stable = false;
      }
    }
  }
  const out = new Set();
  if (pagesWithLd >= 10) {
    for (const [key, rec] of seen) {
      if (rec.stable && rec.count === pagesWithLd) out.add(key);
    }
  }
  return out;
})();

/** The hash of everything on this page that is about this page. */
function hashOf(route) {
  const p = parts.get(route);
  const ld = p.ld
    .filter((n) => !BOILERPLATE_LD.has(n.key))
    .map((n) => n.text)
    .join("\n");
  return createHash("sha256").update(`${p.head}\n${ld}\n${p.main}`).digest("hex").slice(0, 32);
}

/* --------------------------------------------------------------- manifest -- */

/**
 * The articles index inherits the newest article that actually reached this
 * sitemap. Computed from the file rather than from the collection, so a
 * scheduled piece, which astro.config.mjs has already filtered out, cannot lift
 * the index to a date on which nothing was published.
 */
const NEWEST_ARTICLE = entries
  .map((e) => (e.route && /^\/articles\/[^/]+\/$/.test(e.route) ? declaredDay(e.route) : ""))
  .filter(Boolean)
  .sort()
  .at(-1);

const editorialDay = (route) =>
  route === "/articles/" ? NEWEST_ARTICLE || "" : declaredDay(route);

const seeding = !existsSync(MANIFEST);
const manifest = seeding ? { routes: {} } : JSON.parse(readFileSync(MANIFEST, "utf8"));
manifest.routes ??= {};

const resolved = new Map();
const bumped = [];
const added = [];
const seededFromGit = [];

for (const e of entries) {
  if (!e.route) continue;

  const hash = hashOf(e.route);
  const stored = manifest.routes[e.route];
  const editorial = editorialDay(e.route);

  let hashDay;
  if (!stored) {
    /* Seeding, or a route that did not exist last time. See the header. */
    if (editorial) {
      hashDay = editorial;
    } else {
      hashDay = seedDay(e.route);
      seededFromGit.push({ route: e.route, day: hashDay });
    }
    if (!seeding) added.push(e.route);
  } else if (stored.hash === hash) {
    hashDay = dayOf(stored.hashDay) || TODAY;
  } else {
    hashDay = TODAY;
    bumped.push({ route: e.route, from: dayOf(stored.hashDay), to: TODAY });
  }

  let day = editorial > hashDay ? editorial : hashDay;
  if (day > TODAY) day = TODAY;

  /* `lastmod` is derived from the two fields above and is stored anyway, so the
     committed diff reads as the dates that moved rather than as opaque hashes. */
  manifest.routes[e.route] = { hash, hashDay, lastmod: day };
  resolved.set(e.route, day);
}

/* A route that has left the sitemap keeps no entry. Leaving it would resurrect
   a stale date if the URL ever came back under different content. */
for (const route of Object.keys(manifest.routes)) {
  if (!resolved.has(route)) delete manifest.routes[route];
}

/* --------------------------------------------------------------- pass two -- */

function rewrite(xml) {
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (whole, block) => {
    const loc = (block.match(/<loc>(.*?)<\/loc>/) ?? [])[1];
    if (!loc) return whole;
    const day = resolved.get(new URL(loc).pathname);
    if (day === undefined) return whole;

    const next = /<lastmod>.*?<\/lastmod>/.test(block)
      ? block.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${iso(day)}</lastmod>`)
      : /* Order matters: the sitemap schema wants loc, lastmod, changefreq,
           priority, in that sequence. */
        block.replace("</loc>", `</loc><lastmod>${iso(day)}</lastmod>`);
    return `<url>${next}</url>`;
  });
}

const allDays = [];
for (const f of files) {
  const xml = rewrite(f.xml);
  writeFileSync(resolve(DIST, f.name), xml);
  for (const m of xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) allDays.push(dayOf(m[1]));
}

/**
 * The index gets the newest of its children.
 *
 * @astrojs/sitemap emits no `<lastmod>` in sitemap-index.xml either, so this
 * inserts one after each `</loc>` rather than replacing anything. A sitemap
 * index whose entries carry no date makes a crawler fetch every child file to
 * discover that nothing in it moved.
 */
const indexPath = resolve(DIST, "sitemap-index.xml");
if (existsSync(indexPath) && allDays.length) {
  const newest = allDays.sort().at(-1);
  const xml = readFileSync(indexPath, "utf8");
  writeFileSync(
    indexPath,
    /<lastmod>.*?<\/lastmod>/.test(xml)
      ? xml.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${iso(newest)}</lastmod>`)
      : xml.replace(/<\/loc>/g, `</loc><lastmod>${iso(newest)}</lastmod>`)
  );
}

/* ------------------------------------------------------------------ write -- */

const note =
  "Written by scripts/sitemap-lastmod.mjs on every build, and committed by " +
  "scripts/publish-scheduled.sh after every successful deploy. COMMIT IT: it is " +
  "the only record of what the last deploy actually rendered, and a sitemap " +
  "lastmod is only honest if something remembers. Do not hand-edit.";

const routes = Object.fromEntries(
  Object.keys(manifest.routes)
    .sort()
    .map((k) => [k, manifest.routes[k]])
);

writeFileSync(MANIFEST, `${JSON.stringify({ note, routes }, null, 2)}\n`);

/* ----------------------------------------------------------------- report -- */

const withEditorial = [...resolved.keys()].filter((r) => editorialDay(r)).length;

console.log("\nsitemap lastmod (from rendered output)");
console.log(`  urls in sitemap:    ${entries.length}`);
console.log(`  hash-governed:      ${resolved.size - withEditorial}  (no declared date)`);
console.log(`  editorial + hash:   ${withEditorial}  (articles, articles index)`);
console.log(`  site-wide ld nodes: ${BOILERPLATE_LD.size} excluded from hashing`);

if (seeding) {
  console.log(`  SEEDED ${resolved.size} routes.`);
  console.log(`    from declared content dates: ${resolved.size - seededFromGit.length}`);
  console.log(`    from the git date of their own source: ${seededFromGit.length}`);
  if (gitUnavailable) {
    console.log("  WARNING: git history was unavailable, so routes with no declared");
    console.log("           content date were seeded at today. That is a blanket stamp.");
  }
  const spread = [...new Set([...resolved.values()])].sort();
  console.log(`  seeded dates:       ${spread.join(", ")}`);
} else {
  console.log(`  output changed today: ${bumped.length}`);
  for (const b of bumped) console.log(`    ${b.from} -> ${b.to}  ${b.route}`);
  if (added.length) {
    console.log(`  new routes:         ${added.length}`);
    for (const r of added) console.log(`    ${r}  ${resolved.get(r)}`);
  }
}
console.log("");
