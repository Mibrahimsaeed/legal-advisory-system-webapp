import { Citation } from "@/components/consultation/citation";
import type { LegalSource } from "@/lib/store/features/consultations/consultations.types";

interface AuthorityItemProps {
  source: LegalSource;
  number: number;
  summary: string;
}

export function AuthorityItem({ source, number, summary }: AuthorityItemProps) {
  const citationLabel =
    source.kind === "statute" ? `${source.title}, ${source.provision}` : `${source.title}, ${source.court}`;

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border bg-background p-3.5">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <p className="text-sm font-semibold">{source.title}</p>
        <span className="text-xs text-muted-foreground">
          {source.kind === "statute" ? source.provision : source.court}
        </span>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
      <Citation sourceId={source.id} number={number} label={citationLabel} />
    </div>
  );
}
