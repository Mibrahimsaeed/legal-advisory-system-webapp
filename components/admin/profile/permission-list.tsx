import { CheckIcon, MinusIcon } from "lucide-react";
import { PERMISSION_LABELS, hasPermission, type AdminPermission } from "@/lib/admin/permissions";
import type { AdminRole } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";

const ALL_PERMISSIONS = Object.keys(PERMISSION_LABELS) as AdminPermission[];

export function PermissionList({ role }: { role: AdminRole }) {
  return (
    <ul className="flex flex-col gap-3">
      {ALL_PERMISSIONS.map((permission) => {
        const granted = hasPermission(role, permission);
        return (
          <li key={permission} className={cn("flex items-center gap-3 text-sm", !granted && "text-muted-foreground")}>
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full ring-1",
                granted ? "bg-primary text-primary-foreground ring-primary" : "ring-border",
              )}
            >
              {granted ? <CheckIcon className="size-3" aria-hidden /> : <MinusIcon className="size-3" aria-hidden />}
            </span>
            {PERMISSION_LABELS[permission]}
            <span className="sr-only">{granted ? "(granted)" : "(not granted)"}</span>
          </li>
        );
      })}
    </ul>
  );
}
