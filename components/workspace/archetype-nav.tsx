"use client";

import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ARCHETYPES, archetypeHref } from "@/lib/constants/archetypes";
import { ROUTES } from "@/lib/constants/routes";

export function ArchetypeNav() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-[0.16em] uppercase">Research archetypes</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {ARCHETYPES.map(({ id, label, icon: Icon }) => (
            <SidebarMenuItem key={id}>
              <SidebarMenuButton
                className="h-10 bg-sidebar-primary! font-medium text-sidebar-primary-foreground! shadow-xs hover:bg-sidebar-primary/85! hover:text-sidebar-primary-foreground!"
                render={<Link href={archetypeHref(id, ROUTES.consultation)} onClick={() => setOpenMobile(false)} />}
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
