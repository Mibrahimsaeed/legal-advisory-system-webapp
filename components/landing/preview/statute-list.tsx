import type { SampleStatute } from "@/lib/constants/landing-samples";

export function StatuteList({ statutes }: { statutes: readonly SampleStatute[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {statutes.map((statute) => (
        <li
          key={statute.reference}
          className="rounded-lg border bg-background p-3 transition-colors hover:border-primary/30"
        >
          <p className="text-sm font-medium">{statute.reference}</p>
          <p className="text-xs text-muted-foreground">{statute.title}</p>
          <p className="mt-1.5 text-xs leading-5">{statute.note}</p>
        </li>
      ))}
    </ul>
  );
}
