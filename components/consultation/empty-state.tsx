import type { Archetype } from "@/lib/constants/archetypes";
import { EXAMPLE_PROMPTS, RESEARCH_STEPS } from "@/lib/constants/consultation";

interface EmptyStateProps {
  onPick: (text: string) => void;
  archetype: Archetype | null;
}

export function EmptyState({ onPick, archetype }: EmptyStateProps) {
  const prompts = archetype
    ? archetype.prompts.map((text) => ({ kind: archetype.label, text }))
    : EXAMPLE_PROMPTS;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          {archetype ? archetype.label : "Pakistani legal research"}
        </p>
        <h2 className="font-heading text-4xl leading-tight font-semibold text-balance sm:text-5xl">
          {archetype ? archetype.heading : "How can I help with your legal research?"}
        </h2>
        <p className="leading-7 text-muted-foreground">
          {archetype
            ? archetype.description
            : "Ask a direct legal question or describe a legal scenario. Legal Intelligence will identify relevant Pakistani statutes, case law, and supporting evidence."}
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        {prompts.map(({ kind, text }) => (
          <li key={text}>
            <button
              type="button"
              onClick={() => onPick(text)}
              className="flex w-full flex-col gap-1.5 rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-muted/50"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">{kind}</span>
              <span className="text-[15px] leading-6">{text}</span>
            </button>
          </li>
        ))}
      </ul>
      <ol aria-label="Research process" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        {RESEARCH_STEPS.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>→</span>}
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
