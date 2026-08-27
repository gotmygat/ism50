/**
 * Site configuration.
 *
 * ONE FILE, NOT TWO. The sibling repositories split this into a template-facing
 * `src/lib/site.ts` and a content-author-facing `content/site.ts`, merged with a
 * glob so the scaffold could build before anybody had written the real values.
 * That split earned its keep on a firm site, where a human owed a phone number,
 * an address and a booking link, and where the templates had to render honestly
 * without them.
 *
 * This site owes nobody a phone number. It is a publication with one author and
 * no intake, every value below is knowable today, and a second file would only
 * be a second place for the same string to be worded differently. So there is
 * one file and it is this one.
 *
 * WHAT IS NOT AUTHORABLE HERE, and it is the important part: the frozen identity
 * strings. `name`, `alternateName`, `url`, `mainEntityOfPage` and
 * `disambiguatingDescription` come from src/lib/canonical-person.ts, which is
 * generated from docs/CANONICAL-PERSON.md. They are not fields on the interface
 * below, because a field is a place somebody improves a sentence, and improving
 * one of those breaks an agreement with four other domains rather than
 * improving prose. See the sheet for the reasoning behind each value.
 */

import { CANONICAL_PERSON_ID } from "./canonical-person";

export { CANONICAL_PERSON_ID };

export interface NavItem {
  label: string;
  href: string;
}

/**
 * THE CANONICAL PERSON ID IS NOT THIS SITE'S TO MINT.
 *
 * Four sibling properties already point at `https://khaledhawari.ca/#person`. A
 * fifth property inventing `https://ism50.com/#person` would not add a node to
 * that entity, it would CREATE A SECOND HUMAN with the same name, and everything
 * the first id has accumulated would stop applying to this one. The two would
 * then compete for a name that is already hard to disambiguate.
 *
 * scripts/verify-schema.mjs counts the DISTINCT Person ids across the whole
 * build and the only passing answer is one.
 */

/**
 * KODELYTICS INC., REFERENCED AND NEVER REDEFINED.
 *
 * The person founded two companies and this site is neither of them. Kodelytics
 * Inc. is declared by kodelytics.ca and KNA Group by kna-group.com, so the
 * Person's `worksFor` edge carries bare pointers at those ids. Minting a second
 * node for either company on this domain would split that company the same way a
 * local `#person` would split the human.
 *
 * THE ONTARIO CORPORATION NUMBER IS DELIBERATELY ABSENT. It belongs to
 * Kodelytics Inc., it is an Organization identifier rather than a Person one,
 * and this build describes no Kodelytics node to hang it on.
 * scripts/verify-schema.mjs fails the build if the digits appear anywhere in the
 * shipped markup.
 */
export const KODELYTICS_ID = "https://kodelytics.ca/#organization";
export const KNA_GROUP_ID = "https://kna-group.com/#organization";

/**
 * The profiles that corroborate the person.
 *
 * THIS LIST IS BYTE-IDENTICAL TO THE ONE kna-group.com EMITS, and that is a
 * deliberate refusal to improve it locally. `sameAs` on a shared Person `@id` is
 * a claim about which documents are that person; five domains asserting five
 * different sets is five different answers to one question, which is the failure
 * `sameAs` exists to prevent rather than a variation on it.
 *
 * ALL FIVE OWNED DOMAINS ARE ON IT, CORRECTED 2026-08-27. This list previously
 * excluded ism50.com and kna-group.com on the argument that a publication's or a
 * firm's home page is not a profile of its owner. That argument is coherent, and
 * it lost, for two reasons.
 *
 * It contradicted itself: it excluded two company domains on principle while
 * carrying kodelytics.ca, a third, in the same list. A rule with an unexplained
 * exception is not being applied.
 *
 * And it contradicted the estate. Four domains ship the opposite convention, and
 * khaledhawari.ca states the reasoning: the identity claim about the operator is
 * false on a business node and TRUE on the Person, which is where it is made.
 * docs/estate/CANONICAL-PERSON.md records why a lone correct-sounding local
 * improvement loses to a shipped agreement: it is not a standard, it is a
 * regression waiting to be applied by five agents at once. If this convention is
 * to change it changes on all five domains in one pass, not here first.
 *
 * scripts/verify-schema.mjs restates this exact list, so adding a profile here
 * without adding it there fails the build rather than shipping a half-declared
 * entity. If one genuinely changes, it changes on all five domains in one pass.
 */
export const PERSON_SAME_AS = [
  "https://khaledhawari.ca/",
  "https://khaledhawari.com",
  "https://kodelytics.ca",
  "https://kna-group.com",
  "https://ism50.com",
  "https://www.linkedin.com/in/khaledhawariottawa/",
  "https://www.crunchbase.com/person/khaled-hawari-ottawa",
  "https://muckrack.com/khaled-hawari-ottawa",
] as const;

/**
 * The other four properties, as VISIBLE, CRAWLABLE LINKS.
 *
 * This is where the estate relationship is actually asserted for a reader, and
 * for a crawler it is worth more than another JSON-LD edge would be: an ordinary
 * anchor with descriptive text, on a page that is genuinely about the person, is
 * the thing entity extraction has always read. The hub on .ca is
 * `/about-khaled-hawari/`; the bare `/khaled-hawari/` 404s on three of the four
 * domains and only redirects on .ca, so it is never linked from here.
 */
