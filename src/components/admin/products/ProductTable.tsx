"use client";

import Image from "next/image";
import Badge from "@/components/ui/badge";
import ProductActions from "./ProductActions";
import { AdminProductListDto } from "@/services/admin.products.service";

type Props = {
  products: AdminProductListDto[];
};

export default function ProductsTable({ products }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="rounded-xl border bg-white overflow-visible">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-5 py-3 w-[90px] text-left">Image</th>
            <th className="px-5 py-3 text-left">Product</th>
            <th className="px-5 py-3 w-[140px] text-left">Price</th>
            <th className="px-5 py-3 w-[140px] text-left">Status</th>
            <th className="px-5 py-3 w-[160px] text-left">Last Updated</th>
            <th className="px-5 py-3 w-[80px] text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {safeProducts.map((p) => {
            const price =
              typeof p.basePrice === "number"
                ? `₹${p.basePrice.toFixed(2)}`
                : "—";

            return (
              <tr
                key={p.productId}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* IMAGE */}
                <td className="px-5 py-4">
                  <Image
                    src={p.thumbnail || "/placeholder.png"}
                    alt={p.name}
                    width={64}
                    height={64}
                    className="rounded-lg border object-cover"
                  />
                </td>

                {/* PRODUCT */}
                <td className="px-5 py-4 font-medium text-gray-900">
                  {p.name}
                </td>

                {/* PRICE */}
                <td className="px-5 py-4 font-medium">
                  {price}
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <Badge
                    variant="light"
                    color={
                      p.status === "PUBLISHED"
                        ? "success"
                        : "warning"
                    }
                  >
                    {p.status}
                  </Badge>
                </td>

                {/* DATE */}
                <td className="px-5 py-4 text-sm text-gray-600">
                  {p.updatedAt
                    ? new Date(p.updatedAt).toLocaleDateString()
                    : "—"}
                </td>

                {/* ACTION */}
                <td className="px-5 py-4 text-center">
                  <ProductActions productId={p.productId} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
