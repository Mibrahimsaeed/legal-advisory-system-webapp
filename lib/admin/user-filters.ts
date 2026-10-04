import type { RoleFilter, StatusFilter } from "@/lib/constants/admin-users";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";

export interface UserFilters {
  query: string;
  role: RoleFilter;
  status: StatusFilter;
}

export const DEFAULT_USER_FILTERS: UserFilters = { query: "", role: "all", status: "all" };

export function filterUsers(users: AdminUser[], { query, role, status }: UserFilters): AdminUser[] {
  const needle = query.trim().toLowerCase();
  return users.filter(
    (user) =>
      (role === "all" || user.role === role) &&
      (status === "all" || user.status === status) &&
      (!needle || user.fullName.toLowerCase().includes(needle) || user.email.toLowerCase().includes(needle)),
  );
}
