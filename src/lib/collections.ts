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
 * The pieces to read next, chosen so that every article holds inbound links that
 * do not decay as the archive grows.
 *
 * THE PROBLEM THIS REPLACES. The previous version returned the newest same-era
 * pieces, then the newest of anything. On a collection that grows by one piece a
 * day that is a recency function: a piece earns contextual inbound links for a
 * few days after it publishes and then loses every one of them as newer pieces
 * take its slots, until the only thing still pointing at it is the flat
 * /articles/ index. A piece whose era holds nothing else live yet, such as the
 * first piece of a new era, never earns a same-era link at all and sits on that
 * single index inbound from the day it ships.
 *
 * THE RELATIONSHIP USED INSTEAD IS POSITION IN THE TIMELINE, WHICH IS STABLE.
 * The two immediate chronological neighbours are a RECIPROCAL pair: if B is the
 * piece published just after A, then A is the piece published just before B, so
 * A appears in B's list and B appears in A's. Every interior piece is therefore
 * linked from exactly its two neighbours, and those two links do not move,
 * because a new piece is dated later than every existing one and lands at the
 * END of the sequence rather than between two pieces that already point at each
 * other. The only piece with a single neighbour is whichever is currently oldest
 * or newest, and the /articles/ index is the stable second inbound every piece
 * already carries. The floor is therefore two non-decaying inbound links per
 * live article, including the lone first piece of an otherwise empty era, which
 * is the case the recency version stranded.
 *
 * The third slot is filled with one more piece from the SAME era, chosen by
 * nearest position rather than by recency so the pick is stable across builds.
 * It keeps the block topically useful without reintroducing the decay this
 * function exists to remove.
 *
 * The neighbour relationship holds UNLESS a piece is backdated between two that
 * already exist, which the daily schedule does not do. A backdate would reseat
 * one seam, and the index inbound still holds the floor at two.
 */
export async function getRelated(id: string, era: Era, limit = 3): Promise<ArticleEntry[]> {
  /* Ascending by date, the reading order of the history, with a title tiebreak
     so the sequence is identical on every machine even if two pieces share a
     date. getArticles() is newest first; this is the same live set put back into
     timeline order, made explicit here rather than relying on a reverse. */
  const chrono = (await getArticles())
    .slice()
    .sort(
      (a, b) =>
        a.data.date.getTime() - b.data.date.getTime() ||
        a.data.title.localeCompare(b.data.title)
    );

  const here = chrono.findIndex((entry) => entry.id === id);
  /* A scheduled piece is not in the live set and has no neighbours to offer. The
     caller drops the rail when this is empty. */
  if (here < 0) return [];

  const picked: ArticleEntry[] = [];
  const seen = new Set<string>([id]);
  const take = (entry?: ArticleEntry) => {
    if (entry && !seen.has(entry.id) && picked.length < limit) {
      seen.add(entry.id);
      picked.push(entry);
    }
  };

  /* The reciprocal pair, taken first so they always survive the cap: the piece
     just after this one in the timeline, then the piece just before it. This is
     the whole of the non-decaying guarantee. */
  take(chrono[here + 1]);
  take(chrono[here - 1]);

  /* One more from the same era, nearest by position, for topical depth. Absent
     when the era holds nothing else live yet, which is exactly when the pair
     above is doing the load-bearing work. */
  const nearestSameEra = chrono
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.data.era === era && entry.id !== id)
    .sort((a, b) => Math.abs(a.index - here) - Math.abs(b.index - here) || b.index - a.index);
  if (nearestSameEra.length) take(nearestSameEra[0].entry);

  /* Any slot still open on a small archive or at an endpoint is filled by the
     next nearest neighbours, expanding outward through the timeline. Still
     proximity, never recency. */
  for (
    let step = 2;
    picked.length < limit && (here - step >= 0 || here + step < chrono.length);
    step++
  ) {
    take(chrono[here + step]);
    take(chrono[here - step]);
  }

  return picked;
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
