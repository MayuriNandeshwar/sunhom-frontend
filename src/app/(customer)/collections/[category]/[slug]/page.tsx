import { productService } from "@/lib/api/products/product.service";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/customer/product/ProductGallery";
import ProductInfo from "@/components/customer/product/ProductInfo";
import ProductMeta from "@/components/customer/product/ProductMeta";
import RelatedProducts from "@/components/customer/product/RelatedProducts";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";

export default async function ProductPage({ params }: any) {
  const { slug, category } = await params;

  let product;

  try {
    product = await productService.getProductBySlug(slug);
  } catch (e) {
    return notFound();
  }

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

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div className="space-y-10">
            <ProductGallery images={product.images} />
            <ProductMeta product={product} />
          </div>

          {/* RIGHT */}
          <ProductInfo product={product} />

        </div>

        <div className="mt-24">
          <RelatedProducts />
        </div>

      </div>
    </div>
  );
}