import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import type { RagIngestionStage, RagSubmission } from "@/lib/store/features/rag/rag.types";
import { processRagDocument, submitRagDocument } from "@/lib/store/features/rag/ragThunks";

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
        state.stage = "processing";
        state.activeJobId = action.payload.jobId;
        state.submissions.unshift({ ...action.payload, title, documentType, jurisdiction });
      })
      .addCase(processRagDocument.fulfilled, (state) => {
        state.stage = "completed";
      })
      .addMatcher(isAnyOf(submitRagDocument.rejected, processRagDocument.rejected), (state, action) => {
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
