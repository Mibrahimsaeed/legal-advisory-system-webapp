import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS } from "@/lib/constants/admin-users";
import type { AccountStatus } from "@/lib/store/features/admin/admin.types";

export function StatusBadge({ status }: { status: AccountStatus }) {
  return (
    <Badge variant={status === "active" ? "secondary" : "outline"} className="gap-1.5">
      <span
        aria-hidden
        className={status === "active" ? "size-1.5 rounded-full bg-primary" : "size-1.5 rounded-full bg-muted-foreground/50"}
      />
      {STATUS_LABELS[status]}
    </Badge>
  );
}
