"use client";

import { useState } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import { DataStateCard } from "@/components/admin/data-state-card";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog";
import { UserDetailsDialog } from "@/components/admin/users/user-details-dialog";
import { UsersTable } from "@/components/admin/users/users-table";
import { UsersToolbar } from "@/components/admin/users/users-toolbar";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { useAdminUserActions } from "@/hooks/use-admin-user-actions";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { DEFAULT_USER_FILTERS, filterByRole, type UserFilters } from "@/lib/admin/user-filters";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants/admin-tables";
import type { AdminUser } from "@/lib/store/features/admin/admin.types";
import { selectAdminUsers } from "@/lib/store/features/admin/adminSlice";
import { loadAdminUsers } from "@/lib/store/features/admin/adminThunks";

export function UsersView() {
  const { user: currentUser } = useAdminAccess();
  const [filters, setFilters] = useState(DEFAULT_USER_FILTERS);
  const [offset, setOffset] = useState(0);
  const [viewing, setViewing] = useState<AdminUser | null>(null);
  const q = useDebouncedValue(filters.query, SEARCH_DEBOUNCE_MS);
  const users = useAdminResource(selectAdminUsers, loadAdminUsers, { q, status: filters.status, offset });
  const actions = useAdminUserActions(users.reload);
  const items = users.data?.items ?? [];
  const visible = filterByRole(items, filters.role);

  const changeFilters = (next: UserFilters) => {
    setFilters(next);
    setOffset(0);
  };

  return (
    <AdminPage title="User Management" description="Search, filter and manage registered accounts.">
      <UsersToolbar filters={filters} onChange={changeFilters} />
      {actions.error && <p role="alert" className="text-sm text-destructive">{actions.error}</p>}
      <DataStateCard
        loading={users.loading && !users.data}
        refreshing={users.loading && Boolean(users.data)}
        error={users.error}
        empty={!visible.length}
        emptyMessage={items.length ? "No users on this page match the role filter." : "No users match these filters."}
        onRetry={users.reload}
      >
        <UsersTable
          users={visible}
          currentUserId={currentUser?.id}
          pendingUserIds={actions.pendingUserIds}
          onView={setViewing}
          onToggleStatus={(user) => void actions.toggleStatus(user)}
          onDelete={actions.setDeleting}
        />
      </DataStateCard>
      {users.data && (
        <PaginationControls offset={offset} shown={items.length} total={users.data.total} noun="users" onChange={setOffset} />
      )}
      <UserDetailsDialog user={viewing} onClose={() => setViewing(null)} />
      <DeleteUserDialog
        user={actions.deleting}
        onCancel={() => actions.setDeleting(null)}
        onConfirm={(user) => void actions.confirmDelete(user)}
      />
    </AdminPage>
  );
}
