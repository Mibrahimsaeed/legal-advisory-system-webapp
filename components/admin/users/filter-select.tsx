"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterSelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}

export function FilterSelect<T extends string>({ label, value, options, onChange, className }: FilterSelectProps<T>) {
  return (
    <Select
      value={value}
      items={options}
      onValueChange={(next) => {
        const match = options.find((option) => option.value === next);
        if (match) onChange(match.value);
      }}
    >
      <SelectTrigger aria-label={label} className={cn("h-9 w-full sm:w-40", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
