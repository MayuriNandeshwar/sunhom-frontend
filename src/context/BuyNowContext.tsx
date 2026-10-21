"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { MAX_QTY_PER_ITEM } from "@/config/cart.config";
import {
  BUY_NOW_RETURN_KEY,
  BUY_NOW_STORAGE_KEY,
  CHECKOUT_HREF,
} from "@/config/buynow.config";
import { CONTINUE_SHOPPING_HREF } from "@/config/cart.config";
/* Type-only imports: Buy Now reuses the cart line shape and never touches
   cart state. */
import type { AddToCartInput, CartItem } from "@/context/CartContext";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

/** A single product being bought right now. Same shape as a cart line. */
export type BuyNowItem = CartItem;

/** What a button must provide to start a Buy Now. */
export type BuyNowInput = Omit<AddToCartInput, "quantity"> & {
  /** Stock snapshot from the card or page. `undefined` is treated as available. */
  inStock?: boolean;
};

interface BuyNowContextValue {
  /** The product being purchased, or null when there is no Buy Now. */
  item: BuyNowItem | null;
  /** False until sessionStorage has been read (avoids hydration mismatch). */
  hydrated: boolean;
  subtotal: number;
  /** Total saved versus MRP. */
  savings: number;
  /** Product page to send the visitor back to when `item` is null. */
  returnHref: string;
  /**
   * Stores the product and quantity, then goes to /checkout.
   * Returns false (and does nothing) if the product is out of stock.
   */
  startBuyNow: (input: BuyNowInput, quantity?: number) => boolean;
  updateQuantity: (quantity: number) => void;
  clearBuyNow: () => void;
}

const BuyNowContext = createContext<BuyNowContextValue | null>(null);

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */

const clampQty = (q: number) =>
  Math.min(MAX_QTY_PER_ITEM, Math.max(1, Math.floor(q) || 1));

const productHref = (i: Pick<BuyNowItem, "categorySlug" | "slug">) =>
  `/collections/${i.categorySlug}/${i.slug}`;

/** Only same-site relative paths are ever used as a redirect target. */
const isSafePath = (p: unknown): p is string =>
  typeof p === "string" && p.startsWith("/") && !p.startsWith("//");

/** Defensive parse: anything in storage that is not a valid line is ignored. */
function readStoredItem(): BuyNowItem | null {
  try {
    const raw = window.sessionStorage.getItem(BUY_NOW_STORAGE_KEY);
    if (!raw) return null;
    const e = JSON.parse(raw) as Partial<BuyNowItem> | null;
    if (
      !e ||
      typeof e !== "object" ||
      typeof e.productId !== "string" ||
      typeof e.slug !== "string" ||
      typeof e.categorySlug !== "string" ||
      typeof e.name !== "string" ||
      typeof e.imageUrl !== "string" ||
      typeof e.price !== "number" ||
      typeof e.mrp !== "number" ||
      typeof e.quantity !== "number"
    ) {
      return null;
    }
    return {
      productId: e.productId,
      variantId: typeof e.variantId === "string" ? e.variantId : undefined,
      slug: e.slug,
      categorySlug: e.categorySlug,
      name: e.name,
      imageUrl: e.imageUrl,
      price: e.price,
      mrp: e.mrp,
      quantity: clampQty(e.quantity),
    };
  } catch {
    return null;
  }
}

function readStoredReturnHref(): string | null {
  try {
    const raw = window.sessionStorage.getItem(BUY_NOW_RETURN_KEY);
    return isSafePath(raw) ? raw : null;
  } catch {
    return null;
  }
}

function writeItem(item: BuyNowItem | null) {
  try {
    if (item) {
      window.sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(item));
    } else {
      window.sessionStorage.removeItem(BUY_NOW_STORAGE_KEY);
    }
  } catch {
    /* storage blocked: Buy Now still works in memory for this page view */
  }
}

/* ---------------------------------------------------------------
   Provider
   Independent of <CartProvider> and <WishlistProvider>.
   --------------------------------------------------------------- */

export function BuyNowProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [item, setItem] = useState<BuyNowItem | null>(null);
  const [returnHref, setReturnHref] = useState<string>(CONTINUE_SHOPPING_HREF);
  const [hydrated, setHydrated] = useState(false);

  /* Always-current copy for callbacks that run right after a write. */
  const itemRef = useRef<BuyNowItem | null>(null);

  const commit = useCallback((next: BuyNowItem | null) => {
    itemRef.current = next;
    setItem(next);
    writeItem(next);
  }, []);

  /* Load once on the client */
  useEffect(() => {
    const stored = readStoredItem();
    itemRef.current = stored;
    setItem(stored);

    const savedReturn = readStoredReturnHref();
    if (stored) setReturnHref(productHref(stored));
    else if (savedReturn) setReturnHref(savedReturn);

    setHydrated(true);
  }, []);

  const startBuyNow = useCallback<BuyNowContextValue["startBuyNow"]>(
    (input, quantity) => {
      if (input.inStock === false) return false;

      const next: BuyNowItem = {
        productId: input.productId,
        variantId: input.variantId,
        slug: input.slug,
        categorySlug: input.categorySlug,
        name: input.name,
        imageUrl: input.imageUrl,
        price: input.price,
        mrp: input.mrp,
        quantity: clampQty(quantity ?? 1),
      };

      /* Write synchronously so /checkout can read it on first render. */
      commit(next);

      const back = productHref(next);
      setReturnHref(back);
      try {
        window.sessionStorage.setItem(BUY_NOW_RETURN_KEY, back);
      } catch {
        /* ignore */
      }

      router.push(CHECKOUT_HREF);
      return true;
    },
    [commit, router]
  );

  const updateQuantity = useCallback(
    (quantity: number) => {
      const current = itemRef.current;
      if (!current) return;
      commit({ ...current, quantity: clampQty(quantity) });
    },
    [commit]
  );

  const clearBuyNow = useCallback(() => commit(null), [commit]);

  const value = useMemo<BuyNowContextValue>(() => {
    const subtotal = item ? item.price * item.quantity : 0;
    const savings = item
      ? Math.max(0, item.mrp - item.price) * item.quantity
      : 0;
    return {
      item,
      hydrated,
      subtotal,
      savings,
      returnHref,
      startBuyNow,
      updateQuantity,
      clearBuyNow,
    };
  }, [item, hydrated, returnHref, startBuyNow, updateQuantity, clearBuyNow]);

  return (
    <BuyNowContext.Provider value={value}>{children}</BuyNowContext.Provider>
  );
}

/* ---------------------------------------------------------------
   Hook
   --------------------------------------------------------------- */

export function useBuyNow(): BuyNowContextValue {
  const ctx = useContext(BuyNowContext);
  if (!ctx) {
    throw new Error("useBuyNow must be used inside <BuyNowProvider>");
  }
  return ctx;
}
