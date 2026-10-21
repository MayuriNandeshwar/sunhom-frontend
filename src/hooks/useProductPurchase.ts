"use client";

import { useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useProductQuantity } from "@/context/ProductQuantityContext";
import { MAX_QTY_PER_ITEM } from "@/config/cart.config";
import type { BuyNowInput } from "@/context/BuyNowContext";
import type { Product } from "@/lib/api/products/product.service";

/**
 * Everything a product page needs to buy one product: the chosen quantity
 * (clamped), the Add to Cart action and the Buy Now payload. Used by both the
 * purchase box and the sticky bar so they can never disagree. It only calls
 * the existing cart API (`addItem`); no cart or Buy Now logic lives here.
 */
export function useProductPurchase(product: Product) {
  const { addItem } = useCart();
  const { quantity, setQuantity } = useProductQuantity();

  const variant = product.variants[0];
  const image =
    product.images.find((i) => i.isPrimary)?.url ?? product.images[0]?.url ?? "";
  const outOfStock = product.inStock === false;

  /* Never offer more than the cart allows, or more than is in stock when the
     API reports a stock level. */
  const maxQty =
    typeof product.stock === "number" && product.stock > 0
      ? Math.min(MAX_QTY_PER_ITEM, Math.floor(product.stock))
      : MAX_QTY_PER_ITEM;
  const qty = Math.min(quantity, maxQty);

  const addToCart = useCallback(() => {
    addItem({
      productId: product.productId,
      variantId: variant.variantId,
      slug: product.slug,
      categorySlug: product.categorySlug,
      name: product.name,
      imageUrl: image,
      price: variant.price,
      mrp: variant.mrp,
      quantity: qty,
    });
  }, [addItem, product, variant, image, qty]);

  const buyNowProduct: BuyNowInput = {
    productId: product.productId,
    variantId: variant.variantId,
    slug: product.slug,
    categorySlug: product.categorySlug,
    name: product.name,
    imageUrl: image,
    price: variant.price,
    mrp: variant.mrp,
    inStock: product.inStock,
  };

  return {
    variant,
    image,
    outOfStock,
    maxQty,
    qty,
    setQuantity,
    addToCart,
    buyNowProduct,
  };
}
