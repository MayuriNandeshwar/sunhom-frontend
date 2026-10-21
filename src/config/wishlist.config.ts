/**
 * Wishlist configuration (single place to tune wishlist behaviour).
 */

/** localStorage key. Bump the suffix if the stored shape ever changes. */
export const WISHLIST_STORAGE_KEY = "sunhom_wishlist_v1";

/** Upper bound on saved products, keeps localStorage small and the page fast. */
export const MAX_WISHLIST_ITEMS = 100;

export const WISHLIST_HREF = "/wishlist";
