import { ApiError } from "@/lib/api/client";
import {
  EMPTY_FREE_USAGE,
  getRemainingQueries,
  recordQuery,
  refreshIfDue,
  type FreeUsage,
} from "@/lib/billing/free-usage";

// Prototype implementation backed by localStorage, like auth and consultations.
// Replace with apiClient calls once a backend enforces the free limit server-side.
const storageKey = (userId: string) => `li.usage.${userId}`;

function readUsage(userId: string): FreeUsage {
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as FreeUsage) : EMPTY_FREE_USAGE;
  } catch {
    return EMPTY_FREE_USAGE;
  }
}

function writeUsage(userId: string, usage: FreeUsage) {
  window.localStorage.setItem(storageKey(userId), JSON.stringify(usage));
}

export const usageApi = {
  get: async (userId: string): Promise<FreeUsage> => {
    const usage = refreshIfDue(readUsage(userId));
    writeUsage(userId, usage);
    return usage;
  },
  consume: async (userId: string): Promise<FreeUsage> => {
    const usage = refreshIfDue(readUsage(userId));
    if (getRemainingQueries(usage) === 0) {
      throw new ApiError("You have used all of your free queries.", 402);
    }
    const next = recordQuery(usage);
    writeUsage(userId, next);
    return next;
  },
};
