import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import type {
  AdminDocument,
  AdminOverview,
  AdminProfile,
  AdminQuestion,
  AdminUser,
  AuditEntry,
  Page,
  PlatformStats,
  Resource,
  SystemStatus,
} from "@/lib/store/features/admin/admin.types";
import {
  deleteAdminUser,
  loadAdminAudit,
  loadAdminDocuments,
  loadAdminOverview,
  loadAdminProfile,
  loadAdminQuestions,
  loadAdminStats,
  loadAdminSystem,
  loadAdminUsers,
  toRequestKey,
  updateAdminUserStatus,
} from "@/lib/store/features/admin/adminThunks";

interface AdminResources {
  profile: Resource<AdminProfile>;
  overview: Resource<AdminOverview>;
  stats: Resource<PlatformStats>;
  system: Resource<SystemStatus>;
  users: Resource<Page<AdminUser>>;
  questions: Resource<Page<AdminQuestion>>;
  documents: Resource<Page<AdminDocument>>;
  audit: Resource<Page<AuditEntry>>;
}

export type AdminResourceKey = keyof AdminResources;

interface AdminState extends AdminResources {
  pendingUserIds: string[];
  actionError: string | null;
}

const emptyResource = <T>(): Resource<T> => ({ data: null, status: "idle", error: null, requestKey: null });

const initialState: AdminState = {
  profile: emptyResource(),
  overview: emptyResource(),
  stats: emptyResource(),
  system: emptyResource(),
  users: emptyResource(),
  questions: emptyResource(),
  documents: emptyResource(),
  audit: emptyResource(),
  pendingUserIds: [],
  actionError: null,
};

function started<T>(resource: Resource<T>, arg: unknown) {
  resource.status = "loading";
  resource.error = null;
  resource.requestKey = toRequestKey(arg);
}

// Only the latest request may write its result, so a slow older page can't overwrite a newer one.
function succeeded<T>(resource: Resource<T>, arg: unknown, data: T) {
  if (resource.requestKey !== toRequestKey(arg)) return;
  resource.data = data;
  resource.status = "succeeded";
}

function failed<T>(resource: Resource<T>, arg: unknown, error: string | undefined) {
  if (resource.requestKey !== toRequestKey(arg)) return;
  resource.status = "failed";
  resource.error = error ?? "Could not load this data.";
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminActionErrorCleared: (state) => {
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(loadAdminProfile.pending, (state, { meta }) => started(state.profile, meta.arg))
      .addCase(loadAdminProfile.fulfilled, (state, { meta, payload }) => succeeded(state.profile, meta.arg, payload))
      .addCase(loadAdminProfile.rejected, (state, { meta, payload }) => failed(state.profile, meta.arg, payload))
      .addCase(loadAdminOverview.pending, (state, { meta }) => started(state.overview, meta.arg))
      .addCase(loadAdminOverview.fulfilled, (state, { meta, payload }) => succeeded(state.overview, meta.arg, payload))
      .addCase(loadAdminOverview.rejected, (state, { meta, payload }) => failed(state.overview, meta.arg, payload))
      .addCase(loadAdminStats.pending, (state, { meta }) => started(state.stats, meta.arg))
      .addCase(loadAdminStats.fulfilled, (state, { meta, payload }) => succeeded(state.stats, meta.arg, payload))
      .addCase(loadAdminStats.rejected, (state, { meta, payload }) => failed(state.stats, meta.arg, payload))
      .addCase(loadAdminSystem.pending, (state, { meta }) => started(state.system, meta.arg))
      .addCase(loadAdminSystem.fulfilled, (state, { meta, payload }) => succeeded(state.system, meta.arg, payload))
      .addCase(loadAdminSystem.rejected, (state, { meta, payload }) => failed(state.system, meta.arg, payload))
      .addCase(loadAdminUsers.pending, (state, { meta }) => started(state.users, meta.arg))
      .addCase(loadAdminUsers.fulfilled, (state, { meta, payload }) => succeeded(state.users, meta.arg, payload))
      .addCase(loadAdminUsers.rejected, (state, { meta, payload }) => failed(state.users, meta.arg, payload))
      .addCase(loadAdminQuestions.pending, (state, { meta }) => started(state.questions, meta.arg))
      .addCase(loadAdminQuestions.fulfilled, (state, { meta, payload }) => succeeded(state.questions, meta.arg, payload))
      .addCase(loadAdminQuestions.rejected, (state, { meta, payload }) => failed(state.questions, meta.arg, payload))
      .addCase(loadAdminDocuments.pending, (state, { meta }) => started(state.documents, meta.arg))
      .addCase(loadAdminDocuments.fulfilled, (state, { meta, payload }) => succeeded(state.documents, meta.arg, payload))
      .addCase(loadAdminDocuments.rejected, (state, { meta, payload }) => failed(state.documents, meta.arg, payload))
      .addCase(loadAdminAudit.pending, (state, { meta }) => started(state.audit, meta.arg))
      .addCase(loadAdminAudit.fulfilled, (state, { meta, payload }) => succeeded(state.audit, meta.arg, payload))
      .addCase(loadAdminAudit.rejected, (state, { meta, payload }) => failed(state.audit, meta.arg, payload))
      .addMatcher(isAnyOf(updateAdminUserStatus.pending, deleteAdminUser.pending), (state, { meta }) => {
        const id = typeof meta.arg === "string" ? meta.arg : meta.arg.id;
        state.pendingUserIds.push(id);
        state.actionError = null;
      })
      .addMatcher(isAnyOf(updateAdminUserStatus.rejected, deleteAdminUser.rejected), (state, { payload }) => {
        state.actionError = payload ?? "The action could not be completed.";
      })
      // Counts on the dashboard, analytics and audit pages are now stale; they reload on next visit.
      .addMatcher(isAnyOf(updateAdminUserStatus.fulfilled, deleteAdminUser.fulfilled), (state) => {
        state.overview.status = "idle";
        state.stats.status = "idle";
        state.audit.status = "idle";
      })
      .addMatcher(
        isAnyOf(
          updateAdminUserStatus.fulfilled,
          updateAdminUserStatus.rejected,
          deleteAdminUser.fulfilled,
          deleteAdminUser.rejected,
        ),
        (state, { meta }) => {
          const id = typeof meta.arg === "string" ? meta.arg : meta.arg.id;
          state.pendingUserIds = state.pendingUserIds.filter((pending) => pending !== id);
        },
      );
  },
});

export const { adminActionErrorCleared } = adminSlice.actions;
export default adminSlice.reducer;

export const selectAdminProfile = (state: RootState) => state.admin.profile;
export const selectAdminOverview = (state: RootState) => state.admin.overview;
export const selectAdminStats = (state: RootState) => state.admin.stats;
export const selectAdminSystem = (state: RootState) => state.admin.system;
export const selectAdminUsers = (state: RootState) => state.admin.users;
export const selectAdminQuestions = (state: RootState) => state.admin.questions;
export const selectAdminDocuments = (state: RootState) => state.admin.documents;
export const selectAdminAudit = (state: RootState) => state.admin.audit;
export const selectPendingUserIds = (state: RootState) => state.admin.pendingUserIds;
export const selectAdminActionError = (state: RootState) => state.admin.actionError;
