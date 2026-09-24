import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type {
  RequestStatus,
  User,
} from "@/lib/store/features/auth/auth.types";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "@/lib/store/features/auth/authThunks";
import type { RootState } from "@/lib/store";

interface AuthState {
  user: User | null;
  status: RequestStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
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
      .addCase(logoutUser.fulfilled, () => initialState)
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
export const selectAuthLoading = (state: RootState) =>
  state.auth.status === "loading";
