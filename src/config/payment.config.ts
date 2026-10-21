/**
 * Payment configuration (UPI / QR).
 *
 * BEFORE GOING LIVE: replace `upiId` with the real merchant UPI ID and drop
 * the real QR image at `public/payment/upi-qr.png` (or change `qrImage`).
 * While `upiId` still holds the placeholder below, the payment page shows a
 * warning so a customer is never asked to pay to a dummy account.
 */

export const merchantName = "SUNHOM";

/** TODO: replace with the real UPI ID, e.g. "sunhom@okhdfcbank". */
export const upiId = "your-upi-id@bank";

/** Public path of the merchant's UPI QR code image. */
export const qrImage = "/payment/upi-qr.png";

/* ---------------------------------------------------------------
   Everything below is internal plumbing, not merchant settings.
   --------------------------------------------------------------- */

/** True once `upiId` has been replaced with a real value. */
export const PAYMENT_CONFIGURED = upiId !== "your-upi-id@bank";

export const ORDER_SUCCESS_HREF = "/order-success";

/** sessionStorage: the uploaded payment screenshot (temporary). */
export const PAYMENT_PROOF_STORAGE_KEY = "sunhom_payment_proof_v1";

/** sessionStorage: snapshot of the submitted order for /order-success. */
export const ORDER_CONFIRMATION_STORAGE_KEY = "sunhom_order_confirmation_v1";

/** Largest screenshot file we will read (before it is compressed). */
export const MAX_SCREENSHOT_BYTES = 10 * 1024 * 1024;

/** Accepted screenshot formats (also used for the file input's `accept`). */
export const SCREENSHOT_ACCEPT = ".jpg,.jpeg,.png,image/jpeg,image/png";
