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
import {
  MAX_WISHLIST_ITEMS,
  WISHLIST_HREF,
  WISHLIST_STORAGE_KEY,
} from "@/config/wishlist.config";
import { useToast } from "@/context/ToastContext";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export interface WishlistItem {
  productId: string;
  /** Known when saved from the product page; optional for listing cards. */
  variantId?: string;
  slug: string;
  categorySlug: string;
  name: string;
  imageUrl: string;
  price: number;
  mrp: number;
  shortDescription?: string;
  /** Snapshot at save time. `undefined` is treated as available. */
  inStock?: boolean;
  /** Epoch ms. Newest saves are listed first. */
  addedAt: number;
}

export type WishlistInput = Omit<WishlistItem, "addedAt">;

interface WishlistOptions {
  /** Skip the toast (used when the caller shows its own message). */
  silent?: boolean;
}

interface WishlistContextValue {
  /** Newest first. */
  items: WishlistItem[];
  /** Number of saved products (drives the header badge). */
  count: number;
  /** False until localStorage has been read (avoids hydration mismatch). */
  hydrated: boolean;
  isInWishlist: (productId: string) => boolean;
  addItem: (input: WishlistInput, options?: WishlistOptions) => void;
  removeItem: (productId: string, options?: WishlistOptions) => void;
  /** Adds or removes. Returns true when the product is now saved. */
  toggleItem: (input: WishlistInput) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */

/** Defensive parse: ignore anything in storage that is not a valid entry. */
function readStoredWishlist(): WishlistItem[] {
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const seen = new Set<string>();
    const valid: WishlistItem[] = [];

    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const e = entry as Partial<WishlistItem>;
      if (
        typeof e.productId !== "string" ||
        typeof e.slug !== "string" ||
        typeof e.categorySlug !== "string" ||
        typeof e.name !== "string" ||
        typeof e.imageUrl !== "string" ||
        typeof e.price !== "number" ||
        typeof e.mrp !== "number"
      ) {
        continue;
      }
      if (seen.has(e.productId)) continue;
      seen.add(e.productId);

      valid.push({
        productId: e.productId,
        variantId: typeof e.variantId === "string" ? e.variantId : undefined,
        slug: e.slug,
        categorySlug: e.categorySlug,
        name: e.name,
        imageUrl: e.imageUrl,
        price: e.price,
        mrp: e.mrp,
        shortDescription:
          typeof e.shortDescription === "string" ? e.shortDescription : undefined,
        inStock: typeof e.inStock === "boolean" ? e.inStock : undefined,
        addedAt: typeof e.addedAt === "number" ? e.addedAt : 0,
      });
    }

    return valid.sort((a, b) => b.addedAt - a.addedAt);
  } catch {
    return [];
  }
}

/* ---------------------------------------------------------------
   Provider
   Must sit inside <ToastProvider>. Independent of <CartProvider>.
   --------------------------------------------------------------- */

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* Always-current copy so back-to-back calls in one tick never read a
     stale list (state alone would lag until the next render). */
  const itemsRef = useRef<WishlistItem[]>([]);

  const commit = useCallback((next: WishlistItem[]) => {
    itemsRef.current = next;
    setItems(next);
  }, []);

  /* Load once on the client */
  useEffect(() => {
    commit(readStoredWishlist());
    setHydrated(true);
  }, [commit]);

  /* Persist after every change (only once we have loaded, so an empty
     initial state never overwrites a saved wishlist) */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked (private mode): wishlist still works in memory */
    }
  }, [items, hydrated]);

  /* Keep multiple tabs in sync */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === WISHLIST_STORAGE_KEY) commit(readStoredWishlist());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [commit]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  /* Core insert; `item` already carries its addedAt (Undo reuses it). */
  const insert = useCallback(
    (item: WishlistItem, silent: boolean) => {
      const current = itemsRef.current;
      if (current.some((i) => i.productId === item.productId)) return;

      if (current.length >= MAX_WISHLIST_ITEMS) {
        toast({
          id: "wishlist-full",
          variant: "error",
          message: `Your wishlist is full (${MAX_WISHLIST_ITEMS} items). Remove something to save more.`,
          action: { label: "View", href: WISHLIST_HREF },
        });
        return;
      }

      commit(
        [item, ...current].sort((a, b) => b.addedAt - a.addedAt)
      );

      if (!silent) {
        toast({
          id: `wishlist:${item.productId}`,
          variant: "wishlist",
          message: "Added to your wishlist",
          action: { label: "View", href: WISHLIST_HREF },
        });
      }
    },
    [commit, toast]
  );

  const addItem = useCallback<WishlistContextValue["addItem"]>(
    (input, options) => {
      insert({ ...input, addedAt: Date.now() }, options?.silent === true);
    },
    [insert]
  );

  const removeItem = useCallback<WishlistContextValue["removeItem"]>(
    (productId, options) => {
      const current = itemsRef.current;
      const removed = current.find((i) => i.productId === productId);
      if (!removed) return;

      commit(current.filter((i) => i.productId !== productId));

      if (options?.silent !== true) {
        toast({
          id: `wishlist:${productId}`,
          variant: "wishlist",
          message: "Removed from your wishlist",
          action: {
            label: "Undo",
            onClick: () => insert(removed, true),
          },
        });
      }
    },
    [commit, insert, toast]
  );

  const toggleItem = useCallback<WishlistContextValue["toggleItem"]>(
    (input) => {
      const exists = itemsRef.current.some(
        (i) => i.productId === input.productId
      );
      if (exists) {
        removeItem(input.productId);
        return false;
      }
      addItem(input);
      /* addItem can refuse when the list is full */
      return itemsRef.current.some((i) => i.productId === input.productId);
    },
    [addItem, removeItem]
  );

  const clearWishlist = useCallback(() => commit([]), [commit]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      hydrated,
      isInWishlist,
      addItem,
      removeItem,
      toggleItem,
      clearWishlist,
    }),
    [
      items,
      hydrated,
      isInWishlist,
      addItem,
      removeItem,
      toggleItem,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

/* ---------------------------------------------------------------
   Hook
   --------------------------------------------------------------- */

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  }
  return ctx;
}
