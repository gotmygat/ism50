/**
 * =============================================================================
 * THE SUBJECT GATE. What this site is allowed to say.
 * =============================================================================
 *
 * Four rules, all of them mechanical, all of them enforced against the SHIPPED
 * HTML and, where it can be located, against the source file and line:
 *
 *   1. NO CANADIAN CRYPTO TAX VOCABULARY. That subject belongs to
 *      khaledhawari.ca. This is the rule this file mostly exists for.
 *   2. NO INVESTMENT ADVICE AND NO RECOMMENDATION LANGUAGE.
 *   3. NO PROFESSIONAL DESIGNATION CLAIM, in any spelling.
 *   4. NO DENIAL OR DISAMBIGUATION LANGUAGE about the author's name.
 *
 *   node scripts/verify-subject.mjs
 *
 * -----------------------------------------------------------------------------
 * RULE 1, AND WHY IT IS A BUILD FAILURE RATHER THAN A STYLE NOTE
 * -----------------------------------------------------------------------------
 *
 * In August 2026, khaledhawari.ca fell off page one for its owner's own name.
 * The cause was not a penalty and not a competitor. It was that two domains the
 * same person owns were offering themselves as the answer to one query, so
 * Google kept one and filtered the rest, and the one it filtered was the tax
 * practice. That is documented in khaledhawari-com/src/lib/seo.ts and it is what
 * scripts/seo-doctor/lib/checks.mjs on kna-group.com was built to detect.
 *
 * khaledhawari.ca has, today, roughly thirty articles specifically about
 * Canadian crypto tax: the adjusted cost base, T1135, superficial losses,
 * GST/HST on crypto payments, staking and airdrops, what exchanges report to the
 * CRA. It already ranks for them. Those pages are the practice's actual funnel.
 *
 * ism50.com is about what HAPPENED. khaledhawari.ca is about what you OWE. The
 * split is clean because the subjects genuinely are, and the moment a piece here
 * ends with "and here is how it is taxed in Canada", this domain starts
 * competing with the one that already ranks, over a query worth money, and the
 * mechanism above does the rest. It does not have to be a whole article. One
 * paragraph on one page is enough for two URLs to be candidates for one query.
 *
 * So the vocabulary is banned rather than discouraged, and the failure message
 * names the incident, because a future author who trips this needs to understand
 * the rule rather than route around it. If you are reading this because the
 * build just failed: the fix is to CUT the tax paragraph, not to reword it. If
 * the point genuinely needs making, it is an article on khaledhawari.ca, and
 * this page can link to it.
 *
 * -----------------------------------------------------------------------------
 * WHY THE BAN LIST IS TIERED INSTEAD OF BEING ONE BIG ARRAY
 * -----------------------------------------------------------------------------
 *
 * The list was built by reading what khaledhawari.ca actually publishes rather
 * than by imagining what tax writing looks like, and that reading turned up the
 * thing that would have broken this check on its first run:
 *
 *   THE WORD "AUDIT" APPEARS 122 TIMES IN .ca's CRYPTO CONTENT AND ROUGHLY FIVE
 *   OF THOSE ARE THE CRA. The rest are SMART CONTRACT AUDITS. A naive ban on
 *   "audit" would make it impossible to write the history of DeFi at all, which
 *   is a subject this site must cover.
 *
 * The same trap is set by "return" (rate of return, a function that returns
 * true, an output that returns to the sender), "assessment" (a risk assessment),
 * "election" (a DAO governance election, validator election), "penalty" (a
 * slashing penalty), "capital" (venture capital), "income" (protocol revenue),
 * "interest" (an interest rate, and a substring of "interesting"), "compliance"
 * (FINTRAC and the travel rule are genuine crypto history) and "filing" (an SEC
 * filing, a bankruptcy filing, which this site quotes constantly).
 *
 * So there are three tiers:
 *
 *   TIER 1  UNAMBIGUOUS. Strings that can only mean Canadian tax compliance.
 *           Banned outright.
 *   TIER 2  COMPOUND. A word that is innocent alone and damning in a phrase.
 *           The phrase is banned; the word is not.
 *   TIER 3  DELIBERATELY ALLOWED. Words that look like tax vocabulary, are not,
 *           and are listed here BY NAME with the reason, so that the next person
 *           to widen this list can see they were considered and rejected rather
 *           than missed.
 *
 * -----------------------------------------------------------------------------
 * WHAT IS EXCLUDED FROM THE SCAN, AND WHY
 * -----------------------------------------------------------------------------
 *
 * Code blocks, hexadecimal strings and long base58 runs. A transaction hash, a
 * contract address or an EIP number contains arbitrary character sequences, and
 * a case-insensitive short token like "acb" or "t1" matches inside them
 * constantly. Every short-token pattern below is therefore case-SENSITIVE and
 * word-bounded, and the extraction strips code before matching.
 *
 * URLs. A citation to canada.ca is a legitimate source reference and its path
 * contains "income-tax-folios". Banning a link the article never quotes would
 * punish the one habit this site most needs to keep.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { createReporter, isIndexable, loadAllPages } from "./lib/dist.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* ========================================================================== */
