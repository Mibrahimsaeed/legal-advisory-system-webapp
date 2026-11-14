"use client";

import { useState } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import { DataStateCard } from "@/components/admin/data-state-card";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { QuestionsTable } from "@/components/admin/questions/questions-table";
import { SearchInput } from "@/components/admin/search-input";
import { FilterSelect } from "@/components/admin/users/filter-select";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { SEARCH_DEBOUNCE_MS, TOPIC_FILTER_OPTIONS } from "@/lib/constants/admin-tables";
import { selectAdminQuestions } from "@/lib/store/features/admin/adminSlice";
import { loadAdminQuestions } from "@/lib/store/features/admin/adminThunks";

export function QuestionsView() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [offset, setOffset] = useState(0);
  const q = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const questions = useAdminResource(selectAdminQuestions, loadAdminQuestions, {
    q,
    topic: topic === "all" ? "" : topic,
    offset,
  });
  const items = questions.data?.items ?? [];

  return (
    <AdminPage
      title="Questions"
      description="Questions people have asked, newest first. Answers and identities are never shown; each person appears under an anonymous reference."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          label="Search questions"
          placeholder="Search question text"
          value={query}
          onChange={(value) => {
            setQuery(value);
            setOffset(0);
          }}
        />
        <FilterSelect
          label="Filter by topic"
          value={topic}
          options={TOPIC_FILTER_OPTIONS}
          className="sm:w-52"
          onChange={(value) => {
            setTopic(value);
            setOffset(0);
          }}
        />
      </div>
      <DataStateCard
        loading={questions.loading && !questions.data}
        refreshing={questions.loading && Boolean(questions.data)}
        error={questions.error}
        empty={!items.length}
        emptyMessage={q || topic !== "all" ? "No questions match these filters." : "No questions have been asked yet."}
        onRetry={questions.reload}
      >
        <QuestionsTable questions={items} />
      </DataStateCard>
      {questions.data && (
        <PaginationControls offset={offset} shown={items.length} total={questions.data.total} noun="questions" onChange={setOffset} />
      )}
    </AdminPage>
  );
}
