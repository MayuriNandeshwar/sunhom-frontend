/**
 * Reviews & ratings configuration.
 */

/** How many review cards are visible before "View All Reviews". */
export const INITIAL_REVIEWS_SHOWN = 3;

/**
 * Reviews are mock data for now (see src/mocks/reviews.mock.ts), so every
 * product shows the same sample reviews. Set this to false to show the empty
 * state everywhere (e.g. before launch, or to preview the empty state).
 * Remove it once real reviews come from the backend.
 */
export const MOCK_REVIEWS_ENABLED = true;
