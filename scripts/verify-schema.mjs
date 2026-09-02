/**
 * Structured-data verification.
 *
 * Google's Rich Results Test is the authority, but it cannot run against an
 * unpublished build. These checks catch the failures that would make it fail,
 * plus the ones it cannot see at all because they are CROSS-PAGE: every
 * individual page in a broken entity graph is usually valid on its own, and the
 * contradiction only exists between them.
 *
 * ===========================================================================
 * THE RULE THIS SCRIPT EXISTS FOR
 * ===========================================================================
 *
 * EXACTLY ONE Person `@id` MAY APPEAR IN THE ENTIRE BUILD, AND IT IS
 * https://khaledhawari.ca/#person, WHICH THIS SITE DOES NOT OWN.
 *
 * Four sibling properties already point at that id. A second id minted here,
 * `https://ism50.com/#person` being the obvious mistake, would not add anything
 * to that entity. It would create a second human with the same name and split
 * everything the first one has accumulated. That failure is silent: nothing
 * errors, no tool warns, the markup validates, and the entity quietly stops
 * consolidating.
 *
 * So the check below is not "is there a Person node". It is "how many DISTINCT
 * Person ids exist across every page in dist", and the only passing answer is
 * one.
 *
 * ===========================================================================
 * THE FROZEN VALUES ARE READ FROM THE SHEET, NOT TYPED HERE
 * ===========================================================================
 *
 * The sibling repositories restate the frozen identity strings as literals in
 * their own verifier, on the correct argument that a check reading its
 * expectation from the module the page was generated from cannot catch the page
 * being generated wrongly. That argument is right and this file keeps it, but it
 * solves the problem differently and better.
 *
 * docs/CANONICAL-PERSON.md is the shared sheet. Two things read it, and they
 * never read each other:
 *
 *   scripts/sync-canonical-person.mjs  -> src/lib/canonical-person.ts -> pages
 *   this file                          -> the expectation
 *
 * So the independence the literal was buying is preserved, and the thing that
 * literals cost is avoided: five repositories each holding their own typed copy
 * of one agreement is five places for it to drift, and the sheet itself records
 * two occasions when exactly that happened (a scalar `alternateName` that should
 * have been an array, and a bare-string `mainEntityOfPage` that should have been
 * an `@id` reference). A retyped constant would have been the sixth copy.
 *
 * A hand edit to the generated file fails this check, because this check reads
 * the sheet. An edit to the sheet is what is supposed to happen, and it is
 * supposed to happen on all five domains in one pass.
 *
 *   node scripts/verify-schema.mjs
 */

import { createReporter, isIndexable, loadAllPages } from "./lib/dist.mjs";
import { readCanonicalPerson } from "./lib/canonical-person.mjs";

const ORIGIN = "https://ism50.com";
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;

/**
 * THE TWO COMPANIES, REFERENCED AND NEVER REDEFINED.
 *
 * The person founded two, and this site is neither of them. Each declares its
 * own canonical node on its own domain, so the Person's `worksFor` carries bare
 * pointers. Minting a second node for either here would split that company the
 * same way a local `#person` would split the human.
 */
const KODELYTICS_ID = "https://kodelytics.ca/#organization";
const KNA_GROUP_ID = "https://kna-group.com/#organization";

/* Read once, from the sheet. Throws with a readable message if the sheet has
   been restructured, which is the right outcome: a silently half-parsed
   agreement is worse than a stopped build. */
const SHEET = readCanonicalPerson();
const PERSON_ID = SHEET["@id"];
const { "@type": _sheetType, "@id": _sheetId, ...FROZEN_PERSON } = SHEET;

/** khaledhawari.ca's WebPage node, which the Person's mainEntityOfPage names. */
const PERSON_MAIN_ENTITY_OF_PAGE_ID = FROZEN_PERSON.mainEntityOfPage?.["@id"];

