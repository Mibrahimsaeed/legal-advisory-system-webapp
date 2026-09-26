import { consultationsApi } from "@/lib/api/consultations.api";
import { getErrorMessage } from "@/lib/api/client";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { AskQuestionPayload } from "@/lib/store/features/consultations/consultations.types";

export const loadConsultations = createAppAsyncThunk(
  "consultations/load",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await consultationsApi.list(userId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const askQuestion = createAppAsyncThunk(
  "consultations/ask",
  async (payload: AskQuestionPayload, { rejectWithValue }) => {
    try {
      return await consultationsApi.ask(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
