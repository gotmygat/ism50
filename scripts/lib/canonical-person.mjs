/**
 * THE PARSER FOR docs/CANONICAL-PERSON.md.
 *
 * The frozen identity values are NOT retyped anywhere in this repository. They
 * are read out of the sheet, which is the shared document all five properties
 * are supposed to agree with, and the two consumers read it INDEPENDENTLY:
 *
 *   scripts/sync-canonical-person.mjs  writes src/lib/canonical-person.ts,
 *                                      which is what the pages actually emit.
 *   scripts/verify-schema.mjs          parses the sheet again and compares the
 *                                      SHIPPED HTML against it.
 *
 * That is deliberately not a shortcut. A verifier that reads its expectation
 * from the module the page was generated from cannot catch the page being
 * generated wrongly: both halves move together and the check passes on a broken
 * build. Here the only thing the two halves share is a markdown file a human
 * edits, so an edit to the generated TypeScript, or a template that drops a
 * property on one route, fails.
 *
 * WHY PARSE MARKDOWN RATHER THAN SHIP A JSON FILE. Because the markdown file is
 * the artefact the other four repositories were given, it carries the reasoning
 * for every value, and a JSON copy of it beside it would be a fifth place for
 * the values to drift. The block it parses is the fenced block at the top of the
 * sheet, which is already written as one `"key": value` pair per line.
 *
 * The parse is strict on purpose. A sheet that has been restructured should stop
 * the build loudly rather than silently yield four properties instead of six.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const SHEET = resolve(ROOT, "docs/CANONICAL-PERSON.md");

/** The properties the sheet must declare. Missing any one of them is an error. */
const REQUIRED = [
  "@type",
  "@id",
  "name",
  "alternateName",
  "url",
  "mainEntityOfPage",
  "disambiguatingDescription",
];

/**
 * Read the frozen block and return it as a plain object.
 *
 * Values are parsed as JSON, one line at a time, so `alternateName` arrives as
 * a real array in the sheet's order and `mainEntityOfPage` arrives as a real
 * object carrying the `#webpage` fragment. That shape distinction is load
 * bearing: the sheet documents at length why one is a bare string naming a
 * document and the other is an `@id` reference naming a node, and a parser that
 * flattened both to strings would erase the difference it exists to preserve.
 */
export function readCanonicalPerson(sheet = SHEET) {
  const text = readFileSync(sheet, "utf8");

  const fence = text.match(/```\n([\s\S]*?)```/);
  if (!fence) {
    throw new Error(
      `canonical-person: no fenced block found in ${sheet}. The sheet must open with a fenced block of "key": value lines.`
    );
  }

  const values = {};
  for (const rawLine of fence[1].split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const match = line.match(/^"([^"]+)":\s*(.+?),?$/);
    if (!match) {
      throw new Error(`canonical-person: cannot parse this line of the frozen block: ${line}`);
    }

    const [, key, rawValue] = match;
    try {
      values[key] = JSON.parse(rawValue);
    } catch (error) {
      throw new Error(
        `canonical-person: the value for "${key}" is not valid JSON: ${rawValue} (${error.message})`
      );
    }
  }

  const missing = REQUIRED.filter((key) => values[key] === undefined);
  if (missing.length) {
    throw new Error(
      `canonical-person: ${sheet} is missing frozen properties: ${missing.join(", ")}. ` +
        "Do not work around this by hardcoding them. Fix the sheet, and tell the other four repositories."
    );
  }

  if (values["@type"] !== "Person") {
    throw new Error(`canonical-person: the sheet declares @type "${values["@type"]}", expected Person.`);
  }

  return values;
}

/**
 * The properties that go on the Person node, in emit order, with `@type` and
 * `@id` stripped out because the graph builder supplies those itself.
 */
export function frozenPersonProperties(sheet = SHEET) {
  const { "@type": _type, "@id": _id, ...rest } = readCanonicalPerson(sheet);
  return rest;
}
