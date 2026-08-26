/**
 * THE EM DASH GATE.
 *
 * An em dash may not appear anywhere under src/, content/ or scripts/. This is
 * a standing house rule across every property in this group, and it is enforced
 * mechanically rather than by review because a punctuation rule enforced by
 * review is a punctuation rule that survives about two weeks.
 *
 * IT RUNS FIRST IN `npm run build`, before `astro build`, on purpose: it reads
 * SOURCE rather than output, so failing early means an author sees the offending
 * file and line instead of waiting for a full build to finish first.
 *
 * WHY NOTHING IS WRITTEN LITERALLY IN THIS FILE. A gate that contains the thing
 * it bans fails on itself the moment scripts/ is in scope, which it is. That is
 * not hypothetical: the first version of this file spelled out the entity forms
 * in this very comment and failed its own check on the first run. So the
 * character and all three entity spellings are assembled from code points at
 * the bottom of the file and never typed out.
 *
 * WHAT IT CATCHES, in four forms, because all four render identically in a
 * browser and only the first is visible in a diff: the literal U+2014, the
 * named HTML entity, and the decimal and hexadecimal numeric entities.
 *
 * WHAT IT DELIBERATELY DOES NOT CATCH. The en dash, U+2013, is a legitimate
 * range separator ("2024-2026" set properly) and banning it would push authors
 * back to a hyphen in the one place a hyphen is wrong. Only the em dash is
 * prohibited.
 *
 *   node scripts/verify-em-dash.mjs
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** The directories in scope. A path not listed here is not checked. */
const SCOPE = ["src", "content", "scripts"];

/** Never referenced literally. See the header. */
const EM_DASH = String.fromCharCode(0x2014);

/** Binary and generated files. Reading them proves nothing and is slow. */
const SKIP_DIRS = new Set(["node_modules", "dist", ".astro", ".git", ".firebase", ".cache"]);
const SKIP_EXT =
  /\.(png|jpe?g|gif|webp|avif|ico|svg|woff2?|ttf|otf|eot|pdf|zip|gz|mp4|webm|mp3|lock)$/i;

/* Assembled, never typed. `&` + "mdash;", `&#` + "8212;", `&#x` + "2014;". */
const AMP = String.fromCharCode(38);
const ENTITY = new RegExp(
  [`${AMP}mdash;`, `${AMP}#8212;`, `${AMP}#x2014;`].join("|"),
  "gi"
);

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full, out);
    } else if (!SKIP_EXT.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const hits = [];
let scanned = 0;

for (const dirName of SCOPE) {
  const dir = resolve(ROOT, dirName);
  if (!existsSync(dir)) continue;

  for (const file of await walk(dir)) {
    let text;
    try {
      text = await readFile(file, "utf8");
    } catch {
      continue;
    }
    scanned++;

    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const column = line.indexOf(EM_DASH);
      const entity = ENTITY.exec(line);
      ENTITY.lastIndex = 0;

      if (column === -1 && !entity) continue;

      hits.push({
        file: relative(ROOT, file).split(sep).join("/"),
        line: i + 1,
        column: (column === -1 ? entity.index : column) + 1,
        form: column === -1 ? entity[0] : "literal U+2014",
        /* Trimmed, and the character replaced, so the report itself does not
           contain what it is reporting. */
        excerpt: line.trim().slice(0, 120).split(EM_DASH).join("[EM DASH]"),
      });
    }
  }
}

console.log(`verify:emdash  scanned ${scanned} files under ${SCOPE.join(", ")}`);

if (hits.length) {
  console.error(`\nEM DASH FOUND in ${hits.length} place${hits.length > 1 ? "s" : ""}.\n`);
  for (const hit of hits.slice(0, 60)) {
    console.error(`  ${hit.file}:${hit.line}:${hit.column}  (${hit.form})`);
    console.error(`      ${hit.excerpt}`);
  }
  if (hits.length > 60) console.error(`  and ${hits.length - 60} more.`);
  console.error(
    "\nReplace it. A comma, a colon, a full stop or a restructured sentence all work;" +
      "\nfor a range use an en dash (U+2013), which is permitted."
  );
  process.exit(1);
}

console.log("verify:emdash  clean.");
