"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CART_STORAGE_KEY, MAX_QTY_PER_ITEM } from "@/config/cart.config";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export interface CartItem {
  productId: string;
  /** Known when added from the product page; optional for listing cards. */
  variantId?: string;
  slug: string;
  categorySlug: string;
  name: string;
  imageUrl: string;
  price: number;
  mrp: number;
  quantity: number;
}

export type AddToCartInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

interface CartContextValue {
  items: CartItem[];
  /** Total units across all lines (drives the header badge). */
  itemCount: number;
  subtotal: number;
  /** Total saved versus MRP. */
  savings: number;
  /** False until localStorage has been read (avoids hydration mismatch). */
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddToCartInput, options?: { openDrawer?: boolean }) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */

const clampQty = (q: number) =>
  Math.min(MAX_QTY_PER_ITEM, Math.max(1, Math.floor(q) || 1));

/** Defensive parse: ignore anything in storage that is not a valid line. */
function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const valid: CartItem[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const e = entry as Partial<CartItem>;
      if (
        typeof e.productId !== "string" ||
        typeof e.slug !== "string" ||
        typeof e.categorySlug !== "string" ||
        typeof e.name !== "string" ||
        typeof e.imageUrl !== "string" ||
        typeof e.price !== "number" ||
        typeof e.mrp !== "number" ||
        typeof e.quantity !== "number"
      ) {
        continue;
      }
      valid.push({
        productId: e.productId,
        variantId: typeof e.variantId === "string" ? e.variantId : undefined,
        slug: e.slug,
        categorySlug: e.categorySlug,
        name: e.name,
        imageUrl: e.imageUrl,
        price: e.price,
        mrp: e.mrp,
        quantity: clampQty(e.quantity),
      });
    }
    return valid;
  } catch {
    return [];
  }
}

/* ---------------------------------------------------------------
   Provider
   --------------------------------------------------------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* Load once on the client */
  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  /* Persist after every change (only once we have loaded, so an empty
     initial state never overwrites a saved cart) */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked (private mode): cart still works in memory */
    }
  }, [items, hydrated]);

  /* Keep multiple tabs in sync */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) setItems(readStoredCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback<CartContextValue["addItem"]>(
    (input, options) => {
      const qty = clampQty(input.quantity ?? 1);

      setItems((prev) => {
        const existing = prev.find((i) => i.productId === input.productId);

        if (existing) {
          return prev.map((i) =>
            i.productId === input.productId
              ? {
                  ...i,
                  quantity: clampQty(i.quantity + qty),
                  // fresher price/variant info wins
                  price: input.price,
                  mrp: input.mrp,
                  variantId: input.variantId ?? i.variantId,
                }
              : i
          );
        }

        const { quantity: _ignored, ...rest } = input;
        void _ignored;
        return [...prev, { ...rest, quantity: qty }];
      });

      if (options?.openDrawer !== false) setIsOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: clampQty(quantity) } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const savings = items.reduce(
      (sum, i) => sum + Math.max(0, i.mrp - i.price) * i.quantity,
      0
    );

    return {
      items,
      itemCount,
      subtotal,
      savings,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [
    items,
    hydrated,
    isOpen,
    openCart,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ---------------------------------------------------------------
   Hook
   --------------------------------------------------------------- */

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
