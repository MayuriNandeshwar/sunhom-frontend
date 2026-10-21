"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SunhomSpinner from "./SunhomSpinner";

function NavigationLoadingContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isNavigating, setIsNavigating] = useState(false);
  const [navTarget, setNavTarget] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When route changes, dismiss loading state immediately
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    setIsNavigating(false);
    setNavTarget("");
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks (open in new tab, etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check for Link (<a> tag)
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        const targetAttr = anchor.getAttribute("target");

        // Ignore if opening in new tab or external
        if (targetAttr === "_blank" || !href) return;
        if (href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
          return;
        }

        try {
          const destUrl = new URL(anchor.href, window.location.href);
          const currentUrl = new URL(window.location.href);

          // Must be same origin
          if (destUrl.origin !== currentUrl.origin) return;

          // Check if destination is different from current page
          const isSamePage =
            destUrl.pathname === currentUrl.pathname &&
            destUrl.search === currentUrl.search;

          if (isSamePage) {
            // If it's just a hash or same page, don't trigger loading
            return;
          }

          // Trigger loading if navigation takes more than 100ms
          if (timerRef.current) clearTimeout(timerRef.current);
          if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

          const displayLabel = anchor.textContent?.trim() || "Loading…";

          timerRef.current = setTimeout(() => {
            setNavTarget(displayLabel.length > 25 ? "Loading page…" : displayLabel);
            setIsNavigating(true);
          }, 100);

          // Safety timeout in case navigation is cancelled or aborted
          safetyTimeoutRef.current = setTimeout(() => {
            setIsNavigating(false);
          }, 8000);
        } catch {
          // If URL parsing fails, ignore
        }
        return;
      }

      // 2. Check for button with data-loading="true"
      const btn = target.closest("button[data-loading='true']");
      if (btn) {
        if (timerRef.current) clearTimeout(timerRef.current);
        const label = btn.getAttribute("data-loading-text") || "Please wait…";
        timerRef.current = setTimeout(() => {
          setNavTarget(label);
          setIsNavigating(true);
        }, 80);
      }
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  if (!isNavigating) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center animate-in fade-in duration-200"
      aria-live="polite"
    >
      {/* Subtle luxury backdrop */}
      <div className="absolute inset-0 bg-[#F9F6F1]/60 backdrop-blur-[2px] transition-opacity duration-300" />

      {/* Floating luxury glass capsule */}
      <div className="relative z-10 flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/95 shadow-2xl border border-[var(--border-soft)]/80 scale-100 hover:scale-105 transition-all">
        {/* Clockwise rotating sun symbol */}
        <SunhomSpinner size="md" glow speed="normal" />

        <div className="flex flex-col text-left">
          <span className="font-playfair font-semibold text-xs tracking-[0.18em] text-[var(--text-heading)] uppercase leading-none">
            SUNHOM
          </span>
          <span className="font-epilogue text-[11px] text-[var(--brand-gold)] font-medium tracking-wide mt-0.5 leading-none animate-pulse">
            {navTarget || "Loading…"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function NavigationLoadingListener() {
  return (
    <Suspense fallback={null}>
      <NavigationLoadingContent />
    </Suspense>
  );
}