/**
 * THE ONE ROUTE THAT MAY CLAIM ProfilePage, AND WHY IT IS /about/.
 *
 * The article titles on this site lead with the SUBJECT and never with a
 * person's name, which is correct and is the safest position in the estate. The
 * consequence is that no article here will ever be an answer to a question about
 * a person, so /about/ is the only page on this domain that can carry his name
 * into a search result. It is therefore a real biography rather than a colophon.
 *
 * EXACTLY ONE. A second candidate page for one person is the failure this whole
 * model exists to avoid: two pages offering themselves as the answer, and a
 * search engine choosing. That is the August 2026 mechanism in miniature, and it
 * is why this site has no separate author route in addition to /about/.
 */
const PROFILE_ROUTE = "/about/";
const HOME_ROUTE = "/";

/**
 * THE ONTARIO CORPORATION NUMBER, BANNED FROM THE BUILD.
 *
 * 702876368 is Kodelytics Inc.'s, off the registry record. This site emits
 * exactly one Organization node and it is ISM50's, so there is nothing here the
 * number could correctly attach to: on the ISM50 node it would be a false
 * statement about a registry-backed fact, and minting a Kodelytics node purely
 * to hold it would be thin structured data.
 *
 * Checked against the RAW html rather than the graph, because the digits are
 * equally wrong in visible prose, in a meta tag or in an attribute, and a check
 * that only read JSON-LD would clear all three.
 */
const KODELYTICS_CORPORATION_NUMBER = /\b702876368\b/;

/** The exact corroboration set. Order is not significant, membership is. */
const EXPECTED_SAME_AS = [
  "https://khaledhawari.ca/",
  "https://khaledhawari.com",
  "https://kodelytics.ca",
  "https://kna-group.com",
  "https://ism50.com",
  "https://www.linkedin.com/in/khaledhawariottawa/",
  "https://www.crunchbase.com/person/khaled-hawari-ottawa",
  "https://muckrack.com/khaled-hawari-ottawa",
  // Wikidata entity Q138780576, the canonical identity node. Added 2026-09-02
  // alongside the same URL in PERSON_SAME_AS (src/lib/site.ts); the two must
  // agree or this check fails, which is the point.
  "https://www.wikidata.org/wiki/Q138780576",
];

/**
 * THE LINKEDIN PROFILE, PINNED SEPARATELY FROM THE LIST ABOVE.
 *
 * kna-group.com shipped `https://www.linkedin.com/in/khaledhawari`, which is not
 * his profile, while the other three properties emitted the correct one. Because
 * all of them declare the SAME Person `@id`, the effect was one entity asserting
 * two different LinkedIn identities, which is the exact inverse of what `sameAs`
 * is for. Corrected there on 2026-08-26 and banned outright here from the start.
 *
 * A wrong entry in EXPECTED_SAME_AS would pass every other check in this file,
 * because that list only asserts that the graph matches the list. It cannot tell
 * a right URL from a wrong one. So the near miss is named as a literal and
 * banned anywhere in the shipped html, markup or prose, on any route.
 *
 * DO NOT "fix" a future failure by editing WRONG_LINKEDIN. If the profile URL
 * genuinely changes, change LINKEDIN, change PERSON_SAME_AS in src/lib/site.ts,
 * change the visible link on /about/, and leave the old value banned.
 */
const LINKEDIN = "https://www.linkedin.com/in/khaledhawariottawa/";
const WRONG_LINKEDIN = /linkedin\.com\/in\/khaledhawari(?!ottawa)\b/i;

if (!EXPECTED_SAME_AS.includes(LINKEDIN)) {
  throw new Error(
    `verify:schema is misconfigured: LINKEDIN (${LINKEDIN}) is not in EXPECTED_SAME_AS. The two must agree or this check asserts nothing.`
  );
}

/**
 * The only ids allowed to resolve off the page they are referenced on.
 *
 * A JSON-LD `@id` is a global URI, so a consumer that has read the home page
 * already knows what the organization id denotes, and a consumer that has read
 * kodelytics.ca knows what that company's id denotes. Anything ELSE that dangles
 * is a bug, which is why this list is short and closed.
 *
 * PERSON_MAIN_ENTITY_OF_PAGE_ID IS ON IT BECAUSE THE VALUE IS AN OBJECT. The
 * sheet records what happened when it was a bare string on a sibling domain: a
 * dangling-`@id` walk inspects `{"@id": ...}` objects, so a string was never
 * examined at all and slipped past every check on that repository's main branch.
 * Because the value is a reference object here, this resolver sees it, and
 * whitelisting it is the point rather than a nuisance. It is checked now.
 */
