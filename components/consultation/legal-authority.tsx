"use client";

import { EvidenceSummary } from "@/components/consultation/evidence-summary";
import { ReasoningPath } from "@/components/consultation/reasoning-path";
import { SourceCard } from "@/components/consultation/source-card";
import { SourceDetail } from "@/components/consultation/source-detail";
import { PROTOTYPE_NOTICE } from "@/lib/constants/consultation";
import type {
  Consultation,
  LegalAnswer,
  LegalSource,
} from "@/lib/store/features/consultations/consultations.types";
import { selectSelectedSourceId, sourceCleared } from "@/lib/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

function latestAnswer(consultation: Consultation | undefined): LegalAnswer | undefined {
  return consultation?.messages.findLast((message) => message.answer)?.answer;
}

function allSources(consultation: Consultation | undefined): LegalSource[] {
  return consultation?.messages.flatMap((message) => message.answer?.sources ?? []) ?? [];
}

function SourceGroup({ title, sources, all }: { title: string; sources: LegalSource[]; all: LegalSource[] }) {
  if (sources.length === 0) return null;
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{title}</h3>
      <div className="flex flex-col gap-2">
        {sources.map((source) => (
          <SourceCard key={source.id} source={source} number={all.indexOf(source) + 1} />
        ))}
      </div>
    </section>
  );
}

export function LegalAuthority({ consultation }: { consultation: Consultation | undefined }) {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedSourceId);
  const answer = latestAnswer(consultation);
  const selected = allSources(consultation).find((source) => source.id === selectedId);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-5 py-4">
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Sources</p>
        <h2 className="font-heading text-2xl font-semibold">Legal Authority</h2>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        {selected ? (
          <SourceDetail source={selected} onBack={() => dispatch(sourceCleared())} />
        ) : answer ? (
          <div className="flex flex-col gap-6">
            <SourceGroup title="Statutes" sources={answer.sources.filter((s) => s.kind === "statute")} all={answer.sources} />
            <SourceGroup title="Case law" sources={answer.sources.filter((s) => s.kind === "case")} all={answer.sources} />
            <section className="flex flex-col gap-2">
              <h3 className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Evidence</h3>
              <EvidenceSummary answer={answer} />
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">How these connect</h3>
              <ReasoningPath />
            </section>
          </div>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            The statutes, case law and supporting passages behind each answer appear here. Ask a question to begin.
          </p>
        )}
      </div>
      <p className="border-t px-5 py-3 text-[11px] leading-4 text-muted-foreground">{PROTOTYPE_NOTICE}</p>
    </div>
  );
}
