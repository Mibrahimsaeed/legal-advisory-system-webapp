"use client";

import { useState } from "react";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";
import { CheckoutFields } from "@/components/checkout/checkout-fields";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentSuccess } from "@/components/checkout/payment-success";
import { LinkButton } from "@/components/common/link-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePaymentForm } from "@/hooks/use-payment-form";
import type { PaidPlan } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import type { DemoPaymentResult } from "@/lib/store/features/checkout/checkout.types";
import { confirmDemoPayment } from "@/lib/store/features/checkout/checkoutThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function CheckoutView({ plan }: { plan: PaidPlan }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { values, errors, setValue, validate, clearCard } = usePaymentForm(user?.email ?? "");
  const [result, setResult] = useState<DemoPaymentResult | null>(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      // The order summary (with the Subscribe button) can render above the
      // form on narrow screens, so a failed field may be out of view. Wait a
      // frame so the aria-invalid attributes have re-rendered before reading them.
      const form = event.currentTarget;
      requestAnimationFrame(() => {
        const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
        firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid?.focus();
      });
      return;
    }
    setPaying(true);
    setError(null);
    const response = await dispatch(confirmDemoPayment({ planId: plan.id, email: values.email }));
    clearCard();
    setPaying(false);
    if (confirmDemoPayment.fulfilled.match(response)) setResult(response.payload);
    else setError(response.payload ?? "The payment could not be completed.");
  };

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
              <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
                <div className="lg:order-2">
                  <OrderSummary plan={plan} loading={paying} error={error} />
                </div>
                <Card className="rounded-2xl shadow-sm [--card-spacing:--spacing(6)]">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Payment details</CardTitle>
                    <CardDescription>Enter your card information to subscribe.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CheckoutFields values={values} errors={errors} onChange={setValue} />
                  </CardContent>
                </Card>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
