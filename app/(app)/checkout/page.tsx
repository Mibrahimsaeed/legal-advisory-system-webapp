import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { findPaidPlan } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan: planId } = await searchParams;
  const plan = findPaidPlan(planId);
  if (!plan) redirect(ROUTES.upgrade);
  return <CheckoutView plan={plan} />;
}
