import { PlanFeatureList } from "@/components/billing/plan-feature-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { BillingPlan } from "@/lib/constants/billing";

export function OrderSummary({ plan }: { plan: BillingPlan }) {
  const price = `${plan.currency} ${plan.amount}`;

  return (
    <Card className="rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/15 ring-0 [--card-spacing:--spacing(6)]">
      <CardHeader>
        <p className="font-mono text-[10px] tracking-[0.18em] text-primary-foreground/60 uppercase">Order summary</p>
        <CardTitle className="text-2xl font-semibold">Premium · {plan.name}</CardTitle>
        <CardDescription className="text-primary-foreground/70">{plan.description} Renews {plan.period.replace("per ", "every ")}.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <PlanFeatureList features={plan.features} featured />
        <Separator className="bg-primary-foreground/15" />
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-primary-foreground/70">{plan.name} plan</dt>
            <dd className="tabular-nums">{price}</dd>
          </div>
          <Separator className="my-2 bg-primary-foreground/15" />
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-medium">Total due today</dt>
            <dd className="text-xl font-semibold tabular-nums">{price}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
