/**
 * Metadata integrity, checked against the SHIPPED HTML.
 *
 * FAILS THE BUILD on:
 *   1. A missing <title> or meta description on an indexable page
 *   2. A <title> over 62 characters, or under 10
 *   3. A meta description over 158 characters, or under 50
 *   4. Two indexable pages sharing a title
 *   5. Two indexable pages sharing a description
 *   6. A missing or malformed canonical
 *   7. An H1 that is missing, or an H1 that appears more than once
 *
 * WHY THIS IS NOT REDUNDANT WITH THE ZOD SCHEMA. src/content.config.ts checks
 * what an AUTHOR WROTE, in one file at a time. This checks what the BROWSER
 * RECEIVES, across the whole build at once. The two failures it catches that a
 * per-file schema structurally cannot are duplication, which is only visible
 * between files, and template defects, where valid frontmatter is rendered into
 * a broken head.
 *
 * DUPLICATION IS THE ONE THAT MATTERS MOST HERE. Two pages carrying the same
 * description is not a cosmetic problem: Google shows one and filters the rest,
 * so the second page is not penalised, it is simply absent. That failure is
 * invisible in every per-page check and obvious in this one, and it is the
 * mechanism that cost khaledhawari.ca page one in August 2026, one domain over.
 *
 * WHAT IS DELIBERATELY NOT IN THIS FILE. Every rule about WHAT THE SITE MAY SAY
 * lives in scripts/verify-subject.mjs: the crypto tax vocabulary gate, the
 * investment advice gate, the professional designation gate and the denial
 * vocabulary gate. This file is about whether the metadata is well formed; that
 * one is about whether the writing is on the right side of four lines. Splitting
 * them means a failure message names which kind of problem you have.
 *
 *   node scripts/verify-content.mjs
 */

import { createReporter, isIndexable, loadAllPages } from "./lib/dist.mjs";

const ORIGIN = "https://ism50.com";
const TITLE_MAX = 62;
const TITLE_MIN = 10;
const DESCRIPTION_MAX = 158;
const DESCRIPTION_MIN = 50;

const report = createReporter("verify:content");
const pages = (await loadAllPages()).filter(isIndexable);

const titles = new Map();
const descriptions = new Map();

for (const page of pages) {
  const where = page.route;

  /* --- title ------------------------------------------------------------- */
  if (!page.title) {
    report.error(where, "no <title>");
  } else {
    if (page.title.length > TITLE_MAX) {
      report.error(
        where,
        `title is ${page.title.length} characters, ceiling is ${TITLE_MAX}: "${page.title}"`
      );
    }
    if (page.title.length < TITLE_MIN) {
      report.error(where, `title is only ${page.title.length} characters: "${page.title}"`);
    }

    const key = page.title.trim().toLowerCase();
    if (titles.has(key)) {
      report.error(where, `duplicate title, same as ${titles.get(key)}: "${page.title}"`);
    } else {
      titles.set(key, where);
    }
  }

  /* --- description ------------------------------------------------------- */
  if (!page.description) {
    report.error(where, "no meta description");
  } else {
    if (page.description.length > DESCRIPTION_MAX) {
      report.error(
        where,
        `description is ${page.description.length} characters, ceiling is ${DESCRIPTION_MAX}`
      );
    }
    if (page.description.length < DESCRIPTION_MIN) {
      report.error(where, `description is only ${page.description.length} characters`);
    }

    const key = page.description.trim().toLowerCase();
    if (descriptions.has(key)) {
      report.error(where, `duplicate description, same as ${descriptions.get(key)}`);
    } else {
      descriptions.set(key, where);
    }
  }

  /* --- canonical ---------------------------------------------------------- */
  if (!page.canonical) {
    report.error(where, "no <link rel=canonical>");
  } else if (!page.canonical.startsWith(`${ORIGIN}/`)) {
    report.error(where, `canonical is not on this origin: ${page.canonical}`);
  } else if (!page.canonical.endsWith("/")) {
    report.error(where, `canonical has no trailing slash: ${page.canonical}`);
  }

  /* --- exactly one H1 ------------------------------------------------------
     More than one H1 is not a ranking penalty and never was. It is a document
     with two claims about what it is, which is a real problem for anybody
     navigating by heading and a signal nobody should be sending by accident. */
  const h1s = page.html.match(/<h1\b/gi) ?? [];
  if (h1s.length === 0) report.error(where, "no <h1>");
  if (h1s.length > 1) report.error(where, `${h1s.length} <h1> elements, expected exactly one`);
}

process.exit(report.finish(pages.length));
