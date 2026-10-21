import type { PublicProduct } from "@/services/public/product.api";
import { sharesFragranceFamily } from "@/lib/fragranceFamily";

export const RELATED_PRODUCTS_LIMIT = 4;

/** What we know about the product being viewed. */
export interface RelatedSource {
  productId: string;
  slug: string;
  categorySlug: string;
  /** Name plus fragrance notes: the text used to infer its fragrance family. */
  fragranceText: string;
}

/**
 * Picks the products to show under "You May Also Like".
 *
 * Ranking, best first:
 *   1. same category AND same fragrance family
 *   2. same category
 *   3. same fragrance family (other category)
 *   4. everything else (only used to fill the row)
 *
 * In-stock products always rank above out-of-stock ones, so a sold-out item
 * only appears when there are not enough available products to fill the row.
 * The current product and duplicates are always excluded. Ties keep the
 * order the API returned. Returns fewer than `limit` items (or none) when the
 * catalogue does not have enough products.
 */
export function selectRelatedProducts(
  current: RelatedSource,
  candidates: readonly PublicProduct[],
  limit: number = RELATED_PRODUCTS_LIMIT
): PublicProduct[] {
  const seen = new Set<string>();
  const pool: {
    product: PublicProduct;
    available: boolean;
    score: number;
    order: number;
  }[] = [];

  candidates.forEach((product, order) => {
    if (!product || seen.has(product.productId)) return;
    seen.add(product.productId);

    if (product.productId === current.productId || product.slug === current.slug) {
      return;
    }

    const sameCategory = product.categorySlug === current.categorySlug;
    const sameFamily = sharesFragranceFamily(
      current.fragranceText,
      `${product.productName} ${product.shortDescription ?? ""}`
    );

    pool.push({
      product,
      available: product.inStock !== false,
      score: (sameCategory ? 2 : 0) + (sameFamily ? 1 : 0),
      order,
    });
  });

  pool.sort(
    (a, b) =>
      Number(b.available) - Number(a.available) ||
      b.score - a.score ||
      a.order - b.order
  );

  return pool.slice(0, Math.max(0, limit)).map((entry) => entry.product);
}
