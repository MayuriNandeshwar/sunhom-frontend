"use client";

import { useCallback, useEffect, useState } from "react";
import {
  readStoredProof,
  writeStoredProof,
  type PaymentProof,
} from "@/lib/paymentProof";

/**
 * The uploaded payment screenshot, kept in sessionStorage so a refresh on
 * /payment does not lose it. Gone when the tab closes.
 */
export function usePaymentProof() {
  const [proof, setProofState] = useState<PaymentProof | null>(null);
  /** False until sessionStorage has been read (avoids hydration mismatch). */
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProofState(readStoredProof());
    setHydrated(true);
  }, []);

  /** Returns false (and keeps the old proof) if it could not be stored. */
  const saveProof = useCallback((next: PaymentProof): boolean => {
    if (!writeStoredProof(next)) return false;
    setProofState(next);
    return true;
  }, []);

  const removeProof = useCallback(() => {
    writeStoredProof(null);
    setProofState(null);
  }, []);

  return { proof, hydrated, saveProof, removeProof };
}
