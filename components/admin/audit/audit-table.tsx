import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime } from "@/lib/admin/format";
import { AUDIT_ACTION_LABELS } from "@/lib/constants/admin-tables";
import type { AuditEntry } from "@/lib/store/features/admin/admin.types";

export function AuditTable({ entries }: { entries: AuditEntry[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>When</TableHead>
          <TableHead>Admin</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Affected account</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="whitespace-nowrap text-muted-foreground">{formatDateTime(entry.createdAt)}</TableCell>
            <TableCell>{entry.adminEmail}</TableCell>
            <TableCell>
              <Badge variant={entry.action === "user_deleted" ? "destructive" : "outline"}>
                {AUDIT_ACTION_LABELS[entry.action] ?? entry.action}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {[entry.target, entry.detail].filter(Boolean).join(" · ") || "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
