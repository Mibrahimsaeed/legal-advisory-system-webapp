import { StatusBadge } from "@/components/admin/users/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/admin/format";
import { getInitials } from "@/lib/format";
import type { AdminProfile } from "@/lib/store/features/admin/admin.types";

interface ProfileAccountProps {
  profile: AdminProfile;
  roleLabel: string;
}

export function ProfileAccount({ profile, roleLabel }: ProfileAccountProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="bg-primary text-base font-medium text-primary-foreground">
            {getInitials(profile.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 gap-1">
          <p className="truncate font-heading text-xl font-semibold">{profile.fullName}</p>
          <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Badge>{roleLabel}</Badge>
            <StatusBadge status={profile.status} />
          </div>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border p-4 text-sm">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-muted-foreground">Member since</dt>
          <dd className="font-medium">{formatDate(profile.joinedAt)}</dd>
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <dt className="text-xs text-muted-foreground">Account ID</dt>
          <dd className="truncate font-mono text-xs">{profile.id}</dd>
        </div>
      </dl>
    </div>
  );
}
