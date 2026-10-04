import { wait } from "@/lib/mock/latency";
import type { DemoPaymentPayload, DemoPaymentResult } from "@/lib/store/features/checkout/checkout.types";

// Demo only: no payment is processed. Replace with the real flow:
//   1. POST /billing/checkout { planId } -> backend creates a Stripe subscription
//   2. confirm the payment in the browser with Stripe Elements
//   3. the Stripe webhook activates the subscription
export const checkoutApi = {
  confirmDemoPayment: async ({ planId }: DemoPaymentPayload): Promise<DemoPaymentResult> => {
    await wait(1500);
    return {
      reference: `DEMO-${window.crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      planId,
      paidAt: new Date().toISOString(),
    };
  },
};
