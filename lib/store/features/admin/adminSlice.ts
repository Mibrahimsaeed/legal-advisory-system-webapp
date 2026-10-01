import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { RequestStatus } from "@/lib/store/features/auth/auth.types";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import type { AdminOverview, AdminUser } from "@/lib/store/features/admin/admin.types";
import {
  deleteAdminUser,
  loadAdminOverview,
  loadAdminUsers,
  updateAdminUserStatus,
} from "@/lib/store/features/admin/adminThunks";

interface AdminState {
  overview: AdminOverview | null;
  overviewStatus: RequestStatus;
  users: AdminUser[];
  usersStatus: RequestStatus;
  error: string | null;
}

const initialState: AdminState = {
  overview: null,
  overviewStatus: "idle",
  users: [],
  usersStatus: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(loadAdminOverview.pending, (state) => {
        state.overviewStatus = "loading";
      })
      .addCase(loadAdminOverview.fulfilled, (state, action) => {
        state.overview = action.payload;
        state.overviewStatus = "succeeded";
      })
      .addCase(loadAdminOverview.rejected, (state, action) => {
        state.overviewStatus = "failed";
        state.error = action.payload ?? "Could not load statistics.";
      })
      .addCase(loadAdminUsers.pending, (state) => {
        state.usersStatus = "loading";
      })
      .addCase(loadAdminUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersStatus = "succeeded";
      })
      .addCase(loadAdminUsers.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.error = action.payload ?? "Could not load users.";
      })
      .addCase(updateAdminUserStatus.fulfilled, (state, action) => {
        state.users = state.users.map((user) => (user.id === action.payload.id ? action.payload : user));
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addMatcher(isAnyOf(updateAdminUserStatus.rejected, deleteAdminUser.rejected), (state, action) => {
        state.error = action.payload ?? "The action could not be completed.";
      });
  },
});

export default adminSlice.reducer;

export const selectAdminOverview = (state: RootState) => state.admin.overview;
export const selectAdminOverviewStatus = (state: RootState) => state.admin.overviewStatus;
export const selectAdminUsers = (state: RootState) => state.admin.users;
export const selectAdminUsersStatus = (state: RootState) => state.admin.usersStatus;
export const selectAdminError = (state: RootState) => state.admin.error;
