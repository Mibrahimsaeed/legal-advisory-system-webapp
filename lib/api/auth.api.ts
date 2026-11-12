import { ApiError } from "@/lib/api/client";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/auth/token-storage";
import { api } from "@/lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  UpdateProfilePayload,
  User,
} from "@/lib/store/features/auth/auth.types";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

interface UserProfileResponse {
  id: string;
  email: string;
  full_name: string | null;
  is_admin?: boolean;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

function toUser(profile: UserProfileResponse): User {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name ?? profile.email.split("@")[0],
    role: profile.is_admin ? "admin" : "user",
  };
}

async function fetchCurrentUser(): Promise<AuthResponse> {
  const { data } = await api.get<UserProfileResponse>("/users/me");
  return { user: toUser(data) };
}

export const authApi = {
  login: async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<TokenResponse>("/auth/login", { email: normalizeEmail(email), password });
    setTokens({ accessToken: data.access_token, refreshToken: data.refresh_token });
    return fetchCurrentUser();
  },
  // Registration returns the profile without tokens, so sign in straight after.
  signup: async ({ fullName, email, password }: SignupPayload): Promise<AuthResponse> => {
    await api.post<UserProfileResponse>("/auth/register", {
      email: normalizeEmail(email),
      password,
      full_name: fullName.trim(),
    });
    return authApi.login({ email, password });
  },
  updateProfile: async ({ fullName }: UpdateProfilePayload): Promise<AuthResponse> => {
    const { data } = await api.patch<UserProfileResponse>("/users/me", { full_name: fullName.trim() });
    return { user: toUser(data) };
  },
  // The local session ends even if revoking the refresh token fails.
  logout: async (): Promise<void> => {
    const refreshToken = getRefreshToken();
    clearTokens();
    if (refreshToken) await api.post("/auth/logout", { refresh_token: refreshToken }).catch(() => undefined);
  },
  session: async (): Promise<AuthResponse | null> => {
    if (!getAccessToken()) return null;
    try {
      return await fetchCurrentUser();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearTokens();
        return null;
      }
      throw error;
    }
  },
};
