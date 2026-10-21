"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import api from "@/lib/axios";
import { AdminProductEditDto } from "@/types/adminProduct";

interface Props {
  product?: AdminProductEditDto;
  mode: "view" | "edit";
  setProduct?: any;
}

export function ProductGallery({ product, mode, setProduct }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) return null;

  const images = product.images || [];
  const productId = product.productId;

  const primaryImage =
    images.find((i) => i.isPrimary)?.imageUrl ||
    images[0]?.imageUrl ||
    "/placeholder.png";

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    await api.post(
      `/api/admin/products/${productId}/images`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    router.refresh();
  }

  async function deleteImage(imageId: string) {
    await api.delete(
      `/api/admin/products/${productId}/images/${imageId}`
    );

    router.refresh();
  }

  return (
    <div>
      {/* MAIN IMAGE */}
      <img
        src={primaryImage}
        className="rounded-3xl w-full max-h-[600px] object-cover shadow-lg"
        alt="Product"
      />

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-6 flex-wrap">
        {images.map((img) => (
          <div key={img.productImageId} className="relative">
            <img
              src={img.imageUrl}
              className="w-24 h-24 rounded-xl border object-cover"
              alt="thumb"
            />

            {mode === "edit" && (
              <button
                onClick={() => deleteImage(img.productImageId)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      {/* UPLOAD */}
      {mode === "edit" && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            multiple
            onChange={(e) => {
              if (!e.target.files) return;
              Array.from(e.target.files).forEach(uploadImage);
            }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 bg-black text-white px-6 py-3 rounded-full"
          >
            Upload Images
          </button>
        </>
      )}
    </div>
  );
}