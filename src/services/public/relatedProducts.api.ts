import { getProductsByCategory, type PublicProduct } from "@/services/public/product.api";
import type { Product } from "@/lib/api/products/product.service";
import { CATEGORY_CONFIG } from "@/config/category.config";
import {
  RELATED_PRODUCTS_LIMIT,
  selectRelatedProducts,
} from "@/lib/relatedProducts";

/**
 * Related products for a product page, from real catalogue data.
 *
 * Loads the product's own category first, then every other known category in
 * parallel so the row can still be filled when its category is small. A
 * category that fails to load is skipped; if everything fails the result is
 * an empty list and the section simply does not render.
 */
export async function getRelatedProducts(
  product: Product,
  limit: number = RELATED_PRODUCTS_LIMIT
): Promise<PublicProduct[]> {
  const categories = Array.from(
    new Set([product.categorySlug, ...Object.keys(CATEGORY_CONFIG)])
  );

  const results = await Promise.allSettled(
    categories.map((category) => getProductsByCategory(category))
  );

  const candidates: PublicProduct[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && Array.isArray(result.value?.data)) {
      candidates.push(...result.value.data);
    }
  }

  const notes = product.fragranceNotes;

  return selectRelatedProducts(
    {
      productId: product.productId,
      slug: product.slug,
      categorySlug: product.categorySlug,
      fragranceText: [product.name, notes?.top, notes?.heart, notes?.base]
        .filter(Boolean)
        .join(" "),
    },
    candidates,
    limit
  );
}
