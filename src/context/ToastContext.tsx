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
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Heart, X } from "lucide-react";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export type ToastVariant = "success" | "error" | "wishlist";

export interface ToastAction {
  label: string;
  /** Navigate somewhere... */
  href?: string;
  /** ...or run something. The toast closes after either. */
  onClick?: () => void;
}

export interface ToastInput {
  /**
   * Optional stable id. Showing a toast with an id that is already on
   * screen replaces it (and restarts its timer) instead of stacking, so
   * rapid heart-tapping never builds a pile of toasts.
   */
  id?: string;
  message: string;
  variant?: ToastVariant;
  action?: ToastAction;
  /** Milliseconds. Default 3500. */
  duration?: number;
}

interface ToastItem extends ToastInput {
  id: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3500;
const MAX_VISIBLE = 3;

/* ---------------------------------------------------------------
   Provider (also renders the viewport)
   --------------------------------------------------------------- */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) clearTimeout(t);
    timers.current.delete(id);
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback<ToastContextValue["toast"]>(
    (input) => {
      const id = input.id ?? `toast-${++counter.current}`;
      const item: ToastItem = {
        ...input,
        id,
        variant: input.variant ?? "success",
      };

      setToasts((prev) => {
        const without = prev.filter((x) => x.id !== id);
        return [...without, item].slice(-MAX_VISIBLE);
      });

      const existing = timers.current.get(id);
      if (existing) clearTimeout(existing);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), input.duration ?? DEFAULT_DURATION)
      );
    },
    [dismiss]
  );

  /* Clear pending timers on unmount */
  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

/* ---------------------------------------------------------------
   Viewport
   Sits under the fixed header (40px utility bar + 100px nav) so it
   never collides with the cookie banner at the bottom.
   --------------------------------------------------------------- */

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 top-[152px] z-[200] flex flex-col items-stretch gap-2 px-4 sm:items-end sm:px-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            role="status"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl bg-[var(--brand-teal)] px-4 py-3 text-white shadow-xl sm:w-auto sm:min-w-[300px] sm:max-w-sm"
          >
            <ToastIcon variant={t.variant} />

            <p className="flex-1 min-w-0 font-epilogue text-sm leading-snug">
              {t.message}
            </p>

            {t.action &&
              (t.action.href ? (
                <Link
                  href={t.action.href}
                  onClick={() => {
                    t.action?.onClick?.();
                    onDismiss(t.id);
                  }}
                  className="shrink-0 text-sm font-medium text-[var(--brand-gold)] underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {t.action.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    t.action?.onClick?.();
                    onDismiss(t.id);
                  }}
                  className="shrink-0 text-sm font-medium text-[var(--brand-gold)] underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {t.action.label}
                </button>
              ))}

            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss notification"
              className="-mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const base = "h-5 w-5 shrink-0";
  if (variant === "wishlist") {
    return <Heart className={`${base} fill-[var(--brand-gold)] text-[var(--brand-gold)]`} />;
  }
  if (variant === "error") {
    return <AlertCircle className={`${base} text-red-300`} />;
  }
  return <Check className={`${base} text-[var(--brand-gold)]`} />;
}

/* ---------------------------------------------------------------
   Hook
   --------------------------------------------------------------- */

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}
