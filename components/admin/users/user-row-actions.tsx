"use client";

import { EyeIcon, LoaderCircleIcon, MoreHorizontalIcon, PowerIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";

interface UserRowActionsProps {
  user: AdminUser;
  lockReason: string | null;
  busy: boolean;
  onView: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export function UserRowActions({ user, lockReason, busy, onView, onToggleStatus, onDelete }: UserRowActionsProps) {
  const disabled = lockReason !== null || busy;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.fullName}`} />}>
        {busy ? <LoaderCircleIcon className="animate-spin" /> : <MoreHorizontalIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onView}>
          <EyeIcon />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleStatus} disabled={disabled}>
          <PowerIcon />
          {user.status === "active" ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete} disabled={disabled}>
          <Trash2Icon />
          Delete user
        </DropdownMenuItem>
        {lockReason && <p className="px-2 py-1.5 text-xs text-muted-foreground">{lockReason}</p>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
