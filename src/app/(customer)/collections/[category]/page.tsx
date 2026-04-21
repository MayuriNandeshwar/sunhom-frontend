import CategoryHero from "@/components/customer/collection/CategoryHero";
import ProductGrid from "@/components/customer/collection/ProductGrid";
import CategoryFAQ from "@/components/customer/collection/CategoryFAQ";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";

import { getProductsByCategory } from "@/services/public/product.api";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  }>;
}) {
  const { category } = await params;
  const sp = await searchParams;

  const data = await getProductsByCategory(category, {
    sort: sp.sort || undefined,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    inStock: sp.inStock === "true" ? true : undefined,
  });

  return (
    <div className="pt-[140px]">

      {/* ✅ BREADCRUMB (VISIBLE NOW) */}
      <BreadcrumbBar />

      {/* HERO */}
      <CategoryHero category={category} />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 py-12">
        <ProductGrid products={data.data} />
        <CategoryFAQ category={category} />
      </div>

    </div>
  );
}