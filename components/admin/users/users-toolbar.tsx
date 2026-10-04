"use client";

import { SearchIcon } from "lucide-react";
import { FilterSelect } from "@/components/admin/users/filter-select";
import { Input } from "@/components/ui/input";
import type { UserFilters } from "@/lib/admin/user-filters";
import { ROLE_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "@/lib/constants/admin-users";

interface UsersToolbarProps {
  filters: UserFilters;
  onChange: (filters: UserFilters) => void;
}

export function UsersToolbar({ filters, onChange }: UsersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          aria-label="Search users"
          placeholder="Search by name or email"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          className="h-9 pl-9"
        />
      </div>
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
