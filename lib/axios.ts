import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@/lib/api/client";
import { API_BASE_PATH } from "@/lib/constants/app";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/auth/token-storage";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retried?: boolean;
  }
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

interface FastApiErrorBody {
  detail?: string | { msg: string }[];
}

const FALLBACK_ERROR = "Something went wrong. Please try again.";
const SKIP_REFRESH_PATHS = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];

// Same-origin path; next.config.ts proxies it to BASE_URL so the backend host stays server-side.
export const api = axios.create({
  baseURL: API_BASE_PATH,
  timeout: 30_000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

let onUnauthorized: (() => void) | null = null;

// The store is created per request, so the provider registers how to react to an expired session.
export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshInFlight: Promise<string> | null = null;

// Concurrent 401s share one refresh request.
function refreshAccessToken(): Promise<string> {
  refreshInFlight ??= (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new ApiError("Your session has expired. Please sign in again.", 401);
    const { data } = await api.post<TokenResponse>("/auth/refresh", { refresh_token: refreshToken });
    setTokens({ accessToken: data.access_token, refreshToken: data.refresh_token });
    return data.access_token;
  })().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

function toApiError(error: AxiosError<FastApiErrorBody>): ApiError {
  if (!error.response) {
    const message = error.code === AxiosError.ECONNABORTED
      ? "The server took too long to respond. Please try again."
      : "Could not reach the server. Check your connection and try again.";
    return new ApiError(message, 0);
  }
  const { detail } = error.response.data ?? {};
  const message = typeof detail === "string" ? detail : detail?.[0]?.msg ?? FALLBACK_ERROR;
  return new ApiError(message, error.response.status);
}

api.interceptors.response.use(undefined, async (error: unknown) => {
  if (!axios.isAxiosError<FastApiErrorBody>(error)) throw error;

  const config: InternalAxiosRequestConfig | undefined = error.config;
  const isUnauthorized = error.response?.status === 401;
  const canRefresh = config && !config._retried && !SKIP_REFRESH_PATHS.includes(config.url ?? "");

  if (isUnauthorized && canRefresh) {
    config._retried = true;
    try {
      const token = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return api.request(config);
    } catch {
      clearTokens();
      onUnauthorized?.();
    }
  }

  throw toApiError(error);
});
