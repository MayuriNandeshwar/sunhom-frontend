# SUNHOM Frontend Changelog

## Phase 1: Cart (Add to Cart, Cart Drawer, Cart Counter, localStorage)

Added
- `src/context/CartContext.tsx`: cart state (add, update quantity, remove, clear), derived count/subtotal/savings, localStorage persistence (`sunhom_cart_v1`), cross-tab sync, defensive parsing of stored data.
- `src/components/customer/cart/CartDrawer.tsx`: slide-in drawer with line items, quantity stepper, remove, free-shipping progress, savings, subtotal, empty state, Esc/overlay close, scroll lock, dialog semantics.
- `src/components/customer/cart/CartButton.tsx`: header cart icon with live count badge.
- `src/config/cart.config.ts`: storage key, free-shipping threshold (999), max quantity (10), `CHECKOUT_ENABLED` flag (turn on in Phase 3).
- `src/lib/format.ts`: INR price formatter.

Modified
- `src/app/(customer)/layout.tsx`: wraps the customer site in `CartProvider`, mounts `CartDrawer`.
- `src/components/customer/layout/Navbar.tsx`: cart icon replaced by `CartButton`.
- `src/components/customer/collection/ProductGrid.tsx`: "Add to Cart" now adds the item and opens the drawer (was a console.log).
- `src/components/customer/product/ProductInfo.tsx`: product page "Add to Cart" wired up, typed props, out-of-stock state.

Deleted
- None.

## Task 2: Wishlist (heart toggle, header count, /wishlist page, localStorage)

Added
- `src/context/WishlistContext.tsx`: wishlist state (add, remove, toggle, clear, isInWishlist), count, localStorage persistence (`sunhom_wishlist_v1`), cross-tab sync, defensive parsing, de-duplication, 100-item cap. Fully separate from `CartContext`.
- `src/context/ToastContext.tsx`: lightweight toast system (top-right on desktop, full width on mobile, auto-dismiss, optional action link, replaces rather than stacks per id).
- `src/config/wishlist.config.ts`: storage key, item cap, route.
- `src/components/customer/wishlist/WishlistButton.tsx`: shared heart toggle (`icon` for cards, `detail` for product page).
- `src/components/customer/wishlist/WishlistLink.tsx`: header heart with live count badge, links to `/wishlist`.
- `src/components/customer/wishlist/WishlistClient.tsx`: wishlist grid with Move to Cart and Remove, loading skeleton, empty state.
- `src/app/(customer)/wishlist/page.tsx`: `/wishlist` route (noindex).

Modified
- `src/app/(customer)/layout.tsx`: wraps the site in `ToastProvider` and `WishlistProvider` (Cart providers and drawer unchanged).
- `src/components/customer/layout/Navbar.tsx`: static heart replaced by `WishlistLink`.
- `src/components/customer/collection/ProductGrid.tsx`: local-state heart replaced by `WishlistButton`; `LuxuryCard` exported with an optional `footer` slot (default Add to Cart behaviour unchanged).
- `src/components/customer/home/featuredCollection/ProductCard.tsx`: heart wired to wishlist.
- `src/components/customer/home/newArrival/ProductCard.tsx`: heart wired to wishlist.
- `src/components/customer/product/ProductInfo.tsx`: "Add to Wishlist" button on the product page.

Deleted
- None.

## Task 3: Buy Now (single-product purchase, quantity, /checkout entry)

Added
- `src/context/BuyNowContext.tsx`: temporary Buy Now state (one product + quantity) in `sessionStorage`; `startBuyNow` stores the product and goes to `/checkout`; quantity clamped to `MAX_QTY_PER_ITEM`; refuses out-of-stock; reuses the `CartItem` / `AddToCartInput` types (type-only import, no cart state touched).
- `src/config/buynow.config.ts`: storage keys and checkout route.
- `src/components/customer/buynow/BuyNowButton.tsx`: shared button (`card` and `detail` variants), out-of-stock state, never triggers the card link.
- `src/components/customer/checkout/CheckoutClient.tsx`: `/checkout` entry. Redirects back to the product page when there is no Buy Now data; otherwise shows the single-item summary with quantity selection. Payment button is a disabled placeholder until Phase 3.
- `src/app/(customer)/checkout/page.tsx`: `/checkout` route (noindex).

