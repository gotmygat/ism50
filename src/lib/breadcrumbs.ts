/**
 * The one definition of a breadcrumb trail.
 *
 * A breadcrumb is two artefacts that have to agree: the trail a visitor reads,
 * and the BreadcrumbList a crawler reads. Google's guidance is that marked-up
 * content should be present on the page, so a page whose markup and trail
 * disagree is worse than one that emits neither.
 *
 * Both halves therefore start here. BaseHead builds the JSON-LD from `withHome`
 * and Breadcrumbs.astro renders the visible trail from the same function, off
 * the same array the page passed. They cannot disagree about where Home sits,
 * what the labels say, or what order they come in, because there is only one
 * array and one place Home is added to it.
 */

export interface Crumb {
  /** The visible text, and the `name` in the JSON-LD ListItem. */
  label: string;
  /** Root-relative, with the trailing slash every route on this site uses. */
  href: string;
}

/**
 * Home is implicit on every route, so no page declares it. It is prepended here,
 * once, rather than by each caller: a route that forgot it would emit a trail
 * starting halfway down the hierarchy, which is the exact claim BreadcrumbList
 * exists to make correctly.
 */
export const HOME: Crumb = { label: "ISM50", href: "/" };

/** The full trail, Home first, from a page's own crumbs (which exclude Home). */
export const withHome = (trail: Crumb[] = []): Crumb[] => [HOME, ...trail];

/** The trail every /articles/<slug>/ page shares. */
export const articleTrail = (label: string, slug: string): Crumb[] => [
  { label: "Articles", href: "/articles/" },
  { label, href: `/articles/${slug}/` },
];
