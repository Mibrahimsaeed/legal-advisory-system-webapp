import { Citation } from "@/components/consultation/citation";
import type { LegalSource } from "@/lib/store/features/consultations/consultations.types";

interface AuthorityItemProps {
  source: LegalSource;
  number: number;
  summary: string;
}

export function AuthorityItem({ source, number, summary }: AuthorityItemProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border bg-background p-3.5">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <Citation number={number} />
        <p className="text-sm font-semibold">{source.title}</p>
        <span className="text-xs text-muted-foreground">
          {source.kind === "statute" ? source.provision : source.court}
        </span>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
    </div>
  );
}
