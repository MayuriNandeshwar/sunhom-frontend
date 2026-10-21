import { productService } from "@/lib/api/products/product.service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductGallery from "@/components/customer/product/ProductGallery";
import ProductInfo from "@/components/customer/product/ProductInfo";
import ProductMeta from "@/components/customer/product/ProductMeta";
import StickyAddToCartBar from "@/components/customer/product/StickyAddToCartBar";
import { ProductQuantityProvider } from "@/context/ProductQuantityContext";
import RelatedProducts from "@/components/customer/product/RelatedProducts";
import RelatedProductsSkeleton from "@/components/customer/product/RelatedProductsSkeleton";
import ReviewsSection from "@/components/customer/reviews/ReviewsSection";
import { getProductReviews } from "@/services/public/reviews.api";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";

export default async function ProductPage({ params }: any) {
  const { slug, category } = await params;

  let product;

  try {
    product = await productService.getProductBySlug(slug);
  } catch (e) {
    return notFound();
  }

  const reviews = await getProductReviews(product.productId);

  return (
    <div className="pt-[140px]">

      {/* ✅ BREADCRUMB */}
      <BreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Collection", href: "/collections" },
          {
            label: product.category,
            href: `/collections/${product.categorySlug}`,
          },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Shares one quantity between the purchase box and the sticky bar */}
        <ProductQuantityProvider key={product.productId}>
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div className="space-y-10">
            <ProductGallery images={product.images} />
            <ProductMeta product={product} />
          </div>

          {/* RIGHT */}
          <ProductInfo product={product} />

        </div>

        {/* Fixed bottom bar; appears after scrolling past the purchase box */}
        <StickyAddToCartBar product={product} />
        </ProductQuantityProvider>

        {/* Ratings & Reviews (mock data for now) */}
        <ReviewsSection reviews={reviews} />

        {/* Streams in after the product itself; renders nothing when there are no related products */}
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts product={product} />
        </Suspense>

      </div>
    </div>
  );
}