/* TIER 1. UNAMBIGUOUS CANADIAN TAX VOCABULARY.                               */
/* ========================================================================== */

/**
 * Each of these can only mean Canadian tax compliance. There is no reading of
 * "T1135" or "superficial loss" that belongs in a history of Ethereum.
 *
 * The form numbers are case-SENSITIVE and word-bounded on purpose: lowercase
 * "t1" and "acb" occur inside transaction hashes and slugs, and an unbounded
 * "T1" matches inside "T1135" and would report the same line twice.
 */
const TAX_UNAMBIGUOUS = [
  // The identity of the tax authority itself.
  { label: "CRA", pattern: /\bCRA\b/ },
  { label: "Canada Revenue Agency", pattern: /Canada Revenue Agency/i },
  { label: "Revenu Quebec", pattern: /Revenu Qu[eé]bec/i },
  { label: "Income Tax Act", pattern: /Income Tax Act/i },
  { label: "income tax folio", pattern: /income tax folio/i },
  { label: "Interpretation Bulletin", pattern: /Interpretation Bulletin/i },

  // Forms and schedules.
  { label: "T1135", pattern: /\bT1135\b/ },
  { label: "T2125", pattern: /\bT2125\b/ },
  { label: "T5008", pattern: /\bT5008\b/ },
  { label: "T1A", pattern: /\bT1A\b/ },
  { label: "T4002", pattern: /\bT4002\b/ },
  { label: "T4037", pattern: /\bT4037\b/ },
  { label: "Schedule 3", pattern: /\bSchedule 3\b/ },

  // Cost and gain machinery.
  { label: "adjusted cost base", pattern: /adjusted cost base/i },
  { label: "ACB", pattern: /\bACB\b/ },
  { label: "superficial loss", pattern: /superficial loss(es)?/i },
  { label: "deemed disposition", pattern: /deemed disposition/i },
  { label: "proceeds of disposition", pattern: /proceeds of disposition/i },
  { label: "taxable capital gain", pattern: /taxable capital gains?/i },
  { label: "allowable capital loss", pattern: /allowable capital loss(es)?/i },
  { label: "net capital loss", pattern: /net capital loss(es)?/i },
  { label: "inclusion rate", pattern: /inclusion rate/i },
  { label: "capital cost allowance", pattern: /capital cost allowance/i },
  { label: "adventure in the nature of trade", pattern: /adventure in the nature of trade/i },

  // Sales tax.
  { label: "GST/HST", pattern: /\bGST\s?\/\s?HST\b/i },
  { label: "input tax credit", pattern: /input tax credits?/i },
  { label: "zero-rated supply", pattern: /zero[- ]rated suppl(y|ies)/i },
  { label: "exempt supply", pattern: /exempt suppl(y|ies)/i },
  { label: "small supplier", pattern: /small supplier/i },

  // Registered accounts. On a Canadian tax site these are the whole subject.
  { label: "RRSP", pattern: /\bRRSPs?\b/ },
  { label: "TFSA", pattern: /\bTFSAs?\b/ },
  { label: "FHSA", pattern: /\bFHSAs?\b/ },
  { label: "RESP", pattern: /\bRESPs?\b/ },
  { label: "RDSP", pattern: /\bRDSPs?\b/ },

  // Filing and assessment machinery.
  { label: "specified foreign property", pattern: /specified foreign property/i },
  { label: "notice of assessment", pattern: /notice of assessment/i },
  { label: "reassessment", pattern: /reassess(ment|ments|ed|es)?\b/i },
  { label: "Voluntary Disclosures Program", pattern: /voluntary disclosures? program|\bVDP\b/i },
  { label: "gross negligence penalty", pattern: /gross negligence/i },
  { label: "source deductions", pattern: /source deductions?/i },
  { label: "attribution rules", pattern: /attribution rules?/i },
  { label: "spousal rollover", pattern: /spousal rollover/i },
  { label: "taxpayer", pattern: /\btaxpayers?\b/i },
  { label: "tax loss harvesting", pattern: /tax[- ]loss harvesting/i },
  { label: "taxable event", pattern: /taxable events?/i },
];

