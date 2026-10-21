"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProductQuantityValue {
  quantity: number;
  setQuantity: (next: number) => void;
}

const ProductQuantityContext = createContext<ProductQuantityValue | null>(null);

/**
 * The quantity chosen on a product page. Shared by the purchase box and the
 * sticky bar so both always show the same number. Mount it with
 * `key={product.productId}` so moving to another product starts at 1 again.
 * Independent of cart, wishlist and Buy Now state.
 */
export function ProductQuantityProvider({
  children,
  initialQuantity = 1,
}: {
  children: ReactNode;
  initialQuantity?: number;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const value = useMemo(() => ({ quantity, setQuantity }), [quantity]);

  return (
    <ProductQuantityContext.Provider value={value}>
      {children}
    </ProductQuantityContext.Provider>
  );
}

export function useProductQuantity(): ProductQuantityValue {
  const ctx = useContext(ProductQuantityContext);
  if (!ctx) {
    throw new Error(
      "useProductQuantity must be used inside <ProductQuantityProvider>"
    );
  }
  return ctx;
}
