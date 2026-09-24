import { apiClient } from "@/lib/api/client";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from "@/lib/store/features/auth/auth.types";

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient<AuthResponse>("/auth/login", { method: "POST", body: payload }),
  signup: (payload: SignupPayload) =>
    apiClient<AuthResponse>("/auth/signup", { method: "POST", body: payload }),
  logout: () => apiClient<void>("/auth/logout", { method: "POST" }),
};