const GLOBAL_IDS = new Set(
  [ORGANIZATION_ID, PERSON_ID, KODELYTICS_ID, KNA_GROUP_ID, PERSON_MAIN_ENTITY_OF_PAGE_ID].filter(
    Boolean
  )
);

const typesOf = (node) => [node?.["@type"] ?? []].flat();
const hasType = (node, type) => typesOf(node).includes(type);
const idOf = (value) => (value && typeof value === "object" ? value["@id"] : undefined);

const report = createReporter("verify:schema");
const pages = (await loadAllPages()).filter(isIndexable);

/* Cross-page accumulators. Checked after the loop, because none of these
   failures is visible from inside a single page. */
const personIds = new Set();
const personSerialised = new Map(); // JSON string -> [routes]
const profileRoutes = [];
const organizationRoutes = [];
const mainEntityOfPageRoutes = [];
/* Counted rather than merely checked, because this collection is planned to
   grow to several hundred articles and every one of them is a graph edge. A
   number in the build log is what makes a silently un-authored batch visible. */
let articleCount = 0;
let authorEdgeCount = 0;

for (const page of pages) {
  const where = page.route;

  /* -- the wrong LinkedIn slug, anywhere on the page ---------------------- */
  if (WRONG_LINKEDIN.test(page.html)) {
    report.error(
      where,
      `the wrong LinkedIn profile appears on this page. It must be ${LINKEDIN}. The near miss without "ottawa" belongs to somebody else, and asserting it under a shared Person @id tells a consumer this entity has two LinkedIn identities.`
    );
  }

  /* -- Kodelytics Inc.'s corporation number, anywhere on the page --------- */
  if (KODELYTICS_CORPORATION_NUMBER.test(page.html)) {
    report.error(
      where,
      "Ontario Corporation Number 702876368 appears on this page. It belongs to Kodelytics Inc., not to ISM50, and this build describes no Kodelytics node to carry it. Asserting one company's registry number on another is a false statement about a registry-backed fact."
    );
  }

  /* -- one block, one graph ----------------------------------------------- */
  if (page.graphs.length === 0) {
    report.error(where, "no JSON-LD");
    continue;
  }
  if (page.graphs.length > 1) {
    report.error(where, `${page.graphs.length} JSON-LD blocks, expected exactly one @graph`);
  }

  const block = page.graphs[0];
  if (block.__parseError) {
    report.error(where, `JSON-LD does not parse: ${block.__parseError}`);
    continue;
  }
  if (block["@context"] !== "https://schema.org") {
    report.error(where, `@context is "${block["@context"]}", expected https://schema.org`);
  }

  const graph = block["@graph"];
  if (!Array.isArray(graph) || graph.length === 0) {
    report.error(where, "JSON-LD has no @graph array");
    continue;
  }

  /* -- no duplicate @id inside one graph ---------------------------------- */
  const localIds = new Set();
  for (const node of graph) {
    const id = node["@id"];
    if (!id) continue;
    if (localIds.has(id)) report.error(where, `duplicate @id in one graph: ${id}`);
    localIds.add(id);
  }

  /* -- mainEntityOfPage: Person node only, pinned value only ---------------
     Walked node by node rather than with a substring test on the whole block,
     because what matters is WHICH NODE carries it. The value half is enforced
     by the frozen comparison below, which is stricter. */
  for (const node of graph) {
    if (node.mainEntityOfPage === undefined) continue;
    if (!hasType(node, "Person")) {
      mainEntityOfPageRoutes.push(`${where} (on ${typesOf(node).join("/") || "an untyped node"})`);
    }
  }

  /* The property must never point back at this domain, on any node. This site
     does not host the primary document about him and must not claim to.

     DELIBERATELY SHAPE-AGNOSTIC. It unwraps the `@id` object AND accepts a bare
     string, because the frozen comparison already rejects the bare form and this
     check has a different job: it must keep working if somebody reverts the
     shape, so that reverting the shape cannot also silently disable the one gate
     that matters most. */
  for (const node of graph) {
    const value =
      typeof node.mainEntityOfPage === "object" && node.mainEntityOfPage
        ? node.mainEntityOfPage["@id"]
        : node.mainEntityOfPage;
    if (typeof value === "string" && value.startsWith(ORIGIN)) {
      report.error(
        where,
        `mainEntityOfPage points at ${value}, a page on THIS domain. khaledhawari.ca is the primary document about this person and this site does not get to answer that question with one of its own pages. /about/ makes the weaker true claim instead, through ProfilePage and mainEntity.`
      );
    }
  }

  /* -- WebSite ------------------------------------------------------------ */
  const websites = graph.filter((node) => hasType(node, "WebSite"));
  if (websites.length !== 1) {
    report.error(where, `${websites.length} WebSite nodes, expected exactly one`);
  } else {
    const website = websites[0];
    if (website["@id"] !== WEBSITE_ID) {
      report.error(where, `WebSite @id is ${website["@id"]}, expected ${WEBSITE_ID}`);
    }
    if (idOf(website.publisher) !== ORGANIZATION_ID) {
      report.error(where, "WebSite.publisher does not reference the organization");
    }
  }

  /* -- Organization, home page only --------------------------------------- */
  const orgs = graph.filter((node) => hasType(node, "Organization"));
  if (orgs.length > 1) {
    report.error(where, `${orgs.length} Organization nodes, expected at most one`);
  }
  if (orgs.length === 1) {
    organizationRoutes.push(where);
    const org = orgs[0];
    if (org["@id"] !== ORGANIZATION_ID) {
      report.error(where, `Organization @id is ${org["@id"]}, expected ${ORGANIZATION_ID}`);
    }
    if (idOf(org.founder) !== PERSON_ID) {
      report.error(
        where,
        `Organization.founder is ${JSON.stringify(org.founder)}, expected a reference to ${PERSON_ID}. That single edge is what tells a knowledge graph the publication on this domain and the person on khaledhawari.ca are related entities.`
      );
    }
    if (!org.name || !org.url) {
      report.error(where, "Organization is missing name or url");
    }

    /* No identifier of any kind. ISM50 is a publication, not a registered
       company, so ANY identifier on this node today is either Kodelytics Inc.'s
       or invented, and both are the same kind of wrong. */
    for (const key of ["identifier", "taxID", "vatID", "leiCode", "duns", "naics", "iso6523Code"]) {
      if (org[key] !== undefined) {
        report.error(
          where,
          `Organization carries "${key}". ISM50 is a publication with no registration of its own, and Kodelytics Inc.'s corporation number belongs to a different entity. Emit nothing.`
        );
      }
    }

    /* `sameAs` on the ORGANISATION asserts THAT organisation's identity, so
       listing the person's other domains here would claim ISM50, KNA Group and
       Kodelytics Inc. are one thing. They are three things with one owner. The
       shared entity is the person, and that is where sameAs already is. */
    if (org.sameAs !== undefined) {
      report.error(
        where,
        "Organization carries sameAs. That property asserts THIS organisation's identity, so the person's other domains on it would claim ISM50, KNA Group and Kodelytics Inc. are one entity. The person is the shared entity; the businesses and the publication are not. It belongs on the Person node, where it already is."
      );
    }
  }

  /* -- Person, the load-bearing check ------------------------------------- */
  const persons = graph.filter((node) => hasType(node, "Person"));
  if (persons.length !== 1) {
    report.error(where, `${persons.length} Person nodes, expected exactly one`);
  }
  for (const person of persons) {
    const id = person["@id"];
    personIds.add(id);

    if (id !== PERSON_ID) {
      report.error(
        where,
        `Person @id is ${id}. THIS SITE DOES NOT MINT A PERSON ID. It must be ${PERSON_ID}, the canonical id the four sibling properties already point at.`
      );
    }

    /* -- the frozen identity values, byte for byte, straight off the sheet --
       Not `.includes`, not a case-insensitive match, not a shape-tolerant one,
       and not order-insensitive. Five domains emit these and the only useful
       question is whether they serialise to the same bytes. `alternateName` is
       compared including ORDER: JSON-LD would treat a reordered alias list as
       the same claim, a diff between two domains would not, and a diff between
       two domains is how drift is actually caught. */
    for (const [key, expected] of Object.entries(FROZEN_PERSON)) {
      const actual = person[key];
      if (JSON.stringify(actual) === JSON.stringify(expected)) continue;
      if (actual === undefined) {
        report.error(
          where,
          `Person is missing the frozen property "${key}". docs/CANONICAL-PERSON.md says it must be exactly: ${JSON.stringify(expected)}. All five owned domains emit this value byte for byte.`
        );
      } else {
        report.error(
          where,
          `Person.${key} is ${JSON.stringify(actual)}, expected the frozen value ${JSON.stringify(expected)} from docs/CANONICAL-PERSON.md. If this genuinely needs to change it changes on all five domains in one pass, by editing the sheet, not here and not in the generated file. ORDER and SHAPE are part of the value.`
        );
      }
    }

    /* `disambiguatingDescription` is the identity claim and is identical
       everywhere. `description` is contextual copy and MUST differ per domain,
       because on khaledhawari.ca he is a tax practitioner, on kna-group.com the
       founder of a finance operations firm, and here the person writing the
       history. If they are ever equal, somebody has pasted the frozen sentence
       over a real, site-specific string and deleted a claim rather than added
       one. */
    if (
      person.description !== undefined &&
      person.description === person.disambiguatingDescription
    ) {
      report.error(
        where,
        "Person.description is identical to Person.disambiguatingDescription. They are different properties doing different jobs: the frozen one identifies him across all five domains, this one says what he is HERE. Copying the frozen sentence in loses the site-specific claim and gains nothing."
      );
    }

    /* -- worksFor names both companies and defines neither of them here ----
       The person founded two, and this site is neither. Bare pointers at the
       nodes those domains declare for themselves are what make three graphs
       agree that one human is behind all of it. */
    const worksFor = [person.worksFor ?? []].flat().map(idOf);
    for (const [label, id] of [
      ["Kodelytics Inc.", KODELYTICS_ID],
      ["KNA Group", KNA_GROUP_ID],
    ]) {
      if (!worksFor.includes(id)) {
        report.error(
          where,
          `Person.worksFor does not reference ${label} (${id}). It is ${JSON.stringify(person.worksFor)}. He founded both companies, and the edge to a node defined on another domain is what tells a consumer the publication here and the firms there share an owner.`
        );
      }
    }

    /* No Person may carry a corporation number under any spelling. It is an
       Organization identifier and the only one this repo knows of belongs to
       Kodelytics Inc. */
    for (const key of ["identifier", "taxID", "vatID", "duns"]) {
      if (person[key] !== undefined) {
        report.error(
          where,
          `Person carries "${key}". A corporation number is an Organization identifier, never a Person one.`
        );
      }
    }

    const sameAs = [person.sameAs ?? []].flat();
    const missing = EXPECTED_SAME_AS.filter((url) => !sameAs.includes(url));
    const extra = sameAs.filter((url) => !EXPECTED_SAME_AS.includes(url));
    if (missing.length) report.error(where, `Person.sameAs is missing: ${missing.join(", ")}`);
    if (extra.length) {
      report.error(
        where,
        `Person.sameAs carries undeclared profiles: ${extra.join(", ")}. Add them to PERSON_SAME_AS in src/lib/site.ts AND to EXPECTED_SAME_AS in this script, or remove them. Note that a company's or a publication's home page is not a profile of a human: ism50.com and kna-group.com are deliberately absent, and the reasoning is in src/lib/site.ts.`
      );
    }

    const key = JSON.stringify(person);
    if (!personSerialised.has(key)) personSerialised.set(key, []);
    personSerialised.get(key).push(where);
  }

  /* -- WebPage ------------------------------------------------------------ */
  const webPages = graph.filter((node) => hasType(node, "WebPage"));
  if (webPages.length !== 1) {
    report.error(where, `${webPages.length} WebPage nodes, expected exactly one`);
  }
  for (const webPage of webPages) {
    const expectedId = `${page.canonical}#webpage`;
    if (webPage["@id"] !== expectedId) {
      report.error(where, `WebPage @id is ${webPage["@id"]}, expected ${expectedId}`);
    }
    if (webPage.url !== page.canonical) {
      report.error(where, `WebPage.url is ${webPage.url}, expected the canonical ${page.canonical}`);
    }
    if (webPage.name !== page.title) {
      report.error(where, "WebPage.name does not match the rendered <title>");
    }
    if (webPage.description !== page.description) {
      report.error(where, "WebPage.description does not match the rendered meta description");
    }

    if (hasType(webPage, "ProfilePage")) {
      profileRoutes.push(where);
      if (idOf(webPage.mainEntity) !== PERSON_ID) {
        report.error(where, "ProfilePage.mainEntity does not reference the canonical person");
      }
    } else if (idOf(webPage.mainEntity) === PERSON_ID) {
      report.error(
        where,
        `mainEntity references the person on a route that is not ${PROFILE_ROUTE}. Exactly one page may claim him.`
      );
    }
  }

  /* -- BreadcrumbList, every route except home ---------------------------- */
  const crumbs = graph.filter((node) => hasType(node, "BreadcrumbList"));
  if (where === HOME_ROUTE) {
    if (crumbs.length) report.error(where, "home page must not emit a BreadcrumbList");
  } else if (crumbs.length !== 1) {
    report.error(where, `${crumbs.length} BreadcrumbList nodes, expected exactly one`);
  } else {
    const items = crumbs[0].itemListElement ?? [];
    if (items.length < 2) {
      report.error(where, "BreadcrumbList has fewer than two items");
    }
    items.forEach((item, i) => {
      if (item.position !== i + 1) {
        report.error(where, `breadcrumb position ${item.position} at index ${i}, expected ${i + 1}`);
      }
      if (!item.name || !item.item) {
        report.error(where, `breadcrumb ${i + 1} is missing a name or an item URL`);
      }
    });
    if (items[0]?.item !== `${ORIGIN}/`) {
      report.error(where, `breadcrumb does not start at ${ORIGIN}/`);
    }
    if (items.at(-1)?.item !== page.canonical) {
      report.error(where, "breadcrumb does not end at this page's canonical");
    }
  }

  /* -- Article ------------------------------------------------------------ */
  for (const article of graph.filter((node) => hasType(node, "Article"))) {
    articleCount += 1;
    if (idOf(article.author) === PERSON_ID) {
      authorEdgeCount += 1;
    } else {
      report.error(
        where,
        `Article.author is ${JSON.stringify(article.author)}, expected a reference to ${PERSON_ID}. A bare string author is a name, not an edge: it adds nothing to the person entity, and this collection is where nearly all of this site's author edges will live.`
      );
    }
    if (idOf(article.publisher) !== ORGANIZATION_ID) {
      report.error(where, "Article.publisher does not reference the ISM50 organization");
    }
    if (!article.headline) report.error(where, "Article has no headline");
    if (Number.isNaN(Date.parse(article.datePublished))) {
      report.error(where, `Article.datePublished is unparseable: ${article.datePublished}`);
    }
    if (article.dateModified && Number.isNaN(Date.parse(article.dateModified))) {
      report.error(where, `Article.dateModified is unparseable: ${article.dateModified}`);
    }
    if (
      article.dateModified &&
      Date.parse(article.dateModified) < Date.parse(article.datePublished)
    ) {
      report.error(where, "Article.dateModified is earlier than datePublished");
    }
    /* No `mainEntityOfPage` on an Article. The Person carries the only one in
       the build, pinned to khaledhawari.ca, and an Article asserting its own
       primary page adds nothing a canonical does not already say while giving
       the property a second place to drift. */
    if (article.mainEntityOfPage !== undefined) {
      report.error(
        where,
        "Article carries mainEntityOfPage. Only the Person node may, and only with the pinned khaledhawari.ca value. isPartOf already carries the page relationship."
      );
    }
  }

  /* -- every reference resolves ------------------------------------------- */
  const collectRefs = (value, out = []) => {
    if (Array.isArray(value)) {
      for (const entry of value) collectRefs(entry, out);
    } else if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 1 && keys[0] === "@id") {
        out.push(value["@id"]);
      } else {
        for (const key of keys) {
          if (key === "@id") continue;
          collectRefs(value[key], out);
        }
      }
    }
    return out;
  };

  for (const ref of collectRefs(graph)) {
    if (localIds.has(ref) || GLOBAL_IDS.has(ref)) continue;
    report.error(where, `dangling @id reference, nothing in the graph defines ${ref}`);
  }
}

