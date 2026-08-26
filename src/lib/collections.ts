/**
 * Collection access. ONE DOOR.
 *
 * EVERY READER OF THE ARTICLES COLLECTION GOES THROUGH `getArticles()`, and
 * nothing in src/pages calls `getCollection` directly. Two reasons, and the
 * second one is the load-bearing one.
 *
 * TOLERANCE. This scaffold has to build with zero articles authored, because it
 * was built before them and because a content repository that cannot build empty
 * cannot be bisected when something breaks later. Callers get a sorted array and
 * render an empty state; no template contains an "if the collection exists"
 * branch, because that branch would be written five times and forgotten on the
 * sixth page.
 *
 * THE PUBLICATION GATE. Future-dated articles are filtered out HERE, and here
 * only. That property is the whole design, and the failure it prevents is worse
 * than simply publishing early:
 *
 *   A gate on the index but not on `getStaticPaths` publishes the page at its
 *   real URL with nothing linking to it.
 *
 *   A gate on `getStaticPaths` but not on the index renders a row pointing at a
 *   URL the build did not emit, which is a 404 on the site and a failed
 *   `verify:links` in the build.
 *
 * Half a gate is worse than none. So the index, the homepage strip, the detail
 * route's `getStaticPaths`, its related rail and llms.txt all read this one
 * function, and a scheduled piece is absent from every one of them without any
 * of them knowing the gate exists. astro.config.mjs applies the same rule a
 * second time to the sitemap, because that file cannot import this one.
 *
 * Memoisation and filtering are in the same expression deliberately: the cache
 * stores the FILTERED list, so there is no unfiltered array available to a
 * caller who reaches past this.
 */

import { getCollection, type CollectionEntry } from "astro:content";
import { isLive } from "./publication";
import { ERA_ORDER, type Era } from "./eras";

export type ArticleEntry = CollectionEntry<"articles">;

/* Memoised for the life of the build process. The footer and the header render
   on every page and several surfaces read the same list, so an unmemoised
   version calls getCollection many times per route. On an EMPTY collection that
   is also the difference between one console warning per build and one per
   render, which is the difference between a readable build log and a wall. */
let articlesCache: Promise<ArticleEntry[]> | null = null;

/** Newest first. Ties break on title, which is stable across machines. */
export function getArticles(): Promise<ArticleEntry[]> {
  articlesCache ??= getCollection("articles", ({ data }) => isLive(data)).then((entries) =>
    entries.sort(
      (a, b) =>
        b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title)
    )
  );
  return articlesCache;
}

/**
 * The live articles grouped by era, in chronological era order, with empty eras
 * dropped.
 *
 * EMPTY ERAS ARE DROPPED RATHER THAN RENDERED EMPTY. On the day this site
 * launches most of them are empty, and a heading over nothing tells a reader the
 * site is unfinished, which is a worse first impression than a shorter index.
 * The eras themselves are still declared in src/lib/eras.ts and still described
 * on the home page, which is where the argument belongs.
 */
export async function getArticlesByEra(): Promise<{ era: Era; articles: ArticleEntry[] }[]> {
  const all = await getArticles();
  return ERA_ORDER.map((era) => ({
    era,
    articles: all.filter((entry) => entry.data.era === era),
  })).filter((group) => group.articles.length > 0);
}

/**
 * Others to read next, newest first, excluding this one.
 *
 * SAME-ERA FIRST, then anything. A reader who has just finished a piece on the
 * token sale era is more likely to want the next one from that era than the
 * newest thing on the site, and on a site that will eventually hold several
 * hundred pieces "newest three" degenerates into the same three links at the
 * bottom of every page.
 */
export async function getRelated(id: string, era: Era, limit = 3): Promise<ArticleEntry[]> {
  const all = (await getArticles()).filter((entry) => entry.id !== id);
  const sameEra = all.filter((entry) => entry.data.era === era);
  const rest = all.filter((entry) => entry.data.era !== era);
  return [...sameEra, ...rest].slice(0, limit);
}

/** The label shown on an article row and in its meta row. */
export const KIND_LABEL: Record<ArticleEntry["data"]["kind"], string> = {
  timeline: "Timeline",
  postmortem: "Postmortem",
  explainer: "Explainer",
  primarySource: "Primary source",
  profile: "Profile",
};

/**
 * Dates are formatted in one place. A site that shows "5 March 2026" on a row
 * and "2026-03-05" in the meta row looks like two sites stitched together.
 *
 * `timeZone: "UTC"` is not cosmetic. Frontmatter dates are parsed as UTC
 * midnight, and formatting one in a western timezone renders the PREVIOUS DAY.
 * That is a real bug that has shipped on other sites, and it is invisible until
 * somebody in Vancouver reads a date that is off by one.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** The machine-readable half of the same date, for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
