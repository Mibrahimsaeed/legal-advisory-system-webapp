import type { AdminRole } from "@/lib/auth/roles";

export type AdminPermission =
  | "users:manage"
  | "rag:create"
  | "rag:manage"
  | "analytics:view"
  | "admins:manage";

export const PERMISSION_LABELS: Record<AdminPermission, string> = {
  "users:manage": "Manage users",
  "rag:create": "Add RAG data",
  "rag:manage": "Manage RAG data",
  "analytics:view": "View analytics",
  "admins:manage": "Manage admins",
};

// Placeholder mapping. Once roles come from the backend, load this per role instead.
export const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  super_admin: ["users:manage", "rag:create", "rag:manage", "analytics:view", "admins:manage"],
  admin: ["users:manage", "rag:create", "analytics:view"],
};

export function hasPermission(role: AdminRole, permission: AdminPermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
