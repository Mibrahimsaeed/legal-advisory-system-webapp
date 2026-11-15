import { api } from "@/lib/axios";
import { ADMIN_PAGE_SIZE } from "@/lib/constants/admin-tables";
import type {
  AdminDocument,
  AdminOverview,
  AdminProfile,
  AdminQuestion,
  AdminUser,
  AuditEntry,
  DocumentsQuery,
  Page,
  PageQuery,
  PlanId,
  PlatformStats,
  QuestionsQuery,
  ServiceHealth,
  SystemStatus,
  UpdateUserStatusPayload,
  UsersQuery,
} from "@/lib/store/features/admin/admin.types";

interface ProfileResponse {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  created_at: string;
}

interface UserResponse extends ProfileResponse {
  is_admin: boolean;
  conversations: number;
  documents: number;
  last_active: string | null;
  plan: string;
  chats_used: number;
}

interface LabelCountResponse {
  label: string;
  count: number;
}

interface StatsResponse {
  total_users: number;
  active_users: number;
  new_users_7d: number;
  total_conversations: number;
  total_questions: number;
  questions_7d: number;
  total_documents: number;
  storage_bytes: number;
  questions_per_day: { date: string; count: number }[];
  signups_per_day: { date: string; count: number }[];
  topics: LabelCountResponse[];
  documents_by_type: LabelCountResponse[];
}

interface QuestionResponse {
  id: string;
  user_ref: string;
  question: string;
  topic: string;
  created_at: string;
}

interface DocumentResponse {
  id: string;
  user_ref: string;
  original_filename: string;
  file_type: string;
  size_bytes: number;
  status: string;
  created_at: string;
}

interface SystemResponse {
  app_env: string;
  services: { name: string; status: ServiceHealth; detail: string }[];
  database_tables: Record<string, number>;
}

interface AuditResponse {
  id: string;
  admin_email: string;
  action: string;
  target: string | null;
  detail: string | null;
  created_at: string;
}

const PLANS: readonly PlanId[] = ["free", "monthly", "quarterly"];

const displayName = ({ full_name, email }: ProfileResponse) => full_name || email.split("@")[0];
const toLabelled = ({ label, count }: LabelCountResponse) => ({ label, value: count });
const pageParams = ({ offset }: PageQuery) => ({ limit: ADMIN_PAGE_SIZE, offset });
// FastAPI rejects empty query strings for some filters, so blank values are left out.
const optional = (value: string) => value.trim() || undefined;

function toPage<T, R>(page: Page<R>, map: (item: R) => T): Page<T> {
  return { items: page.items.map(map), total: page.total };
}

function toProfile(profile: ProfileResponse): AdminProfile {
  return {
    id: profile.id,
    fullName: displayName(profile),
    email: profile.email,
    status: profile.is_active ? "active" : "inactive",
    joinedAt: profile.created_at,
  };
}

function toUser(user: UserResponse): AdminUser {
  return {
    ...toProfile(user),
    role: user.is_admin ? "admin" : "user",
    plan: PLANS.find((plan) => plan === user.plan) ?? "free",
    chatsUsed: user.chats_used,
    conversations: user.conversations,
    documents: user.documents,
    lastActiveAt: user.last_active,
  };
}

function toStats(stats: StatsResponse): PlatformStats {
  return {
    totalUsers: stats.total_users,
    enabledAccounts: stats.active_users,
    newUsers7d: stats.new_users_7d,
    totalConversations: stats.total_conversations,
    totalQuestions: stats.total_questions,
    questions7d: stats.questions_7d,
    totalDocuments: stats.total_documents,
    storageBytes: stats.storage_bytes,
    questionsPerDay: stats.questions_per_day,
    signupsPerDay: stats.signups_per_day,
    topics: stats.topics.map(toLabelled),
    documentsByType: stats.documents_by_type.map(toLabelled),
  };
}

const toQuestion = (item: QuestionResponse): AdminQuestion => ({
  id: item.id,
  userRef: item.user_ref,
  question: item.question,
  topic: item.topic,
  createdAt: item.created_at,
});

const toDocument = (item: DocumentResponse): AdminDocument => ({
  id: item.id,
  userRef: item.user_ref,
  fileName: item.original_filename,
  fileType: item.file_type,
  sizeBytes: item.size_bytes,
  status: item.status,
  createdAt: item.created_at,
});

const toAuditEntry = (item: AuditResponse): AuditEntry => ({
  id: item.id,
  adminEmail: item.admin_email,
  action: item.action,
  target: item.target,
  detail: item.detail,
  createdAt: item.created_at,
});

export const adminApi = {
  profile: async (): Promise<AdminProfile> => toProfile((await api.get<ProfileResponse>("/admin/me")).data),
  overview: async (): Promise<AdminOverview> => (await api.get<AdminOverview>("/admin/overview")).data,
  stats: async (): Promise<PlatformStats> => toStats((await api.get<StatsResponse>("/admin/stats")).data),
  system: async (): Promise<SystemStatus> => {
    const { data } = await api.get<SystemResponse>("/admin/system");
    return {
      appEnv: data.app_env,
      services: data.services,
      tableCounts: Object.entries(data.database_tables).map(([label, value]) => ({ label, value })),
    };
  },
  listUsers: async (query: UsersQuery): Promise<Page<AdminUser>> => {
    const status = query.status === "all" ? undefined : query.status === "active" ? "active" : "deactivated";
    const { data } = await api.get<Page<UserResponse>>("/admin/users", {
      params: { ...pageParams(query), q: optional(query.q), status },
    });
    return toPage(data, toUser);
  },
  updateStatus: async ({ id, status }: UpdateUserStatusPayload): Promise<AdminUser> => {
    const { data } = await api.patch<UserResponse>(`/admin/users/${id}`, { is_active: status === "active" });
    return toUser(data);
  },
  deleteUser: async (id: string): Promise<string> => {
    await api.delete(`/admin/users/${id}`);
    return id;
  },
  listQuestions: async (query: QuestionsQuery): Promise<Page<AdminQuestion>> => {
    const { data } = await api.get<Page<QuestionResponse>>("/admin/questions", {
      params: { ...pageParams(query), q: optional(query.q), topic: optional(query.topic) },
    });
    return toPage(data, toQuestion);
  },
  listDocuments: async (query: DocumentsQuery): Promise<Page<AdminDocument>> => {
    const { data } = await api.get<Page<DocumentResponse>>("/admin/documents", {
      params: { ...pageParams(query), q: optional(query.q) },
    });
    return toPage(data, toDocument);
  },
  listAudit: async (query: PageQuery): Promise<Page<AuditEntry>> => {
    const { data } = await api.get<Page<AuditResponse>>("/admin/audit", { params: pageParams(query) });
    return toPage(data, toAuditEntry);
  },
};
