"use client";

import { useAdminResource } from "@/hooks/use-admin-resource";
import { selectAdminOverview } from "@/lib/store/features/admin/adminSlice";
import { loadAdminOverview } from "@/lib/store/features/admin/adminThunks";

export function useAdminOverview() {
  const { data, error, reload } = useAdminResource(selectAdminOverview, loadAdminOverview, undefined);
  return { overview: data, error, reload };
}
