import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatBytes, formatDateTime } from "@/lib/admin/format";
import { DOCUMENT_STATUS_LABELS } from "@/lib/constants/admin-tables";
import type { AdminDocument } from "@/lib/store/features/admin/admin.types";

const statusVariant = (status: string) =>
  status === "failed" ? "destructive" : status === "ready" ? "secondary" : "outline";

export function DocumentsTable({ documents }: { documents: AdminDocument[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Size</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Uploaded by</TableHead>
          <TableHead>Uploaded</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="max-w-72 truncate font-medium">{doc.fileName}</TableCell>
            <TableCell>{doc.fileType}</TableCell>
            <TableCell className="text-right tabular-nums">{formatBytes(doc.sizeBytes)}</TableCell>
            <TableCell>
              <Badge variant={statusVariant(doc.status)}>{DOCUMENT_STATUS_LABELS[doc.status] ?? doc.status}</Badge>
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{doc.userRef}</TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">{formatDateTime(doc.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
