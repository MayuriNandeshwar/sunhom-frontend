import type { Dispatch, SetStateAction } from "react";
import { AdminProductEditDto } from "@/types/adminProduct";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductPrice } from "./ProductPrice";
import { ProductActions } from "./ProductActions";
import { ProductSpecs } from "./ProductSpecs";
import { ProductInstructions } from "./ProductInstructions";
import { ProductAdminControls } from "./ProductAdminControls";

interface Props {
  mode: "view" | "edit";
  role: "admin" | "customer";
  product?: AdminProductEditDto;
  setProduct?: Dispatch<SetStateAction<AdminProductEditDto>>;
  onSave?: () => void;
  onPublish?: () => void;
}

export function ProductShell({
  mode,
  role,
  product,
  setProduct,
  onSave,
  onPublish,
}: Props) {
  return (
    <div className="bg-[#f8f7f4] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">

        {/* LEFT SIDE - GALLERY */}
        <ProductGallery
          product={product}
          mode={mode}
          setProduct={setProduct}
        />

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          <ProductInfo
            product={product}
            mode={mode}
            setProduct={setProduct}
          />

          <ProductPrice
            product={product}
            mode={mode}
          />

          <ProductActions
            role={role}
            mode={mode}
          />

          {/* Return Policy */}
          <div className="bg-[#e9d8c7] rounded-xl p-5 text-sm text-gray-800">
            <h4 className="font-semibold mb-2">Return Policy</h4>
            Due to the delicate nature of our products, returns are not accepted.
          </div>

          <ProductSpecs product={product} />

          <ProductInstructions product={product} />

          {role === "admin" && (
            <ProductAdminControls
              mode={mode}
              product={product}
              onSave={onSave}
              onPublish={onPublish}
            />
          )}
        </div>
      </div>
    </div>
  );
}
