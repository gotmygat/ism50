/**
 * The six eras, and the reading copy for each.
 *
 * THE ORDER IS CHRONOLOGICAL AND IT IS THE ONLY ORDER ANY SURFACE USES. An index
 * that runs one way and a footer that runs the other reads as two sites.
 *
 * THE RANGES SAY "ROUGHLY" AND THEY MEAN IT. Era boundaries in crypto are
 * contested and most of the confident ones you will read were invented after the
 * fact by whoever was writing the retrospective. This site does not assert a
 * contested boundary as a fact, so each era is defined by WHAT WAS HAPPENING and
 * the years are an approximate aid to the reader rather than a claim. A piece
 * that needs a hard date puts the date in the prose, next to the source it came
 * from.
 *
 * `direction` IS THE ONE PLACE THE SITE'S OWN THESIS IS STATED IN DATA, and it
 * is deliberately not a number. Calling an era "58.4" would be inventing a
 * reading, and this site does not invent figures. It records which way the thing
 * that mattered in that period was moving, which is the question every piece on
 * the site is supposed to be able to answer.
 */

export const ERA_ORDER = [
  "origins",
  "earlyExchange",
  "icoEra",
  "defiSummer",
  "institutional",
  "postFtx",
] as const;

export type Era = (typeof ERA_ORDER)[number];

export interface EraCopy {
  /** The label used in a chip, an index heading and the breadcrumb. */
  label: string;
  /** Approximate years. Rendered with the word "roughly" beside it. */
  span: string;
  /** One sentence. What defines the period, not what happened in it. */
  summary: string;
  /**
   * Which way the thing that mattered was moving. Drives one accent colour and
   * nothing else. `expansion` and `contraction` are the two directions a
   * diffusion index can point; `mixed` is the honest answer for a period that
   * genuinely did both at once, and it is used sparingly for that reason.
   */
  direction: "expansion" | "contraction" | "mixed";
}

export const ERAS: Record<Era, EraCopy> = {
  origins: {
    label: "Origins",
    span: "2008 to 2011",
    summary:
      "A paper, a mailing list and a client nobody was using yet. Almost everything from this period survives as a document, which is why it is the best documented era and the one most often misquoted.",
    direction: "expansion",
  },
  earlyExchange: {
    label: "Early exchange",
    span: "2011 to 2014",
    summary:
      "The first places to buy the thing, and the first places to lose it. Custody arrived years before anybody had worked out what custody meant.",
    direction: "mixed",
  },
  icoEra: {
    label: "The token sale era",
    span: "2016 to 2018",
    summary:
      "Programmable issuance met an audience with no way to price it. This is where the gap between what a document promised and what a contract did became the whole story.",
    direction: "expansion",
  },
  defiSummer: {
    label: "On-chain finance",
    span: "2019 to 2021",
    summary:
      "Market structure rebuilt as public code: pools instead of books, incentives instead of intermediaries, and a new class of failure that nobody had a name for yet.",
    direction: "expansion",
  },
  institutional: {
    label: "Institutional arrival",
    span: "2020 to 2022",
    summary:
      "Balance sheets, funds and regulated wrappers. The interesting question is not that institutions arrived, it is what they were and were not willing to hold directly.",
    direction: "mixed",
  },
  postFtx: {
    label: "After the collapse",
    span: "2022 onward",
    summary:
      "A sequence of failures that were reported as market events and turned out, in the filings, to be bookkeeping. The record here is unusually good because so much of it went through a court.",
    direction: "contraction",
  },
};

/** The label shown on a chip and in a meta row. */
export const eraLabel = (era: Era): string => ERAS[era].label;
