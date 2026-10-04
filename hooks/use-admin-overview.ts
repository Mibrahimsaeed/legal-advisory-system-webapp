"use client";

import { useEffect } from "react";
import { selectAdminOverview, selectAdminOverviewStatus } from "@/lib/store/features/admin/adminSlice";
import { loadAdminOverview } from "@/lib/store/features/admin/adminThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function useAdminOverview() {
  const dispatch = useAppDispatch();
  const overview = useAppSelector(selectAdminOverview);
  const status = useAppSelector(selectAdminOverviewStatus);

  useEffect(() => {
    if (status === "idle") void dispatch(loadAdminOverview());
  }, [status, dispatch]);

  return { overview, failed: status === "failed" };
}
