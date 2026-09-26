import { ApiError } from "@/lib/api/client";
import {
  clearSession,
  hashPassword,
  readSession,
  readUsers,
  writeSession,
  writeUsers,
} from "@/lib/mock/auth-store";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from "@/lib/store/features/auth/auth.types";

// Prototype implementation backed by localStorage. Swap each method for an
// apiClient call ("/auth/login", "/auth/signup", ...) once a backend exists;
// the signatures and return types stay the same.
const LATENCY_MS = 450;
const wait = () => new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const authApi = {
  login: async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
    await wait();
    const passwordHash = await hashPassword(password);
    const match = readUsers().find(
      (user) => user.email === normalizeEmail(email) && user.passwordHash === passwordHash,
    );
    if (!match) throw new ApiError("Invalid email or password.", 401);
    const user = { id: match.id, fullName: match.fullName, email: match.email };
    writeSession(user);
    return { user };
  },
  signup: async ({ fullName, email, password }: SignupPayload): Promise<AuthResponse> => {
    await wait();
    const users = readUsers();
    if (users.some((user) => user.email === normalizeEmail(email))) {
      throw new ApiError("An account with this email already exists.", 409);
    }
    const user = { id: window.crypto.randomUUID(), fullName: fullName.trim(), email: normalizeEmail(email) };
    writeUsers([...users, { ...user, passwordHash: await hashPassword(password) }]);
    writeSession(user);
    return { user };
  },
  logout: async (): Promise<void> => {
    clearSession();
  },
  session: async (): Promise<AuthResponse | null> => {
    const user = readSession();
    return user ? { user } : null;
  },
};
