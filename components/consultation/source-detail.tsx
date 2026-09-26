import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LegalSource } from "@/lib/store/features/consultations/consultations.types";

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
      {children}
    </div>
  );
}

export function SourceDetail({ source, onBack }: { source: LegalSource; onBack: () => void }) {
  const isStatute = source.kind === "statute";

  return (
    <div className="flex flex-col gap-5">
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 w-fit">
        <ArrowLeftIcon />
        All sources
      </Button>
      <DetailField label={isStatute ? "Source" : "Case"}>
        <p className="font-heading text-2xl leading-tight font-semibold">{source.title}</p>
      </DetailField>
      <DetailField label={isStatute ? "Section" : "Court"}>
        <p className="text-sm font-medium">{isStatute ? source.provision : source.court}</p>
      </DetailField>
      <DetailField label="Relevant passage">
        <blockquote className="border-l-2 border-primary pl-3 font-heading text-lg leading-snug">
          {source.passage}
        </blockquote>
      </DetailField>
      {!isStatute && (
        <DetailField label="Legal principle">
          <p className="text-sm leading-6">{source.principle}</p>
        </DetailField>
      )}
      <DetailField label="Why it matters">
        <p className="text-sm leading-6">{source.relevance}</p>
      </DetailField>
    </div>
  );
}
