/**
 * Fails when today has no article, warns when any future day is empty.
 *
 * WHY THIS EXISTS. On 2026-08-27 the site published nothing. Nothing was
 * broken: publish-scheduled.sh ran, the build ran, the deploy ran, and all of
 * them reported success. There was simply no file dated 2026-08-27. The three
 * seed pieces ended on the 26th and the 365 day plan began on the 28th, and the
 * one day between them belonged to nobody.
 *
 * That is the failure mode a daily publication actually has. It does not
 * announce itself with a red build. Every gate passes, the deploy is green, and
 * the only evidence is a reader noticing the site did not move. The owner
 * noticed before any tooling did, which is the wrong order.
 *
 * So: a missing TODAY is an error, because the promise is one article a day and
 * today's is already late. A missing future day is a warning with the dates
 * listed, because it is a content gap with time left to fill it, and failing the
 * build over it would block deploys of unrelated work for a problem only a
 * writer can fix.
 */
import { readdirSync, readFileSync } from "node:fs";

const DIR = "content/articles";
const HORIZON = 30; // days ahead to check for holes

const iso = (d) => d.toISOString().slice(0, 10);
const dates = new Set();

for (const name of readdirSync(DIR).filter((n) => /\.mdx?$/.test(n))) {
  const m = readFileSync(`${DIR}/${name}`, "utf8").match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  if (!m) {
    console.error(`verify:schedule  ${name} has no parsable date`);
    process.exit(1);
  }
  dates.add(m[1]);
}

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const missing = [];
for (let i = 0; i <= HORIZON; i++) {
  const d = new Date(today);
  d.setUTCDate(d.getUTCDate() + i);
  if (!dates.has(iso(d))) missing.push(iso(d));
}

console.log(`verify:schedule  ${dates.size} dated articles, checked ${HORIZON + 1} days from ${iso(today)}`);

if (missing[0] === iso(today)) {
  console.error(`verify:schedule  NO ARTICLE FOR TODAY (${iso(today)}). The site publishes nothing today.`);
  process.exit(1);
}

if (missing.length) {
  console.warn(`verify:schedule  WARNING ${missing.length} empty day(s) in the next ${HORIZON}: ${missing.join(", ")}`);
} else {
  console.log("verify:schedule  no gaps.");
}
