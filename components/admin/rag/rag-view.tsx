"use client";

import { useEffect } from "react";
import { InfoIcon } from "lucide-react";
import { AdminPage } from "@/components/admin/admin-page";
import { SectionCard } from "@/components/admin/section-card";
import { RagDocumentForm } from "@/components/admin/rag/rag-document-form";
import { RagPipelineStatus } from "@/components/admin/rag/rag-pipeline-status";
import { RagRecentSubmissions } from "@/components/admin/rag/rag-recent-submissions";
import { ragWorkflowReset } from "@/lib/store/features/rag/ragSlice";
import { useAppDispatch } from "@/lib/store/hooks";

export function RagView() {
  const dispatch = useAppDispatch();

  useEffect(() => () => void dispatch(ragWorkflowReset()), [dispatch]);

  return (
    <AdminPage
      title="RAG Data Management"
      description="Add statutes, acts, ordinances and regulations to the legal knowledge base used for retrieval."
    >
      <p className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
        <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
        Mock workflow: submitting shows the ingestion steps but does not change the RAG database or embeddings yet.
      </p>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <SectionCard title="New legal document" description="Metadata and content for ingestion">
          <RagDocumentForm />
        </SectionCard>
        <div className="flex flex-col gap-4">
          <SectionCard title="Pipeline status" description="Progress of the latest submission">
            <RagPipelineStatus />
          </SectionCard>
          <SectionCard title="Recent submissions" description="This session">
            <RagRecentSubmissions />
          </SectionCard>
        </div>
      </div>
    </AdminPage>
  );
}
