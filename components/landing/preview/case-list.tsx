import type { SampleCase } from "@/lib/constants/landing-samples";

export function CaseList({ cases }: { cases: readonly SampleCase[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {cases.map((item) => (
        <li
          key={item.citation}
          className="rounded-lg border bg-background p-3 transition-colors hover:border-primary/30"
        >
          <p className="text-sm font-medium italic">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.citation}</p>
          <p className="mt-1.5 text-xs leading-5">{item.holding}</p>
        </li>
      ))}
    </ul>
  );
}
