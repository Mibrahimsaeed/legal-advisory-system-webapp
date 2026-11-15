import type { RagDocumentType, RagIngestionStage, RagJobStatus } from "@/lib/store/features/rag/rag.types";

export const DOCUMENT_TYPE_OPTIONS: readonly { value: RagDocumentType; label: string }[] = [
  { value: "statute", label: "Statute" },
  { value: "act", label: "Act" },
  { value: "ordinance", label: "Ordinance" },
  { value: "regulation", label: "Regulation" },
];

const toOptions = (labels: readonly string[]) => labels.map((label) => ({ value: label, label }));

export const JURISDICTION_OPTIONS = toOptions([
  "Federal",
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
]);

export const CATEGORY_OPTIONS = toOptions([
  "Civil",
  "Criminal",
  "Family",
  "Constitutional",
  "Commercial",
  "Property",
  "Labour",
  "Taxation",
]);

export const RAG_ACCEPTED_FILES = ".pdf,.docx,.txt";

export const RAG_PIPELINE_STEPS: readonly { stage: Exclude<RagIngestionStage, "idle" | "failed">; label: string; description: string }[] = [
  { stage: "submitted", label: "Data submitted", description: "Saved by the backend and queued." },
  { stage: "processing", label: "Processing", description: "Extracting text and sending it to the AI pipeline." },
  { stage: "completed", label: "Added to RAG pipeline", description: "Accepted by the AI pipeline's ingest step." },
];

export const RAG_JOB_STATUS_LABELS: Record<RagJobStatus, string> = {
  submitted: "Queued",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};
