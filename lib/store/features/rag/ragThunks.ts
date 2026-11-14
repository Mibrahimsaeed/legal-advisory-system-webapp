import { createAction } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/lib/api/client";
import { ragApi } from "@/lib/api/rag.api";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { RagDocumentInput, RagJob } from "@/lib/store/features/rag/rag.types";

export const ragJobStatusChanged = createAction<RagJob>("rag/jobStatusChanged");

export const submitRagDocument = createAppAsyncThunk(
  "rag/submit",
  async (input: RagDocumentInput, { rejectWithValue }) => {
    try {
      return await ragApi.submit(input);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const processRagDocument = createAppAsyncThunk(
  "rag/process",
  async (jobId: string, { dispatch, rejectWithValue, signal }) => {
    try {
      return await ragApi.waitForCompletion(jobId, (job) => dispatch(ragJobStatusChanged(job)), signal);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
