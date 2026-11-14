"use client";

import { useState } from "react";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";
import { selectAdminActionError, selectPendingUserIds } from "@/lib/store/features/admin/adminSlice";
import { deleteAdminUser, updateAdminUserStatus } from "@/lib/store/features/admin/adminThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// Status changes and deletion; `onChanged` refreshes the list after a successful change.
export function useAdminUserActions(onChanged: () => void) {
  const dispatch = useAppDispatch();
  const pendingUserIds = useAppSelector(selectPendingUserIds);
  const error = useAppSelector(selectAdminActionError);
  const [deleting, setDeleting] = useState<AdminUser | null>(null);

  const toggleStatus = async (user: AdminUser) => {
    const status = user.status === "active" ? "inactive" : "active";
    const result = await dispatch(updateAdminUserStatus({ id: user.id, status }));
    if (updateAdminUserStatus.fulfilled.match(result)) onChanged();
  };

  const confirmDelete = async (user: AdminUser) => {
    setDeleting(null);
    const result = await dispatch(deleteAdminUser(user.id));
    if (deleteAdminUser.fulfilled.match(result)) onChanged();
  };

  return { pendingUserIds, error, deleting, setDeleting, toggleStatus, confirmDelete };
}
