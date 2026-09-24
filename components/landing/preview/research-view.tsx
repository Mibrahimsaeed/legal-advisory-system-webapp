import {
  BookOpenTextIcon,
  GavelIcon,
  HelpCircleIcon,
  ScaleIcon,
  ScrollTextIcon,
  SparklesIcon,
} from "lucide-react";
import { AnswerText } from "@/components/landing/preview/answer-text";
import { CaseList } from "@/components/landing/preview/case-list";
import { PreviewBlock } from "@/components/landing/preview/preview-block";
import { SourcePanel } from "@/components/landing/preview/source-panel";
import { StatuteList } from "@/components/landing/preview/statute-list";
import type { SampleResearch } from "@/lib/constants/landing-samples";

export function ResearchView({ sample }: { sample: SampleResearch }) {
  return (
    <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col gap-6">
        <PreviewBlock icon={HelpCircleIcon} title="Scenario">
          <p className="rounded-lg bg-muted px-4 py-3 text-sm leading-6">
            {sample.question}
          </p>
        </PreviewBlock>
        <PreviewBlock icon={ScaleIcon} title="Legal issue">
          <p className="text-sm leading-6">{sample.issue}</p>
        </PreviewBlock>
        <PreviewBlock icon={SparklesIcon} title="Answer">
          <AnswerText segments={sample.answer} />
        </PreviewBlock>
        <PreviewBlock icon={ScrollTextIcon} title="Applicable law">
          <StatuteList statutes={sample.statutes} />
        </PreviewBlock>
        <PreviewBlock icon={GavelIcon} title="Relevant case law">
          <CaseList cases={sample.cases} />
        </PreviewBlock>
        <PreviewBlock icon={BookOpenTextIcon} title="Court reasoning">
          <p className="text-sm leading-6">{sample.reasoning}</p>
        </PreviewBlock>
      </div>
      <SourcePanel sources={sample.sources} className="lg:sticky lg:top-24 lg:self-start" />
    </div>
  );
}
