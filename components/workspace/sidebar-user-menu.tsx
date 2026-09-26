"use client";

import { useRouter } from "next/navigation";
import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/constants/routes";
import { USER_ROLE_LABEL } from "@/lib/constants/workspace";
import { getInitials } from "@/lib/format";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function SidebarUserMenu() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace(ROUTES.login);
  };

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
            <Avatar className="size-8">
              <AvatarFallback className="bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left leading-tight">
              <span className="truncate text-sm font-medium">{user.fullName}</span>
              <span className="truncate text-xs text-sidebar-foreground/60">{USER_ROLE_LABEL}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
