"use client";

import { useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import SunhomSpinner from "@/components/common/SunhomSpinner";
import { SCREENSHOT_ACCEPT } from "@/config/payment.config";
import {
  compressScreenshot,
  validateScreenshotFile,
  type PaymentProof,
} from "@/lib/paymentProof";

interface ScreenshotUploadProps {
  proof: PaymentProof | null;
  /** Returns false if the proof could not be stored. */
  onSave: (proof: PaymentProof) => boolean;
  onRemove: () => void;
}

export default function ScreenshotUpload({
  proof,
  onSave,
  onRemove,
}: ScreenshotUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);

    const problem = await validateScreenshotFile(file);
    if (problem) {
      setError(problem);
      return;
    }

    setProcessing(true);
    try {
      const dataUrl = await compressScreenshot(file);
      const stored = onSave({
        dataUrl,
        fileName: file.name,
        uploadedAt: Date.now(),
      });
      if (!stored) {
        setError(
          "We could not keep this screenshot in your browser. Please try a smaller image."
        );
      }
    } catch {
      setError("We could not read that image. Please choose another screenshot.");
    } finally {
      setProcessing(false);
      /* Allow choosing the same file again after removing it. */
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
      <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-1">
        Payment screenshot
      </h2>
      <p className="mb-5 font-epilogue text-sm text-[var(--text-muted)]">
        Upload a screenshot of your completed payment. JPG, JPEG or PNG.
      </p>

      {proof ? (
        <div className="space-y-4">
          <div className="relative mx-auto h-72 w-full max-w-xs overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[#f5f3ef]">
            <Image
              src={proof.dataUrl}
              alt="Preview of your payment screenshot"
              fill
              sizes="320px"
              unoptimized
              className="object-contain"
            />
          </div>

          <p className="truncate text-center text-xs text-[var(--text-muted)]">
            {proof.fileName}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={processing}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] px-5 py-2.5 text-sm text-[var(--text-heading)] transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] disabled:opacity-50"
            >
              <ImagePlus className="h-4 w-4" />
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                setError(null);
                onRemove();
              }}
              disabled={processing}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] px-5 py-2.5 text-sm text-[var(--text-body)] transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="payment-screenshot"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition focus-within:border-[var(--brand-gold)] ${
            dragging
              ? "border-[var(--brand-gold)] bg-[#f5f3ef]"
              : "border-[var(--border-soft)] hover:border-[var(--brand-gold)]"
          }`}
        >
          {processing ? (
            <SunhomSpinner size="lg" glow />
          ) : (
            <ImagePlus
              className="h-8 w-8 text-[var(--brand-gold)]"
              strokeWidth={1.4}
            />
          )}
          <span className="font-epilogue text-sm text-[var(--text-heading)]">
            {processing ? "Preparing your screenshot..." : "Tap to upload screenshot"}
          </span>
          {!processing && (
            <span className="text-xs text-[var(--text-muted)]">
              or drag and drop it here
            </span>
          )}
        </label>
      )}

      {/* Always mounted so Replace can open the picker. */}
      <input
        ref={inputRef}
        id="payment-screenshot"
        type="file"
        accept={SCREENSHOT_ACCEPT}
        onChange={(e) => void handleFile(e.target.files?.[0])}
        className="sr-only"
        aria-describedby={error ? "payment-screenshot-error" : undefined}
      />

      {error && (
        <p
          id="payment-screenshot-error"
          role="alert"
          className="mt-3 text-center text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
