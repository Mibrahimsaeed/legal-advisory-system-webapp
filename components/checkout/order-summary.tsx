import { LockIcon } from "lucide-react";
import Link from "next/link";
import { PlanFeatureList } from "@/components/billing/plan-feature-list";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import type { BillingPlan } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";

interface OrderSummaryProps {
  plan: BillingPlan;
  loading: boolean;
  error: string | null;
}

export function OrderSummary({ plan, loading, error }: OrderSummaryProps) {
  const price = `${plan.currency} ${plan.amount}`;

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/15 ring-0 [--card-spacing:--spacing(6)]">
        <CardHeader>
          <p className="font-mono text-[10px] tracking-[0.18em] text-primary-foreground/60 uppercase">
            Order summary
          </p>
          <CardTitle className="text-2xl font-semibold">Premium · {plan.name}</CardTitle>
          <CardDescription className="text-primary-foreground/70">
            {plan.description} Renews {plan.period.replace("per ", "every ")}.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[0.18em] text-primary-foreground/60 uppercase">
              Top features
            </p>
            <PlanFeatureList features={plan.features} featured />
          </div>
          <Separator className="bg-primary-foreground/15" />
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-primary-foreground/70">{plan.name} subscription</dt>
              <dd className="tabular-nums">{price}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-primary-foreground/70">Tax (0%)</dt>
              <dd className="tabular-nums">{plan.currency} 0</dd>
            </div>
            <Separator className="my-2 bg-primary-foreground/15" />
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-medium">Due today</dt>
              <dd className="text-xl font-semibold tabular-nums">{price}</dd>
            </div>
          </dl>
          <FieldError className="text-primary-foreground">{error}</FieldError>
          <SubmitButton
            loading={loading}
            variant="secondary"
            className="h-12 w-full gap-2 rounded-xl text-[15px]"
          >
            {!loading && <LockIcon aria-hidden />}
            Subscribe
          </SubmitButton>
        </CardContent>
      </Card>
      <p className="px-1 text-xs leading-5 text-muted-foreground">
        Renews {plan.period.replace("per ", "every ")} until canceled —{" "}
        <Link href={ROUTES.settings} className="underline underline-offset-2 hover:text-foreground">
          cancel anytime in Settings
        </Link>
        . This is a demo subscription: no real payment is taken and no card details are stored or sent anywhere.
      </p>
    </div>
  );
}
