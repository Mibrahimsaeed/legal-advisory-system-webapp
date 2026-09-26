import type { User } from "@/lib/store/features/auth/auth.types";

interface StoredUser extends User {
  passwordHash: string;
}

const USERS_KEY = "li.users";
const SESSION_KEY = "li.session";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export async function hashPassword(password: string) {
  if (!window.crypto?.subtle) return window.btoa(password);
  const bytes = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const readUsers = () => readJson<StoredUser[]>(USERS_KEY, []);
export const writeUsers = (users: StoredUser[]) => writeJson(USERS_KEY, users);
export const readSession = () => readJson<User | null>(SESSION_KEY, null);
export const writeSession = (user: User) => writeJson(SESSION_KEY, user);
export const clearSession = () => window.localStorage.removeItem(SESSION_KEY);
export type { StoredUser };
