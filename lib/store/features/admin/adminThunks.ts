import { adminApi } from "@/lib/api/admin.api";
import { getErrorMessage } from "@/lib/api/client";
import { createAppAsyncThunk } from "@/lib/store/createAppAsyncThunk";
import type { UpdateUserStatusPayload } from "@/lib/store/features/admin/admin.types";

export const loadAdminOverview = createAppAsyncThunk("admin/loadOverview", async (_, { rejectWithValue }) => {
  try {
    return await adminApi.overview();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const loadAdminUsers = createAppAsyncThunk("admin/loadUsers", async (_, { rejectWithValue }) => {
  try {
    return await adminApi.listUsers();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

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
