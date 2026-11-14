"use client";

import { useState } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import { DataStateCard } from "@/components/admin/data-state-card";
import { DocumentsTable } from "@/components/admin/documents/documents-table";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { SearchInput } from "@/components/admin/search-input";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants/admin-tables";
import { selectAdminDocuments } from "@/lib/store/features/admin/adminSlice";
import { loadAdminDocuments } from "@/lib/store/features/admin/adminThunks";

export function DocumentsView() {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const q = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const documents = useAdminResource(selectAdminDocuments, loadAdminDocuments, { q, offset });
  const items = documents.data?.items ?? [];

  return (
    <AdminPage
      title="Documents"
      description="Files users have uploaded and their processing status. Only metadata is shown, never file contents."
    >
      <SearchInput
        label="Search documents"
        placeholder="Search by file name"
        value={query}
        onChange={(value) => {
          setQuery(value);
          setOffset(0);
        }}
      />
      <DataStateCard
        loading={documents.loading && !documents.data}
        refreshing={documents.loading && Boolean(documents.data)}
        error={documents.error}
        empty={!items.length}
        emptyMessage={q ? "No documents match this search." : "No documents have been uploaded yet."}
        onRetry={documents.reload}
      >
        <DocumentsTable documents={items} />
      </DataStateCard>
      {documents.data && (
        <PaginationControls offset={offset} shown={items.length} total={documents.data.total} noun="documents" onChange={setOffset} />
      )}
    </AdminPage>
  );
}
