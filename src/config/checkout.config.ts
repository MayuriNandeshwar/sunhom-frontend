/**
 * Checkout (customer details + shipping address) configuration.
 */

/**
 * sessionStorage key for the customer/address form. Session storage on
 * purpose: personal details never outlive the browser tab.
 * Bump the suffix if the stored shape ever changes.
 */
export const CHECKOUT_DETAILS_STORAGE_KEY = "sunhom_checkout_details_v1";

/** Where "Continue to payment" goes. The payment step is built next. */
export const PAYMENT_HREF = "/payment";

/** States and union territories, as shown in the State dropdown. */
export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;
