/**
 * Cart configuration (single place to tune cart behaviour).
 */

/** localStorage key. Bump the suffix if the stored shape ever changes. */
export const CART_STORAGE_KEY = "sunhom_cart_v1";

/** Orders at or above this subtotal (INR) ship free. Matches the announcement bar. */
export const FREE_SHIPPING_THRESHOLD = 999;

/** Maximum quantity of a single product in the cart. */
export const MAX_QTY_PER_ITEM = 10;

/**
 * Checkout is built in Phase 3. While false, the drawer shows the checkout
 * button in a disabled state instead of linking to a page that does not exist.
 */
export const CHECKOUT_ENABLED = false;

/** Where "Continue shopping" sends the customer. */
export const CONTINUE_SHOPPING_HREF = "/collections/signature-candle-collection";
