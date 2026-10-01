import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { EMPTY_FREE_USAGE, type FreeUsage } from "@/lib/billing/free-usage";
import type { RequestStatus } from "@/lib/store/features/auth/auth.types";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import { consumeFreeQuery, loadUsage } from "@/lib/store/features/usage/usageThunks";

interface UsageState {
  userId: string | null;
  usage: FreeUsage;
  status: RequestStatus;
  error: string | null;
}

const initialState: UsageState = {
  userId: null,
  usage: EMPTY_FREE_USAGE,
  status: "idle",
  error: null,
};

const usageSlice = createSlice({
  name: "usage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(loadUsage.pending, (state, action) => {
        state.userId = action.meta.arg;
        state.status = "loading";
      })
      .addCase(consumeFreeQuery.rejected, (state, action) => {
        state.error = action.payload ?? "Could not check your free queries.";
      })
      .addCase(loadUsage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Could not load your free queries.";
      })
      .addMatcher(isAnyOf(loadUsage.fulfilled, consumeFreeQuery.fulfilled), (state, action) => {
        state.userId = action.meta.arg;
        state.usage = action.payload;
        state.status = "succeeded";
        state.error = null;
      });
  },
});

export default usageSlice.reducer;

export const selectFreeUsage = (state: RootState) => state.usage.usage;
export const selectUsageUserId = (state: RootState) => state.usage.userId;
export const selectUsageLoaded = (state: RootState) => state.usage.status === "succeeded";
