export interface ProductImage {
  imageId: string;
  url: string;
  position: number;
  primary: boolean;
}

export interface ProductVariant {
  variantId: string;
  title: string;
  price: number;
  mrp: number;
  weightGrams: number;
  default: boolean;
}

export interface Product {
  productId: string;
  name: string;
  slug: string;
  description: string;
  status: "DRAFT" | "PUBLISHED";
  variants: ProductVariant[];
  attributes: any[];
  images: ProductImage[];
}
