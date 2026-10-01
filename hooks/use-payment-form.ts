"use client";

import { useState } from "react";
import type { FieldErrors } from "@/hooks/use-form-state";
import { formatCardNumber, formatCvc, formatExpiry } from "@/lib/billing/card";
import { validatePayment, type PaymentFormValues } from "@/lib/validators/payment";

const FORMATTERS: Partial<Record<keyof PaymentFormValues, (value: string) => string>> = {
  cardNumber: formatCardNumber,
  expiry: formatExpiry,
  cvc: formatCvc,
};

// Card details live only in this component state. They are never stored, logged or sent.
export function usePaymentForm(email: string) {
  const [values, setValues] = useState<PaymentFormValues>({
    email,
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "Pakistan",
    postalCode: "",
  });
  const [errors, setErrors] = useState<FieldErrors<PaymentFormValues>>({});

  const setValue = (name: keyof PaymentFormValues, raw: string) => {
    const format = FORMATTERS[name];
    setValues((prev) => ({ ...prev, [name]: format ? format(raw) : raw }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const found = validatePayment(values);
    setErrors(found);
    return Object.values(found).every((message) => !message);
  };

  const clearCard = () => setValues((prev) => ({ ...prev, cardNumber: "", expiry: "", cvc: "" }));

  return { values, errors, setValue, validate, clearCard };
}
