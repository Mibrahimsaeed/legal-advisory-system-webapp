import { FREE_QUERY_LIMIT, FREE_REFRESH_HOURS } from "@/lib/constants/billing";

export interface FreeUsage {
  used: number;
  limitReachedAt: string | null;
}

const REFRESH_MS = FREE_REFRESH_HOURS * 3_600_000;

export const EMPTY_FREE_USAGE: FreeUsage = { used: 0, limitReachedAt: null };

export function getResetTime(usage: FreeUsage): number | null {
  return usage.limitReachedAt ? new Date(usage.limitReachedAt).getTime() + REFRESH_MS : null;
}

export function refreshIfDue(usage: FreeUsage, now = Date.now()): FreeUsage {
  const resetTime = getResetTime(usage);
  return resetTime !== null && now >= resetTime ? EMPTY_FREE_USAGE : usage;
}

export function getRemainingQueries(usage: FreeUsage): number {
  return Math.max(FREE_QUERY_LIMIT - usage.used, 0);
}

export function recordQuery(usage: FreeUsage, now = Date.now()): FreeUsage {
  const used = usage.used + 1;
  return {
    used,
    limitReachedAt: used >= FREE_QUERY_LIMIT ? new Date(now).toISOString() : null,
  };
}

export function formatResetTime(resetTime: number): string {
  return new Date(resetTime).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" });
}
