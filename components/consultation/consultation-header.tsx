"use client";

import { ScaleIcon } from "lucide-react";
import { DomainSelector } from "@/components/consultation/domain-selector";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { LegalDomain } from "@/lib/store/features/consultations/consultations.types";
import { authorityOpenChanged } from "@/lib/store/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/lib/store/hooks";

interface ConsultationHeaderProps {
  title: string;
  domain: LegalDomain;
  onDomainChange: (domain: LegalDomain) => void;
}

export function ConsultationHeader({ title, domain, onDomainChange }: ConsultationHeaderProps) {
  const dispatch = useAppDispatch();

  return (
    <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3 sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <h1 className="min-w-40 flex-1 truncate font-heading text-2xl font-semibold">{title}</h1>
      <DomainSelector value={domain} onChange={onDomainChange} />
      <Button
        variant="outline"
        size="sm"
        className="h-9 xl:hidden"
        onClick={() => dispatch(authorityOpenChanged(true))}
      >
        <ScaleIcon />
        Authority
      </Button>
    </header>
  );
}
