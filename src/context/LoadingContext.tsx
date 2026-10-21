"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import SunhomLoader from "@/components/common/SunhomLoader";

interface LoadingContextValue {
  isLoading: boolean;
  message: string | undefined;
  showLoading: (message?: string, timeoutMs?: number) => void;
  hideLoading: () => void;
  withLoading: <T>(
    promiseOrFn: Promise<T> | (() => Promise<T>),
    message?: string
  ) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideLoading = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsLoading(false);
    setMessage(undefined);
  }, []);

  const showLoading = useCallback(
    (msg?: string, timeoutMs: number = 8000) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setMessage(msg);
      setIsLoading(true);

      // Failsafe auto-timeout so loading screen never permanently blocks user
      timerRef.current = setTimeout(() => {
        hideLoading();
      }, timeoutMs);
    },
    [hideLoading]
  );

  const withLoading = useCallback(
    async <T,>(
      promiseOrFn: Promise<T> | (() => Promise<T>),
      msg?: string
    ): Promise<T> => {
      showLoading(msg);
      try {
        const result =
          typeof promiseOrFn === "function" ? await promiseOrFn() : await promiseOrFn;
        return result;
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        message,
        showLoading,
        hideLoading,
        withLoading,
      }}
    >
      {children}
      {isLoading && (
        <SunhomLoader
          variant="fullscreen"
          text={message || "Please wait…"}
          glow
        />
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextValue {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
