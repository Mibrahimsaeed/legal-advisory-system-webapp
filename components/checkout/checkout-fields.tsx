import { CardFields } from "@/components/checkout/card-fields";
import { FormField } from "@/components/forms/form-field";
import { FormSelectField } from "@/components/forms/form-select-field";
import { FieldGroup } from "@/components/ui/field";
import type { FieldErrors } from "@/hooks/use-form-state";
import { CHECKOUT_COUNTRIES } from "@/lib/constants/billing";
import type { PaymentFormValues } from "@/lib/validators/payment";

interface CheckoutFieldsProps {
  values: PaymentFormValues;
  errors: FieldErrors<PaymentFormValues>;
  onChange: (name: keyof PaymentFormValues, value: string) => void;
}

// Field groups only — no <form> tag or submit button. CheckoutView wraps this
// together with the order summary in a single <form> so the plan card's
// Subscribe button can submit it from elsewhere in the layout.
export function CheckoutFields({ values, errors, onChange }: CheckoutFieldsProps) {
  return (
    <FieldGroup className="gap-5">
      <FormField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={(event) => onChange("email", event.target.value)}
        error={errors.email}
      />
      <p className="border-t pt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        Card details
      </p>
      <CardFields values={values} errors={errors} onChange={onChange} />
      <p className="border-t pt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        Billing address
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelectField
          label="Country"
          name="country"
          value={values.country}
          options={CHECKOUT_COUNTRIES}
          onChange={(value) => onChange("country", value)}
        />
        <FormField
          label="Postal code"
          name="postalCode"
          autoComplete="postal-code"
          placeholder="54000"
          value={values.postalCode}
          onChange={(event) => onChange("postalCode", event.target.value)}
          error={errors.postalCode}
        />
      </div>
    </FieldGroup>
  );
}
