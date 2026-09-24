import { RevealItem } from "@/components/common/reveal-item";
import { ResearchStep } from "@/components/landing/research-step";
import { RESEARCH_PREVIEW } from "@/lib/constants/legal-research";

const { productName, workspace, question, issue, law, cases, evidenceAction, disclaimer } =
  RESEARCH_PREVIEW;

const CITATION_MARKER =
  "flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-[10px] font-medium text-primary";

export function ResearchWorkspace() {
  return (
    <div
      role="img"
      aria-label="Illustration of the research workspace: a legal question, the legal issue, applicable law, relevant case law and supporting evidence"
      className="overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm shadow-foreground/5"
    >
      <div className="flex items-baseline justify-between gap-4 border-b px-5 py-4 sm:px-7">
        <p className="font-heading text-xl font-semibold">{productName}</p>
        <p className="text-xs text-muted-foreground">{workspace}</p>
      </div>
      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <ResearchStep index={0} label="Question">
          <p className="font-heading text-2xl leading-snug font-medium">{question}</p>
        </ResearchStep>
        <ResearchStep index={1} label="Legal issue">
          <p className="text-sm leading-6 font-medium">{issue}</p>
        </ResearchStep>
        <ResearchStep index={2} label="Applicable law">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium">{law.title}</p>
            <span className="rounded-full border border-primary/40 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary">
              {law.provision}
            </span>
          </div>
        </ResearchStep>
        <ResearchStep index={3} label="Relevant case law">
          <ul className="flex flex-col gap-1.5">
            {cases.map((item, i) => (
              <li key={item}>
                <RevealItem
                  delay={700 + i * 120}
                  className="flex items-center gap-2.5 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground"
                >
                  <span className={CITATION_MARKER}>{i + 1}</span>
                  {item}
                </RevealItem>
              </li>
            ))}
          </ul>
        </ResearchStep>
        <ResearchStep index={4} label="Evidence" last>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-primary">{evidenceAction} →</span>
            <div className="flex gap-1">
              {cases.map((item, i) => (
                <RevealItem key={item} delay={1100 + i * 100} className={CITATION_MARKER}>
                  {i + 1}
                </RevealItem>
              ))}
            </div>
          </div>
        </ResearchStep>
      </div>
      <p className="border-t px-5 py-3 text-[11px] text-muted-foreground sm:px-7">{disclaimer}</p>
    </div>
  );
}
