import type { RoleFilter, StatusFilter } from "@/lib/constants/admin-users";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";

export interface UserFilters {
  query: string;
  role: RoleFilter;
  status: StatusFilter;
}

export const DEFAULT_USER_FILTERS: UserFilters = { query: "", role: "all", status: "all" };

// Search and status are filtered by the backend; it has no role filter, so role applies to the loaded page.
export function filterByRole(users: AdminUser[], role: RoleFilter): AdminUser[] {
  return role === "all" ? users : users.filter((user) => user.role === role);
}

// The backend refuses to change your own account or another admin's from the dashboard.
export function getUserLockReason(user: AdminUser, currentUserId: string | undefined): string | null {
  if (user.id === currentUserId) return "You can't change your own account.";
  if (user.role !== "user") return "Admin accounts can't be changed from the dashboard.";
  return null;
}
