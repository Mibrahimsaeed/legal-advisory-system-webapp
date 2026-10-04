import { getErrorMessage } from "@/lib/api/client";
import { ragApi } from "@/lib/api/rag.api";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { RagDocumentInput } from "@/lib/store/features/rag/rag.types";

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
  async (jobId: string, { rejectWithValue }) => {
    try {
      return await ragApi.waitForCompletion(jobId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
