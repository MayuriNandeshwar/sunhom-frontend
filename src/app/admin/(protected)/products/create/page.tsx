"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface Category {
  categoryId: string;
  categoryName: string;
}

interface ProductType {
  productTypeId: string;
  productTypeName: string;
}

export default function CreateProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const [form, setForm] = useState({
    productName: "",
    categoryId: "",
    productTypeId: "",
    brand: "",
    shortDescription: "",
    description: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMeta();
  }, []);

  async function loadMeta() {
    try {
      const [catRes, typeRes] = await Promise.all([
        api.get("/api/admin/categories"),
        api.get("/api/admin/product-types"),
      ]);

      setCategories(catRes.data);
      setProductTypes(typeRes.data);
    } catch (error) {
      console.error("Meta load failed", error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCreate() {
    try {
      if (!form.productName.trim()) {
        alert("Product name is required");
        return;
      }

      if (!form.categoryId) {
        alert("Please select category");
        return;
      }

      if (!form.productTypeId) {
        alert("Please select product type");
        return;
      }

      setLoading(true);

      const payload = {
        productName: form.productName.trim(),
        categoryId: form.categoryId,
        productTypeId: form.productTypeId,
        brand: form.brand,
        shortDescription: form.shortDescription,
        description: form.description,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        seoKeywords: form.seoKeywords,
      };

      console.log("Sending payload:", payload);

      const res = await api.post("/api/admin/products", payload);

      const productId = res.data;

      router.push(`/admin/products/${productId}/edit`);

    } catch (error: any) {
      console.error("Create error:", error.response?.data || error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">

      <h1 className="text-2xl font-semibold">Create Product</h1>

      <input
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.categoryId} value={c.categoryId}>
            {c.categoryName}
          </option>
        ))}
      </select>

      <select
        name="productTypeId"
        value={form.productTypeId}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Select Product Type</option>
        {productTypes.map(p => (
          <option key={p.productTypeId} value={p.productTypeId}>
            {p.productTypeName}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-brand-primary transition"
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </div>
  );
}
