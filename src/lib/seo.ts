/**
 * The metadata layer.
 *
 * A route with a missing, over-long or duplicated title does not render a
 * warning. It FAILS THE BUILD. With no CMS admin screen enforcing structure, the
 * schema is the only guardrail there is, and a guardrail that can be ignored is
 * decoration.
 *
 * THE TWO CAPS ARE THE SAME CAPS THE CONTENT COLLECTION USES, deliberately.
 * `seoTitle` in src/content.config.ts is capped at 62 and `description` at 158,
 * and those are the numbers below. One ceiling, enforced in two places, so a
 * hand-written page and an authored article cannot disagree about what a legal
 * title is.
 *
 * THE TITLE IS THE WHOLE <title>. No brand suffix is appended anywhere. If the
 * publication name belongs in a title it is written into the title. A suffix
 * bolted on at render time would push pages past the 62-character ceiling that
 * scripts/verify-content.mjs then measures against the SHIPPED html, and the two
 * halves would be checking different strings.
 */

import { site, absoluteUrl } from "./site";

export const TITLE_MAX = 62;
export const TITLE_MIN = 10;
export const DESCRIPTION_MAX = 158;
export const DESCRIPTION_MIN = 50;

export interface PageMeta {
  /** The complete <title>. At most 62 characters. */
  title: string;
  /** The meta description. Between 50 and 158 characters. */
  description: string;
  /** Root-relative, always with a trailing slash. Becomes the canonical. */
  path: string;
  /** og:type. "website" for pages, "article" for articles. */
  type?: "website" | "article";
  /** Route-specific social card. Falls back to the site default, or none. */
  ogImage?: string | null;
  /** Set true only on routes that must never be indexed. */
  noindex?: boolean;

  /* Article-only. */
  publishedAt?: Date;
  updatedAt?: Date;
  author?: string;
}

export interface ResolvedPageMeta
  extends Required<Omit<PageMeta, "publishedAt" | "updatedAt" | "author" | "ogImage">> {
  ogImage: string | null;
  publishedAt?: Date;
  updatedAt?: Date;
  author?: string;
}

/**
 * Validate and normalise a route's metadata. Throws, on purpose, so a bad value
 * stops `astro build` rather than shipping a naked page nobody notices for a
 * month.
 */
export function defineMeta(meta: PageMeta): ResolvedPageMeta {
  const issues: string[] = [];
  const where = meta.path ?? "(unknown route)";

  if (!meta.title || meta.title.trim().length < TITLE_MIN) {
    issues.push(`title is missing or shorter than ${TITLE_MIN} characters`);
  } else if (meta.title.length > TITLE_MAX) {
    issues.push(`title is ${meta.title.length} characters, the ceiling is ${TITLE_MAX}`);
  }

  if (!meta.description || meta.description.trim().length < DESCRIPTION_MIN) {
    issues.push(`description is missing or shorter than ${DESCRIPTION_MIN} characters`);
  } else if (meta.description.length > DESCRIPTION_MAX) {
    issues.push(
      `description is ${meta.description.length} characters, the ceiling is ${DESCRIPTION_MAX}`
    );
  }

  if (!meta.path || !meta.path.startsWith("/")) {
    issues.push("path must be root-relative and start with a slash");
  } else if (!meta.path.endsWith("/")) {
    issues.push("path must end with a trailing slash, this site uses trailingSlash: always");
  }

  if (issues.length) {
    throw new Error(
      `SEO metadata is invalid for "${where}":\n` +
        issues.map((i) => `  - ${i}`).join("\n") +
        `\nEvery route must carry a unique title of at most ${TITLE_MAX} characters and a unique description of at most ${DESCRIPTION_MAX}.`
    );
  }

  return {
    title: meta.title,
    description: meta.description,
    path: meta.path,
    type: meta.type ?? "website",
    ogImage: meta.ogImage ?? site.defaultOgImage,
    noindex: meta.noindex ?? false,
    publishedAt: meta.publishedAt,
    updatedAt: meta.updatedAt,
    author: meta.author,
  };
}

