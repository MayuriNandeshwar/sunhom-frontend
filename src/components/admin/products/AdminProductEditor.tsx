"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { AdminProductEditDto } from "@/types/adminProduct";
import { ProductShell } from "@/components/product/ProductShell";

interface Props {
    initialData: AdminProductEditDto;
}

export default function AdminProductEditor({ initialData }: Props) {
    const router = useRouter();
    const [product, setProduct] = useState(initialData);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        try {
            setLoading(true);

            await api.put(`/api/admin/products/${product.productId}`, {
                productName: product.productName,
                shortDescription: product.shortDescription,
                productDescription: product.productDescription,
                brand: product.brand,
                searchKeywords: product.searchKeywords,
                isActive: product.isActive,
                isFeatured: product.isFeatured,
                isManualBestseller: product.isManualBestseller,
                seoTitle: product.seoTitle,
                seoDescription: product.seoDescription,
                seoKeywords: product.seoKeywords,
                attributes: product.attributes,
                images: product.images,
                defaultPrice: product.variants.find(v => v.isDefault)?.price,
                defaultMrp: product.variants.find(v => v.isDefault)?.mrp,
            });

            alert("Saved");
            router.refresh();
        } catch (e) {
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    }

    async function handlePublish() {
        await api.put(`/api/admin/products/${product.productId}/publish`);
        router.refresh();
    }

    return (
        <ProductShell
            mode="edit"
            role="admin"
            product={product}
            setProduct={setProduct}
            onSave={handleSave}
            onPublish={handlePublish}
        />
    );
}
