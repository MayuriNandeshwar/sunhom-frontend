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
import api from "@/lib/axios";
import {
  CUSTOMER_ACCOUNTS_STORAGE_KEY,
  CUSTOMER_SESSION_STORAGE_KEY,
  POPUP_INTERVAL_MS,
} from "@/config/auth.config";
import { useToast } from "@/context/ToastContext";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  createdAt: number;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  error?: string;
  requiresVerification?: boolean;
}

export type AuthModalMode =
  | "login"
  | "register"
  | "forgot-password"
  | "verify-email";

interface CustomerAuthContextValue {
  user: CustomerUser | null;
  isLoggedIn: boolean;
  hydrated: boolean;
  isLoginModalOpen: boolean;
  modalMode: AuthModalMode;
  registeredEmail: string;
  setRegisteredEmail: (email: string) => void;
  openLoginModal: (mode?: AuthModalMode) => void;
  closeLoginModal: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  verifyEmail: (email: string, code: string) => Promise<AuthResult>;
  resendVerification: (email: string) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  logout: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextValue | null>(null);

/* ---------------------------------------------------------------
   Helpers for Session Storage
   --------------------------------------------------------------- */
function readStoredSession(): CustomerUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.id && parsed.email) {
      return parsed as CustomerUser;
    }
    return null;
  } catch {
    return null;
  }
}

