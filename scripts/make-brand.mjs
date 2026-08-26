/**
 * Generates the whole icon set and the Open Graph card.
 *
 *   node scripts/make-brand.mjs
 *
 * Run by hand when the mark changes. THE OUTPUT IS COMMITTED, so the build does
 * not depend on this script and a clone with no network can still produce a site
 * with a working tab icon. That is the pattern kna-group.com uses for
 * scripts/make-og-card.mjs and it is the right one: an icon set regenerated on
 * every build is an icon set whose bytes churn on every build, which pushes a
 * fresh download onto every returning visitor for no reason.
 *
 * ===========================================================================
 * THE MARK, AND WHY IT IS THIS SHAPE
 * ===========================================================================
 *
 * Fifty is the line between expansion and contraction. So the mark is a datum
 * line with a single stroke crossing it: the stroke runs along the upper region
 * on the left, steps down through the line, and continues along the lower region
 * on the right. One continuous path, one threshold, one crossing.
 *
 * The upper half of the stroke is the expansion accent and the lower half is the
 * contraction accent, which are the same two colours the site uses for the same
 * two meanings. At 16 pixels the colours are barely separable and that is fine:
 * the SILHOUETTE is what identifies a tab, and a bold step through a horizontal
 * rule is a silhouette nothing else in a tab strip has.
 *
 * WHAT IT DELIBERATELY IS NOT. It is not the characters "50" set in the body
 * face, which is a placeholder rather than a mark and turns to mush below about
 * 24 pixels. It is not an emoji. It carries its own dark ground rather than
 * relying on transparency, so it reads identically against light and dark
 * browser chrome instead of vanishing into one of them.
 *
 * THE STROKE IS 8 UNITS ON A 64 UNIT GRID, which is 2 physical pixels at 16
 * pixels. Anything thinner disappears at favicon size, which is the failure mode
 * that makes a carefully drawn mark look like a smudge.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = (path) => {
  const full = resolve(ROOT, path);
  mkdirSync(dirname(full), { recursive: true });
  return full;
};

/* The palette, restated here rather than imported from src/styles/tokens.css.
   These are the DARK-theme accent values, because the mark carries its own dark
   ground and the light-theme values are too dim against it. */
const GROUND = "#0b0e14";
const DATUM = "#6d798c";
const EXPANSION = "#7f9dff";
const CONTRACTION = "#e2915b";

/**
 * The mark on a 64 unit grid.
 *
 * @param {object} options
 * @param {number} options.radius   corner radius; 0 for a maskable icon, which
 *                                  the platform masks itself.
 * @param {number} options.inset    how far the artwork is pulled in from the
 *                                  edge. A maskable icon needs its content
 *                                  inside the middle 80%, so it gets a large
 *                                  inset and everything else gets a small one.
 */
