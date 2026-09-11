/**
 * OUTBOUND CITATION ROT.
 *
 *   npm run verify:external              re-check anything older than 14 days
 *   npm run verify:external -- --all     re-check every URL, ignore the cache
 *   npm run verify:external -- --url=X   check one URL and print the detail
 *
 * ------------------------------------------------------------- why it exists --
 *
 * This site's editorial promise is that every claim resolves to a document a
 * reader can open. scripts/verify-links.mjs enforces half of that: it fails the
 * build on a broken INTERNAL link. The other half, the citations, has never been
 * checked by anything, and the citations are the half that rots, because nobody
 * on this domain controls a single one of them.
 *
 * The subject makes it worse than average. Crypto history runs on central bank
 * publications, defunct exchanges, archived mailing lists and standards bodies
 * that reorganise their URL space every few years, and this repository already
 * carries articles ABOUT sources that disappeared. A history site with a dead
 * footnote is making exactly the mistake it was built to document.
 *
 * ------------------------------------------------- why this is NOT a build gate --
 *
 * It is deliberately not in `npm run build`, and that is the most important
 * decision in this file.
 *
 * The build runs unattended four times a day from launchd, on a laptop, to
 * publish a scheduled article. Putting a network check in that path means a
 * flaky DNS lookup, a captive portal, a rate limit or somebody else's outage
 * silently stops this site from publishing. The failure would be somebody
 * else's, the consequence would be ours, and nobody would see it for a day.
 *
 * So this is a tool run by a person, and the cache below is the memory that
 * makes running it cheap.
 *
 * ------------------------------------------------------- the verdict rules --
 *
 * These are written the hard way, from this estate's own scars, and every one of
 * them exists because the naive version got something wrong.
 *
 *   NO CUSTOM USER AGENT. Sending a browser user agent causes connection resets
 *   on several hosts in this list and reports a misleading 000. curl's own
 *   default gets through where a spoofed Chrome does not. Do not "improve" this
 *   by adding headers.
 *
 *   GET, NEVER HEAD. A HEAD 404 proves nothing: support.google.com answers 404
 *   to HEAD and 200 to GET on the same URL. A method that is cheaper and
 *   sometimes wrong is not cheaper.
 *
 *   403, 429, 451 AND 999 MEAN BLOCKED, NOT DEAD. They are the host refusing
 *   automation. cryptome.org answers 403 to curl and serves fine in a browser.
 *   Treating those as dead would delete correct citations, which is a worse
 *   outcome than leaving a dead one in.
 *
 *   000 MEANS UNREACHABLE, NOT DEAD. A TLS failure, a refused connection or a
 *   timeout is a fact about this attempt.
 *
 *   A 200 IS NOT PROOF EITHER. Some hosts answer 200 with a not-found page. A
 *   short 200 whose text reads like an error is reported as a SOFT 404 for a
 *   person to look at, never auto-failed, because the heuristic is a heuristic.
 *
 *   PLAIN HTTP IS ALLOWED AND IS REPORTED. Two citations on this site exist only
 *   over http, /articles/what-the-whitepaper-cites/ is an article about that
 *   fact, and rewriting them to https to satisfy a checker would produce a dead
 *   link to a living document. They are listed so the claim stays checkable.
 *
 * ------------------------------------------------------------------ the cache --
 *
 * content/external-links.json, committed. EVERY ENTRY CARRIES `checkedAt`, and
 * that field is the whole point of the file rather than a detail of it. A cache
 * entry with no timestamp is a permanent verdict: a URL that answered once in
 * 2026 is recorded as working forever, and the tool that was supposed to detect
 * rot becomes the reason nobody notices it. Entries older than MAX_AGE_DAYS are
 * re-fetched.
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

import { DIST, ROOT, listHtmlFiles, requireDist, routeFor } from "./lib/dist.mjs";

const run = promisify(execFile);

requireDist();

const CACHE = path.join(ROOT, "content/external-links.json");
const MAX_AGE_DAYS = 14;
const CONCURRENCY = 4;

const args = process.argv.slice(2);
const recheckAll = args.includes("--all");
const onlyUrl = (args.find((a) => a.startsWith("--url=")) ?? "").slice("--url=".length);

/* ------------------------------------------------- every outbound citation -- */

/**
 * Anchors only. A `<link rel="canonical">` points at this origin, and this build
 * emits no external subresource of any kind, so an anchor is the complete set of
 * URLs a reader can actually follow off this site.
 */
const targets = new Map(); // url -> Set(routes)

for (const file of await listHtmlFiles()) {
  const route = routeFor(file);
  const html = await readFile(path.join(DIST, file), "utf8");
  for (const match of html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/gi)) {
    const url = match[1].replace(/&amp;/g, "&");
    if (url.startsWith("https://ism50.com")) continue;
    if (!targets.has(url)) targets.set(url, new Set());
    targets.get(url).add(route);
  }
}

const urls = onlyUrl ? [onlyUrl] : [...targets.keys()].sort();

/* ------------------------------------------------------------------- cache -- */

let cache = { note: "", urls: {} };
if (existsSync(CACHE)) {
  try {
    cache = JSON.parse(await readFile(CACHE, "utf8"));
    cache.urls ??= {};
  } catch {
    console.warn("verify:external  cache is unreadable, starting fresh.");
    cache = { note: "", urls: {} };
  }
}

const now = Date.now();
const ageDays = (iso) => (iso ? (now - Date.parse(iso)) / 86400000 : Infinity);

