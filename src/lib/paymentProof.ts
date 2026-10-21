import {
  MAX_SCREENSHOT_BYTES,
  PAYMENT_PROOF_STORAGE_KEY,
} from "@/config/payment.config";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export interface PaymentProof {
  /** Compressed JPEG as a data URL (small enough for sessionStorage). */
  dataUrl: string;
  /** Original file name, for display only. */
  fileName: string;
  uploadedAt: number;
}

export type ImageKind = "jpeg" | "png";

/* ---------------------------------------------------------------
   File validation (pure, so it can be unit-tested)
   --------------------------------------------------------------- */

/** Reads the file signature, so a renamed .pdf or .gif is rejected. */
export function detectImageType(bytes: Uint8Array): ImageKind | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  return null;
}

export function hasAllowedExtension(fileName: string): boolean {
  return /\.(jpe?g|png)$/i.test(fileName.trim());
}

/** Returns an error message, or null when the file is acceptable. */
export async function validateScreenshotFile(file: File): Promise<string | null> {
  if (!hasAllowedExtension(file.name)) {
    return "Please upload a JPG, JPEG or PNG screenshot.";
  }
  if (file.size === 0) return "That file is empty. Please choose another.";
  if (file.size > MAX_SCREENSHOT_BYTES) {
    return "That file is too large. Please choose an image under 10 MB.";
  }
  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (!detectImageType(head)) {
    return "That does not look like a JPG or PNG image. Please choose another.";
  }
  return null;
}

/* ---------------------------------------------------------------
   Compression (browser only)
   Phone screenshots are often several MB; sessionStorage holds about
   5 MB in total, so the image is scaled down and re-encoded as JPEG.
   --------------------------------------------------------------- */

/** Target ceiling for the stored data URL (characters, about 0.9 MB). */
const MAX_DATA_URL_LENGTH = 1_200_000;

/** [longest side in px, JPEG quality], tried in order until it fits. */
const ATTEMPTS: ReadonlyArray<readonly [number, number]> = [
  [1600, 0.85],
  [1280, 0.75],
  [1000, 0.65],
  [800, 0.55],
];

export async function compressScreenshot(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("decode"));
      el.src = url;
    });

    const { naturalWidth: w, naturalHeight: h } = img;
    if (!w || !h) throw new Error("decode");

    for (const [maxSide, quality] of ATTEMPTS) {
      const scale = Math.min(1, maxSide / Math.max(w, h));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      /* PNGs may be transparent: JPEG needs a solid background. */
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      if (dataUrl.length <= MAX_DATA_URL_LENGTH) return dataUrl;
    }
    throw new Error("too-large");
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ---------------------------------------------------------------
   Storage (sessionStorage, temporary)
   --------------------------------------------------------------- */

const DATA_URL_PREFIX = "data:image/jpeg;base64,";

export function parseStoredProof(raw: string | null): PaymentProof | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<PaymentProof> | null;
    if (
      !p ||
      typeof p !== "object" ||
      typeof p.dataUrl !== "string" ||
      !p.dataUrl.startsWith(DATA_URL_PREFIX) ||
      typeof p.fileName !== "string" ||
      typeof p.uploadedAt !== "number"
    ) {
      return null;
    }
    return { dataUrl: p.dataUrl, fileName: p.fileName, uploadedAt: p.uploadedAt };
  } catch {
    return null;
  }
}

export function readStoredProof(): PaymentProof | null {
  try {
    return parseStoredProof(
      window.sessionStorage.getItem(PAYMENT_PROOF_STORAGE_KEY)
    );
  } catch {
    return null;
  }
}

/** Returns false if the browser refused to store it (quota, private mode). */
export function writeStoredProof(proof: PaymentProof | null): boolean {
  try {
    if (proof) {
      window.sessionStorage.setItem(
        PAYMENT_PROOF_STORAGE_KEY,
        JSON.stringify(proof)
      );
    } else {
      window.sessionStorage.removeItem(PAYMENT_PROOF_STORAGE_KEY);
    }
    return true;
  } catch {
    return false;
  }
}
