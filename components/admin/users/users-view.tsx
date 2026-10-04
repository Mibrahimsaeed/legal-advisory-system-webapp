"use client";

import { useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog";
import { UserDetailsDialog } from "@/components/admin/users/user-details-dialog";
import { UsersTable } from "@/components/admin/users/users-table";
import { UsersToolbar } from "@/components/admin/users/users-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { DEFAULT_USER_FILTERS, filterUsers } from "@/lib/admin/user-filters";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";
import { selectAdminError, selectAdminUsers, selectAdminUsersStatus } from "@/lib/store/features/admin/adminSlice";
import { deleteAdminUser, loadAdminUsers, updateAdminUserStatus } from "@/lib/store/features/admin/adminThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function UsersView() {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAdminAccess();
  const users = useAppSelector(selectAdminUsers);
  const status = useAppSelector(selectAdminUsersStatus);
  const error = useAppSelector(selectAdminError);
  const [filters, setFilters] = useState(DEFAULT_USER_FILTERS);
  const [viewing, setViewing] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState<AdminUser | null>(null);
  const visible = filterUsers(users, filters);

  useEffect(() => {
    if (status === "idle") void dispatch(loadAdminUsers());
  }, [status, dispatch]);

  const toggleStatus = (user: AdminUser) =>
    void dispatch(updateAdminUserStatus({ id: user.id, status: user.status === "active" ? "inactive" : "active" }));

  const confirmDelete = (user: AdminUser) => {
    void dispatch(deleteAdminUser(user.id));
    setDeleting(null);
  };

  return (
    <AdminPage
      title="User Management"
      description="Search, filter and manage accounts. Changes apply to the sample user list for this session only and are not saved to a database."
      sampleData
    >
      <UsersToolbar filters={filters} onChange={setFilters} />
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Card className="rounded-2xl py-0 shadow-sm">
        <CardContent className="px-2 py-1">
          {status !== "succeeded" ? (
            <div className="flex flex-col gap-2 p-2">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="h-10" />
              ))}
            </div>
          ) : visible.length ? (
            <UsersTable
              users={visible}
              currentUserId={currentUser?.id}
              onView={setViewing}
              onToggleStatus={toggleStatus}
              onDelete={setDeleting}
            />
          ) : (
            <p className="p-8 text-center text-sm text-muted-foreground">No users match these filters.</p>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Showing {visible.length} of {users.length} users
      </p>
      <UserDetailsDialog user={viewing} onClose={() => setViewing(null)} />
      <DeleteUserDialog user={deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />
    </AdminPage>
  );
}