/* ========================================================================= */
/* CROSS-PAGE RULES. None of these is visible from inside a single page.      */
/* ========================================================================= */

if (personIds.size === 0) {
  report.error("(build)", "no Person node anywhere in the build");
} else if (personIds.size > 1) {
  report.error(
    "(build)",
    `${personIds.size} DISTINCT Person @ids in the build: ${[...personIds].join(
      ", "
    )}. Exactly one human may be described across this site, and his id is ${PERSON_ID}. A second id splits the entity and everything the first one has accumulated stops applying.`
  );
}

if (personSerialised.size > 1) {
  const variants = [...personSerialised.values()].map(
    (routes) => `${routes.length} page(s) starting at ${routes[0]}`
  );
  report.error(
    "(build)",
    `the Person node is not identical across the build, ${personSerialised.size} variants: ${variants.join(
      "; "
    )}. One person described two ways is a person a consumer has to reconcile, and reconciliation is where entities split.`
  );
}

if (profileRoutes.length === 0) {
  report.error("(build)", `no route claims ProfilePage, expected exactly ${PROFILE_ROUTE}`);
} else if (profileRoutes.length > 1) {
  report.error(
    "(build)",
    `${profileRoutes.length} routes claim ProfilePage: ${profileRoutes.join(
      ", "
    )}. Exactly one page may be the person's profile on this domain. Two candidates for one person is the August 2026 failure in miniature: two pages offering themselves as the answer, and a search engine choosing.`
  );
} else if (profileRoutes[0] !== PROFILE_ROUTE) {
  report.error("(build)", `ProfilePage is on ${profileRoutes[0]}, expected ${PROFILE_ROUTE}`);
}

