import { CreditCardIcon } from "lucide-react";
import { FormField } from "@/components/forms/form-field";
import type { FieldErrors } from "@/hooks/use-form-state";
import type { PaymentFormValues } from "@/lib/validators/payment";

interface CardFieldsProps {
  values: PaymentFormValues;
  errors: FieldErrors<PaymentFormValues>;
  onChange: (name: keyof PaymentFormValues, value: string) => void;
}

export function CardFields({ values, errors, onChange }: CardFieldsProps) {
  return (
    <>
      <div className="relative">
        <FormField
          label="Card number"
          name="cardNumber"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 1234 1234 1234"
          value={values.cardNumber}
          onChange={(event) => onChange("cardNumber", event.target.value)}
          error={errors.cardNumber}
          className="pr-10"
        />
        <CreditCardIcon className="pointer-events-none absolute top-8.5 right-3 size-4 text-muted-foreground" aria-hidden />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Expiry date"
          name="expiry"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM / YY"
          value={values.expiry}
          onChange={(event) => onChange("expiry", event.target.value)}
          error={errors.expiry}
        />
        <FormField
          label="Security code (CVC)"
          name="cvc"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          value={values.cvc}
          onChange={(event) => onChange("cvc", event.target.value)}
          error={errors.cvc}
        />
      </div>
      <FormField
        label="Name on card"
        name="cardholderName"
        autoComplete="cc-name"
        placeholder="Full name as shown on card"
        value={values.cardholderName}
        onChange={(event) => onChange("cardholderName", event.target.value)}
        error={errors.cardholderName}
      />
    </>
  );
}
