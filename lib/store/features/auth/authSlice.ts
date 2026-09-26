import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type {
  RequestStatus,
  User,
} from "@/lib/store/features/auth/auth.types";
import {
  loginUser,
  logoutUser,
  restoreSession,
  signupUser,
} from "@/lib/store/features/auth/authThunks";
import type { RootState } from "@/lib/store";

interface AuthState {
  user: User | null;
  status: RequestStatus;
  error: string | null;
  sessionChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  sessionChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authErrorCleared: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => ({ ...initialState, sessionChecked: true }))
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null;
        state.sessionChecked = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.sessionChecked = true;
      })
      .addMatcher(
        isAnyOf(loginUser.pending, signupUser.pending),
        (state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(loginUser.fulfilled, signupUser.fulfilled),
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload.user;
        },
      )
      .addMatcher(
        isAnyOf(loginUser.rejected, signupUser.rejected),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload ?? "Something went wrong.";
        },
      );
  },
});

export const { authErrorCleared } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectSessionChecked = (state: RootState) => state.auth.sessionChecked;
export const selectAuthLoading = (state: RootState) =>
  state.auth.status === "loading";
