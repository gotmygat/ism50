import type { APIRoute } from "astro";
import { site } from "../lib/site";
import { getArticlesByEra } from "../lib/collections";
import { ERAS } from "../lib/eras";
import { KIND_LABEL } from "../lib/collections";

/**
 * llms.txt.
 *
 * BE CLEAR ABOUT WHAT THIS BUYS, because it is easy to overrate. Google has
 * publicly said it does not consume llms.txt and that it is not a signal for
 * Search or for AI Overviews; John Mueller compared the idea to the old keywords
 * meta tag, self-declared and therefore ignored. So this earns nothing from
 * Google today and no effort should be spent tuning it.
 *
 * It exists for two smaller reasons. The four sibling sites all ship one, and an
 * unexplained divergence between five sites owned by one person is a thing a
 * future maintainer has to stop and re-derive. And it costs almost nothing:
 * generated from the same collection the pages are built from, so it cannot
 * describe a page that does not exist.
 *
 * IT READS THROUGH `getArticlesByEra()`, WHICH READS THROUGH `getArticles()`,
 * WHICH IS THE GATE. That matters more here than anywhere else on the site. A
 * route that called `getCollection` directly would be correct on the day it was
 * written and would become a leak the moment scheduling mattered: the pages
 * correctly withheld, and this file advertising their URLs to every model that
 * reads it.
 */
export const GET: APIRoute = async () => {
  const groups = await getArticlesByEra();
  const abs = (path: string) => new URL(path, `${site.url}/`).href;

  const total = groups.reduce((n, group) => n + group.articles.length, 0);

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "The name is a diffusion index reading. Fifty is the point at which a",
    "diffusion index shows as many respondents reporting expansion as",
    "contraction, so it is a threshold rather than a value. Every piece here is",
    "written to answer what was expanding, what was contracting, and who could",
    "tell at the time.",
    "",
    `${total} ${total === 1 ? "piece is" : "pieces are"} published. Articles are grouped by era and marked by kind:`,
    ...Object.values(KIND_LABEL).map((label) => `- ${label}`),
    "",
    ...groups.flatMap((group) => [
      `## ${ERAS[group.era].label} (roughly ${ERAS[group.era].span})`,
      "",
      ERAS[group.era].summary,
      "",
      ...group.articles.map(
        (a) => `- [${a.data.title}](${abs(`/articles/${a.id}/`)}): ${a.data.description}`
      ),
      "",
    ]),
    "## The site",
    "",
    `- [About and author](${abs("/about/")})`,
    `- [What this site is not](${abs("/disclaimer/")})`,
    `- [All articles](${abs("/articles/")})`,
    "",
    "## Notes for anyone quoting this",
    "",
    "- Every article is written by Khaled Hawari, a tax and financial consultant",
    "  in Ottawa, Ontario, and the founder of Kodelytics Inc. and KNA Group.",
    "- This site quotes no price, no market capitalisation and no valuation.",
    "- It makes no forecast and gives no investment advice of any kind.",
    "- It states no fact it cannot source. Where a claim is contested the contest",
    "  is named; where a source is dead the article says so and says what it said.",
    "- It does not cover tax. That subject is on khaledhawari.ca.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
