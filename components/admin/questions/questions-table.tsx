import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime } from "@/lib/admin/format";
import type { AdminQuestion } from "@/lib/store/features/admin/admin.types";

export function QuestionsTable({ questions }: { questions: AdminQuestion[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Question</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Asked by</TableHead>
          <TableHead>Asked</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="max-w-md min-w-64 whitespace-normal">{item.question}</TableCell>
            <TableCell>
              <Badge variant="outline">{item.topic}</Badge>
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{item.userRef}</TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">{formatDateTime(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
