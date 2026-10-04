import { wait } from "@/lib/mock/latency";
import type { RagDocumentInput } from "@/lib/store/features/rag/rag.types";

// Mock ingestion workflow. Nothing is written to the RAG database or embeddings.
// Replace with apiClient calls once the ingestion service exists:
//   submit            -> POST /admin/rag/documents   (multipart: metadata + file)
//   waitForCompletion -> GET  /admin/rag/jobs/:jobId (poll until processed)
export const ragApi = {
  submit: async (input: RagDocumentInput): Promise<{ jobId: string; submittedAt: string }> => {
    await wait(700);
    return { jobId: `${input.documentType}-${window.crypto.randomUUID().slice(0, 8)}`, submittedAt: new Date().toISOString() };
  },
  waitForCompletion: async (jobId: string): Promise<{ jobId: string }> => {
    await wait(1600);
    return { jobId };
  },
};
