import { PlanCard } from "@/components/billing/plan-card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BILLING_PLANS, FREE_REFRESH_HOURS } from "@/lib/constants/billing";

export function UpgradeView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="font-heading text-2xl font-semibold">Upgrade</h1>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="@container mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="font-heading text-3xl font-semibold text-balance sm:text-4xl">Upgrade your plan</h2>
            <p className="max-w-md text-sm text-balance text-muted-foreground">
              Free queries refresh every {FREE_REFRESH_HOURS} hours. Upgrade for unlimited access.
            </p>
          </div>
          <ul className="mx-auto grid w-full max-w-lg gap-5 @4xl:max-w-none @4xl:grid-cols-3 @4xl:gap-6">
            {BILLING_PLANS.map((plan) => (
              <li key={plan.id}>
                <PlanCard plan={plan} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
