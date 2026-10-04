"use client";

import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { ROUTES } from "@/lib/constants/routes";
import { getInitials } from "@/lib/format";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import { useAppDispatch } from "@/lib/store/hooks";

export function AdminIdentity() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, role } = useAdminAccess();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace(ROUTES.login);
  };

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 px-2 py-1.5">
        <Avatar className="size-8">
          <AvatarFallback className="bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 flex-1 leading-tight">
          <span className="truncate text-sm font-medium">{user.fullName}</span>
          <span className="truncate text-xs text-sidebar-foreground/60">{ROLE_LABELS[role]}</span>
        </div>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleLogout}>
          <LogOutIcon />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
