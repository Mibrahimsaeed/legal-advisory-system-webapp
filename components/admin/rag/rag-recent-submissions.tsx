"use client";

import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPE_OPTIONS } from "@/lib/constants/rag";
import { selectRagSubmissions } from "@/lib/store/features/rag/ragSlice";
import { useAppSelector } from "@/lib/store/hooks";

const typeLabel = (value: string) => DOCUMENT_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value;

export function RagRecentSubmissions() {
  const submissions = useAppSelector(selectRagSubmissions);

  if (!submissions.length) {
    return <p className="text-sm text-muted-foreground">Documents you submit in this session will appear here.</p>;
  }

  return (
    <ul className="flex flex-col divide-y">
      {submissions.map((item) => (
        <li key={item.jobId} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
          <p className="truncate text-sm font-medium">{item.title}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">{typeLabel(item.documentType)}</Badge>
            {item.jurisdiction}
            <span className="font-mono">{item.jobId}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
