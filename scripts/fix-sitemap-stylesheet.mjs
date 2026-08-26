/**
 * Rewrites the sitemap's `<?xml-stylesheet?>` href to a RELATIVE URL.
 *
 * WHY THIS EXISTS, and it is not cosmetic.
 *
 * @astrojs/sitemap takes the `xslURL` from astro.config.mjs and prefixes it
 * with `site`, so `/sitemap.xsl` ships as `https://ism50.com/sitemap.xsl`.
 * A browser applying an XSLT stylesheet enforces same-origin, comparing that
 * ABSOLUTE href against the origin the XML was actually served from. Any origin
 * that is not production therefore fails, with a console error of the form:
 *
 *   Unsafe attempt to load URL https://ism50.com/sitemap.xsl from frame
 *   with URL http://127.0.0.1:4321/sitemap-0.xml. Domains, protocols and ports
 *   must match.
 *
 * Production is the one place the absolute form works, which makes it the one
 * arrangement that cannot be checked before it ships. A relative href is
 * same-origin by construction and works everywhere.
 *
 * Ported from khaledhawari-com, where the same defect was found by opening the
 * built sitemap against the Firebase emulator.
 *
 * Runs after `astro build`, before the verifiers.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

const files = readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/.test(f));

if (files.length === 0) {
  console.error("  fix-sitemap-stylesheet: no sitemap files in dist/, did astro build run?");
  process.exit(1);
}

let changed = 0;
let alreadyRelative = 0;

for (const file of files) {
  const path = join(DIST, file);
  const before = readFileSync(path, "utf8");

  /* Match the absolute href only. Anything already relative is left alone, so
     the script is idempotent and a second run is a no-op rather than a
     corruption. */
  const after = before.replace(
    /(<\?xml-stylesheet[^?]*href=")https?:\/\/[^/"]+(\/[^"]*")/,
    "$1$2"
  );

  if (after !== before) {
    writeFileSync(path, after);
    changed += 1;
  } else if (/<\?xml-stylesheet[^?]*href="\//.test(before)) {
    alreadyRelative += 1;
  }
}

/* Fail loudly rather than silently succeeding. If neither a rewrite nor an
   already-relative href was found, xslURL is not configured and the sitemap is
   shipping unstyled, which is the exact defect this script exists to prevent. */
if (changed === 0 && alreadyRelative === 0) {
  console.error(
    "  fix-sitemap-stylesheet: no xml-stylesheet found in any sitemap. Is xslURL set in astro.config.mjs?"
  );
  process.exit(1);
}

console.log(
  `  fix-sitemap-stylesheet  rewrote ${changed}, already relative ${alreadyRelative}, of ${files.length} file(s)`
);
