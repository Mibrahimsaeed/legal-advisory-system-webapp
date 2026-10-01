import { getErrorMessage } from "@/lib/api/client";
import { usageApi } from "@/lib/api/usage.api";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";

export const loadUsage = createAppAsyncThunk(
  "usage/load",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await usageApi.get(userId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const consumeFreeQuery = createAppAsyncThunk(
  "usage/consume",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await usageApi.consume(userId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
