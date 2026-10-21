import {
  FRAGRANCE_FAMILIES,
  type FragranceFamily,
} from "@/config/fragranceFamilies.config";

/* Compiled once: one whole-word regex per family (optional plural suffix). */
const MATCHERS: ReadonlyArray<readonly [FragranceFamily, RegExp]> = (
  Object.entries(FRAGRANCE_FAMILIES) as [FragranceFamily, readonly string[]][]
).map(([family, words]) => [
  family,
  new RegExp(`\\b(?:${words.join("|")})(?:s|es)?\\b`, "i"),
]);

/** Fragrance families whose keywords appear in `text` (may be empty). */
export function getFragranceFamilies(text: string): FragranceFamily[] {
  if (!text) return [];
  return MATCHERS.filter(([, re]) => re.test(text)).map(([family]) => family);
}

/** True when the two texts share at least one fragrance family. */
export function sharesFragranceFamily(a: string, b: string): boolean {
  const first = getFragranceFamilies(a);
  if (first.length === 0) return false;
  const second = new Set(getFragranceFamilies(b));
  return first.some((family) => second.has(family));
}