/* ------------------------------------------------------------------ fetch -- */

/**
 * One GET, through curl, with NO headers of our own.
 *
 * `--max-time` bounds a hung host; `-L` follows redirects because a 301 to a
 * live page is a live citation. The body is written to stdout and the status and
 * final URL come back on a trailing line, so one process yields all three.
 */
async function check(url) {
  try {
    const { stdout } = await run(
      "curl",
      ["-sS", "-L", "--max-time", "45", "-w", "\\n__META__%{http_code} %{url_effective}", url],
      { maxBuffer: 32 * 1024 * 1024, encoding: "utf8" }
    );
    const cut = stdout.lastIndexOf("\n__META__");
    const meta = cut === -1 ? "" : stdout.slice(cut + "\n__META__".length);
    const body = cut === -1 ? stdout : stdout.slice(0, cut);
    const [code, ...rest] = meta.trim().split(" ");
    return { status: Number(code) || 0, finalUrl: rest.join(" "), body };
  } catch (error) {
    /* curl exited non-zero: DNS, TLS, refused connection, timeout. */
    return { status: 0, finalUrl: url, body: "", error: (error.stderr || error.message).trim() };
  }
}

const SOFT_404 = /\b(page not found|not found|404 error|no longer available|does not exist)\b/i;

function verdict({ status, body }) {
  if (status === 200) {
    const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length < 2000 && SOFT_404.test(text)) return "soft404";
    return "ok";
  }
  if (status === 0) return "unreachable";
  if ([401, 403, 429, 451, 999].includes(status)) return "blocked";
  if (status >= 400) return "dead";
  return "odd";
}

/* ---------------------------------------------------------------- the run -- */

const results = [];
let fetched = 0;
let cached = 0;

async function worker(queue) {
  for (;;) {
    const url = queue.shift();
    if (url === undefined) return;

    const previous = cache.urls[url];
    if (!recheckAll && !onlyUrl && previous && ageDays(previous.checkedAt) < MAX_AGE_DAYS) {
      cached++;
      results.push({ url, ...previous, fromCache: true });
      continue;
    }

    const response = await check(url);
    fetched++;
    const record = {
      status: response.status,
      verdict: verdict(response),
      finalUrl: response.finalUrl !== url ? response.finalUrl : undefined,
      checkedAt: new Date().toISOString(),
    };
    cache.urls[url] = record;
    results.push({ url, ...record, error: response.error });
  }
}

const queue = [...urls];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

/* ----------------------------------------------------------------- report -- */

results.sort((a, b) => a.url.localeCompare(b.url));

const by = (v) => results.filter((r) => r.verdict === v);
const insecure = results.filter((r) => r.url.startsWith("http://"));

console.log(
  `\nverify:external  ${urls.length} citation(s) across ${targets.size ? "the build" : "one url"}, ` +
    `${fetched} fetched, ${cached} from cache (under ${MAX_AGE_DAYS} days old)`
);
console.log(
  `  live ${by("ok").length}   blocked ${by("blocked").length}   ` +
    `unreachable ${by("unreachable").length}   soft-404 ${by("soft404").length}   ` +
    `dead ${by("dead").length}`
);

const where = (url) => [...(targets.get(url) ?? [])].join(", ") || "(not in this build)";

if (insecure.length) {
  console.log(`\n  plain http, deliberate and documented, ${insecure.length}:`);
  for (const r of insecure) console.log(`    ${r.status}  ${r.url}\n         on ${where(r.url)}`);
}

for (const [label, list, note] of [
  ["BLOCKED, the host refuses automation. Not evidence of a dead page", by("blocked")],
  ["UNREACHABLE on this attempt. DNS, TLS or a timeout", by("unreachable")],
  ["POSSIBLE SOFT 404, a 200 whose body reads like an error. Open it", by("soft404")],
]) {
  if (!list.length) continue;
  console.log(`\n  ${label}, ${list.length}:`);
  for (const r of list) {
    console.log(`    ${r.status || "000"}  ${r.url}`);
    console.log(`         on ${where(r.url)}${r.error ? `\n         ${r.error}` : ""}`);
  }
  if (note) console.log(`    ${note}`);
}

const dead = by("dead");
if (dead.length) {
  console.error(`\n  ${dead.length} DEAD CITATION(S):\n`);
  for (const r of dead) {
    console.error(`    ${r.status}  ${r.url}`);
    console.error(`         on ${where(r.url)}`);
  }
  console.error(
    "\n  A citation that 404s is the failure this site exists to document. Replace it\n" +
      "  with a URL that resolves, or keep the claim and say in the prose that the\n" +
      "  source is gone and what it said. Do not delete the sentence quietly.\n"
  );
}

cache.note =
  "Written by scripts/verify-external.mjs. COMMIT IT. Every entry carries checkedAt " +
  "and entries older than " +
  MAX_AGE_DAYS +
  " days are re-fetched: a cache entry with no timestamp is a permanent verdict, which " +
  "would turn the tool that detects link rot into the reason nobody notices it. A " +
  "'blocked' verdict means the host refuses automation (403, 429, 451, 999) and is NOT " +
  "evidence the page is gone. Do not hand-edit.";

cache.urls = Object.fromEntries(Object.keys(cache.urls).sort().map((k) => [k, cache.urls[k]]));
await writeFile(CACHE, `${JSON.stringify(cache, null, 2)}\n`);

process.exit(dead.length ? 1 : 0);
