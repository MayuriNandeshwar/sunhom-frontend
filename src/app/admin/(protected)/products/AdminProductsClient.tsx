"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Breadcrumbs from "@/components/admin/shared/Breadcrumbs";
import PageHeader from "@/components/admin/shared/PageHeader";
import MobileProductList from "@/components/admin/products/MobileProductList";
import ProductsTable from "@/components/admin/products/ProductTable";
import EmptyProducts from "@/components/admin/products/EmptyProducts";
import Pagination from "@/components/admin/shared/Pagination";

import {
  AdminProductListDto,
  adminProductService,
} from "@/services/admin.products.service";

const PAGE_SIZE = 10;

export default function AdminProductsClient({
  products,
}: {
  products: AdminProductListDto[];
}) {
  const router = useRouter();

  const safeProducts = Array.isArray(products) ? products : [];
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);

  const totalPages = Math.max(1, Math.ceil(safeProducts.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paginatedProducts = safeProducts.slice(start, start + PAGE_SIZE);

  return (
    <section className="p-2 md:p-4 pb-32">
      <div className="max-w-[1200px] mx-auto space-y-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin/dashboard" },
            { label: "Products" },
          ]}
        />

        {/* 🔴 THIS IS THE IMPORTANT PART */}
        <PageHeader
          title="Products"
          subtitle="Manage all products in your store"
          actionLabel="+ Add Product"
          onAction={() => {
            router.push("/admin/products/create");
          }}
        />


        {safeProducts.length === 0 ? (
          <EmptyProducts />
        ) : (
          <>
            {/* MOBILE */}
            <div className="md:hidden">
              <MobileProductList products={paginatedProducts} />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <ProductsTable products={paginatedProducts} />
            </div>

            {/* PAGINATION */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
              totalItems={safeProducts.length}
              pageSize={PAGE_SIZE}
            />
          </>
        )}
      </div>
    </section>
  );
}
