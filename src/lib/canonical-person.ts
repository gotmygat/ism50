/**
 * GENERATED FILE. Do not edit.
 *
 * Written by scripts/sync-canonical-person.mjs from docs/CANONICAL-PERSON.md,
 * which is the shared sheet every property Kal owns emits byte for byte. Edit
 * the sheet, not this file, and understand before you do that changing a value
 * here changes an identity claim on five domains at once.
 *
 * scripts/verify-schema.mjs parses the SAME sheet independently and compares it
 * against the shipped HTML, so a hand edit to this file fails the build rather
 * than shipping a fifth version of one person.
 */

/** `Person.@id`. This site REFERENCES it and never mints one of its own. */
export const CANONICAL_PERSON_ID = "https://khaledhawari.ca/#person";

/**
 * Every frozen property except `@type` and `@id`, in the sheet's order.
 *
 * Spread onto the Person node exactly as it is. Nothing here is reworded for
 * this site: `alternateName` keeps its order because the comparison between
 * domains is a byte comparison, and `mainEntityOfPage` keeps its object shape
 * because it names a node in khaledhawari.ca's graph rather than a document.
 */
export const CANONICAL_PERSON_FROZEN = {
  "name": "Khaled Hawari",
  "alternateName": [
    "Kal Hawari",
    "Khaled (Kal) Hawari",
    "Khaled Kal Hawari"
  ],
  "url": "https://khaledhawari.ca/",
  "mainEntityOfPage": {
    "@id": "https://khaledhawari.ca/#webpage"
  },
  "disambiguatingDescription": "Tax and financial consultant in Ottawa, Ontario, and the founder of Kodelytics Inc. and KNA Group."
} as const;