/* ========================================================================== */
/* TIER 2. COMPOUNDS. Innocent word, damning phrase.                          */
/* ========================================================================== */

/**
 * Every entry here exists because the bare word is legitimate on this site and
 * the phrase is not. The comment on each group names the innocent use that
 * stopped the bare word being banned.
 */
const TAX_COMPOUND = [
  /* "capital" is venture capital, working capital, capital markets, capital
     efficiency. The compounds below are the Income Tax Act's. */
  { label: "capital gain(s)", pattern: /\bcapital gains?\b/i },
  { label: "capital loss(es)", pattern: /\bcapital loss(es)?\b/i },
  { label: "capital account", pattern: /\bcapital account\b/i },
  { label: "capital property", pattern: /\bcapital property\b/i },

  /* "income" is protocol revenue, fee income to a validator, the income a
     miner earns. These four are tax characterisation. */
  { label: "business income", pattern: /\bbusiness income\b/i },
  { label: "employment income", pattern: /\bemployment income\b/i },
  { label: "investment income", pattern: /\binvestment income\b/i },
  { label: "income account", pattern: /\bincome account\b/i },

  /* "audit" is a SMART CONTRACT audit and is core vocabulary here. See Tier 3. */
  { label: "CRA audit", pattern: /\bCRA audit|\btax audit|audited by the CRA/i },

  /* "return" is a rate of return, a function's return value, an output that
     returns to the sender. A TAX return is a filing. */
  { label: "tax return", pattern: /\b(income )?tax returns?\b/i },
  { label: "filing a return", pattern: /fil(e|ed|ing) (a|your|their|the) return/i },

  /* "filing" is an SEC filing and a bankruptcy filing, both of which this site
     quotes constantly. */
  { label: "tax filing", pattern: /\btax filings?\b/i },
  { label: "late filing", pattern: /late[- ]filing/i },

  /* "reporting" is FINTRAC reporting, CARF, the travel rule. All real history. */
  { label: "tax reporting", pattern: /\btax reporting\b/i },
  { label: "reporting obligation", pattern: /reporting obligations?\b/i },

  /* "compliance" is FINTRAC and MSB registration, which is genuine history. */
  { label: "tax compliance", pattern: /\btax compliance\b/i },

  /* "deduction" could be a logical one. These are not. */
  { label: "tax deduction", pattern: /\btax deductions?\b/i },
  { label: "deductible expense", pattern: /deductible expenses?/i },

  /* "treatment" and "advice" only matter beside "tax". */
  { label: "tax treatment", pattern: /\btax treatment\b/i },
  { label: "tax professional", pattern: /\btax professionals?\b/i },
  { label: "tax obligations", pattern: /\btax obligations?\b/i },
  { label: "tax year", pattern: /\btax years?\b/i },
  { label: "tax liability", pattern: /\btax liabilit(y|ies)\b/i },
  { label: "crypto tax", pattern: /\bcrypto(currency)?[- ]tax\b/i },

  /* "fair market value" is near enough unambiguous on .ca (59 uses, all tax)
     but it is genuinely used in valuation writing, so it is here rather than in
     Tier 1 and it is the phrase rather than the words. */
  { label: "fair market value", pattern: /fair market value/i },

  /* "barter" has a real economic-history meaning. The CRA's rule does not. */
  { label: "barter transaction", pattern: /barter (transaction|rule)/i },

  /* "record keeping" on .ca is always the ACB record. On a history site the
     phrase "the record" is everywhere, so only the compliance compound is
     banned. */
  { label: "record retention", pattern: /record retention/i },
];

/* ========================================================================== */
/* TIER 3. CONSIDERED AND DELIBERATELY NOT BANNED.                            */
/* ========================================================================== */

