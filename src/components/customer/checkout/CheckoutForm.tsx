"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { INDIAN_STATES } from "@/config/checkout.config";
import {
  FIELD_ORDER,
  cleanMobile,
  cleanPincode,
  isValid,
  type CheckoutDetails,
  type CheckoutErrors,
  type CheckoutField,
} from "@/lib/checkoutValidation";

/** Form id, so the Continue button in the order summary can submit it. */
export const CHECKOUT_FORM_ID = "checkout-form";

interface CheckoutFormProps {
  details: CheckoutDetails;
  errors: CheckoutErrors;
  onChange: (field: CheckoutField, value: string) => void;
  /** Called on submit only when every field is valid. */
  onSubmit: () => void;
}

/* 16px on mobile stops iOS from zooming into the field on focus. */
const INPUT_BASE =
  "w-full rounded-xl border bg-white px-4 py-3 text-base sm:text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)] outline-none transition focus:border-[var(--brand-gold)] focus:ring-1 focus:ring-[var(--brand-gold)]";

export default function CheckoutForm({
  details,
  errors,
  onChange,
  onSubmit,
}: CheckoutFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [touched, setTouched] = useState<Partial<Record<CheckoutField, boolean>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  const markTouched = (f: CheckoutField) =>
    setTouched((prev) => (prev[f] ? prev : { ...prev, [f]: true }));

  /* Errors appear once a field has been left, or after a submit attempt. */
  const errorFor = (f: CheckoutField) =>
    touched[f] || submitted ? errors[f] : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid(errors)) {
      onSubmit();
      return;
    }
    /* Reveal every problem and jump to the first one. */
    setSubmitted(true);
    const first = FIELD_ORDER.find((f) => errors[f]);
    if (first) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
    }
  };

  const common = (f: CheckoutField) => {
    const error = errorFor(f);
    return {
      id: `checkout-${f}`,
      name: f,
      value: details[f],
      onBlur: () => markTouched(f),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `checkout-${f}-error` : undefined,
      className: `${INPUT_BASE} ${
        error ? "border-red-400" : "border-[var(--border-soft)]"
      }`,
    };
  };

  return (
    <form
      id={CHECKOUT_FORM_ID}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8"
    >
      {/* CONTACT */}
      <fieldset className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
        <legend className="sr-only">Contact details</legend>
        <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-5">
          Contact details
        </h2>

        <div className="space-y-4">
          <Field label="Full name" field="fullName" error={errorFor("fullName")} required>
            <input
              {...common("fullName")}
              type="text"
              autoComplete="name"
              placeholder="As it should appear on the parcel"
              maxLength={60}
              onChange={(e) => onChange("fullName", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mobile number" field="mobile" error={errorFor("mobile")} required>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base sm:text-sm text-[var(--text-body)]"
                >
                  +91
                </span>
                <input
                  {...common("mobile")}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit number"
                  maxLength={20}
                  onChange={(e) => onChange("mobile", cleanMobile(e.target.value))}
                  className={`${common("mobile").className} pl-14`}
                />
              </div>
            </Field>

            <Field label="Email" field="email" error={errorFor("email")} required>
              <input
                {...common("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* SHIPPING ADDRESS */}
      <fieldset className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
        <legend className="sr-only">Shipping address</legend>
        <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-5">
          Shipping address
        </h2>

        <div className="space-y-4">
          <Field
            label="Address line 1"
            field="addressLine1"
            error={errorFor("addressLine1")}
            required
          >
            <input
              {...common("addressLine1")}
              type="text"
              autoComplete="address-line1"
              placeholder="House no., building, street"
              maxLength={120}
              onChange={(e) => onChange("addressLine1", e.target.value)}
            />
          </Field>

          <Field
            label="Address line 2"
            field="addressLine2"
            error={errorFor("addressLine2")}
            optional
          >
            <input
              {...common("addressLine2")}
              type="text"
              autoComplete="address-line2"
              placeholder="Apartment, landmark, area"
              maxLength={120}
              onChange={(e) => onChange("addressLine2", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" field="city" error={errorFor("city")} required>
              <input
                {...common("city")}
                type="text"
                autoComplete="address-level2"
                maxLength={60}
                onChange={(e) => onChange("city", e.target.value)}
              />
            </Field>

            <Field label="State" field="state" error={errorFor("state")} required>
              <select
                {...common("state")}
                autoComplete="address-level1"
                onChange={(e) => onChange("state", e.target.value)}
                className={`${common("state").className} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
                  details.state ? "" : "text-[var(--text-muted)]"
                }`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233A342F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s} className="text-[var(--text-heading)]">
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="sm:max-w-[calc(50%-0.5rem)]">
            <Field label="Pincode" field="pincode" error={errorFor("pincode")} required>
              <input
                {...common("pincode")}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="6-digit pincode"
                maxLength={6}
                onChange={(e) => onChange("pincode", cleanPincode(e.target.value))}
              />
            </Field>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

/* ---------------------------------------------------------------
   Field wrapper: label, control, inline error
   --------------------------------------------------------------- */

function Field({
  label,
  field,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  field: CheckoutField;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`checkout-${field}`}
        className="mb-1.5 flex items-baseline gap-2 font-epilogue text-sm text-[var(--text-heading)]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-[var(--brand-gold)]">
            *
          </span>
        )}
        {optional && (
          <span className="text-xs text-[var(--text-muted)]">Optional</span>
        )}
      </label>

      {children}

      {error && (
        <p
          id={`checkout-${field}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
