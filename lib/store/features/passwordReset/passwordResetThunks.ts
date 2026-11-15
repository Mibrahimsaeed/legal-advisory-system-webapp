import { authApi } from "@/lib/api/auth.api";
import { getErrorMessage } from "@/lib/api/client";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { RequestPasswordResetPayload, ResetPasswordPayload } from "@/lib/store/features/auth/auth.types";

export const requestPasswordReset = createAppAsyncThunk(
  "passwordReset/request",
  async (payload: RequestPasswordResetPayload, { rejectWithValue }) => {
    try {
      return await authApi.requestPasswordReset(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const resetPassword = createAppAsyncThunk(
  "passwordReset/reset",
  async (payload: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
