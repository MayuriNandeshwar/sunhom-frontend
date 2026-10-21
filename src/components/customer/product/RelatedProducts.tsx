import Link from "next/link";
import type { Product } from "@/lib/api/products/product.service";
import { getRelatedProducts } from "@/services/public/relatedProducts.api";
import RelatedProductCard from "@/components/customer/product/RelatedProductCard";

/**
 * "You May Also Like": up to four real products, same category first, then
 * same fragrance family. Renders nothing when there is nothing to recommend,
 * so the page never shows an empty or placeholder section.
 */
export default async function RelatedProducts({ product }: { product: Product }) {
  const related = await getRelatedProducts(product);

  if (related.length === 0) return null;

  return (
    <section className="mt-24" aria-labelledby="related-products-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="font-epilogue text-xs uppercase tracking-[0.2em] text-[var(--brand-gold)]">
            Curated For You
          </p>
          <h2
            id="related-products-heading"
            className="mt-2 font-playfair text-3xl text-[#1c1c1c]"
          >
            You May Also Like
          </h2>
        </div>

        <Link
          href={`/collections/${product.categorySlug}`}
          className="font-epilogue text-sm text-[var(--text-body)] underline underline-offset-4 transition-colors hover:text-[var(--brand-gold)]"
        >
          Shop all {product.category}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-4">
        {related.map((item, index) => (
          <RelatedProductCard key={item.productId} product={item} index={index} />
        ))}
      </div>
    </section>
  );
}
