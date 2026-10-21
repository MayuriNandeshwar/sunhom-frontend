import { INDIAN_STATES } from "@/config/checkout.config";

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

export interface CheckoutDetails {
  fullName: string;
  mobile: string;
  email: string;
  addressLine1: string;
  /** Optional. */
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export type CheckoutField = keyof CheckoutDetails;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const EMPTY_DETAILS: CheckoutDetails = {
  fullName: "",
  mobile: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

/** Field order, used to focus the first invalid field. */
export const FIELD_ORDER: CheckoutField[] = [
  "fullName",
  "mobile",
  "email",
  "addressLine1",
  "addressLine2",
  "city",
  "state",
  "pincode",
];

/* ---------------------------------------------------------------
   Input cleaning (applied as the customer types / pastes)
   --------------------------------------------------------------- */

/**
 * Keeps digits only, drops a pasted +91 / 91 / 0 prefix, caps at 10 digits.
 * "+91 98765-43210" -> "9876543210"
 */
export function cleanMobile(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** Keeps digits only, caps at 6. */
export function cleanPincode(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 6);
}

/** Trims every field and lower-cases the email. Used when saving/submitting. */
export function normalizeDetails(d: CheckoutDetails): CheckoutDetails {
  const t = (s: string) => s.trim().replace(/\s+/g, " ");
  return {
    fullName: t(d.fullName),
    mobile: cleanMobile(d.mobile),
    email: d.email.trim().toLowerCase(),
    addressLine1: t(d.addressLine1),
    addressLine2: t(d.addressLine2),
    city: t(d.city),
    state: d.state,
    pincode: cleanPincode(d.pincode),
  };
}

/* ---------------------------------------------------------------
   Validation
   --------------------------------------------------------------- */

/** Indian mobile numbers are 10 digits and start with 6, 7, 8 or 9. */
const MOBILE_RE = /^[6-9]\d{9}$/;
/** Indian PIN codes are 6 digits and never start with 0. */
const PINCODE_RE = /^[1-9]\d{5}$/;
/** Practical email check: one @, no spaces, a dot in the domain, no "..". */
const EMAIL_RE = /^[^\s@.][^\s@]*@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

const STATE_SET = new Set<string>(INDIAN_STATES);

export function validateDetails(input: CheckoutDetails): CheckoutErrors {
  /* Trim only: unlike normalizeDetails this never truncates or strips
     digits, so an over-long mobile/pincode is reported, not silently fixed. */
  const t = (s: string) => s.trim().replace(/\s+/g, " ");
  const d: CheckoutDetails = {
    fullName: t(input.fullName),
    mobile: input.mobile.trim(),
    email: input.email.trim().toLowerCase(),
    addressLine1: t(input.addressLine1),
    addressLine2: t(input.addressLine2),
    city: t(input.city),
    state: input.state,
    pincode: input.pincode.trim(),
  };
  const errors: CheckoutErrors = {};

  if (!d.fullName) errors.fullName = "Please enter your full name.";
  else if (d.fullName.length < 2 || /\d/.test(d.fullName))
    errors.fullName = "Enter your name using letters only.";
  else if (d.fullName.length > 60)
    errors.fullName = "Name can be up to 60 characters.";

  if (!d.mobile) errors.mobile = "Please enter your mobile number.";
  else if (!MOBILE_RE.test(d.mobile))
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!d.email) errors.email = "Please enter your email address.";
  else if (d.email.length > 254 || d.email.includes("..") || !EMAIL_RE.test(d.email))
    errors.email = "Enter a valid email address.";

  if (!d.addressLine1) errors.addressLine1 = "Please enter your address.";
  else if (d.addressLine1.length < 5)
    errors.addressLine1 = "Enter your full address (house no., street).";
  else if (d.addressLine1.length > 120)
    errors.addressLine1 = "Address can be up to 120 characters.";

  if (d.addressLine2.length > 120)
    errors.addressLine2 = "Address can be up to 120 characters.";

  if (!d.city) errors.city = "Please enter your city.";
  else if (d.city.length < 2 || /\d/.test(d.city))
    errors.city = "Enter a valid city name.";
  else if (d.city.length > 60) errors.city = "City can be up to 60 characters.";

  if (!d.state) errors.state = "Please select your state.";
  else if (!STATE_SET.has(d.state)) errors.state = "Please select a state from the list.";

  if (!d.pincode) errors.pincode = "Please enter your pincode.";
  else if (!PINCODE_RE.test(d.pincode))
    errors.pincode = "Enter a valid 6-digit pincode.";

  return errors;
}

export const isValid = (errors: CheckoutErrors) =>
  Object.keys(errors).length === 0;

/* ---------------------------------------------------------------
   Storage parsing
   --------------------------------------------------------------- */

/** Defensive parse of whatever is in storage; unknown/invalid -> empty. */
export function parseStoredDetails(raw: string | null): CheckoutDetails {
  if (!raw) return { ...EMPTY_DETAILS };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...EMPTY_DETAILS };
    const obj = parsed as Record<string, unknown>;
    const out: CheckoutDetails = { ...EMPTY_DETAILS };
    for (const key of FIELD_ORDER) {
      const v = obj[key];
      if (typeof v === "string") out[key] = v;
    }
    return out;
  } catch {
    return { ...EMPTY_DETAILS };
  }
}
