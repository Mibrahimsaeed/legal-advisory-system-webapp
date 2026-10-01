import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import { LinkButton } from "@/components/common/link-button";
import type { BillingPlan } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";

export function ProceedToPaymentButton({ planId }: { planId: BillingPlan["id"] }) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <LinkButton href={ROUTES.checkout(planId)} variant="secondary" className="h-12 w-full gap-2 rounded-xl px-5 text-[15px]">
        Proceed to payment
        <ArrowRightIcon aria-hidden />
      </LinkButton>
      <p className="flex min-h-5 items-center gap-1.5 text-xs text-primary-foreground/70">
        <ShieldCheckIcon className="size-3.5" aria-hidden />
        Secure checkout powered by Stripe
      </p>
    </div>
  );
}