function saveStoredSession(user: CustomerUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(CUSTOMER_SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CUSTOMER_SESSION_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

/* ---------------------------------------------------------------
   Provider
   --------------------------------------------------------------- */
export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthModalMode>("login");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { toast } = useToast();

  /* Hydrate session from localStorage */
  useEffect(() => {
    const active = readStoredSession();
    if (active) {
      setUser(active);
    }
    setHydrated(true);
  }, []);

  /* Cross-tab sync */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CUSTOMER_SESSION_STORAGE_KEY) {
        setUser(readStoredSession());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ---------------------------------------------------------------
     Auto Pop-Up Every 30 Seconds If Not Logged In and Modal is Closed
     --------------------------------------------------------------- */
  useEffect(() => {
    // If not hydrated, user is already logged in, or modal is currently open,
    // do not run the auto popup timer.
    if (!hydrated || user || isLoginModalOpen) return;

    const timer = setInterval(() => {
      // Check if user still not logged in
      const current = readStoredSession();
      if (!current) {
        setIsLoginModalOpen((prevOpen) => {
          // If modal is already open, do NOT touch modalMode or interrupt the user
          if (prevOpen) return prevOpen;
          setModalMode("login");
          return true;
        });
      }
    }, POPUP_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [hydrated, user, isLoginModalOpen]);

  /* Open / Close modal */
  const openLoginModal = useCallback((mode: AuthModalMode = "login") => {
    setModalMode(mode);
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  /* ---------------------------------------------------------------
     Login
     Calls backend POST /api/auth/customer/login
     --------------------------------------------------------------- */
  const login = useCallback(
    async (emailInput: string, passwordInput: string): Promise<AuthResult> => {
      const email = emailInput.trim().toLowerCase();
      const password = passwordInput.trim();

      if (!email || !password) {
        return { success: false, error: "Please enter both email and password." };
      }

      try {
        const response = await api.post("/api/auth/customer/login", {
          identifier: email,
          password: password,
        });

        const data = response.data;
        const sessionUser: CustomerUser = {
          id: data.userId || `cust-${Date.now()}`,
          name: data.name || email.split("@")[0],
          email: email,
          mobile: data.mobile || undefined,
          createdAt: Date.now(),
        };

        setUser(sessionUser);
        saveStoredSession(sessionUser);
        setIsLoginModalOpen(false);

        toast({
          message: `Welcome back, ${sessionUser.name}!`,
          variant: "success",
        });

        return { success: true };
      } catch (err: unknown) {
        const anyErr = err as {
          response?: { data?: { message?: string; error?: string } };
          message?: string;
        };
        const errorMsg =
          anyErr.response?.data?.message ||
          anyErr.response?.data?.error ||
          "Invalid email or password. Please try again.";

        // Check if email verification is needed
        if (
          errorMsg.toLowerCase().includes("verify") ||
          errorMsg.toLowerCase().includes("verification")
        ) {
          setRegisteredEmail(email);
          setModalMode("verify-email");
          return {
            success: false,
            error: errorMsg,
            requiresVerification: true,
          };
        }

        return { success: false, error: errorMsg };
      }
    },
    [toast]
  );

  /* ---------------------------------------------------------------
     Register
     Calls backend POST /api/auth/customer/register
     Real-world flow: does NOT auto-login. Prompts user to sign in!
     --------------------------------------------------------------- */
  const register = useCallback(
    async (input: RegisterInput): Promise<AuthResult> => {
      const name = input.name.trim();
      const email = input.email.trim().toLowerCase();
      const password = input.password.trim();
      const mobile = input.mobile?.trim() || "";

      if (!name) {
        return { success: false, error: "Please enter your name." };
      }
      if (!email || !email.includes("@")) {
        return { success: false, error: "Please enter a valid email address." };
      }
      if (!password || password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters long.",
        };
      }

      try {
        const response = await api.post("/api/auth/customer/register", {
          name,
          email,
          password,
          mobile: mobile || null,
        });

        const data = response.data;
        setRegisteredEmail(email);

        if (data.requiresVerification) {
          setModalMode("verify-email");
          toast({
            message: "Verification code sent to your email! Please enter it to continue.",
            variant: "success",
          });
          return {
            success: true,
            requiresVerification: true,
            message: data.message,
          };
        } else {
          // Switch to login tab and ask user to log in with their credentials
          setModalMode("login");
          toast({
            message: "Account created successfully! Please sign in with your password.",
            variant: "success",
          });
          return {
            success: true,
            message: "Account created successfully! Please enter your password to sign in.",
          };
        }
      } catch (err: unknown) {
        const anyErr = err as {
          response?: { data?: { message?: string; error?: string } };
          message?: string;
        };
        const errorMsg =
          anyErr.response?.data?.message ||
          anyErr.response?.data?.error ||
          "Registration failed. Please try again.";

        return { success: false, error: errorMsg };
      }
    },
    [toast]
  );

  /* ---------------------------------------------------------------
     Verify Email
     Calls backend POST /api/auth/customer/verify-email
     --------------------------------------------------------------- */
  const verifyEmail = useCallback(
    async (emailInput: string, codeInput: string): Promise<AuthResult> => {
      const email = emailInput.trim().toLowerCase();
      const code = codeInput.trim();

      if (!email) {
        return { success: false, error: "Please enter your email address." };
      }
      if (!code || code.length < 4) {
        return { success: false, error: "Please enter a valid verification code." };
      }

      try {
        const response = await api.post("/api/auth/customer/verify-email", {
          email,
          code,
        });

        const data = response.data;
        setModalMode("login");

        toast({
          message: data.message || "Email verified! You can now sign in.",
          variant: "success",
        });

        return {
          success: true,
          message: data.message || "Email verified! You can now sign in.",
        };
      } catch (err: unknown) {
        const anyErr = err as {
          response?: { data?: { message?: string; error?: string } };
          message?: string;
        };
        const errorMsg =
          anyErr.response?.data?.message ||
          anyErr.response?.data?.error ||
          "Invalid or expired verification code.";

        return { success: false, error: errorMsg };
      }
    },
    [toast]
  );

  /* ---------------------------------------------------------------
     Resend Verification Code
     Calls backend POST /api/auth/customer/resend-verification
     --------------------------------------------------------------- */
  const resendVerification = useCallback(
    async (emailInput: string): Promise<AuthResult> => {
      const email = emailInput.trim().toLowerCase();
      if (!email) {
        return { success: false, error: "Please enter your email address." };
      }

      try {
        const response = await api.post(
          "/api/auth/customer/resend-verification",
          { email }
        );
        toast({
          message: response.data.message || "New verification code sent!",
          variant: "success",
        });
        return { success: true, message: response.data.message };
      } catch (err: unknown) {
        const anyErr = err as {
          response?: { data?: { message?: string; error?: string } };
          message?: string;
        };
        const errorMsg =
          anyErr.response?.data?.message ||
          anyErr.response?.data?.error ||
          "Failed to resend verification code.";
        return { success: false, error: errorMsg };
      }
    },
    [toast]
  );

  /* ---------------------------------------------------------------
     Reset Password / Forgot Password
     Calls backend POST /api/auth/customer/forgot-password
     --------------------------------------------------------------- */
  const resetPassword = useCallback(
    async (emailInput: string): Promise<AuthResult> => {
      const email = emailInput.trim().toLowerCase();
      if (!email || !email.includes("@")) {
        return { success: false, error: "Please enter a valid email address." };
      }

      try {
        const response = await api.post("/api/auth/customer/forgot-password", {
          email,
        });
        toast({
          message:
            response.data.message ||
            "Password reset instructions have been sent to your email.",
          variant: "success",
        });
        return {
          success: true,
          message:
            response.data.message ||
            "If an account exists with this email, password reset instructions have been sent.",
        };
      } catch (err: unknown) {
        const anyErr = err as {
          response?: { data?: { message?: string; error?: string } };
          message?: string;
        };
        const errorMsg =
          anyErr.response?.data?.message ||
          anyErr.response?.data?.error ||
          "Failed to process password reset request.";
        return { success: false, error: errorMsg };
      }
    },
    [toast]
  );

  /* Logout */
  const logout = useCallback(() => {
    setUser(null);
    saveStoredSession(null);
    toast({
      message: "You have been signed out.",
      variant: "success",
    });
  }, [toast]);

  const value = useMemo<CustomerAuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      hydrated,
      isLoginModalOpen,
      modalMode,
      registeredEmail,
      setRegisteredEmail,
      openLoginModal,
      closeLoginModal,
      login,
      register,
      verifyEmail,
      resendVerification,
      resetPassword,
      logout,
    }),
    [
      user,
      hydrated,
      isLoginModalOpen,
      modalMode,
      registeredEmail,
      openLoginModal,
      closeLoginModal,
      login,
      register,
      verifyEmail,
      resendVerification,
      resetPassword,
      logout,
    ]
  );

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

/* ---------------------------------------------------------------
   Hook
   --------------------------------------------------------------- */
export function useCustomerAuth(): CustomerAuthContextValue {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error(
      "useCustomerAuth must be used within a CustomerAuthProvider"
    );
  }
  return context;
}