/**
 * THIS LIST IS DOCUMENTATION, NOT CODE. Nothing reads it. It is here so that the
 * next person who widens the ban list can see that these were looked at, why
 * they were left out, and what would break if they were added. A gate that
 * cannot explain its own holes gets widened by somebody in a hurry and then
 * quietly disabled by somebody else.
 *
 *   audit          A SMART CONTRACT AUDIT. 122 uses on .ca's crypto pages and
 *                  roughly five are the CRA. Banning it makes the history of
 *                  DeFi unwritable. Only "CRA audit" and "tax audit" are banned.
 *   return         Rate of return; a function that returns; an output that
 *                  returns to the sender. Only "tax return" is banned.
 *   assessment     A risk assessment, a security assessment. Only "notice of
 *                  assessment" and "reassessment" are banned.
 *   election       A DAO governance election, a validator election. On .ca it is
 *                  always the 39(4) election, but the bare word is not ours to
 *                  take. Nothing is banned.
 *   penalty        A SLASHING penalty is proof-of-stake vocabulary. Only "gross
 *                  negligence" is banned.
 *   interest       An interest rate; an interest in a venture; and a substring
 *                  of "interesting". Nothing is banned.
 *   capital        Venture capital, capital markets, capital efficiency. Only
 *                  the ITA compounds are banned.
 *   income         Protocol revenue, validator income. Only the ITA compounds.
 *   compliance     FINTRAC, MSB registration and the travel rule are crypto
 *                  history. Only "tax compliance" is banned.
 *   filing         An SEC filing, a bankruptcy filing, a Chapter 11 filing.
 *                  This site quotes those constantly. Only "tax filing".
 *   disposal       Electronic waste from mining rigs is a real subject.
 *   instalment     "The next instalment" is ordinary English.
 *   cost basis     A United States term. Banning it would not protect .ca, which
 *                  writes "cost base", and would block writing about US markets.
 *   HODL           A real artefact of crypto history, from a 2013 forum post. It
 *                  is a primary source, not a recommendation.
 *   disposition    Every one of the 217 uses on .ca is tax, so this was close to
 *                  Tier 1. It is left out because it is an ordinary English word
 *                  and a false positive here would be unexplainable. The
 *                  compounds that matter ("deemed disposition", "proceeds of
 *                  disposition") are banned in Tier 1.
 */
export const CONSIDERED_AND_ALLOWED = [
  "audit",
  "return",
  "assessment",
  "election",
  "penalty",
  "interest",
  "capital",
  "income",
  "compliance",
  "filing",
  "disposal",
  "instalment",
  "cost basis",
  "HODL",
  "disposition",
];

/* ========================================================================== */
/* RULE 2. INVESTMENT ADVICE AND RECOMMENDATION LANGUAGE.                     */
/* ========================================================================== */

/**
 * Google treats financial content as YMYL and holds it to a higher standard, and
 * the whole point of this estate is one man's professional reputation. A history
 * site that starts telling readers what to buy is a different site with a worse
 * risk profile.
 *
 * SCOPED TIGHTLY TO ADVISORY AND VALUATION CONSTRUCTIONS, because the plain
 * verbs are unavoidable here. This site must be free to write "the price fell",
 * "traders bought", "the fund sold its position" and "the exchange held customer
 * assets", none of which is advice. What is banned is a judgement about what a
 * thing is worth, a prediction, or an instruction to a reader.
 *
 * NEGATION-AWARE, like the designation gate below, and for the same reason: the
 * disclaimer page exists precisely to say that none of this is investment
 * advice, so it contains the phrase by design. A gate that could not tell "is
 * investment advice" from "is not investment advice" would force the disclaimer
 * to be deleted in order to pass, which inverts the rule it enforces.
 */
