"use client";

import { StatusBadge } from "@/components/admin/users/status-badge";
import { UserIdentity } from "@/components/admin/users/user-identity";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDate, formatNumber } from "@/lib/admin/format";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { PLAN_LABELS } from "@/lib/constants/admin-users";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";

interface UserDetailsDialogProps {
  user: AdminUser | null;
  onClose: () => void;
}

export function UserDetailsDialog({ user, onClose }: UserDetailsDialogProps) {
  const details = user
    ? [
        { label: "User ID", value: user.id },
        { label: "Role", value: ROLE_LABELS[user.role] },
        { label: "Plan", value: PLAN_LABELS[user.plan] },
        { label: "Chats used", value: formatNumber(user.chatsUsed) },
        { label: "Joined", value: formatDate(user.joinedAt) },
      ]
    : [];

  return (
    <Dialog open={user !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
          <DialogDescription>Account information from the sample user list.</DialogDescription>
        </DialogHeader>
        {user && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <UserIdentity fullName={user.fullName} email={user.email} />
              <StatusBadge status={user.status} />
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border p-4">
              {details.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="truncate font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
