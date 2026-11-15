"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ label, placeholder, value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <Input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 pl-9"
      />
    </div>
  );
}
