"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DOMAIN_OPTIONS, isLegalDomain } from "@/lib/constants/consultation";
import type { LegalDomain } from "@/lib/store/features/consultations/consultations.types";

interface DomainSelectorProps {
  value: LegalDomain;
  onChange: (domain: LegalDomain) => void;
}

export function DomainSelector({ value, onChange }: DomainSelectorProps) {
  return (
    <Select
      value={value}
      items={DOMAIN_OPTIONS}
      onValueChange={(next) => {
        if (isLegalDomain(next)) onChange(next);
      }}
    >
      <SelectTrigger aria-label="Legal domain" className="h-9 min-w-48 bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {DOMAIN_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