Modified
- `src/app/(customer)/layout.tsx`: adds `BuyNowProvider`.
- `src/components/customer/product/ProductInfo.tsx`: quantity stepper + "Buy Now" row (Add to Cart and Wishlist unchanged).
- `src/components/customer/collection/ProductGrid.tsx`: "Buy Now" on the collection card (not shown when a custom footer is used, so the wishlist page is unchanged).
- `src/components/customer/home/featuredCollection/ProductCard.tsx`, `src/components/customer/home/newArrival/ProductCard.tsx`: "Buy Now" button.

Deleted
- None.

## Task 4: Checkout customer details and shipping address

Added
- `src/lib/checkoutValidation.ts`: pure validation and cleaning (name, 10-digit Indian mobile starting 6-9 with +91/0 paste handling, email, address, city, state from list, 6-digit pincode not starting 0), plus defensive parsing of stored data.
- `src/hooks/useCheckoutDetails.ts`: form state persisted in `sessionStorage` (`sunhom_checkout_details_v1`), drafts saved as the customer types.
- `src/config/checkout.config.ts`: storage key, `/payment` route, list of Indian states and union territories.
- `src/components/customer/checkout/CheckoutForm.tsx`: contact + shipping form, inline errors after a field is left or on submit, first invalid field focused, autofill attributes, 16px inputs on mobile.
- `src/components/customer/checkout/PaymentClient.tsx` and `src/app/(customer)/payment/page.tsx`: minimal `/payment` landing (guards the route and confirms the entered details). Payment/QR is not built.

Modified
- `src/components/customer/checkout/CheckoutClient.tsx`: renders the form; "Continue to payment" is enabled only when the form is valid, saves details and goes to `/payment`. Buy Now guard, item card, quantity stepper and order summary are unchanged.

Deleted
- None.

## Task 5: QR payment page (Scan & Pay, screenshot upload, /order-success)

Added
- `src/config/payment.config.ts`: `merchantName`, `upiId`, `qrImage` (replace the placeholders before going live; the page shows a warning while `upiId` is still the placeholder), plus storage keys and upload limits.
- `public/payment/upi-qr.png`: placeholder image to be replaced with the real UPI QR.
- `src/components/customer/payment/ScanAndPay.tsx`: merchant name, UPI ID with copy button, order amount, QR image, 4-step "How to pay" list, and a "Pay with a UPI app" deep link on phones.
- `src/components/customer/payment/ScreenshotUpload.tsx`: JPG/JPEG/PNG upload (tap or drag and drop), preview, replace, remove, inline errors.
- `src/lib/paymentProof.ts`: file validation (extension, 10 MB cap, file signature check), compression to a small JPEG, sessionStorage read/write.
- `src/hooks/usePaymentProof.ts`: screenshot state persisted in sessionStorage (`sunhom_payment_proof_v1`).
- `src/lib/paymentSubmission.ts`: `submitPayment` (no backend yet: stores a confirmation snapshot in sessionStorage; replace with the real API call) and `readConfirmation`.
- `src/components/customer/checkout/OrderSuccessClient.tsx` and `src/app/(customer)/order-success/page.tsx`: `/order-success` confirmation; redirects home if nothing was submitted; clears the Buy Now item, address form and screenshot once shown.

Modified
- `src/components/customer/checkout/PaymentClient.tsx`: extended with the payment UI and Submit Payment (enabled only after a screenshot is uploaded). Route guards are unchanged.

Deleted
- None.

## Task 7: Real Related Products ("You May Also Like")

