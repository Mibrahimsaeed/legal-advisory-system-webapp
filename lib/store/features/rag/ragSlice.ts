import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import type { RagIngestionStage, RagJobStatus, RagSubmission } from "@/lib/store/features/rag/rag.types";
import { processRagDocument, ragJobStatusChanged, submitRagDocument } from "@/lib/store/features/rag/ragThunks";

interface RagState {
  stage: RagIngestionStage;
  activeJobId: string | null;
  submissions: RagSubmission[];
  error: string | null;
}

const initialState: RagState = {
  stage: "idle",
  activeJobId: null,
  submissions: [],
  error: null,
};

function setSubmissionStatus(state: RagState, jobId: string, status: RagJobStatus, error: string | null = null) {
  const submission = state.submissions.find((item) => item.jobId === jobId);
  if (submission) {
    submission.status = status;
    submission.error = error;
  }
}

const ragSlice = createSlice({
  name: "rag",
  initialState,
  reducers: {
    ragWorkflowReset: (state) => {
      state.stage = "idle";
      state.activeJobId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(submitRagDocument.pending, (state) => {
        state.stage = "submitted";
        state.error = null;
      })
      .addCase(submitRagDocument.fulfilled, (state, action) => {
        const { title, documentType, jurisdiction } = action.meta.arg;
        state.activeJobId = action.payload.jobId;
        state.submissions.unshift({ ...action.payload, title, documentType, jurisdiction, status: "submitted", error: null });
      })
      .addCase(ragJobStatusChanged, (state, { payload }) => {
        setSubmissionStatus(state, payload.jobId, payload.status, payload.errorMessage);
        if (payload.jobId === state.activeJobId && payload.status !== "failed") state.stage = payload.status;
      })
      .addCase(processRagDocument.fulfilled, (state, { payload }) => {
        setSubmissionStatus(state, payload.jobId, "completed");
        if (payload.jobId === state.activeJobId) state.stage = "completed";
      })
      .addCase(processRagDocument.rejected, (state, { meta, payload }) => {
        // Leaving the page aborts polling; that is not a processing failure.
        if (meta.aborted) return;
        setSubmissionStatus(state, meta.arg, "failed", payload ?? null);
      })
      .addMatcher(isAnyOf(submitRagDocument.rejected, processRagDocument.rejected), (state, action) => {
        if (action.meta.aborted) return;
        state.stage = "failed";
        state.error = action.payload ?? "The document could not be processed.";
      });
  },
});

export const { ragWorkflowReset } = ragSlice.actions;
export default ragSlice.reducer;

export const selectRagStage = (state: RootState) => state.rag.stage;
export const selectRagSubmissions = (state: RootState) => state.rag.submissions;
export const selectRagError = (state: RootState) => state.rag.error;
