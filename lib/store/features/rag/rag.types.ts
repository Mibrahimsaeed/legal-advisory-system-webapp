export type RagDocumentType = "statute" | "act" | "ordinance" | "regulation";

export type RagIngestionStage = "idle" | "submitted" | "processing" | "completed" | "failed";

export interface RagDocumentInput {
  title: string;
  documentType: RagDocumentType;
  jurisdiction: string;
  year: string;
  category: string;
  description: string;
  source: string;
  content: string;
  file: File | null;
}

// Statuses the backend reports for an ingestion job (app/rag/schemas.py RagJobOut).
export type RagJobStatus = "submitted" | "processing" | "completed" | "failed";

export interface RagSubmission {
  jobId: string;
  title: string;
  documentType: RagDocumentType;
  jurisdiction: string;
  submittedAt: string;
  status: RagJobStatus;
  error: string | null;
}

export interface RagJob {
  jobId: string;
  status: RagJobStatus;
  completedAt: string | null;
  errorMessage: string | null;
}
