/**
 * The structured-data layer. This is the entity mechanism for the whole site and
 * it is exact by design: every node, every `@id` and every edge below is
 * asserted again by scripts/verify-schema.mjs against the SHIPPED html, so a
 * change here that is not also a change there fails the build.
 *
 * ===========================================================================
 * THE ENTITY MODEL
 * ===========================================================================
 *
 *   ONE person       Khaled Hawari       https://khaledhawari.ca/#person
 *   ONE publication  ISM50               https://ism50.com/#organization
 *   REFERENCED       Kodelytics Inc.     https://kodelytics.ca/#organization
 *   REFERENCED       KNA Group           https://kna-group.com/#organization
 *
 * THE PERSON ID IS NOT THIS SITE'S TO MINT. khaledhawari.ca, khaledhawari.com,
 * kodelytics.ca and kna-group.com already point at
 * `https://khaledhawari.ca/#person`. A fifth property inventing
 * `https://ism50.com/#person` would not add a node to that entity, it would
 * CREATE A SECOND HUMAN. Everything the other four have accumulated against the
 * first id would stop applying to this one, and the two would then compete for a
 * name that is already hard to disambiguate.
 *
 * So this site references the canonical id and describes the person it points
 * at. It does not claim to own him.
 *
 * ISM50 IS AN Organization AND IT IS A SEPARATE NODE. It is the publisher: the
 * WebSite's `publisher`, and every Article's `publisher`. Its only edge to the
 * person is `founder`, and that single property is what tells a knowledge graph
 * that the publication on this domain and the person on khaledhawari.ca are
 * related entities.
 *
 * The two FIRMS are referenced and never redefined, for the same reason a local
 * `#person` is forbidden: minting a second Kodelytics node here would split that
 * company exactly as a second person id would split the human. They appear only
 * as bare `{"@id": ...}` pointers on the Person's `worksFor`.
 *
 * WHY WHAT THIS SITE ADDS TO THE ENTITY IS MOSTLY THE AUTHOR EDGES. A profile
 * page is one document. `Article.author` pointing at the canonical id, on every
 * piece, is the thing that scales: the plan for this domain is one article a day
 * for a year, and each of them is another document asserting that this exact
 * name string belongs to this exact node.
 *
 * ===========================================================================
 * WHERE THE FROZEN VALUES COME FROM
 * ===========================================================================
 *
 * `name`, `alternateName`, `url`, `mainEntityOfPage` and
 * `disambiguatingDescription` are NOT authored here or in src/lib/site.ts. They
 * are spread in from src/lib/canonical-person.ts, which is generated from
 * docs/CANONICAL-PERSON.md. Five domains emit them byte for byte, and a property
 * that differs by one word between two of them is two competing claims about one
 * person, which is strictly worse than not emitting the property at all.
 *
 * NOTE THAT `url` AND `mainEntityOfPage` HAVE DIFFERENT SHAPES AND THAT IS
 * CORRECT. `url` is a bare string because it names a document, the person's own
 * website. `mainEntityOfPage` is an `@id` REFERENCE OBJECT carrying the
 * `#webpage` fragment, because it names a NODE in khaledhawari.ca's graph. The
 * sheet records at length why: a bare string is invisible to a dangling-`@id`
 * resolver, and a sibling repository shipped one that slipped past every check
 * it had. Do not "make them consistent".
 *
 * ===========================================================================
 * WHY SOME REFERENCES RESOLVE OFF-PAGE
 * ===========================================================================
 *
 * The full Organization node is emitted on `/` and nowhere else, because a
 * publication has one description and restating it on several hundred routes
 * makes the graph noisier without making it truer. Other routes still REFERENCE
 * the id as a bare pointer, because a JSON-LD `@id` is a global URI rather than
 * a page-local variable: a consumer that has read the home page already knows
 * what that id denotes.
 *
 * Exactly FIVE ids may resolve off-page: this site's organization, the person,
 * Kodelytics Inc., KNA Group, and khaledhawari.ca's WebPage node for the hub
 * page. The first is defined on `/`; the other four are defined on other domains
 * and are never defined here at all. verify-schema.mjs whitelists those five and
 * only those five, and any other dangling reference is a bug.
 */

import {
  site,
  absoluteUrl,
  KODELYTICS_ID,
  KNA_GROUP_ID,
  PERSON_SAME_AS,
} from "./site";
import { CANONICAL_PERSON_ID, CANONICAL_PERSON_FROZEN } from "./canonical-person";
import { withHome, type Crumb } from "./breadcrumbs";

export type JsonLdNode = Record<string, unknown>;

/** The publication's id. Built from `site.url`, which carries no trailing slash. */
export const ORGANIZATION_ID = `${site.url}/#organization`;
/** The website id. One per site, referenced by every WebPage node. */
export const WEBSITE_ID = `${site.url}/#website`;
/** Re-exported so pages and the verifier read the same constant. */
export const PERSON_ID = CANONICAL_PERSON_ID;

