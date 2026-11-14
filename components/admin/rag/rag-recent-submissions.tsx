"use client";

import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPE_OPTIONS, RAG_JOB_STATUS_LABELS } from "@/lib/constants/rag";
import type { RagJobStatus } from "@/lib/store/features/rag/rag.types";
import { selectRagSubmissions } from "@/lib/store/features/rag/ragSlice";
import { useAppSelector } from "@/lib/store/hooks";

const typeLabel = (value: string) => DOCUMENT_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value;

const statusVariant = (status: RagJobStatus) =>
  status === "failed" ? "destructive" : status === "completed" ? "secondary" : "outline";

export function RagRecentSubmissions() {
  const submissions = useAppSelector(selectRagSubmissions);

  if (!submissions.length) {
    return <p className="text-sm text-muted-foreground">Documents you submit in this session will appear here.</p>;
  }

  return (
    <ul className="flex flex-col divide-y">
      {submissions.map((item) => (
        <li key={item.jobId} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-medium">{item.title}</p>
            <Badge variant={statusVariant(item.status)} className="shrink-0">
              {RAG_JOB_STATUS_LABELS[item.status]}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">{typeLabel(item.documentType)}</Badge>
            {item.jurisdiction}
            <span className="font-mono" title="Ingestion job ID">{item.jobId}</span>
          </div>
          {item.error && <p className="text-xs text-destructive">{item.error}</p>}
        </li>
      ))}
    </ul>
  );
}
