// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";

/**
 * The articles that have not published yet, by slug, read once at config load.
 *
 * WHY THIS IS DUPLICATED FROM src/lib/publication.ts. This file is loaded
 * outside the app's module graph and cannot import `astro:content`, so the rule
 * it needs cannot come from the file that owns it. The alternative was to leave
 * the sitemap ungated, and the two failure modes are not symmetrical: a page
 * missing from the sitemap is merely crawled a little later, whereas a URL
 * advertised in the sitemap and then served as a 404 is a soft 404 in Search
 * Console and a reason to distrust every other line in the file.
 *
 * This is genuinely a SECOND line rather than the only one. The first is
 * `getStaticPaths` in src/pages/articles/[slug].astro, which reads
 * `getArticles()` and therefore never emits a scheduled page at all, and
 * @astrojs/sitemap only ever sees pages that were emitted. So on the day this
 * was written the filter removes nothing. It is here because that reasoning is
 * one refactor deep, and because an ungated sitemap is exactly the kind of thing
 * that stays correct by accident until it does not.
 *
 * Parsed with a regex rather than a YAML library on purpose: this needs one
 * scalar out of a handful of small files, at config load, and a dependency added
 * here is a dependency in the build's critical path.
 *
 * THE DATE COMPARISON MUST MATCH src/lib/publication.ts EXACTLY. Both build
 * "today" from the LOCAL year, month and day rather than reading the UTC date,
 * because this machine is in Ottawa and UTC runs four to five hours ahead: after
 * about 20:00 local, the UTC date is already tomorrow. khaledhawari.ca published
 * an article a day early that way, and then shipped a build-breaking link to a
 * page it had refused to emit, because its config and its library disagreed by
 * one day inside that window. Compared as `YYYY-MM-DD` strings, which sort
 * lexicographically, so no Date is constructed from the frontmatter at all.
 */
const TODAY_LOCAL = (() => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
    .toISOString()
    .slice(0, 10);
})();

const SCHEDULED_ARTICLES = new Set(
  readdirSync("./content/articles")
    .filter((file) => /\.mdx?$/.test(file))
    .filter((file) => {
      const date = (readFileSync(`./content/articles/${file}`, "utf8").match(
        /^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m
      ) ?? [])[1];
      /* A file with no parseable date is left IN the sitemap. It cannot reach
         production anyway: the collection schema requires `date`, so the build
         fails long before this matters. Guessing "hide it" here would turn a
         loud schema error into a page that quietly stopped being indexed. */
      return date !== undefined && date > TODAY_LOCAL;
    })
    .map((file) => file.replace(/\.mdx?$/, ""))
);

/**
 * ism50.com
 *
 * Static output, directory format, trailing slashes everywhere. Those settings
 * are load bearing rather than stylistic: firebase.json is configured with
 * `trailingSlash: true` and `cleanUrls: false`, every canonical in src/lib/seo.ts
 * ends in a slash, and scripts/verify-links.mjs resolves a link by looking for
 * `<route>/index.html` in dist. Change one without the other three and the site
 * builds, deploys, and then serves a redirect on every internal link.
 *
 * FONTS ARE DOWNLOADED AT BUILD TIME AND SELF HOSTED. The Google provider is a
 * build-time source, not a runtime one: Astro fetches the files, subsets them,
 * emits its own @font-face rules and serves them from this origin. No visitor
 * request ever reaches fonts.googleapis.com or fonts.gstatic.com, so the site
 * carries no third-party CDN dependency and needs no preconnect.
 */
export default defineConfig({
  site: "https://ism50.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  output: "static",

  integrations: [
    mdx(),
    sitemap({
      /* The 404 is not a document anyone should be pointed at, and a scheduled
         article is not a document that exists yet. See SCHEDULED_ARTICLES. */
      filter: (page) => {
        if (page.includes("/404")) return false;
        /* Anchored on `articles/`, so a top-level route that happens to share a
           name with an article is never caught by this. */
        const article = new URL(page).pathname.match(/^\/articles\/(.+?)\/?$/);
        return !(article && SCHEDULED_ARTICLES.has(article[1]));
      },
      /* A sitemap is XML for crawlers, but people open it too, and an unstyled
         one greets them with Chrome's "This XML file does not appear to have any
         style information associated with it", which reads as a broken page. The
         stylesheet changes nothing a crawler parses.

         @astrojs/sitemap prefixes this with `site`, producing an ABSOLUTE href.
         Browsers enforce same-origin on XSLT against the origin the XML was
         actually served from, so the absolute form works in production and
         nowhere else: not on a Firebase preview channel, not in `astro preview`,
         not against the emulator. scripts/fix-sitemap-stylesheet.mjs rewrites it
         back to relative after the build. */
      xslURL: "/sitemap.xsl",
    }),
  ],

  /**
   * THREE FAMILIES, BECAUSE THIS SITE HAS THREE REGISTERS AND COLLAPSING THEM
   * WOULD COST THE WHOLE IDEA.
   *
   * The name is a diffusion index reading, so the site is built around an index
   * report crossed with an archive: a headline claim, a long historical
   * narrative, and a layer of instrumentation around both. Each gets a face.
   */
  fonts: [
    {
      /**
       * DISPLAY AND UI. Archivo is an American grotesque drawn for highway
       * signage and print, so it sets tight and holds at large sizes without the
       * geometric neutrality that makes every second site look the same. The
       * name is a coincidence and a good one.
       */
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-display-family",
      weights: [500, 600, 700],
      subsets: ["latin"],
      fallbacks: ["Helvetica Neue", "Arial", "Segoe UI", "Roboto", "sans-serif"],
    },
    {
      /**
       * BODY. Spectral is a screen-first serif with a narrow set width and real
       * ink on the page, which is what several thousand words of history needs.
       * The italic is loaded because a site that quotes primary sources uses one.
       */
      provider: fontProviders.google(),
      name: "Spectral",
      cssVariable: "--font-body-family",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Iowan Old Style", "Charter", "Cambria", "Georgia", "serif"],
    },
    {
      /**
       * THE INDEX LAYER. Dates, era labels, kind labels, block heights, the
       * reading itself. JetBrains Mono has genuine tabular figures and a
       * distinctive zero, and on a site whose subject is records, the monospace
       * is carrying meaning rather than decorating.
       */
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono-family",
      weights: [400, 500, 700],
      subsets: ["latin"],
      fallbacks: ["SFMono-Regular", "Menlo", "Consolas", "monospace"],
    },
  ],

  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },

  image: {
    /* sharp is a direct dependency so the pipeline is pinned, not resolved. */
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
