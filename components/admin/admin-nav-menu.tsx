"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { ADMIN_NAV } from "@/lib/constants/admin-nav";

export function AdminNavMenu() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { can } = useAdminAccess();
  const items = ADMIN_NAV.filter((item) => !item.permission || can(item.permission));

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-[0.16em] uppercase">Administration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map(({ label, href, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                isActive={pathname === href}
                className="h-10"
                render={<Link href={href} onClick={() => setOpenMobile(false)} />}
              >
                <Icon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
