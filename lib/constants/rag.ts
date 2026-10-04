import type { RagDocumentType, RagIngestionStage } from "@/lib/store/features/rag/rag.types";

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
  { stage: "submitted", label: "Data submitted", description: "Document and metadata received." },
  { stage: "processing", label: "Processing", description: "Chunking and preparing embeddings." },
  { stage: "completed", label: "Added to RAG pipeline", description: "Available for retrieval." },
];
