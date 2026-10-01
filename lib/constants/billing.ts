export const FREE_QUERY_LIMIT = 6;
export const FREE_REFRESH_HOURS = 6;

export interface BillingPlan {
  id: "free" | "monthly" | "quarterly";
  name: string;
  description: string;
  currency: string;
  amount: string;
  period: string;
  features: readonly string[];
  badge?: string;
  paid: boolean;
}

const PAID_FEATURES = [
  "Unlimited legal consultations",
  "AI-powered legal guidance",
  "No waiting between sessions",
] as const;

export type PaidPlanId = Exclude<BillingPlan["id"], "free">;
export type PaidPlan = BillingPlan & { id: PaidPlanId };

export const BILLING_PLANS: readonly BillingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Try the assistant at no cost.",
    currency: "PKR",
    amount: "0",
    period: "No payment required",
    features: [
      `${FREE_QUERY_LIMIT} queries every ${FREE_REFRESH_HOURS} hours`,
      "AI-powered legal guidance",
      "Pakistani statutes and case law",
    ],
    paid: false,
  },
  {
    id: "monthly",
    name: "Monthly",
    description: "Billed monthly.",
    currency: "PKR",
    amount: "4,000",
    period: "per month",
    features: PAID_FEATURES,
    paid: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    description: "Billed quarterly.",
    currency: "PKR",
    amount: "11,000",
    period: "per 3 months",
    features: PAID_FEATURES,
    badge: "Save PKR 1,000",
    paid: true,
  },
];

export function findPaidPlan(id: string | undefined): PaidPlan | null {
  const plan = BILLING_PLANS.find((item) => item.id === id);
  return plan && plan.id !== "free" ? { ...plan, id: plan.id } : null;
}

export const CHECKOUT_COUNTRIES = [
  "Pakistan",
  "United Arab Emirates",
  "Saudi Arabia",
  "United Kingdom",
  "United States",
  "Other",
].map((label) => ({ value: label, label }));
