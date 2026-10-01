"use client";

import { useState } from "react";
import { LockIcon } from "lucide-react";
import { CardFields } from "@/components/checkout/card-fields";
import { FormField } from "@/components/forms/form-field";
import { FormSelectField } from "@/components/forms/form-select-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { usePaymentForm } from "@/hooks/use-payment-form";
import { CHECKOUT_COUNTRIES, type PaidPlanId } from "@/lib/constants/billing";
import type { DemoPaymentResult } from "@/lib/store/features/checkout/checkout.types";
import { confirmDemoPayment } from "@/lib/store/features/checkout/checkoutThunks";
import { useAppDispatch } from "@/lib/store/hooks";

interface PaymentFormProps {
  planId: PaidPlanId;
  email: string;
  amountLabel: string;
  onPaid: (result: DemoPaymentResult) => void;
}

export function PaymentForm({ planId, email, amountLabel, onPaid }: PaymentFormProps) {
  const dispatch = useAppDispatch();
  const { values, errors, setValue, validate, clearCard } = usePaymentForm(email);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setPaying(true);
    setError(null);
    const result = await dispatch(confirmDemoPayment({ planId, email: values.email }));
    clearCard();
    setPaying(false);
    if (confirmDemoPayment.fulfilled.match(result)) onPaid(result.payload);
    else setError(result.payload ?? "The payment could not be completed.");
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup className="gap-5">
        <FormField label="Email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => setValue("email", event.target.value)} error={errors.email} />
        <p className="border-t pt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Card details</p>
        <CardFields values={values} errors={errors} onChange={setValue} />
        <p className="border-t pt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Billing address</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormSelectField label="Country" name="country" value={values.country} options={CHECKOUT_COUNTRIES} onChange={(value) => setValue("country", value)} />
          <FormField label="Postal code" name="postalCode" autoComplete="postal-code" placeholder="54000" value={values.postalCode} onChange={(event) => setValue("postalCode", event.target.value)} error={errors.postalCode} />
        </div>
        <FieldError>{error}</FieldError>
        <SubmitButton loading={paying} className="h-12 w-full gap-2 rounded-xl text-[15px]">
          {!paying && <LockIcon aria-hidden />}
          Pay {amountLabel}
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