if (organizationRoutes.length === 0) {
  report.error("(build)", "no route emits the Organization node, expected the home page");
} else if (organizationRoutes.length > 1 || organizationRoutes[0] !== HOME_ROUTE) {
  report.error(
    "(build)",
    `the Organization node is emitted on ${organizationRoutes.join(
      ", "
    )}. It belongs on the home page and nowhere else; other routes reference the id instead.`
  );
}

if (mainEntityOfPageRoutes.length) {
  report.error(
    "(build)",
    `mainEntityOfPage appears on a node that is not the Person, ${mainEntityOfPageRoutes.length} time(s), starting at ${mainEntityOfPageRoutes[0]}. Exactly one node in this build may carry it: the Person, with the pinned khaledhawari.ca value from the sheet.`
  );
}

/* The entity summary, printed on every build whether it passes or fails. The
   three numbers that matter are the count of distinct Person ids (one), the
   count of articles, and the count of those carrying the author edge. The second
   and third must be equal, and the checks above already fail the build if they
   are not; the line exists so a human reading a green build can see the graph
   growing rather than take it on faith. */
console.log(
  `verify:schema  entity: ${personIds.size} Person @id (${[...personIds].join(", ") || "none"}), ${authorEdgeCount}/${articleCount} article author edges, frozen values from docs/CANONICAL-PERSON.md`
);

process.exit(report.finish(pages.length));
