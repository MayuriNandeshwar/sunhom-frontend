import { ORDER_CONFIRMATION_STORAGE_KEY } from "@/config/payment.config";

export interface OrderConfirmation {
  itemName: string;
  quantity: number;
  amount: number;
  customerName: string;
  email: string;
  city: string;
  state: string;
  submittedAt: number;
}

/**
 * Submits the payment for verification.
 *
 * IMPORTANT: there is no backend endpoint yet. For now this only records a
 * confirmation snapshot in sessionStorage so /order-success can render.
 * Nothing is sent to SUNHOM. Replace the body with the real API call
 * (order + screenshot upload) when the backend exists; the UI already
 * handles the async, loading and error states.
 */
export async function submitPayment(
  confirmation: Omit<OrderConfirmation, "submittedAt">
): Promise<void> {
  const record: OrderConfirmation = { ...confirmation, submittedAt: Date.now() };
  /* Throws if storage is blocked; the caller shows an error. */
  window.sessionStorage.setItem(
    ORDER_CONFIRMATION_STORAGE_KEY,
    JSON.stringify(record)
  );
}

export function readConfirmation(): OrderConfirmation | null {
  try {
    const raw = window.sessionStorage.getItem(ORDER_CONFIRMATION_STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Partial<OrderConfirmation> | null;
    if (
      !c ||
      typeof c !== "object" ||
      typeof c.itemName !== "string" ||
      typeof c.quantity !== "number" ||
      typeof c.amount !== "number" ||
      typeof c.customerName !== "string" ||
      typeof c.email !== "string" ||
      typeof c.city !== "string" ||
      typeof c.state !== "string" ||
      typeof c.submittedAt !== "number"
    ) {
      return null;
    }
    return {
      itemName: c.itemName,
      quantity: c.quantity,
      amount: c.amount,
      customerName: c.customerName,
      email: c.email,
      city: c.city,
      state: c.state,
      submittedAt: c.submittedAt,
    };
  } catch {
    return null;
  }
}
