import { CircleCheckIcon } from "lucide-react";
import { LinkButton } from "@/components/common/link-button";
import { Card, CardContent } from "@/components/ui/card";
import type { BillingPlan } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";
import type { DemoPaymentResult } from "@/lib/store/features/checkout/checkout.types";

export function PaymentSuccess({ plan, result }: { plan: BillingPlan; result: DemoPaymentResult }) {
  return (
    <Card className="mx-auto w-full max-w-md rounded-2xl text-center shadow-sm [--card-spacing:--spacing(8)]">
      <CardContent className="flex flex-col items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CircleCheckIcon className="size-6" aria-hidden />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-3xl font-semibold">Demo payment complete</h2>
          <p className="text-sm text-muted-foreground">
            {plan.name} plan · {plan.currency} {plan.amount}
          </p>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          No real payment was made and no card details were stored. Once Stripe is connected, completing this
          step will activate your plan.
        </p>
        <p className="font-mono text-xs text-muted-foreground">Reference {result.reference}</p>
        <LinkButton href={ROUTES.consultation} className="h-10 px-5">
          Back to consultations
        </LinkButton>
      </CardContent>
    </Card>
  );
}
