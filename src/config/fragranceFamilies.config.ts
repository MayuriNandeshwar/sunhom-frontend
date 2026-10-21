/**
 * Fragrance families used to rank "You May Also Like" products.
 *
 * The public product API does not expose a fragrance-family field, so
 * families are inferred from words in a product's name, fragrance notes or
 * short description. To change how products are grouped, edit the keyword
 * lists below (whole words, case-insensitive; simple plurals also match).
 * Once the backend returns a real fragrance family, replace the inference in
 * `lib/fragranceFamily.ts` and this file can be deleted.
 */

export type FragranceFamily =
  | "floral"
  | "fresh"
  | "warm-spice"
  | "gourmand"
  | "woody"
  | "herbal";

export const FRAGRANCE_FAMILIES: Record<FragranceFamily, readonly string[]> = {
  floral: [
    "floral", "flower", "lavender", "mogra", "jasmine", "rose", "gulab",
    "chameli", "lily", "peony", "violet", "orchid", "lotus", "bloom",
    "blossom", "champa", "marigold",
  ],
  fresh: [
    "fresh", "citrus", "lemon", "lemongrass", "lime", "orange", "grapefruit",
    "bergamot", "mint", "eucalyptus", "ocean", "marine", "sea", "linen",
    "rain", "aqua", "breeze",
  ],
  "warm-spice": [
    "spice", "spiced", "cinnamon", "clove", "cardamom", "nutmeg", "saffron",
    "chai", "ginger", "pepper", "vanilla",
  ],
  gourmand: [
    "coffee", "mocha", "espresso", "caramel", "chocolate", "cocoa", "honey",
    "almond", "coconut", "butterscotch",
  ],
  woody: [
    "woody", "wood", "mahogany", "sandalwood", "oud", "cedar", "cedarwood",
    "teak", "pine", "musk", "amber", "patchouli", "vetiver", "leather",
    "tobacco",
  ],
  herbal: [
    "herbal", "camphor", "kapoor", "tulsi", "neem", "sage", "rosemary",
    "basil", "incense", "dhoop", "guggul",
  ],
};
