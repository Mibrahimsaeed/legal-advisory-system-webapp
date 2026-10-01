import type { UserRole } from "@/lib/auth/roles";

export type AccountStatus = "active" | "inactive";
export type PlanId = "free" | "monthly" | "quarterly";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  plan: PlanId;
  chatsUsed: number;
  joinedAt: string;
}

export interface MonthlyValue {
  month: string;
  value: number;
}

export interface LabelledValue {
  label: string;
  value: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalQueries: number;
  freeChatsUsed: number;
  paidUsers: number;
  monthlyRevenue: number;
  ragDocuments: number;
}

export interface AdminOverview {
  stats: AdminStats;
  userGrowth: MonthlyValue[];
  revenue: MonthlyValue[];
  queries: MonthlyValue[];
  userDistribution: LabelledValue[];
  subscribersByPlan: LabelledValue[];
}

export interface UpdateUserStatusPayload {
  id: string;
  status: AccountStatus;
}
