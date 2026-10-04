import { ApiError } from "@/lib/api/client";
import { MOCK_ADMIN_OVERVIEW, MOCK_ADMIN_USERS } from "@/lib/mock/admin.mock";
import { wait } from "@/lib/mock/latency";
import type {
  AdminOverview,
  AdminUser,
  UpdateUserStatusPayload,
} from "@/lib/store/features/admin/admin.types";

// Prototype implementation backed by in-memory sample data. Replace each method
// with an apiClient call once the backend exists:
//   overview     -> GET    /admin/overview
//   listUsers    -> GET    /admin/users
//   updateStatus -> PATCH  /admin/users/:id   { status }
//   deleteUser   -> DELETE /admin/users/:id
const LATENCY_MS = 400;
let users: AdminUser[] = MOCK_ADMIN_USERS.map((user) => ({ ...user }));

function findUser(id: string): AdminUser {
  const user = users.find((item) => item.id === id);
  if (!user) throw new ApiError("User not found.", 404);
  return user;
}

export const adminApi = {
  overview: async (): Promise<AdminOverview> => {
    await wait(LATENCY_MS);
    return MOCK_ADMIN_OVERVIEW;
  },
  listUsers: async (): Promise<AdminUser[]> => {
    await wait(LATENCY_MS);
    return users.map((user) => ({ ...user }));
  },
  updateStatus: async ({ id, status }: UpdateUserStatusPayload): Promise<AdminUser> => {
    await wait(LATENCY_MS);
    const updated = { ...findUser(id), status };
    users = users.map((user) => (user.id === id ? updated : user));
    return updated;
  },
  deleteUser: async (id: string): Promise<string> => {
    await wait(LATENCY_MS);
    findUser(id);
    users = users.filter((user) => user.id !== id);
    return id;
  },
};
