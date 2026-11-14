import type { UserRole } from "@/lib/auth/roles";
import type { RequestStatus } from "@/lib/store/features/auth/auth.types";

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
  conversations: number;
  documents: number;
  joinedAt: string;
  lastActiveAt: string | null;
}

export interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  status: AccountStatus;
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

export interface DayCount {
  date: string;
  count: number;
}

export interface PlatformStats {
  totalUsers: number;
  enabledAccounts: number;
  newUsers7d: number;
  totalConversations: number;
  totalQuestions: number;
  questions7d: number;
  totalDocuments: number;
  storageBytes: number;
  questionsPerDay: DayCount[];
  signupsPerDay: DayCount[];
  topics: LabelledValue[];
  documentsByType: LabelledValue[];
}

export interface AdminQuestion {
  id: string;
  userRef: string;
  question: string;
  topic: string;
  createdAt: string;
}

export interface AdminDocument {
  id: string;
  userRef: string;
  fileName: string;
  fileType: string;
  sizeBytes: number;
  status: string;
  createdAt: string;
}

export type ServiceHealth = "ok" | "not_configured" | "simulated" | "error";

export interface ServiceStatus {
  name: string;
  status: ServiceHealth;
  detail: string;
}

export interface SystemStatus {
  appEnv: string;
  services: ServiceStatus[];
  tableCounts: LabelledValue[];
}

export interface AuditEntry {
  id: string;
  adminEmail: string;
  action: string;
  target: string | null;
  detail: string | null;
  createdAt: string;
}

export interface Page<T> {
  items: T[];
  total: number;
}

export interface PageQuery {
  offset: number;
}

export interface UsersQuery extends PageQuery {
  q: string;
  status: AccountStatus | "all";
}

export interface QuestionsQuery extends PageQuery {
  q: string;
  topic: string;
}

export interface DocumentsQuery extends PageQuery {
  q: string;
}

export interface UpdateUserStatusPayload {
  id: string;
  status: AccountStatus;
}

export interface Resource<T> {
  data: T | null;
  status: RequestStatus;
  error: string | null;
  requestKey: string | null;
}