/**
 * THE SINGLE ROUTE ALLOWED TO CLAIM ProfilePage.
 *
 * Every article title on this site leads with its SUBJECT and never with a
 * person's name, which is the safest position in the estate and stays. The
 * consequence is that no article here can ever be the answer to a question about
 * a person, so /about/ is the only page on this domain carrying his name into a
 * search result, and it is built as a real biography rather than a colophon.
 *
 * There is deliberately NO second author route. Two candidate pages for one
 * person is the failure the whole model exists to avoid, and it is the August
 * 2026 mechanism in miniature: two pages offering themselves as the answer, and
 * a search engine keeping one.
 */
export const PROFILE_ROUTE = "/about/";

/** A bare reference to another node in the graph. */
const ref = (id: string) => ({ "@id": id });

/* ------------------------------------------------------------- the nodes -- */

/**
 * The site itself. `publisher` points at the publication rather than at the
 * person: ISM50 publishes this site, and the person founded ISM50. Those are two
 * different claims and collapsing them would make a human the publisher of a
 * publication's website, which is not what is happening here.
 */
export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.shortName,
    description: site.description,
    inLanguage: site.locale,
    publisher: ref(ORGANIZATION_ID),
  };
}

/**
 * ISM50. HOME PAGE ONLY.
 *
 * NOTHING HERE IS INVENTED. No founding date, because there is no public record
 * of one to cite and a guessed one is a fabricated fact on a site whose entire
 * premise is documenting history correctly. No identifier of any kind: this is a
 * publication rather than a registered company, so any identifier on this node
 * would be either another entity's or made up.
 *
 * NO `sameAs`. That property asserts THIS organisation's identity, so listing
 * the owner's other domains here would claim ISM50, KNA Group and Kodelytics
 * Inc. are one entity. They are three things with one owner. The shared entity
 * is the person, and `sameAs` is on the Person node where it belongs.
 */
export function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.shortName,
    url: absoluteUrl("/"),
    description: site.description,
    slogan: site.tagline,
    founder: ref(PERSON_ID),
    knowsAbout: site.person.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.place.addressLocality,
      addressRegion: site.place.addressRegion,
      addressCountry: site.place.addressCountry,
    },
  };
}

/**
 * Khaled Hawari. Emitted on EVERY route, byte-identical, and never with a second
 * `@id`.
 *
 * Identical on every route on purpose. A person described one way on the home
 * page and another way on an article is a person a consumer has to reconcile,
 * and reconciliation is where entities get split. verify-schema.mjs compares the
 * serialised node across the whole build and fails on any drift.
 *
 * THE FROZEN PROPERTIES ARE SPREAD IN FIRST AND NOTHING BELOW OVERWRITES THEM.
 * That ordering is deliberate: a later key with the same name would silently
 * win, and the one thing this node must not do is let a locally authored string
 * beat the shared one.
 *
 * `disambiguatingDescription` IS NOT `description`. The former is schema.org's
 * field for telling an item apart from similar ones, so it is the identity claim
 * and is identical on all five domains. `description` is contextual copy and
 * reads differently on each by design: here he is the person writing the
 * history, on khaledhawari.ca a tax practitioner, on kna-group.com the founder
 * of a finance operations firm. All true, and converging them throws two of them
 * away. The verifier fails the build if the two are ever equal.
 *
 * `worksFor` CARRIES BOTH COMPANIES AND DEFINES NEITHER. ISM50 is not on it:
 * this site's relationship to him is `founder` on the Organization node above,
 * plus an `author` edge on every article, which is a stronger and more accurate
 * pair of claims than adding a publication to a list of employers.
 *
 * NO credential, licence or designation claim of any kind. NO corporation
 * number: that identifier belongs to Kodelytics Inc., it is an Organization
 * property rather than a Person one, and this site emits no Kodelytics node to
 * carry it.
 */
export function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    ...CANONICAL_PERSON_FROZEN,
    jobTitle: site.person.jobTitle,
    description: site.person.description,
    knowsAbout: site.person.knowsAbout,
    knowsLanguage: site.person.knowsLanguage,
    areaServed: site.person.areaServed,
    alumniOf: site.person.alumniOf.map((name) => ({ "@type": "CollegeOrUniversity", name })),
    worksFor: [ref(KODELYTICS_ID), ref(KNA_GROUP_ID)],
    sameAs: [...PERSON_SAME_AS],
    /* Omitted entirely while null rather than emitted empty: a stated absence is
       a worse claim than silence, and an `image` that 404s is worse than no
       image at all. The path is a stable public/ URL, never a hashed asset,
       because structured data is cached long after the build that produced it.
       See SiteConfig. */
    ...(site.person.image ? { image: absoluteUrl(site.person.image) } : {}),
  };
}

export interface WebPageOptions {
  canonical: string;
  route: string;
  title: string;
  description: string;
  /** Extra `@type` values, e.g. "CollectionPage" on the index. */
  extraTypes?: string[];
}

/**
 * The page. One per route, `@id` is `<canonical>#webpage`.
 *
 * /about/ is a ProfilePage and it is the ONLY route that may be one. Its
 * `mainEntity` is the person id, and that is the only place in the build where
 * `mainEntity` points at a person.
 *
 * `about` on every OTHER route makes the weaker, true claim: this page concerns
 * him. "This page is about him" and "the primary document about him is over
 * there on khaledhawari.ca" are both true at once, which is why the person's own
 * `mainEntityOfPage` stays pinned to .ca even on the profile route.
 */
