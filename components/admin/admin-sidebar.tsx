import { AdminIdentity } from "@/components/admin/admin-identity";
import { AdminNavMenu } from "@/components/admin/admin-nav-menu";
import { BrandLogo } from "@/components/common/brand-logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <BrandLogo className="text-lg" />
        <p className="mt-1 pl-7 font-mono text-[10px] tracking-[0.18em] text-sidebar-foreground/60 uppercase">
          Admin console
        </p>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMenu />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <AdminIdentity />
      </SidebarFooter>
    </Sidebar>
  );
}
