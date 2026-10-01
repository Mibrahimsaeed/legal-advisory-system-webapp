export type RagDocumentType = "statute" | "act" | "ordinance" | "regulation";

export type RagIngestionStage = "idle" | "submitted" | "processing" | "completed" | "failed";

export interface RagFileInfo {
  name: string;
  size: number;
}

export interface RagDocumentInput {
  title: string;
  documentType: RagDocumentType;
  jurisdiction: string;
  year: string;
  category: string;
  description: string;
  source: string;
  content: string;
  file: RagFileInfo | null;
}

export interface RagSubmission {
  jobId: string;
  title: string;
  documentType: RagDocumentType;
  jurisdiction: string;
  submittedAt: string;
}
