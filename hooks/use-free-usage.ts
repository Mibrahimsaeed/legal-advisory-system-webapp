"use client";

import { useEffect } from "react";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import { selectFreeUsage, selectUsageLoaded, selectUsageUserId } from "@/lib/store/features/usage/usageSlice";
import { loadUsage } from "@/lib/store/features/usage/usageThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function useFreeUsage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUser)?.id;
  const usageUserId = useAppSelector(selectUsageUserId);
  const loaded = useAppSelector(selectUsageLoaded);
  const usage = useAppSelector(selectFreeUsage);

  useEffect(() => {
    if (userId) void dispatch(loadUsage(userId));
  }, [userId, dispatch]);

  return { usage, loaded: loaded && usageUserId === userId };
}