const ADVICE_PATTERNS = [
  { label: "valuation judgement", pattern: /\b(under|over)valued\b/i },
  { label: "price target", pattern: /\bprice targets?\b/i },
  { label: "buying opportunity", pattern: /\bbuy(ing)? opportunit(y|ies)\b/i },
  { label: "reader instruction", pattern: /\b(you|readers?|investors?) should (buy|sell|hold|invest|allocate|avoid)\b/i },
  { label: "first-person recommendation", pattern: /\b(we|I) (recommend|advise)\b/i },
  { label: "do your own research", pattern: /do your own research/i },
  { label: "investment advice", pattern: /\b(investment|financial|trading) advice\b/i },
  { label: "guaranteed return", pattern: /guaranteed returns?/i },
  { label: "risk-free", pattern: /\brisk[- ]free\b/i },
  { label: "price prediction", pattern: /\bwill (be worth|reach|hit|go to|top)\b/i },
  { label: "momentum forecast", pattern: /\b(poised|set|due) (to|for) (a )?(rise|rally|surge|crash|correction|breakout)\b/i },
  { label: "to the moon", pattern: /\bto the moon\b/i },
];

/* ========================================================================== */
/* RULE 3. PROFESSIONAL DESIGNATION CLAIMS.                                   */
/* ========================================================================== */

/**
 * No designation claim may appear anywhere on this site, in any spelling. He
 * holds none, and an accidental one in body copy or in a frontmatter field is a
 * regulated claim rather than a typo.
 *
 * Written as patterns rather than as a word list because "CPA" appears inside
 * ordinary words and a bare substring search would fail on "CPAs" and pass on
 * "C.P.A.". The boundaries are what separate the two.
 */
const DESIGNATION_PATTERNS = [
  { label: "CPA", pattern: /\bCPAs?\b/ },
  { label: "C.P.A.", pattern: /\bC\.\s?P\.\s?A\.?/ },
  { label: "Chartered Professional Accountant", pattern: /chartered professional accountant/i },
  { label: "Chartered Accountant", pattern: /\bchartered accountants?\b/i },
  { label: "Certified Public Accountant", pattern: /certified public accountant/i },
  { label: "CFA", pattern: /\bCFAs?\b/ },
  { label: "Chartered Financial Analyst", pattern: /chartered financial analyst/i },
];

/* ========================================================================== */
/* RULE 4. DENIAL AND DISAMBIGUATION LANGUAGE.                                */
/* ========================================================================== */

/**
 * ABSOLUTE, AND NOT NEGATION-AWARE, BECAUSE THERE IS NO SAFE WORDING.
 *
 * Two people share the author's name. Publishing any sentence that distinguishes
 * him from the other one creates the association in our own words, on a domain
 * we control, and indexes it permanently. The strategy is positive only: never
 * argue that he is not someone, make it overwhelmingly clear who he is.
 *
 * These phrases cannot be anything else. An article about a 2014 exchange
 * failure legitimately contains "court", "charges" and "fraud"; it does not
 * contain "not to be confused with". Precision matters more than recall here,
 * because a check that cries wolf on legitimate copy gets ignored, and this is
 * the one check that must never be ignored.
 *
 * The list is kept in step with DENIAL_PATTERNS in
 * kna-group/scripts/seo-doctor/lib/config.mjs, which checks the same thing
 * against the four live sites. This one checks it before it can ship.
 */
const DENIAL_PATTERNS = [
  { label: "not to be confused", pattern: /not to be confused/i },
  { label: "should not be confused", pattern: /should not be confused/i },
  { label: "another person of the same name", pattern: /another (?:person|individual) (?:of|with) the same name/i },
  { label: "shares a name with", pattern: /(?:shares|share) (?:a|the same) name with/i },
  { label: "is not the same person", pattern: /is not the same (?:person|individual|man)\b/i },
  { label: "for the avoidance of doubt", pattern: /for the avoidance of doubt/i },
  { label: "disambiguation", pattern: /disambiguat\w* (?:from|note|page)/i },
];

/* ========================================================================== */
/* RULE 5. THE PARENTHESIS TRAP.                                              */
/* ========================================================================== */

/**
 * "Khaled (Kal) Hawari" contains NEITHER "Khaled Hawari" NOR "Kal Hawari" as a
 * contiguous phrase anyone can search for. In prose, a title, a heading, a
 * description or a byline it spends a mention and buys nothing, which on a site
 * whose entire job is to make one exact string resolve to one person is a real
 * cost rather than a stylistic quibble.
 *
 * IT IS CORRECT IN `alternateName` and only there, because an alias list is a
 * declaration rather than prose and that rendering genuinely exists in the wild.
 * This check therefore reads the VISIBLE TEXT and the head metadata, never the
 * JSON-LD, so the frozen alias array passes and a heading does not.
 */