export function webPageNode(options: WebPageOptions): JsonLdNode {
  const { canonical, route, title, description, extraTypes = [] } = options;
  const isProfile = route === PROFILE_ROUTE;

  const types = ["WebPage", ...extraTypes];
  if (isProfile) types.push("ProfilePage");

  const node: JsonLdNode = {
    "@type": types.length === 1 ? types[0] : types,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: site.locale,
    isPartOf: ref(WEBSITE_ID),
    about: ref(PERSON_ID),
  };

  if (isProfile) {
    /* The strong claim, on one route: he is what this page IS. */
    node.mainEntity = ref(PERSON_ID);
  }

  return node;
}

/**
 * The trail, from the same array the visible breadcrumbs render from.
 * Returns null on the home page, where a one-item trail asserts nothing.
 */
export function breadcrumbNode(canonical: string, crumbs: Crumb[]): JsonLdNode | null {
  const trail = withHome(crumbs);
  if (trail.length < 2) return null;

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export interface ArticleNodeOptions {
  canonical: string;
  headline: string;
  description: string;
  datePublished: Date;
  dateModified?: Date;
  /** The era's label, emitted as `articleSection`. */
  section: string;
  /** The era's approximate span plus the kind, emitted as `about`. */
  keywords: string[];
  /**
   * Absolute URL of the social card this route actually serves, or undefined.
   *
   * PASSED IN RATHER THAN READ HERE so the Article's `image` cannot drift from
   * the `og:image` the same page emits: the caller resolves one value and hands
   * it to both. It is a stable public/ URL, never a hashed asset, for the same
   * reason the Person's `image` is, because structured data is read and cached
   * long after the build that produced it.
   */
  image?: string;
}

/**
 * One article.
 *
 * `author` IS THE CANONICAL PERSON ID and that is the property that makes a
 * piece published here count toward the same author entity as one published on
 * khaledhawari.ca. It is the entire reason a shared id matters to a content site
 * rather than only to a profile page, and on a domain planning several hundred
 * pieces it is where nearly all of this site's contribution to the entity lives.
 *
 * NO `mainEntityOfPage` ON THIS NODE. The Person carries the only one in the
 * build, pinned to khaledhawari.ca. An Article asserting its own primary page
 * would be claiming something about the article rather than the person, adds
 * nothing a canonical does not already say, and would give the property a second
 * place to drift. `isPartOf` carries the page relationship without any such
 * claim.
 *
 * `image` IS THE ROUTE'S OWN SOCIAL CARD, AND ONLY WHEN ONE EXISTS. Articles
 * here carry no per-piece hero, and inventing one would be a claim about a file
 * that does not exist. But every route already serves a real `og:image`, the
 * shared default card committed under public/, and Google's Article guidance
 * lists `image` among the recommended properties. So this node declares the same
 * URL the page's `og:image` carries, passed in by the caller so the two cannot
 * disagree, and emits nothing at all when the caller has no card to give. A
 * present-and-correct `image` is a stronger rich result; an absent one is only a
 * missing recommendation, and both beat an `image` that points at a 404.
 */
export function articleNode(options: ArticleNodeOptions): JsonLdNode {
  const { canonical, headline, description, datePublished, dateModified, section, keywords, image } =
    options;

  return {
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline,
    description,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    author: ref(PERSON_ID),
    publisher: ref(ORGANIZATION_ID),
    isPartOf: ref(`${canonical}#webpage`),
    articleSection: section,
    keywords,
    inLanguage: site.locale,
    url: canonical,
    /* A bare URL string rather than an ImageObject: it matches the value the
       og:image carries, and a single-key {"@id"} object is the only shape the
       schema verifier's reference walk follows, so a string adds no dangling
       edge to resolve. Omitted entirely when the site serves no default card. */
    ...(image ? { image } : {}),
  };
}

/* ----------------------------------------------------------- the assembly -- */

export interface GraphOptions extends WebPageOptions {
  crumbs?: Crumb[];
  /** Route-specific nodes: Article, and nothing else so far. */
  extraNodes?: JsonLdNode[];
}

/**
 * ONE graph per page, in a fixed order, with no duplicate nodes.
 *
 * The order is not cosmetic. A consumer reading top to bottom meets the site,
 * then the publication, then the person, then the page, then the page's own
 * subject. That is also the order the verifier reports failures in, which makes
 * a broken build readable.
 */
export function buildGraph(options: GraphOptions): JsonLdNode {
  const { crumbs = [], extraNodes = [], ...pageOptions } = options;
  const isHome = pageOptions.route === "/";

  const nodes: JsonLdNode[] = [
    websiteNode(),
    ...(isHome ? [organizationNode()] : []),
    personNode(),
    webPageNode(pageOptions),
  ];

  const crumbNode = breadcrumbNode(pageOptions.canonical, crumbs);
  if (crumbNode) nodes.push(crumbNode);

  nodes.push(...extraNodes);

  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
