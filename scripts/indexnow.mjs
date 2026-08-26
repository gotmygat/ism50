/**
 * IndexNow submission.
 *
 * WHAT THIS BUYS, stated honestly, because it is easy to overrate. Google does
 * not support IndexNow and has no public API for submitting ordinary pages, so
 * nothing here reaches Google; Google is reached through the sitemap. What it
 * does reach is Bing, Yandex, Seznam and Naver, which share one endpoint: a
 * single POST announces changed URLs to all of them within minutes instead of
 * waiting to be crawled. On a site that publishes on a schedule, that is the
 * difference between a piece being findable on its date and being findable
 * whenever a crawler next happens by.
 *
 * Ownership is proved by a key file served at the site root, and the key and
 * the filename must match. The key is therefore DISCOVERED by looking for that
 * file rather than hardcoded here, so there is exactly one place to change it
 * and a key with no matching file in public/ cannot silently ship.
 *
 * THIS SITE HAS ITS OWN KEY. Reusing another site's would not merely be untidy:
 * `keyLocation` below points at THIS host, the endpoint fetches it from THIS
 * host, and a key whose file lives on a different domain fails validation for
 * every URL in the batch.
 *
 *   node scripts/indexnow.mjs            submit everything in the sitemap
 *   node scripts/indexnow.mjs <url>...   submit specific URLs
 *
 * Run by scripts/publish-scheduled.sh, and only on a day when the rendered HTML
 * actually changed. Pinging an unchanged site every day is how a host teaches
 * an endpoint to ignore it.
 */
import { readFileSync, readdirSync } from "node:fs";

const HOST = "ism50.com";

const key = readdirSync("public")
  .find((f) => /^[a-f0-9]{32}\.txt$/.test(f))
  ?.replace(/\.txt$/, "");
if (!key) {
  console.error("No IndexNow key file found in public/. Expected <32-hex>.txt");
  process.exit(1);
}

/* The sitemap is the list of what this site claims exists, which makes it
   exactly the right source: a scheduled article is absent from it, so it cannot
   be submitted before its date by this path either. */
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [...readFileSync("dist/sitemap-0.xml", "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

if (!urls.length) {
  console.error("No URLs to submit.");
  process.exit(1);
}

/**
 * Submit, retrying once on a transport failure.
 *
 * WHY THIS IS WRAPPED. On khaledhawari.ca a daily job deployed 109 pages and
 * then died here with an uncaught `TypeError: fetch failed` / `ECONNRESET`,
 * printing a Node stack trace into the publish log. The deploy was already
 * done, so nothing was actually broken, but the submission was lost and the log
 * read like a crash. A dropped TLS connection to a third-party endpoint is not
 * an error condition worth failing on. One retry after a short pause covers
 * almost all of them, and anything still failing exits 1 with a readable line
 * rather than a stack trace.
 *
 * The endpoint caps a single submission at 10,000 URLs.
 */
const body = JSON.stringify({
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList: urls.slice(0, 10000),
});

async function submit() {
  return fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
    signal: AbortSignal.timeout(30_000),
  });
}

let res;
try {
  res = await submit();
} catch (err) {
  console.warn(`IndexNow: transport failure (${err.cause?.code ?? err.name}), retrying once`);
  await new Promise((r) => setTimeout(r, 5000));
  try {
    res = await submit();
  } catch (retryErr) {
    console.error(
      `IndexNow: submission failed after a retry (${retryErr.cause?.code ?? retryErr.name}). ` +
        `The deploy is unaffected; these ${urls.length} URLs were not submitted.`
    );
    process.exit(1);
  }
}

// 200 accepted, 202 accepted but key validation pending.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
