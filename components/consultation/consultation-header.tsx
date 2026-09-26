import { DomainSelector } from "@/components/consultation/domain-selector";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { LegalDomain } from "@/lib/store/features/consultations/consultations.types";

interface ConsultationHeaderProps {
  title: string;
  domain: LegalDomain;
  archetypeLabel?: string;
  onDomainChange: (domain: LegalDomain) => void;
}

export function ConsultationHeader({ title, domain, archetypeLabel, onDomainChange }: ConsultationHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3 sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <h1 className="min-w-40 flex-1 truncate font-heading text-2xl font-semibold">{title}</h1>
      {archetypeLabel && (
        <Badge variant="outline" className="hidden h-6 sm:inline-flex">
          {archetypeLabel}
        </Badge>
      )}
      <DomainSelector value={domain} onChange={onDomainChange} />
    </header>
  );
}
