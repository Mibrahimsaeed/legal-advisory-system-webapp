"use client";

import { StatusBadge } from "@/components/admin/users/status-badge";
import { UserIdentity } from "@/components/admin/users/user-identity";
import { UserRowActions } from "@/components/admin/users/user-row-actions";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatNumber } from "@/lib/admin/format";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { PLAN_LABELS } from "@/lib/constants/admin-users";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";

interface UsersTableProps {
  users: AdminUser[];
  currentUserId: string | undefined;
  onView: (user: AdminUser) => void;
  onToggleStatus: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

const COLUMNS = ["User", "Email", "Role", "Status", "Plan", "Chats Used", "Joined"] as const;

export function UsersTable({ users, currentUserId, onView, onToggleStatus, onDelete }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((column) => (
            <TableHead key={column} className={column === "Chats Used" ? "text-right" : undefined}>
              {column}
            </TableHead>
          ))}
          <TableHead className="w-12">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="min-w-48">
              <UserIdentity fullName={user.fullName} />
            </TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.role === "user" ? "outline" : "default"}>{ROLE_LABELS[user.role]}</Badge>
            </TableCell>
            <TableCell>
              <StatusBadge status={user.status} />
            </TableCell>
            <TableCell>{PLAN_LABELS[user.plan]}</TableCell>
            <TableCell className="text-right tabular-nums">{formatNumber(user.chatsUsed)}</TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(user.joinedAt)}</TableCell>
            <TableCell>
              <UserRowActions
                user={user}
                isSelf={user.id === currentUserId}
                onView={() => onView(user)}
                onToggleStatus={() => onToggleStatus(user)}
                onDelete={() => onDelete(user)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
