import type { PaidPlanId } from "@/lib/constants/billing";

// Only non-sensitive details. Card data must never be part of this payload:
// in production Stripe Elements sends it to Stripe directly.
export interface DemoPaymentPayload {
  planId: PaidPlanId;
  email: string;
}

export interface DemoPaymentResult {
  reference: string;
  planId: PaidPlanId;
  paidAt: string;
}
