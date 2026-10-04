"use client";

import { EyeIcon, MoreHorizontalIcon, PowerIcon, Trash2Icon } from "lucide-react";
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
  isSelf: boolean;
  onView: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export function UserRowActions({ user, isSelf, onView, onToggleStatus, onDelete }: UserRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.fullName}`} />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onView}>
          <EyeIcon />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleStatus} disabled={isSelf}>
          <PowerIcon />
          {user.status === "active" ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete} disabled={isSelf}>
          <Trash2Icon />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
