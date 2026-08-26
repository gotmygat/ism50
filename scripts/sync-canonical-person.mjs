/**
 * Generate src/lib/canonical-person.ts from docs/CANONICAL-PERSON.md.
 *
 *   node scripts/sync-canonical-person.mjs           write it
 *   node scripts/sync-canonical-person.mjs --check   fail if it is out of date
 *
 * WHY A GENERATED FILE AND NOT A RUNTIME READ. The pages could import a parser
 * and read the markdown at build time, and that would be one fewer file. It
 * would also put a `node:fs` read of a path outside `src/` into the module graph
 * of every rendered page, which works until a bundler decides otherwise, and it
 * would make the frozen values invisible in a diff. Generating a small, checked
 * in TypeScript module instead means:
 *
 *   - `git diff` shows an identity change as a change to a source file, which is
 *     what a reviewer needs to see. A change to the sheet alone is easy to skim
 *     past; a change to the strings four other domains emit should not be.
 *   - The type is real, so a page referencing a property the sheet does not
 *     declare fails `tsc` rather than rendering `undefined` into JSON-LD.
 *   - Nothing in `src/` reads the filesystem.
 *
 * IT RUNS AS PART OF `npm run build`, before `astro build`, so the generated
 * file cannot be stale in a build. `--check` exists for CI and for a human who
 * wants to know whether the tree is clean without rewriting anything.
 *
 * THE GENERATED FILE IS NOT THE SOURCE OF TRUTH AND SAYS SO IN ITS OWN HEADER.
 * Editing it is pointless: the next build overwrites it. Editing the sheet is
 * the supported operation, and doing that changes an agreement with four other
 * repositories, which is why the sheet is full of reasons rather than values.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { ROOT, readCanonicalPerson } from "./lib/canonical-person.mjs";

const OUT = resolve(ROOT, "src/lib/canonical-person.ts");
const check = process.argv.includes("--check");

const frozen = readCanonicalPerson();

/* Serialised one property per constant rather than as one blob, so a diff names
   the property that changed instead of reporting that an object moved. */
const lines = [
  "/**",
  " * GENERATED FILE. Do not edit.",
  " *",
  " * Written by scripts/sync-canonical-person.mjs from docs/CANONICAL-PERSON.md,",
  " * which is the shared sheet every property Kal owns emits byte for byte. Edit",
  " * the sheet, not this file, and understand before you do that changing a value",
  " * here changes an identity claim on five domains at once.",
  " *",
  " * scripts/verify-schema.mjs parses the SAME sheet independently and compares it",
  " * against the shipped HTML, so a hand edit to this file fails the build rather",
  " * than shipping a fifth version of one person.",
  " */",
  "",
  "/** `Person.@id`. This site REFERENCES it and never mints one of its own. */",
  `export const CANONICAL_PERSON_ID = ${JSON.stringify(frozen["@id"])};`,
  "",
  "/**",
  " * Every frozen property except `@type` and `@id`, in the sheet's order.",
  " *",
  " * Spread onto the Person node exactly as it is. Nothing here is reworded for",
  " * this site: `alternateName` keeps its order because the comparison between",
  " * domains is a byte comparison, and `mainEntityOfPage` keeps its object shape",
  " * because it names a node in khaledhawari.ca's graph rather than a document.",
  " */",
  "export const CANONICAL_PERSON_FROZEN = " +
    JSON.stringify(
      Object.fromEntries(
        Object.entries(frozen).filter(([key]) => key !== "@type" && key !== "@id")
      ),
      null,
      2
    ) +
    " as const;",
  "",
];

const next = `${lines.join("\n")}`;

if (check) {
  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {
    console.error("sync:person  src/lib/canonical-person.ts does not exist. Run `npm run sync:person`.");
    process.exit(1);
  }
  if (current !== next) {
    console.error(
      "sync:person  src/lib/canonical-person.ts is out of date with docs/CANONICAL-PERSON.md.\n" +
        "             Run `npm run sync:person` and commit the result."
    );
    process.exit(1);
  }
  console.log("sync:person  generated file matches the sheet.");
  process.exit(0);
}

writeFileSync(OUT, next);
console.log(
  `sync:person  wrote src/lib/canonical-person.ts from docs/CANONICAL-PERSON.md (${
    Object.keys(frozen).length
  } frozen properties)`
);
