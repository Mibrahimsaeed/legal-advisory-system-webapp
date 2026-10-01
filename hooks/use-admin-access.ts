"use client";

import { hasPermission, type AdminPermission } from "@/lib/admin/permissions";
import { getUserRole, isAdminRole } from "@/lib/auth/roles";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import { useAppSelector } from "@/lib/store/hooks";

export function useAdminAccess() {
  const user = useAppSelector(selectUser);
  const role = getUserRole(user);
  const isAdmin = isAdminRole(role);

  const can = (permission: AdminPermission) => isAdminRole(role) && hasPermission(role, permission);

  return { user, role, isAdmin, can };
}
