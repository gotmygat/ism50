/**
 * THE CONTENT SECURITY POLICY GATE.
 *
 *   node scripts/verify-csp.mjs        (runs from npm run build)
 *
 * ------------------------------------------------------------- why it exists --
 *
 * firebase.json ships a `script-src` with NO `'unsafe-inline'`. Every inline
 * script this site serves is therefore allowed by an explicit sha256 hash of its
 * exact bytes, and a hash is a promise about bytes that live in a different
 * file, written in a different language, edited by a different reflex.
 *
 * The failure mode without this check is the worst shape a failure can have. The
 * build succeeds. Every verifier passes. The HTML is valid. Nothing anywhere
 * says a word. And in production the browser silently refuses to run the theme
 * script, so the site flashes the wrong colour scheme on every navigation for a
 * reader who chose dark, and the only evidence is a console message on somebody
 * else's machine. One character added to a comment inside those scripts is
 * enough to do it.
 *
 * So the policy is checked against the thing it governs, on every build, which
 * is the same principle as scripts/verify-content.mjs: assert against the
 * SHIPPED OUTPUT rather than against the intent.
 *
 * ------------------------------------------------------------- what it checks --
 *
 *   1. Every inline, executable <script> in dist is covered by a hash in the
 *      policy. Unmatched script, build fails, and the message prints the hash to
 *      paste in.
 *
 *   2. Every hash in the policy matches something in dist. A stale hash is not
 *      dangerous, it is just a lie left in a config file, and a config file with
 *      one dead entry is a config file nobody trusts to read.
 *
 *   3. `script-src` does not carry `'unsafe-inline'`. If somebody ever adds it,
 *      the hashes stop meaning anything at all, because the presence of a hash
 *      or nonce is what makes a browser IGNORE `'unsafe-inline'` in the first
 *      place, and removing the hashes while keeping the keyword would quietly
 *      relax the policy to nothing.
 *
 *   4. The policy carries the directives that cannot be defaulted. `default-src`
 *      does not back-stop `base-uri`, `form-action` or `frame-ancestors`, which
 *      is the single most common way a policy that looks strict is not.
 *
 * ------------------------------------------------------------ what it ignores --
 *
 * `<script type="application/ld+json">` blocks. CSP governs executable script;
 * a block with a non-JavaScript type is a data block and is never executed, so
 * `script-src` does not apply to it. Hashing the JSON-LD would put a hash in the
 * policy for every distinct graph on the site, which is one per page, for no
 * security benefit whatsoever.
 *
 * `<script src="...">`. Those are covered by the `'self'` source, and this build
 * emits no external script host.
 */
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

import { DIST, ROOT, listHtmlFiles, requireDist, routeFor } from "./lib/dist.mjs";

requireDist();

/* --- the policy, read out of the deployment config ------------------------ */

const CONFIG = path.join(ROOT, "firebase.json");

let policy;
try {
  const config = JSON.parse(await readFile(CONFIG, "utf8"));
  for (const block of config.hosting?.headers ?? []) {
    for (const header of block.headers ?? []) {
      if (header.key.toLowerCase() === "content-security-policy") policy = header.value;
    }
  }
} catch (error) {
  console.error(`verify:csp  could not read ${CONFIG}: ${error.message}`);
  process.exit(1);
}

if (!policy) {
  console.error("verify:csp  firebase.json declares no Content-Security-Policy header.");
  console.error("            Every page this build emits would ship without one.");
  process.exit(1);
}

/** The directives, as a map of name to its list of source expressions. */
const directives = new Map(
  policy
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [name, ...sources] = part.split(/\s+/);
      return [name.toLowerCase(), sources];
    })
);

const errors = [];

/* --- 3 and 4: the shape of the policy ------------------------------------- */

const scriptSrc = directives.get("script-src") ?? [];
if (scriptSrc.length === 0) {
  errors.push("the policy has no script-src directive");
}
if (scriptSrc.includes("'unsafe-inline'")) {
  errors.push(
    "script-src carries 'unsafe-inline'. Every hash in the policy is then decoration: " +
      "a browser ignores 'unsafe-inline' the moment a hash or nonce is present, so the " +
      "two together mean the hashes are load bearing and the keyword is not, and the " +
      "keyword alone means nothing is checked at all."
  );
}
for (const required of ["default-src", "base-uri", "form-action", "frame-ancestors", "object-src"]) {
  if (!directives.has(required)) {
    errors.push(
      `the policy has no ${required} directive. default-src does not back-stop it, ` +
        "so it is unrestricted no matter how strict the rest of the policy reads."
    );
  }
}

/* --- 1 and 2: the hashes against the shipped HTML ------------------------- */

const declared = new Set(
  scriptSrc.filter((source) => /^'sha(256|384|512)-/.test(source)).map((source) => source.slice(1, -1))
);

const sha256 = (body) => `sha256-${createHash("sha256").update(body, "utf8").digest("base64")}`;

/** hash -> the routes that carry a script with that hash. */
const found = new Map();
let inlineScripts = 0;

/* `listHtmlFiles()` yields paths RELATIVE to dist, which is what `routeFor`
   expects and is not what `readFile` expects. Both halves are spelled out here
   rather than reused from a variable, because getting that backwards fails with
   an ENOENT naming a path that looks plausible. */
const files = await listHtmlFiles();
for (const file of files) {
  const route = routeFor(file);
  const html = await readFile(path.join(DIST, file), "utf8");

  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attributes = match[1];
    const body = match[2];

    /* A data block, never executed, never governed by script-src. */
    if (/\btype\s*=\s*"(?!text\/javascript|module|application\/javascript)[^"]*"/i.test(attributes)) {
      continue;
    }
    /* An external script, covered by 'self'. */
    if (/\bsrc\s*=/.test(attributes)) continue;
    if (body.trim() === "") continue;

    inlineScripts++;
    const hash = sha256(body);
    if (!found.has(hash)) found.set(hash, []);
    found.get(hash).push(route);
  }
}

for (const [hash, routes] of found) {
  if (declared.has(hash)) continue;
  errors.push(
    `an inline script on ${routes.length} route(s), starting at ${routes[0]}, is not ` +
      `allowed by the policy. It will be blocked in production. Add this to script-src ` +
      `in firebase.json:\n      '${hash}'`
  );
}

for (const hash of declared) {
  if (found.has(hash)) continue;
  errors.push(
    `script-src allows '${hash}', which matches no script in this build. Either an ` +
      "inline script was removed and the hash was left behind, or a script was edited " +
      "and the old hash was never taken out. Remove it from firebase.json."
  );
}

/* ------------------------------------------------------------------ report -- */

console.log(
  `\nverify:csp     ${files.length} page(s), ${inlineScripts} inline script(s), ` +
    `${found.size} distinct, ${declared.size} hash(es) in the policy`
);

if (errors.length) {
  console.error(`\n  ${errors.length} ERROR(S):\n`);
  for (const error of errors) console.error(`    ${error}\n`);
  process.exit(1);
}

console.log("verify:csp     the shipped policy covers the shipped scripts.\n");
