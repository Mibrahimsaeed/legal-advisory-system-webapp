import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { RequestStatus } from "@/lib/store/features/auth/auth.types";
import { requestPasswordReset, resetPassword } from "@/lib/store/features/passwordReset/passwordResetThunks";

// Only the email is kept between the two steps; codes and passwords stay in local form state.
interface PasswordResetState {
  email: string;
  requestStatus: RequestStatus;
  resetStatus: RequestStatus;
  error: string | null;
}

const initialState: PasswordResetState = {
  email: "",
  requestStatus: "idle",
  resetStatus: "idle",
  error: null,
};

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    passwordResetCleared: () => initialState,
    passwordResetErrorCleared: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, (state, { meta }) => {
        state.email = meta.arg.email.trim().toLowerCase();
        state.requestStatus = "loading";
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.requestStatus = "succeeded";
      })
      .addCase(requestPasswordReset.rejected, (state, { payload }) => {
        state.requestStatus = "failed";
        state.error = payload ?? "Could not send a reset code. Please try again.";
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetStatus = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.email = "";
        state.resetStatus = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.resetStatus = "failed";
        state.error = payload ?? "Could not reset your password. Please try again.";
      });
  },
});

export const { passwordResetCleared, passwordResetErrorCleared } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;

export const selectPasswordResetEmail = (state: RootState) => state.passwordReset.email;
export const selectPasswordResetRequesting = (state: RootState) => state.passwordReset.requestStatus === "loading";
export const selectPasswordResetting = (state: RootState) => state.passwordReset.resetStatus === "loading";
export const selectPasswordResetError = (state: RootState) => state.passwordReset.error;
