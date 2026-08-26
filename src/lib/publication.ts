/**
 * The publication gate.
 *
 * SCHEDULING ON A STATIC SITE. There is no server here to check the clock, so an
 * article dated tomorrow is simply absent from the build that runs today and
 * present in the build that runs on its date. That only works if something
 * rebuilds daily. That something is the launchd agent com.ism50.publish, which
 * runs scripts/publish-scheduled.sh four times a day. Remove the scheduler and
 * every future-dated article stays invisible forever, so the two are a pair: do
 * not delete one without deleting the other.
 *
 * WHY THIS LIVES IN ITS OWN FILE rather than inside collections.ts, which is
 * otherwise the single door onto the content. collections.ts is where the gate
 * is APPLIED, and it is applied in exactly one place, inside `getArticles()`.
 * The rule itself is separated because it is the thing a reader has to be able
 * to find and check, and because getting it wrong is silent: an article that
 * leaks a day early looks exactly like an article that was supposed to be there.
 *
 * THE COMPARISON IS AGAINST THE LOCAL CALENDAR DATE, NOT THE UTC ONE, and this
 * is the part that has actually broken in this group before.
 *
 * khaledhawari.ca read the UTC date, on the argument that the build ran on a
 * GitHub Actions runner set to UTC. That stopped being true when the build moved
 * to Kal's Ottawa Mac, where UTC runs four to five hours AHEAD of local. An
 * article dated 2026-08-03 went live at 20:01 EDT on 2026-08-02, because that
 * instant is already the 3rd in UTC. The morning slot never hit it; the evening
 * catch-up run did, publishing a day early with tomorrow's date printed on the
 * page.
 *
 * So today is built from the LOCAL year, month and day, and then lifted to UTC
 * midnight so it can be compared against a frontmatter date on equal terms.
 * `date: 2026-08-26` in YAML parses to UTC midnight, and `z.coerce.date()` keeps
 * it there, so both sides of the comparison are UTC midnight values that
 * disagree only about which calendar produced them.
 *
 * THERE IS NO `draft` FLAG in the schema, and this file deliberately does not
 * invent one. A piece that is not ready gets a future date, which is the same
 * mechanism with a date attached, and the date is the thing the index and the
 * sitemap already sort on. A second, independent way to hide a page is a second
 * thing to forget to check.
 */

import type { CollectionEntry } from "astro:content";

export function isLive(data: CollectionEntry<"articles">["data"], now = new Date()): boolean {
  const todayLocal = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return data.date.valueOf() <= todayLocal;
}
