import { ApiError } from "@/lib/api/client";
import { api } from "@/lib/axios";
import type { RagDocumentInput, RagJob, RagJobStatus, RagSubmission } from "@/lib/store/features/rag/rag.types";

interface SubmissionResponse {
  job_id: string;
  submitted_at: string;
}

interface JobResponse {
  job_id: string;
  status: RagJobStatus;
  completed_at: string | null;
  error_message: string | null;
}

const UPLOAD_TIMEOUT_MS = 120_000;
const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 120;

function toFormData(input: RagDocumentInput): FormData {
  const form = new FormData();
  form.append("title", input.title.trim());
  form.append("document_type", input.documentType);
  form.append("jurisdiction", input.jurisdiction);
  form.append("year", input.year.trim());
  form.append("category", input.category);
  form.append("description", input.description);
  form.append("source", input.source);
  form.append("content", input.content);
  if (input.file) form.append("file", input.file);
  return form;
}

function waitFor(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new ApiError("Stopped checking the processing status.", 0));
    }, { once: true });
  });
}

export const ragApi = {
  submit: async (input: RagDocumentInput): Promise<Pick<RagSubmission, "jobId" | "submittedAt">> => {
    // The instance defaults to JSON, which would serialise FormData; the browser adds the multipart boundary.
    const { data } = await api.post<SubmissionResponse>("/admin/rag/documents", toFormData(input), {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: UPLOAD_TIMEOUT_MS,
    });
    return { jobId: data.job_id, submittedAt: data.submitted_at };
  },
  getJob: async (jobId: string, signal?: AbortSignal): Promise<RagJob> => {
    const { data } = await api.get<JobResponse>(`/admin/rag/jobs/${jobId}`, { signal });
    return { jobId: data.job_id, status: data.status, completedAt: data.completed_at, errorMessage: data.error_message };
  },
  // Polls the job until the backend finishes processing it, reporting each status along the way.
  waitForCompletion: async (jobId: string, onStatus: (job: RagJob) => void, signal?: AbortSignal): Promise<RagJob> => {
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
      const job = await ragApi.getJob(jobId, signal);
      onStatus(job);
      if (job.status === "completed") return job;
      if (job.status === "failed") throw new ApiError(job.errorMessage ?? "The document could not be processed.", 422);
      await waitFor(POLL_INTERVAL_MS, signal);
    }
    throw new ApiError("Processing is taking longer than expected. Check the job again later.", 0);
  },
};
