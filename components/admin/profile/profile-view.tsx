"use client";

import { AdminPage } from "@/components/admin/admin-page";
import { InlineError } from "@/components/admin/inline-error";
import { PermissionList } from "@/components/admin/profile/permission-list";
import { ProfileAccount } from "@/components/admin/profile/profile-account";
import { SectionCard } from "@/components/admin/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { ROLE_LABELS, isAdminRole } from "@/lib/auth/roles";
import { selectAdminProfile } from "@/lib/store/features/admin/adminSlice";
import { loadAdminProfile } from "@/lib/store/features/admin/adminThunks";

export function ProfileView() {
  const { role } = useAdminAccess();
  const { data: profile, error, reload } = useAdminResource(selectAdminProfile, loadAdminProfile, undefined);
  if (!isAdminRole(role)) return null;

  return (
    <AdminPage title="Admin Profile" description="Your administrator account and the privileges assigned to your role.">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <SectionCard title="Account" description="Confirmed as an administrator by the backend">
          {profile ? (
            <ProfileAccount profile={profile} roleLabel={ROLE_LABELS[role]} />
          ) : error ? (
            <InlineError message={error} onRetry={reload} />
          ) : (
            <Skeleton className="h-24 rounded-xl" />
          )}
        </SectionCard>
        <SectionCard
          title="Role privileges"
          description="The backend grants every admin the same access; this list shows which sections the web app enables."
        >
          <PermissionList role={role} />
        </SectionCard>
      </div>
    </AdminPage>
  );
}