export { absoluteUrl };

/* -------------------------------------------------------------- registry --
   Static-route metadata. Article routes derive theirs from frontmatter, which is
   why only the hand-written pages appear here.

   ===========================================================================
   THE TITLE RULE ON THIS DOMAIN, AND IT IS THE MOST IMPORTANT THING IN THIS
   FILE.
   ===========================================================================

   EVERY TITLE LEADS WITH THE SUBJECT. NONE OF THEM LEADS WITH A PERSON'S NAME.

   In August 2026 khaledhawari.ca fell off page one for its owner's own name.
   Not a penalty, not a competitor: two domains he owns were offering themselves
   as the answer to one query, Google kept one and filtered the rest, and the one
   it filtered was the tax practice. khaledhawari-com/src/lib/seo.ts records the
   mechanism; kna-group.com/scripts/seo-doctor was built to detect it; and
   kna-group.com's own founder page was rewritten because a sweep found it
   opening with the same "Khaled Hawari," as two pages on .ca.

   This site is the FIFTH property. Leading with the subject is both correct for
   a brand-first publication and the safest available position in the estate:
   khaledhawari.ca is where the name query has to land, and this domain's job in
   that query is to corroborate him rather than to compete for him.

   THE ONE PLACE THE NAME APPEARS IN A TITLE IS /about/, AND IT APPEARS AFTER THE
   DIVIDER. That page is a real biography rather than a colophon, because the
   subject-first article titles mean it is the only page on this domain that can
   ever carry his name into a search result. Its leading segment,
   "Reading Crypto History as a Diffusion Index", is shared with nothing on any
   of the four sibling domains. Run `npm run estate:titles` to re-prove that
   against what the four sites are serving today; docs/ESTATE-TITLE-CHECK.md
   holds the comparison as of the last run.

   ALSO NOTE WHAT NO TITLE HERE CONTAINS: the word Ottawa. It is not a rule this
   domain was given, but "Hawari" beside "Ottawa" is the exact string pair that
   caused the incident, khaledhawari.com carries an absolute prohibition on it,
   and there is no reason a crypto history site needs a city in a title. The city
   is a fingerprint attribute and it belongs in the body copy and the Person
   node, where it is not a contested string. */

export const routeMeta = {
  home: {
    title: "Crypto History, Above and Below the Line | ISM50",
    description:
      "Fifteen years of crypto read as a diffusion index: what was expanding, what was contracting, and who could tell at the time. No prices, no forecasts.",
    path: "/",
  },
  articles: {
    title: "Fifteen Years of Crypto, Piece by Piece | ISM50",
    description:
      "Every article on ISM50, grouped by era and marked by kind: timelines, postmortems, explainers, readings of primary sources and profiles.",
    path: "/articles/",
  },
  about: {
    /* THE ONLY TITLE ON THIS DOMAIN CARRYING THE NAME, AND IT CARRIES IT AFTER
       THE DIVIDER. The leading segment is this site's own framing and collides
       with nothing in the estate. See the note above and
       docs/ESTATE-TITLE-CHECK.md. */
    title: "Reading Crypto History as a Diffusion Index | Khaled Hawari",
    description:
      "Khaled Hawari is a tax and financial consultant in Ottawa, Ontario. Why he writes a fifteen year history of crypto, and the standard it is held to.",
    path: "/about/",
  },
  disclaimer: {
    title: "What This Site Is Not | ISM50 Disclaimer",
    description:
      "ISM50 publishes history. It gives no investment advice, quotes no price target, claims no professional designation and makes no forecast about anything.",
    path: "/disclaimer/",
  },
  notFound: {
    title: "Nothing at This Address | ISM50",
    description:
      "That page is not here. The article index, the about page and the navigation above reach every document this site has published.",
    path: "/404/",
    noindex: true,
  },
} as const satisfies Record<string, PageMeta>;