const PARENTHESIS_TRAP = /Khaled\s*[("“']\s*Kal\s*[)"”']\s*Hawari/i;

/* ========================================================================== */
/* EXTRACTION                                                                 */
/* ========================================================================== */

/**
 * Strip everything that would produce a false positive, then collapse.
 *
 * ORDER MATTERS. Script, style, pre and code go first, so a fenced code block
 * containing a contract address is gone before the hex stripper runs. Attributes
 * go with the tags, so a class name or a data attribute cannot trip a gate.
 */
function visibleText(html) {
  return (
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      /* Code is quoted material. A contract address, a hash and an EIP number
         all contain arbitrary character runs, and a short token like ACB or
         T1135 matches inside them. */
      .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
      .replace(/<code[\s\S]*?<\/code>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;|&#\d+;/gi, " ")
      /* Hex and long base58 runs that survived, e.g. an address written inline
         as plain prose. */
      .replace(/\b0x[0-9a-fA-F]{6,}\b/g, " ")
      .replace(/\b[1-9A-HJ-NP-Za-km-z]{26,}\b/g, " ")
      /* URLs. A canada.ca citation path contains "income-tax-folios", and a
         source reference is the one habit this site most needs to keep. */
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/\s+/g, " ")
  );
}

/** The same treatment for a markdown source file. */
function visibleSource(text) {
  return (
    text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`\n]*`/g, " ")
      .replace(/\b0x[0-9a-fA-F]{6,}\b/g, " ")
      .replace(/\b[1-9A-HJ-NP-Za-km-z]{26,}\b/g, " ")
      .replace(/https?:\/\/\S+/g, " ")
  );
}

/** Words that turn a mention into a denial rather than a claim. */
const NEGATION = /\b(no|not|nothing|never|neither|nor|without|cannot|does not|is not|are not|do not)\b/i;

/** The sentence a match sits in, so the negation test has something to read. */
function sentenceAround(text, index) {
  const start = Math.max(0, text.lastIndexOf(".", index - 1) + 1);
  const dot = text.indexOf(".", index);
  const end = dot === -1 ? text.length : dot + 1;
  return text.slice(start, end).trim();
}

/** Every match of one pattern in one body of text, with its sentence. */
function* matches(text, pattern) {
  const global = new RegExp(pattern.source, `${pattern.flags.replace("g", "")}g`);
  let hit;
  while ((hit = global.exec(text))) {
    yield { text: hit[0], index: hit.index, sentence: sentenceAround(text, hit.index) };
    if (hit.index === global.lastIndex) global.lastIndex += 1;
  }
}

/* ========================================================================== */
/* THE MESSAGES                                                               */
/* ========================================================================== */

const TAX_EXPLANATION =
  "\n" +
  "      WHY THIS FAILS THE BUILD. ism50.com does not write about Canadian crypto\n" +
  "      tax. That subject belongs to khaledhawari.ca, which already has roughly\n" +
  "      thirty articles on it and already ranks for them.\n" +
  "\n" +
  "      This is not a style rule. In August 2026 khaledhawari.ca fell off page\n" +
  "      one for its owner's own name because two domains he owns were offering\n" +
  "      themselves as the answer to one query. Google kept one and filtered the\n" +
  "      rest, and the one it filtered was the tax practice. One paragraph on one\n" +
  "      page is enough to make two URLs candidates for one query.\n" +
  "\n" +
  "      THE FIX IS TO CUT THE PARAGRAPH, NOT TO REWORD IT. If the point genuinely\n" +
  "      needs making it is an article on khaledhawari.ca, and this page can link\n" +
  "      to it. ism50 is what happened; khaledhawari.ca is what you owe.\n" +
  "\n" +
  "      If you believe the term is innocent here, read Tier 3 at the top of\n" +
  "      scripts/verify-subject.mjs first. Several words that look like tax\n" +
  "      vocabulary are deliberately allowed, with reasons, and the list of what\n" +
  "      is banned was built by reading what khaledhawari.ca actually publishes.";

const ADVICE_EXPLANATION =
  "\n" +
  "      This site publishes history, not a newsletter. It states no view on what\n" +
  "      anything is worth, makes no forecast, and tells no reader what to do.\n" +
  "      Google treats financial content as YMYL and holds it to a higher\n" +
  "      standard, and the author's professional reputation is the entire point\n" +
  "      of publishing at all. Describe what happened and what the record says.";

/* ========================================================================== */
/* THE RUN                                                                    */
/* ========================================================================== */

const report = createReporter("verify:subject");

/** Files under content/, for the source pass that can report a line number. */
async function contentFiles(dir = resolve(ROOT, "content"), out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await contentFiles(full, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const ALL_RULES = [
  { rules: TAX_UNAMBIGUOUS, kind: "crypto tax vocabulary", negationAware: false, explain: TAX_EXPLANATION },
  { rules: TAX_COMPOUND, kind: "crypto tax vocabulary", negationAware: false, explain: TAX_EXPLANATION },
  { rules: ADVICE_PATTERNS, kind: "investment advice", negationAware: true, explain: ADVICE_EXPLANATION },
  {
    rules: DESIGNATION_PATTERNS,
    kind: "professional designation claim",
    negationAware: true,
    explain:
      "\n      He holds no accounting or analyst designation. An accidental claim is a\n" +
      "      regulated statement rather than a typo. A DENIAL is allowed, which is\n" +
      "      why the disclaimer page passes.",
  },
  {
    rules: DENIAL_PATTERNS,
    kind: "denial or disambiguation language",
    negationAware: false,
    explain:
      "\n      Two people share the author's name, and any sentence distinguishing him\n" +
      "      from the other creates the association in our own words, on a domain we\n" +
      "      control, and indexes it permanently. There is no safe wording. The\n" +
      "      strategy is positive only: never argue he is not someone, make it\n" +
      "      overwhelmingly clear who he is. Delete the sentence.",
  },
];

/* --- pass one: the source, because it can name a file and a line ---------- */

let sourceScanned = 0;
for (const file of await contentFiles()) {
  const raw = await readFile(file, "utf8");
  const where = relative(ROOT, file).split(sep).join("/");
  sourceScanned += 1;

  const lines = raw.split("\n");
  for (const [i, rawLine] of lines.entries()) {
    const line = visibleSource(rawLine);
    for (const group of ALL_RULES) {
      for (const rule of group.rules) {
        for (const hit of matches(line, rule.pattern)) {
          if (group.negationAware && NEGATION.test(line)) continue;
          report.error(
            `${where}:${i + 1}`,
            `${group.kind} (${rule.label}), found "${hit.text}"\n      ${line.trim().slice(0, 140)}${group.explain}`
          );
        }
      }
    }
  }
}

/* --- pass two: the shipped HTML, which is authoritative ------------------- */

const pages = (await loadAllPages()).filter(isIndexable);

for (const page of pages) {
  const where = page.route;
  const text = visibleText(page.html);
  /* The head metadata is checked with the body, because a title or a
     description is the most visible copy on the page and the least likely to be
     re-read after it is written. */
  const withMeta = `${page.title ?? ""}. ${page.description ?? ""}. ${text}`;

  for (const group of ALL_RULES) {
    for (const rule of group.rules) {
      for (const hit of matches(withMeta, rule.pattern)) {
        if (group.negationAware && NEGATION.test(hit.sentence)) continue;
        report.error(
          where,
          `${group.kind} (${rule.label}), found "${hit.text}"\n      "${hit.sentence.slice(0, 180)}"${group.explain}`
        );
      }
    }
  }

  if (PARENTHESIS_TRAP.test(withMeta)) {
    report.error(
      where,
      'the parenthesised name form appears in visible copy or in the head metadata.\n' +
        '      "Khaled (Kal) Hawari" contains NEITHER "Khaled Hawari" NOR "Kal Hawari" as a\n' +
        "      contiguous phrase, so it spends a mention and buys nothing. Write the two\n" +
        "      names in separate sentences. The alias list in the JSON-LD is the one place\n" +
        "      the parenthesised form belongs, and this check does not read it."
    );
  }
}

console.log(
  `verify:subject scanned ${sourceScanned} content file${sourceScanned === 1 ? "" : "s"} and ${pages.length} built page${pages.length === 1 ? "" : "s"}`
);
console.log(
  `verify:subject ${TAX_UNAMBIGUOUS.length} unambiguous tax terms, ${TAX_COMPOUND.length} tax compounds, ${CONSIDERED_AND_ALLOWED.length} lookalikes deliberately allowed`
);

process.exit(report.finish(pages.length));
