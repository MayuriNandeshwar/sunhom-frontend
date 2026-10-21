"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import SunhomSpinner from "@/components/common/SunhomSpinner";

export default function CustomerLoginModal() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    modalMode,
    openLoginModal,
    registeredEmail,
    setRegisteredEmail,
    login,
    register,
    verifyEmail,
    resendVerification,
    resetPassword,
  } = useCustomerAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Sync registered email into local state when available
  useEffect(() => {
    if (registeredEmail) {
      setEmail(registeredEmail);
    }
  }, [registeredEmail]);

  // Clear transient error when modal opens or closes
  useEffect(() => {
    if (isLoginModalOpen) {
      setError(null);
    } else {
      setSuccessMessage(null);
      setError(null);
      setPassword("");
      setVerificationCode("");
    }
  }, [isLoginModalOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (modalMode === "login") {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || "Invalid credentials");
        }
      } else if (modalMode === "register") {
        const res = await register({
          name,
          email,
          password,
          mobile,
        });

        if (!res.success) {
          setError(res.error || "Registration failed");
        } else {
          // Real-world flow: do not auto-login!
          // Switch to login tab, keep email filled, clear password, and prompt user to login.
          setPassword("");
          setName("");
          setMobile("");
          setSuccessMessage(
            res.message ||
              "Account created successfully! Please enter your password to sign in."
          );
        }
      } else if (modalMode === "verify-email") {
        const res = await verifyEmail(email, verificationCode);
        if (!res.success) {
          setError(res.error || "Verification failed");
        } else {
          setSuccessMessage(
            res.message ||
              "Email verified successfully! Please sign in with your password."
          );
          setVerificationCode("");
          openLoginModal("login");
        }
      } else if (modalMode === "forgot-password") {
        const res = await resetPassword(email);
        if (!res.success) {
          setError(res.error || "Failed to process password reset request");
        } else {
          setSuccessMessage(
            res.message ||
              "If an account exists with this email, we have sent password reset instructions to your inbox."
          );
        }
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Please enter your email address to resend verification code.");
      return;
    }
    setError(null);
    setIsResending(true);
    try {
      const res = await resendVerification(email);
      if (res.success) {
        setSuccessMessage(
          res.message || "A new 6-digit verification code has been sent!"
        );
      } else {
        setError(res.error || "Failed to resend code.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex min-h-full items-center justify-center p-3 sm:p-4 overflow-y-auto"
        aria-labelledby="customer-auth-modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Dark Grey Translucent Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeLoginModal}
          className="fixed inset-0 bg-neutral-900/75 backdrop-blur-sm transition-opacity"
        />

        {/* Centered Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-[420px] bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E8E1D7] overflow-hidden z-10 my-auto flex flex-col max-h-[calc(100vh-2rem)]"
        >
          {/* Close Button (X) */}
          <button
            onClick={closeLoginModal}
            aria-label="Close modal"
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-700 hover:text-black transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="pt-5 pb-3.5 px-6 sm:px-7 text-center border-b border-[#EFEAE2] shrink-0">
            <div className="flex justify-center mb-1.5">
              <Image
                src="/logo/sunhomtrans.png"
                alt="SUNHOM"
                width={105}
                height={36}
                className="object-contain h-7 w-auto"
                priority
              />
            </div>
            <h2
              id="customer-auth-modal-title"
              className="font-serif text-xl sm:text-2xl font-normal text-gray-900 tracking-tight"
            >
              {modalMode === "login"
                ? "Sign In"
                : modalMode === "register"
                ? "Create Account"
                : modalMode === "verify-email"
                ? "Verify Email"
                : "Password Assistance"}
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              {modalMode === "login"
                ? "Sign in to access your orders, saved scents, and wishlist."
                : modalMode === "register"
                ? "Create your account for personalized scents and fast checkout."
                : modalMode === "verify-email"
                ? "Enter the 6-digit verification code sent to your email."
                : "Enter the email associated with your SUNHOM account to reset your password."}
            </p>

            {/* Mode Switcher Tabs (Amazon / Flipkart style tabs) */}
            {(modalMode === "login" || modalMode === "register") && (
              <div className="mt-3 inline-flex p-0.5 bg-black/5 rounded-full border border-black/5 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccessMessage(null);
                    openLoginModal("login");
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    modalMode === "login"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccessMessage(null);
                    openLoginModal("register");
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    modalMode === "register"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 pt-3.5 sm:pt-4 overflow-y-auto">
            {/* Success Message Banner */}
            {successMessage && (
              <div className="mb-3.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message Banner */}
            {error && (
              <div className="mb-3.5 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name field (Register only) */}
              {modalMode === "register" && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email field (All modes) */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setRegisteredEmail(e.target.value);
                    }}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Mobile field (Register only) */}
              {modalMode === "register" && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* 6-Digit Code field (Verify Email only) */}
              {modalMode === "verify-email" && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 uppercase tracking-wider">
                    Verification Code (OTP)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.trim())}
                      placeholder="6-digit code"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 tracking-widest font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Didn’t receive code?</span>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isResending}
                      className="text-amber-700 hover:text-amber-800 font-medium hover:underline inline-flex items-center gap-1 disabled:opacity-50"
                    >
                      <RotateCcw className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`} />
                      {isResending ? "Resending..." : "Resend Code"}
                    </button>
                  </div>
                </div>
              )}

              {/* Password field (Login and Register) */}
              {(modalMode === "login" || modalMode === "register") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>

                    {/* Forgot Password link (Amazon / Flipkart style) */}
                    {modalMode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setSuccessMessage(null);
                          openLoginModal("forgot-password");
                        }}
                        className="text-xs text-amber-700 hover:text-amber-800 font-medium hover:underline transition-colors"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        modalMode === "register"
                          ? "At least 6 characters"
                          : "Enter your password"
                      }
                      className="w-full pl-9 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Orange 'Login' / 'Create Account' / 'Verify Email' / 'Send Reset Link' button matching 'Shop Collections' */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 sm:py-3 px-6 rounded-full bg-amber-600 text-white font-semibold text-xs sm:text-sm 
                            hover:bg-amber-700 active:scale-[0.98] shadow-md hover:shadow-lg 
                            transition-all duration-300 flex items-center justify-center gap-2
                            disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <SunhomSpinner size="sm" speed="fast" />
                  ) : modalMode === "login" ? (
                    "Login"
                  ) : modalMode === "register" ? (
                    "Create Account"
                  ) : modalMode === "verify-email" ? (
                    "Verify Email"
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </div>

              {/* Back to Sign In button on Forgot Password or Verify screens */}
              {(modalMode === "forgot-password" ||
                modalMode === "verify-email") && (
                <div className="text-center pt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccessMessage(null);
                      openLoginModal("login");
                    }}
                    className="text-xs font-semibold text-gray-600 hover:text-amber-800 transition-colors hover:underline"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}
            </form>

            {/* Amazon / Flipkart style bottom helper: “New to SUNHOM? Create your account” */}
            {modalMode === "login" && (
              <div className="mt-3.5 pt-3 border-t border-[#EFEAE2] text-center">
                <p className="text-xs text-gray-500">
                  New to SUNHOM?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccessMessage(null);
                      openLoginModal("register");
                    }}
                    className="font-semibold text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    Create your account
                  </button>
                </p>
              </div>
            )}

            {/* Amazon / Flipkart style bottom helper: “Already have an account? Sign in here” */}
            {modalMode === "register" && (
              <div className="mt-3.5 pt-3 border-t border-[#EFEAE2] text-center">
                <p className="text-xs text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSuccessMessage(null);
                      openLoginModal("login");
                    }}
                    className="font-semibold text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}

            {/* Added compliance notices: “By continuing, you agree to SUNHOM’s Terms of Use and Privacy Notice.” */}
            <p className="mt-2 text-[10px] text-center text-gray-400">
              By continuing, you agree to SUNHOM’s{" "}
              <Link
                href="/terms-and-conditions"
                className="underline hover:text-gray-600"
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-gray-600"
              >
                Privacy Notice
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
