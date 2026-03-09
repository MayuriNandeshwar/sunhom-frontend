import UtilityBar from "@/components/customer/layout/UtilityBar";
import Navbar from "@/components/customer/layout/Navbar";
import Footer from "@/components/customer/layout/Footer";

import BreadcrumbBar from "@/components/customer/collection/BreadcrumbBar";
import CategoryHero from "@/components/customer/collection/CategoryHero";
import ProductGrid from "@/components/customer/collection/ProductGrid";
import MomentSection from "@/components/customer/collection/MomentSection";
import CategoryFAQ from "@/components/customer/collection/CategoryFAQ";

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
  // ✅ UNWRAP PROMISES (Required in Next 16)
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const data = await getProductsByCategory(
    resolvedParams.category,
    {
      sort: resolvedSearchParams.sort || undefined,
      minPrice: resolvedSearchParams.minPrice
        ? Number(resolvedSearchParams.minPrice)
        : undefined,
      maxPrice: resolvedSearchParams.maxPrice
        ? Number(resolvedSearchParams.maxPrice)
        : undefined,
      inStock:
        resolvedSearchParams.inStock === "true"
          ? true
          : undefined,
    }
  );

  return (
    <>
      <UtilityBar />
      <Navbar />

      <div className="pt-[140px]">
        <BreadcrumbBar category={resolvedParams.category} />
        <CategoryHero category={resolvedParams.category} />

        <ProductGrid products={data.data} />

        {/* <MomentSection category={resolvedParams.category} /> */}
        <CategoryFAQ category={resolvedParams.category} />
      </div>

      <Footer />
    </>
  );
}