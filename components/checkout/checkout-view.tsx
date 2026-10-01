"use client";

import { useState } from "react";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentForm } from "@/components/checkout/payment-form";
import { PaymentSuccess } from "@/components/checkout/payment-success";
import { LinkButton } from "@/components/common/link-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { PaidPlan } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import type { DemoPaymentResult } from "@/lib/store/features/checkout/checkout.types";
import { useAppSelector } from "@/lib/store/hooks";

export function CheckoutView({ plan }: { plan: PaidPlan }) {
  const user = useAppSelector(selectUser);
  const [result, setResult] = useState<DemoPaymentResult | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="flex-1 font-heading text-2xl font-semibold">Checkout</h1>
        {!result && (
          <LinkButton href={ROUTES.upgrade} variant="ghost" className="h-8 gap-1.5 px-2.5 text-sm">
            <ArrowLeftIcon aria-hidden />
            Change plan
          </LinkButton>
        )}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
          {result ? (
            <PaymentSuccess plan={plan} result={result} />
          ) : (
            <>
              <p className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
                <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                Demo checkout: no payment is processed, and card details are never saved or sent anywhere.
              </p>
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
                <div className="lg:order-2">
                  <OrderSummary plan={plan} />
                </div>
                <Card className="rounded-2xl shadow-sm [--card-spacing:--spacing(6)]">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Payment details</CardTitle>
                    <CardDescription>Enter your card information to subscribe.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PaymentForm
                      planId={plan.id}
                      email={user?.email ?? ""}
                      amountLabel={`${plan.currency} ${plan.amount}`}
                      onPaid={setResult}
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