function markSvg({ radius = 8, inset = 0 } = {}) {
  const s = (1 - inset * 2 / 64) ;
  const t = inset;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="ISM50">
  <rect width="64" height="64" rx="${radius}" fill="${GROUND}"/>
  <g transform="translate(${t} ${t}) scale(${s.toFixed(4)})">
    <!-- the datum: the line at fifty -->
    <rect x="5" y="31.25" width="54" height="1.5" fill="${DATUM}"/>
    <!-- above the line, then down through it -->
    <path d="M13 20 H32 V32" fill="none" stroke="${EXPANSION}" stroke-width="8" stroke-linejoin="miter" stroke-linecap="butt"/>
    <!-- through it, then below the line -->
    <path d="M32 32 V44 H51" fill="none" stroke="${CONTRACTION}" stroke-width="8" stroke-linejoin="miter" stroke-linecap="butt"/>
  </g>
</svg>`;
}

const favicon = markSvg({ radius: 8 });
writeFileSync(out("public/favicon.svg"), `${favicon}\n`);
console.log("  public/favicon.svg");

/* ------------------------------------------------------------------ PNGs -- */

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 });

await png(favicon, 180).toFile(out("public/apple-touch-icon.png"));
console.log("  public/apple-touch-icon.png  180x180");

await png(favicon, 192).toFile(out("public/brand/icon-192.png"));
console.log("  public/brand/icon-192.png    192x192");

await png(favicon, 512).toFile(out("public/brand/icon-512.png"));
console.log("  public/brand/icon-512.png    512x512");

/* A maskable icon is cropped to whatever shape the platform wants, so its
   content has to live inside the middle 80% or the crop eats it. Square corners,
   because the platform supplies the corner. */
await png(markSvg({ radius: 0, inset: 8 }), 512).toFile(out("public/brand/icon-maskable-512.png"));
console.log("  public/brand/icon-maskable-512.png  512x512 maskable");

/* ------------------------------------------------------------------- ICO -- */

/**
 * favicon.ico, containing 16, 32 and 48 pixel PNGs.
 *
 * WRITTEN BY HAND BECAUSE sharp CANNOT EMIT ICO, and the usual workaround is to
 * rename a PNG to .ico and hope. That mostly works and occasionally does not,
 * and it is the sort of thing nobody checks. ICO has supported embedded PNG
 * since Windows Vista, so a real container holding real PNGs is both correct and
 * about thirty lines.
 *
 * The header is 6 bytes, then one 16-byte directory entry per image, then the
 * image data. A dimension of 256 or more is recorded as 0 in the directory,
 * which is why nothing here goes above 48: this file is for a browser tab.
 */
const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map((size) => png(favicon, size).toBuffer().then((data) => ({ size, data })))
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(icoImages.length, 4);

let offset = 6 + 16 * icoImages.length;
const entries = [];
for (const { size, data } of icoImages) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette size, 0 for truecolour
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  offset += data.length;
}

writeFileSync(
  out("public/favicon.ico"),
  Buffer.concat([header, ...entries, ...icoImages.map((i) => i.data)])
);
console.log(`  public/favicon.ico           ${icoSizes.join(", ")}px, real ICO container`);

/* -------------------------------------------------------------- manifest -- */

const manifest = {
  name: "ISM50",
  short_name: "ISM50",
  description: "Fifteen years of crypto, read as a diffusion index.",
  start_url: "/",
  scope: "/",
  display: "minimal-ui",
  /* These two mirror src/styles/tokens.css and src/lib/site.ts. The background
     is the LIGHT ground, because that is what a platform paints behind a
     splash screen before any stylesheet has run. */
  background_color: "#e7eaee",
  theme_color: "#1f3fd0",
  icons: [
    { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
};

writeFileSync(out("public/site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log("  public/site.webmanifest");

/* ---------------------------------------------------------------- og card -- */

/**
 * The default social card.
 *
 * Without one, every share of every page renders as a bare text row. It is
 * composed as SVG in the site's own vocabulary and rasterised by sharp, which is
 * already in the toolchain for Astro's image pipeline.
 *
 * THE TYPE IS SET IN A SYSTEM STACK, NOT IN THE SITE'S WEBFONTS, and that is not
 * laziness. librsvg, which sharp uses, resolves font families against the fonts
 * installed on the machine running the build. Naming Archivo here would render
 * correctly on this Mac and fall back to something else on any other machine,
 * which is a worse failure than choosing a stack that is the same everywhere.
 * The mark carries the identity; the card carries the words.
 */
const card = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${GROUND}"/>

  <!-- the datum, running the full width of the card at the fifty line -->
  <rect x="0" y="315" width="1200" height="1.5" fill="#262e3b"/>

  <!-- the mark, at the left, crossing that same line -->
  <g transform="translate(80 251) scale(2)">
    <path d="M13 20 H32 V32" fill="none" stroke="${EXPANSION}" stroke-width="8"/>
    <path d="M32 32 V44 H51" fill="none" stroke="${CONTRACTION}" stroke-width="8"/>
  </g>

  <text x="80" y="150" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="bold" fill="${EXPANSION}" letter-spacing="8">ISM50</text>

  <text x="300" y="300" font-family="Georgia, serif" font-size="66" fill="#e2e7ef">Fifteen years of crypto,</text>
  <text x="300" y="380" font-family="Georgia, serif" font-size="66" fill="#e2e7ef">above and below the line.</text>

  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#9aa5b6">What was expanding, what was contracting, and who could tell at the time.</text>
</svg>`;

await sharp(Buffer.from(card)).png({ compressionLevel: 9 }).toFile(out("public/og-default.png"));
console.log("  public/og-default.png        1200x630");

console.log("\nbrand assets written. Commit them: the build reads them and does not regenerate them.");
