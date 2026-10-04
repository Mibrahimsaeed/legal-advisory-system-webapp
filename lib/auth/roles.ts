import { ROUTES } from "@/lib/constants/routes";

export type UserRole = "user" | "admin" | "super_admin";
export type AdminRole = Extract<UserRole, "admin" | "super_admin">;

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  admin: "Admin",
  super_admin: "Super Admin",
};

// Users stored before roles existed have no role and are treated as normal users.
export function getUserRole(user: { role?: UserRole } | null): UserRole {
  return user?.role ?? "user";
}

export function isAdminRole(role: UserRole): role is AdminRole {
  return role === "admin" || role === "super_admin";
}

export function getHomeRoute(user: { role?: UserRole } | null): string {
  return isAdminRole(getUserRole(user)) ? ROUTES.admin.dashboard : ROUTES.consultation;
}
