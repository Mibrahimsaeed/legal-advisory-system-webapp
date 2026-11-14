"use client";

import { SearchInput } from "@/components/admin/search-input";
import { FilterSelect } from "@/components/admin/users/filter-select";
import type { UserFilters } from "@/lib/admin/user-filters";
import { ROLE_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "@/lib/constants/admin-users";

interface UsersToolbarProps {
  filters: UserFilters;
  onChange: (filters: UserFilters) => void;
}

export function UsersToolbar({ filters, onChange }: UsersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput
        label="Search users"
        placeholder="Search by name or email"
        value={filters.query}
        onChange={(query) => onChange({ ...filters, query })}
      />
      <FilterSelect
        label="Filter by role"
        value={filters.role}
        options={ROLE_FILTER_OPTIONS}
        onChange={(role) => onChange({ ...filters, role })}
      />
      <FilterSelect
        label="Filter by status"
        value={filters.status}
        options={STATUS_FILTER_OPTIONS}
        onChange={(status) => onChange({ ...filters, status })}
      />
    </div>
  );
}