export const ESTATE = [
  {
    host: "khaledhawari.ca",
    href: "https://khaledhawari.ca/about-khaled-hawari/",
    label: "khaledhawari.ca",
    note: "The tax and financial consulting practice, and the page that is about him.",
  },
  {
    host: "kodelytics.ca",
    href: "https://kodelytics.ca/about",
    label: "kodelytics.ca",
    note: "Kodelytics Inc., technical delivery leadership for agencies.",
  },
  {
    host: "kna-group.com",
    href: "https://kna-group.com/team/khaled-hawari/",
    label: "kna-group.com",
    note: "KNA Group, fractional finance operations for incorporated Canadian companies.",
  },
  {
    host: "khaledhawari.com",
    href: "https://khaledhawari.com/about/",
    label: "khaledhawari.com",
    note: "Essays on work, money and language.",
  },
] as const;

export interface SiteConfig {
  /** Display name, used in og:site_name and the schema graph. */
  name: string;
  /** Short form used in headings and chips. */
  shortName: string;
  /** Origin, NO trailing slash. Every schema `@id` is built from this. */
  url: string;
  locale: string;
  themeColor: string;
  backgroundColor: string;

  /** One line. What this publication is. Rendered, so it must read as English. */
  tagline: string;
  /** Two sentences. The Organization node's description. Not rendered as a hero. */
  description: string;
  /**
   * THE VISIBLE SUB-HEADING UNDER THE HOME PAGE H1, and a separate field from
   * `description` on purpose.
   *
   * khaledhawari.ca has already been through the failure this prevents: one
   * sentence doing duty as both the largest piece of visible copy on the
   * strongest page of the site AND the Organization node's schema description
   * gets adopted as the snippet for every route, and the routes then read as
   * near duplicates of one another. Two fields, two registers, no overlap.
   */
  heroLede: string;

  /* ------------------------------------------------------------- the author --
     ONE PERSON WRITES THIS SITE AND THE TEMPLATES ARE ALLOWED TO SAY SO. These
     are the VISIBLE strings. `person` below is the SCHEMA description of the
     same human. They must not converge: the schema one is a claim about
     identity, these are copy. */

  /** Display name. Used in prose, bylines and the author card. */
  authorName: string;
  /** What he does. NOT a designation, and never rendered as one. */
  authorRole: string;
  /** Two sentences. The card at the foot of every article. */
  authorCardBio: string;
  /** This site's page about him. Every mention that links, links here. */
  authorPagePath: string;

  person: {
    id: string;
    jobTitle: string[];
    knowsAbout: string[];
    knowsLanguage: string[];
    areaServed: string;
    alumniOf: string[];
    /**
     * One sentence, and it is NOT `disambiguatingDescription`.
     *
     * The frozen sentence identifies him across all five domains. This one says
     * what he is HERE, and it must differ per domain by design: on
     * khaledhawari.ca he is a tax practitioner, on kna-group.com the founder of
     * a finance operations firm, and here the person writing the history.
     * scripts/verify-schema.mjs fails the build if the two are ever equal,
     * because that means somebody pasted the frozen sentence over a real,
     * site-specific claim and deleted one rather than adding one.
     */
    description: string;
    /**
     * Root-relative path under public/, or null.
     *
     * A public/ PATH RATHER THAN AN src/assets/ IMPORT, and that is not an
     * oversight. Structured data is read away from the page it was found on and
     * cached for a long time, so the URL in it has to survive a re-encode. An
     * Astro-emitted asset URL carries a content hash and moves the moment the
     * file is touched, which would leave every cached copy of the node pointing
     * at a 404. Rendered portraits go through the image pipeline; this one
     * string does not.
     */
    image: string | null;
  };

  /** Where the publication is produced. True, and the only address it has. */
  place: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };

  nav: NavItem[];
  defaultOgImage: string | null;
  robots: string;
}

export const site: SiteConfig = {
  name: "ISM50",
  shortName: "ISM50",
  url: "https://ism50.com",
  locale: "en-CA",
  /* The expansion accent, in its light-theme value. See src/styles/tokens.css. */
  themeColor: "#1f3fd0",
  backgroundColor: "#e7eaee",

  tagline: "Fifteen years of crypto, read as a diffusion index.",
  description:
    "ISM50 documents the history of crypto from 2008 onward: what happened, in what order, and what the surviving record actually says. It publishes no prices, no forecasts and no advice.",

  heroLede:
    "Fifty is the line between expansion and contraction. Fifteen years of crypto is a sequence of things crossing it in both directions, and almost none of the people living through it could tell which side they were on.",

  authorName: "Khaled Hawari",
  authorRole: "Writer and editor",
  authorCardBio:
    "Khaled Hawari is a tax and financial consultant in Ottawa, Ontario, and the founder of Kodelytics Inc. and KNA Group. He has been reading crypto primary sources since clients started bringing him exchange exports nobody could reconcile.",
  authorPagePath: "/about/",

  person: {
    id: CANONICAL_PERSON_ID,
    jobTitle: ["Writer and editor", "Tax and financial consultant"],
    knowsAbout: [
      "History of cryptocurrency",
      "Blockchain protocol design",
      "Crypto market structure",
      "Primary source research",
      "Digital asset custody failures",
    ],
    knowsLanguage: ["en", "fr", "ar"],
    areaServed: "Canada",
    alumniOf: ["University of Ottawa", "Carleton University"],
    description:
      "Khaled Hawari writes ISM50, a documented history of cryptocurrency, from Ottawa, Ontario.",
    image: "/khaled-hawari.jpg",
  },

  place: {
    addressLocality: "Ottawa",
    addressRegion: "ON",
    addressCountry: "CA",
  },

  nav: [
    { label: "Articles", href: "/articles/" },
    { label: "About", href: "/about/" },
  ],

  defaultOgImage: "/og-default.png",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).href;
}
