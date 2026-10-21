"use client";

import { useEffect, useState } from "react";
import {
  HEADER_OFFSET_PX,
  PURCHASE_SECTION_ID,
} from "@/config/stickyBar.config";
import { hasScrolledPastPurchase, shouldShowBar } from "@/lib/stickyBar";

/**
 * True while the visitor has scrolled below the purchase box (and the footer
 * is not on screen). Uses IntersectionObserver, so there is no scroll
 * listener to run on every frame. Starts false, so the server render and the
 * first client render match.
 */
export function useStickyBarVisible(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const purchase = document.getElementById(PURCHASE_SECTION_ID);
    if (!purchase || typeof IntersectionObserver === "undefined") return;

    const footer = document.querySelector("footer");
    let pastPurchase = false;
    let footerInView = false;
    const update = () => setVisible(shouldShowBar({ pastPurchase, footerInView }));

    const purchaseObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        pastPurchase = hasScrolledPastPurchase({
          isIntersecting: entry.isIntersecting,
          bottom: entry.boundingClientRect.bottom,
          rootTop: entry.rootBounds?.top ?? HEADER_OFFSET_PX,
        });
        update();
      },
      { rootMargin: `-${HEADER_OFFSET_PX}px 0px 0px 0px` }
    );
    purchaseObserver.observe(purchase);

    let footerObserver: IntersectionObserver | undefined;
    if (footer) {
      footerObserver = new IntersectionObserver((entries) => {
        footerInView = entries[entries.length - 1].isIntersecting;
        update();
      });
      footerObserver.observe(footer);
    }

    return () => {
      purchaseObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  return visible;
}
