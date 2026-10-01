import type { FieldErrors } from "@/hooks/use-form-state";
import { isFutureExpiry, passesLuhn } from "@/lib/billing/card";
import { validateEmail } from "@/lib/validators/common";

export interface PaymentFormValues {
  email: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  country: string;
  postalCode: string;
}

export function validatePayment(values: PaymentFormValues): FieldErrors<PaymentFormValues> {
  return {
    email: validateEmail(values.email),
    cardholderName: values.cardholderName.trim().length < 2 ? "Enter the name shown on the card." : undefined,
    cardNumber: passesLuhn(values.cardNumber) ? undefined : "Enter a valid card number.",
    expiry: isFutureExpiry(values.expiry) ? undefined : "Enter a valid expiry date (MM / YY).",
    cvc: /^\d{3,4}$/.test(values.cvc) ? undefined : "Enter the 3 or 4 digit security code.",
    postalCode: values.postalCode.trim() ? undefined : "Enter your postal code.",
  };
}
