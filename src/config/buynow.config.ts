/**
 * Buy Now configuration.
 */

/**
 * sessionStorage key for the in-progress Buy Now purchase. Session storage
 * (not local) on purpose: Buy Now is temporary, it survives a refresh on the
 * checkout page but never lingers across visits or leaks between tabs.
 * Bump the suffix if the stored shape ever changes.
 */
export const BUY_NOW_STORAGE_KEY = "sunhom_buy_now_v1";

/**
 * Remembers which product page the last Buy Now started from, so a visitor
 * who lands on /checkout with no Buy Now data can be sent back there. It is
 * deliberately kept when the Buy Now data itself is cleared.
 */
export const BUY_NOW_RETURN_KEY = "sunhom_buy_now_return_v1";

export const CHECKOUT_HREF = "/checkout";
