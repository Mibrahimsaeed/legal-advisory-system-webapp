"use client";

import { AdminPage } from "@/components/admin/admin-page";
import { PermissionList } from "@/components/admin/profile/permission-list";
import { SectionCard } from "@/components/admin/section-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { ROLE_LABELS, isAdminRole } from "@/lib/auth/roles";
import { getInitials } from "@/lib/format";

export function ProfileView() {
  const { user, role } = useAdminAccess();
  if (!user || !isAdminRole(role)) return null;

  return (
    <AdminPage title="Admin Profile" description="Your administrator account and the privileges assigned to your role.">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <SectionCard title="Account" description="Signed in with the demo administrator account">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="bg-primary text-base font-medium text-primary-foreground">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 gap-1">
              <p className="truncate font-heading text-xl font-semibold">{user.fullName}</p>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
              <Badge className="mt-1">{ROLE_LABELS[role]}</Badge>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Role privileges" description={`What a ${ROLE_LABELS[role]} can do. Assignments will come from the backend later.`}>
          <PermissionList role={role} />
        </SectionCard>
      </div>
    </AdminPage>
  );
}
