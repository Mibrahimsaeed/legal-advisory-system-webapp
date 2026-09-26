import type { LegalAnswer } from "@/lib/store/features/consultations/consultations.types";

export function EvidenceSummary({ answer }: { answer: LegalAnswer }) {
  const statutes = answer.sources.filter((source) => source.kind === "statute").length;
  const cases = answer.sources.length - statutes;
  const stats = [
    { value: statutes, label: statutes === 1 ? "statutory provision" : "statutory provisions" },
    { value: cases, label: cases === 1 ? "case" : "cases" },
    { value: answer.passageCount, label: "supporting passages" },
  ];

  return (
    <dl className="grid grid-cols-3 divide-x rounded-lg border bg-background">
      {stats.map(({ value, label }) => (
        <div key={label} className="flex flex-col gap-0.5 px-3 py-3">
          <dd className="font-heading text-2xl leading-none font-semibold">{value}</dd>
          <dt className="text-[11px] leading-4 text-muted-foreground">{label}</dt>
        </div>
      ))}
    </dl>
  );
}
