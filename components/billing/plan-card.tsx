import { ScaleIcon } from "lucide-react";
import { CurrentPlanButton } from "@/components/billing/current-plan-button";
import { PlanFeatureList } from "@/components/billing/plan-feature-list";
import { ProceedToPaymentButton } from "@/components/billing/proceed-to-payment-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { BillingPlan } from "@/lib/constants/billing";
import { cn } from "@/lib/utils";

export function PlanCard({ plan }: { plan: BillingPlan }) {
  const { paid } = plan;
  const subtle = paid ? "text-primary-foreground/60" : "text-muted-foreground";

  return (
    <Card
      className={cn(
        "relative isolate h-full rounded-2xl [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(7)]",
        paid ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 ring-0" : "shadow-sm",
      )}
    >
      {paid && (
        <ScaleIcon
          aria-hidden
          strokeWidth={1}
          className="pointer-events-none absolute -top-8 -right-8 -z-10 size-36 text-primary-foreground/5"
        />
      )}
      <CardHeader className="gap-1.5">
        <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
        {plan.badge && (
          <CardAction>
            <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground">
              {plan.badge}
            </Badge>
          </CardAction>
        )}
        <CardDescription className={cn(paid && "text-primary-foreground/70")}>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="flex items-baseline gap-x-2">
            <span className={cn("text-sm font-medium", subtle)}>{plan.currency}</span>
            <span className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{plan.amount}</span>
          </p>
          <p className={cn("text-sm", subtle)}>{plan.period}</p>
        </div>
        {paid ? <ProceedToPaymentButton planId={plan.id} /> : <CurrentPlanButton />}
        <Separator className={cn(paid && "bg-primary-foreground/15")} />
        <PlanFeatureList features={plan.features} featured={paid} />
      </CardContent>
    </Card>
  );
}