Added
- `src/components/customer/product/RelatedProductCard.tsx`: product card with image, name, price (+ MRP and % off), short description, Add to Cart, Wishlist heart (existing `WishlistButton`) and View Product. Desktop pointer devices: image zoom, card lift and soft shadow, and an Add to Cart / View overlay that fades in on hover or keyboard focus. Phones and touch tablets: the same actions are always visible under the card. Staggered fade-in on scroll (respects reduced motion). Out-of-stock products show a disabled "Out of Stock" button.
- `src/components/customer/product/RelatedProductsSkeleton.tsx`: loading placeholder while related products stream in.
- `src/services/public/relatedProducts.api.ts`: loads the product's category first, then the other known categories, via the existing `getProductsByCategory`. A failing category is skipped.
- `src/lib/relatedProducts.ts`: pure ranking. Excludes the current product and duplicates; ranks same category + same fragrance family, then same category, then same fragrance family, then the rest. In-stock products always rank above out-of-stock ones. Maximum 4.
- `src/lib/fragranceFamily.ts` and `src/config/fragranceFamilies.config.ts`: fragrance family inference. The public API has no fragrance-family field, so the family is inferred from keywords in the product name, fragrance notes or short description. Edit the keyword lists to tune it.

Modified
- `src/components/customer/product/RelatedProducts.tsx`: placeholder replaced by the real section (now a server component that takes the current `product`). Renders nothing when there are no related products.
- `src/app/(customer)/collections/[category]/[slug]/page.tsx`: passes `product` to `RelatedProducts` and wraps it in `Suspense` with the skeleton. The old `mt-24` wrapper div was removed (the section carries its own top margin, so an empty section leaves no gap). Nothing else on the page changed.

Deleted
- None.

## Task 8: Product Reviews & Ratings

Added
- `src/components/customer/reviews/ReviewsSection.tsx`: "Ratings & Reviews" section: average rating, total reviews, per-star breakdown, review cards (3 shown at first), "View All Reviews" / "Show Fewer Reviews", "Write a Review" (UI only: shows a notice, nothing is sent) and an empty state.
- `src/components/customer/reviews/StarRating.tsx`: reusable read-only star rating with partial stars (4.7 fills 70% of the fifth star).
- `src/components/customer/reviews/ReviewCard.tsx`, `src/components/customer/reviews/RatingBreakdown.tsx`.
- `src/types/review.ts`: `Review` and summary types.
- `src/lib/reviews.ts`: summary maths computed from the reviews (average to one decimal, percentages that always add to 100), newest-first sorting, and a hydration-safe date formatter.
- `src/mocks/reviews.mock.ts`: 13 sample reviews. MOCK DATA, not real customer feedback.
- `src/services/public/reviews.api.ts`: `getProductReviews`, the one place to swap in the real API.
- `src/config/reviews.config.ts`: `INITIAL_REVIEWS_SHOWN` (3) and `MOCK_REVIEWS_ENABLED` (set to false to show the empty state everywhere).

Modified
- `src/app/(customer)/collections/[category]/[slug]/page.tsx`: loads reviews and renders `ReviewsSection` above Related Products. The Related Products lines are unchanged.

Deleted
- None.

## Task 9: Sticky Add to Cart bar

Added
- `src/components/customer/product/StickyAddToCartBar.tsx`: fixed bottom bar with product image, name, price, quantity selector, Add to Cart and Buy Now. Slides up once the purchase box has scrolled out of view and slides down when it returns (or when the footer appears); respects reduced-motion. Hidden when the product is out of stock.
- `src/hooks/useStickyBarVisible.ts` and `src/lib/stickyBar.ts`: IntersectionObserver-based visibility (no scroll listener) and the pure show/hide decision.
- `src/hooks/useProductPurchase.ts`: the quantity, Add to Cart action and Buy Now payload for a product, shared by the purchase box and the bar (calls the existing cart `addItem` and Buy Now button; no cart or Buy Now code changed).
- `src/context/ProductQuantityContext.tsx`: one quantity shared by the box and the bar so both always agree.
- `src/config/stickyBar.config.ts`: purchase box id and header offset.

Modified
- `src/components/customer/product/ProductInfo.tsx`: uses `useProductPurchase` (same behaviour as before) and gives the purchase box an id.
- `src/components/customer/product/QuantitySelector.tsx`: optional `size="compact"` (default unchanged).
- `src/app/(customer)/collections/[category]/[slug]/page.tsx`: wraps the product grid in `ProductQuantityProvider` and renders the bar.

Deleted
- None.

