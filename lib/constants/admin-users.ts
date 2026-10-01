import type { UserRole } from "@/lib/auth/roles";
import type { AccountStatus, PlanId } from "@/lib/store/features/admin/admin.types";

export type RoleFilter = UserRole | "all";
export type StatusFilter = AccountStatus | "all";

export const ROLE_FILTER_OPTIONS: readonly { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All roles" },
  { value: "user", label: "Users" },
  { value: "admin", label: "Admins" },
  { value: "super_admin", label: "Super Admins" },
];

export const STATUS_FILTER_OPTIONS: readonly { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const PLAN_LABELS: Record<PlanId, string> = {
  free: "Free",
  monthly: "Monthly",
  quarterly: "Quarterly",
};

export const STATUS_LABELS: Record<AccountStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};
