/**
 * Pure decision for the sticky bar, kept separate so it can be unit-tested.
 *
 * The bar belongs on screen only once the purchase box has been scrolled
 * *past* (it is above the visible area). If the box is still below the
 * screen (page just loaded on a phone) or visible, the bar stays hidden.
 */
export function hasScrolledPastPurchase(entry: {
  isIntersecting: boolean;
  /** `boundingClientRect.bottom` of the purchase box. */
  bottom: number;
  /** Top edge of the observed area (below the fixed header). */
  rootTop: number;
}): boolean {
  return !entry.isIntersecting && entry.bottom <= entry.rootTop;
}

/** Show only after the purchase box is passed, and never over the footer. */
export function shouldShowBar(state: {
  pastPurchase: boolean;
  footerInView: boolean;
}): boolean {
  return state.pastPurchase && !state.footerInView;
}
