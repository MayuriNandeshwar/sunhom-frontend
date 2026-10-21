"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminProductListDto } from "@/services/admin.products.service";

export default function MobileProductList({
  products,
}: {
  products: AdminProductListDto[];
}) {
  const router = useRouter();

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="space-y-3">
      {safeProducts.map((p) => {
        const price =
          typeof p.basePrice === "number"
            ? p.basePrice.toFixed(2)
            : "0.00";

        return (
          <div
            key={p.productId}
            className="bg-white rounded-xl border p-3 shadow-sm"
          >
            {/* Top */}
            <div
              className="flex gap-3 cursor-pointer"
              onClick={() =>
                router.push(`/admin/products/${p.productId}`)
              }
            >
              <Image
                src={p.thumbnail || "/placeholder.png"}
                alt={p.name}
                width={56}
                height={56}
                className="rounded-lg object-cover border"
              />

              <div className="flex-1">
                <div className="font-medium text-gray-900 leading-snug">
                  {p.name}
                </div>

                <div className="mt-1 text-sm text-gray-500">
                  ₹{price}
                </div>

                <div className="mt-2">
                  <Badge
                    variant="light"
                    color={
                      p.status === "PUBLISHED"
                        ? "success"
                        : "warning"
                    }
                    size="sm"
                  >
                    {p.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() =>
                  router.push(`/admin/products/${p.productId}`)
                }
              >
                View
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() =>
                  router.push(
                    `/admin/products/${p.productId}/edit`
                  )
                }
              >
                Edit
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
