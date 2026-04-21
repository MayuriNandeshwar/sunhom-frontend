import { redirect } from "next/navigation";
import { productService } from "@/lib/api/products/product.service";

export default async function RedirectPage({ params }: any) {
  const { slug } = await params;

  try {
    const product = await productService.getProductBySlug(slug);

    return redirect(
      `/collections/${product.categorySlug}/${product.slug}`
    );
  } catch {
    return redirect("/");
  }
}