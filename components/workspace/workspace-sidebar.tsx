"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelpIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";
import { LinkButton } from "@/components/common/link-button";
import { ArchetypeNav } from "@/components/workspace/archetype-nav";
import { ConsultationHistory } from "@/components/workspace/consultation-history";
import { SidebarUserMenu } from "@/components/workspace/sidebar-user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/constants/routes";

const FOOTER_LINKS = [
  { label: "Settings", href: ROUTES.settings, icon: SettingsIcon },
  { label: "Help", href: ROUTES.help, icon: CircleHelpIcon },
] as const;

export function WorkspaceSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="gap-4 p-4">
        <div>
          <BrandLogo className="text-lg" />
          <p className="mt-1 pl-7 font-mono text-[10px] tracking-[0.18em] text-sidebar-foreground/60 uppercase">
            Pakistani legal research
          </p>
        </div>
        <LinkButton
          href={ROUTES.consultation}
          variant="secondary"
          onClick={() => setOpenMobile(false)}
          className="h-10 w-full justify-center gap-2 text-sm"
        >
          <PlusIcon />
          New Consultation
        </LinkButton>
      </SidebarHeader>
      <SidebarContent>
        <ArchetypeNav />
        <SidebarSeparator />
        <ConsultationHistory />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {FOOTER_LINKS.map(({ label, href, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                isActive={pathname === href}
                render={<Link href={href} onClick={() => setOpenMobile(false)} />}
              >
                <Icon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
