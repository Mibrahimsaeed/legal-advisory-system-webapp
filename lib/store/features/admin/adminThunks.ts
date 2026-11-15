import { adminApi } from "@/lib/api/admin.api";
import { getErrorMessage } from "@/lib/api/client";
import type { RootState } from "@/lib/store";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { AdminResourceKey } from "@/lib/store/features/admin/adminSlice";
import type {
  DocumentsQuery,
  PageQuery,
  QuestionsQuery,
  UpdateUserStatusPayload,
  UsersQuery,
} from "@/lib/store/features/admin/admin.types";

export const toRequestKey = (arg: unknown) => JSON.stringify(arg ?? null);

// Skips a request when an identical one is already in flight (e.g. StrictMode double effects).
function createAdminLoader<Result, Arg = void>(type: string, key: AdminResourceKey, request: (arg: Arg) => Promise<Result>) {
  return createAppAsyncThunk<Result, Arg>(
    type,
    async (arg, { rejectWithValue }) => {
      try {
        return await request(arg);
      } catch (error) {
        return rejectWithValue(getErrorMessage(error));
      }
    },
    {
      condition: (arg, { getState }) => {
        const resource = (getState() as RootState).admin[key];
        return !(resource.status === "loading" && resource.requestKey === toRequestKey(arg));
      },
    },
  );
}

export const loadAdminProfile = createAdminLoader("admin/loadProfile", "profile", adminApi.profile);
export const loadAdminOverview = createAdminLoader("admin/loadOverview", "overview", adminApi.overview);
export const loadAdminStats = createAdminLoader("admin/loadStats", "stats", adminApi.stats);
export const loadAdminSystem = createAdminLoader("admin/loadSystem", "system", adminApi.system);
export const loadAdminUsers = createAdminLoader("admin/loadUsers", "users", (query: UsersQuery) => adminApi.listUsers(query));
export const loadAdminQuestions = createAdminLoader("admin/loadQuestions", "questions", (query: QuestionsQuery) =>
  adminApi.listQuestions(query),
);
export const loadAdminDocuments = createAdminLoader("admin/loadDocuments", "documents", (query: DocumentsQuery) =>
  adminApi.listDocuments(query),
);
export const loadAdminAudit = createAdminLoader("admin/loadAudit", "audit", (query: PageQuery) => adminApi.listAudit(query));

export const updateAdminUserStatus = createAppAsyncThunk(
  "admin/updateUserStatus",
  async (payload: UpdateUserStatusPayload, { rejectWithValue }) => {
    try {
      return await adminApi.updateStatus(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteAdminUser = createAppAsyncThunk("admin/deleteUser", async (id: string, { rejectWithValue }) => {
  try {
    return await adminApi.deleteUser(id);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
