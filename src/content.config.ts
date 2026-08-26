/**
 * Content collections.
 *
 * THIS FILE IS A CONTRACT, NOT A PREFERENCE. Several authors are writing against
 * it in parallel and a 365-piece plan is being built against it elsewhere. The
 * templates in src/pages read exactly these field names and nothing else. A
 * field renamed here without the templates and the authors moving with it does
 * not degrade gracefully, it fails the build, which is the correct outcome and
 * the reason the schema is strict.
 *
 * THE SHAPE IS FROZEN. It was agreed before any of the writing started so that
 * work could happen in parallel, and it is written out in the site brief in the
 * same words. If it genuinely has to change, it changes for everybody at once,
 * in one commit, with the writers told.
 *
 * WHY THE CAPS ARE WHERE THEY ARE.
 *
 * `seoTitle` is the complete <title> element, capped at 62 characters because
 * that is roughly where Google truncates a title in a desktop result, and a
 * truncated title throws away the words at the end, which are usually the
 * differentiating ones. Nothing is appended to it at render time, so what an
 * author writes is what ships. `title` is the on-page H1 and is uncapped,
 * because a heading is read on a page rather than in a list of ten.
 *
 * `description` is capped at 158 for the same reason, one notch under the point
 * where the snippet gets cut.
 *
 * Both are enforced a SECOND time, against the shipped HTML, by
 * scripts/verify-content.mjs. That is not redundant: this schema checks what an
 * author wrote, and that script checks what the browser receives, and the two
 * have diverged on every site that only checked one of them.
 */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const SEO_TITLE_MAX = 62;
const DESCRIPTION_MAX = 158;

/**
 * The six eras. A CLOSED SET, and the closure is the point.
 *
 * The whole site is one argument: fifteen years of crypto is a sequence of
 * things crossing the line between expansion and contraction, in both
 * directions. An era is which crossing a piece sits inside. An open string field
 * would quietly grow a seventh era, an eighth, and a typo, and the argument
 * would stop being an argument and become a tag cloud.
 *
 * The names are deliberately about what was happening rather than about a year
 * range, because the boundaries are contested and this site does not assert a
 * contested boundary as a fact. src/lib/eras.ts carries the reading copy.
 */
const ERAS = ["origins", "earlyExchange", "icoEra", "defiSummer", "institutional", "postFtx"] as const;

/**
 * The five shapes a piece can take. Also closed, for the same reason.
 *
 *   timeline       what happened, in order, with dates that can be checked
 *   postmortem     something failed; what failed, and what the record shows
 *   explainer      a mechanism, explained so it stays true in three years
 *   primarySource  a reading of one document, quoted and located
 *   profile        a person or an organisation, and what they actually did
 *
 * A reader who has read one of each knows what to expect from the sixth, which
 * is worth more than the freedom to invent a sixth shape.
 */
const KINDS = ["timeline", "postmortem", "explainer", "primarySource", "profile"] as const;

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/articles" }),
  schema: z.object({
    /** The on-page H1. Uncapped. */
    title: z.string().min(3, "title is required"),

    /**
     * The complete <title>. Nothing is appended to it.
     *
     * IT MUST LEAD WITH THE SUBJECT, NEVER WITH A PERSON'S NAME. That rule is
     * not enforceable in a Zod schema and it is enforced by
     * scripts/verify-subject.mjs and by `npm run estate:titles` instead. See
     * docs/ESTATE-TITLE-CHECK.md for why: in August 2026 two of the same
     * owner's domains fronted the same name string, Google kept one and filtered
     * the rest, and the one it filtered was the tax practice.
     */
    seoTitle: z
      .string()
      .min(10, "seoTitle is too short to be useful in a search result")
      .max(SEO_TITLE_MAX, `seoTitle must be ${SEO_TITLE_MAX} characters or fewer`),

    /** The meta description, and the card copy on the index. */
    description: z
      .string()
      .min(50, "description is too short to earn a click")
      .max(DESCRIPTION_MAX, `description must be ${DESCRIPTION_MAX} characters or fewer`),

    /**
     * Publication date. Coerced, so an unquoted YAML date is accepted.
     *
     * THIS DRIVES THE PUBLICATION GATE. A date in the future means the piece is
     * absent from today's build and present in the build that runs on its date.
     * See src/lib/publication.ts.
     */
    date: z.coerce.date(),

    /** Set only when a piece is genuinely revised, never on a typo fix. */
    updated: z.coerce.date().optional(),

    author: z.string().default("Khaled Hawari"),

    era: z.enum(ERAS),
    kind: z.enum(KINDS),

    /** One sentence under the H1, above the prose. */
    lede: z.string().min(20),
  }),
});

export const collections = { articles };
