import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-white p-12 text-center">
      <Package className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No products yet</h3>
      <p className="text-sm text-muted-foreground">
        Start by adding your first product to SUNHOM.
      </p>
      <Link href="/admin/products/new">
        <Button>Add Product</Button>
      </Link>
    </div>
  );
}
