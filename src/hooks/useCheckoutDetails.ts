"use client";

import { useCallback, useEffect, useState } from "react";
import { CHECKOUT_DETAILS_STORAGE_KEY } from "@/config/checkout.config";
import {
  EMPTY_DETAILS,
  normalizeDetails,
  parseStoredDetails,
  type CheckoutDetails,
  type CheckoutField,
} from "@/lib/checkoutValidation";

function write(details: CheckoutDetails) {
  try {
    window.sessionStorage.setItem(
      CHECKOUT_DETAILS_STORAGE_KEY,
      JSON.stringify(details)
    );
  } catch {
    /* storage blocked (private mode): the form still works in memory */
  }
}

/**
 * Customer + shipping details for the current checkout, kept in
 * sessionStorage. Drafts are saved as the customer types, so a refresh
 * never loses progress. Independent of cart, wishlist and Buy Now state.
 */
export function useCheckoutDetails() {
  const [details, setDetails] = useState<CheckoutDetails>(EMPTY_DETAILS);
  /** False until sessionStorage has been read (avoids hydration mismatch). */
  const [hydrated, setHydrated] = useState(false);

  /* Load once on the client */
  useEffect(() => {
    try {
      setDetails(
        parseStoredDetails(
          window.sessionStorage.getItem(CHECKOUT_DETAILS_STORAGE_KEY)
        )
      );
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  /* Persist drafts (only after loading, so an empty initial state never
     overwrites saved details) */
  useEffect(() => {
    if (hydrated) write(details);
  }, [details, hydrated]);

  const setField = useCallback((field: CheckoutField, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Trims and saves immediately, returns the cleaned details. */
  const commit = useCallback((): CheckoutDetails => {
    const cleaned = normalizeDetails(details);
    setDetails(cleaned);
    write(cleaned);
    return cleaned;
  }, [details]);

  return { details, hydrated, setField, commit };
}
