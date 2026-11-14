"use client";

import { useState } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import { AuditTable } from "@/components/admin/audit/audit-table";
import { DataStateCard } from "@/components/admin/data-state-card";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { selectAdminAudit } from "@/lib/store/features/admin/adminSlice";
import { loadAdminAudit } from "@/lib/store/features/admin/adminThunks";

export function AuditView() {
  const [offset, setOffset] = useState(0);
  const audit = useAdminResource(selectAdminAudit, loadAdminAudit, { offset });
  const items = audit.data?.items ?? [];

  return (
    <AdminPage title="Audit Log" description="Every change an admin makes to user accounts, newest first.">
      <DataStateCard
        loading={audit.loading && !audit.data}
        refreshing={audit.loading && Boolean(audit.data)}
        error={audit.error}
        empty={!items.length}
        emptyMessage="No admin actions have been recorded yet."
        onRetry={audit.reload}
      >
        <AuditTable entries={items} />
      </DataStateCard>
      {audit.data && (
        <PaginationControls offset={offset} shown={items.length} total={audit.data.total} noun="entries" onChange={setOffset} />
      )}
    </AdminPage>
  );
}
