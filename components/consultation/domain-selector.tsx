"use client";

import { ScaleIcon } from "lucide-react";
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
      <SelectTrigger
        aria-label="Legal domain"
        className="h-10 min-w-56 gap-2.5 border-primary bg-primary px-3.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-primary/30 dark:bg-primary dark:hover:bg-primary/90 [&_svg]:text-primary-foreground"
      >
        <ScaleIcon aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-72">
        {DOMAIN_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="py-2 pr-9">
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs font-normal text-muted-foreground">{option.description}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
