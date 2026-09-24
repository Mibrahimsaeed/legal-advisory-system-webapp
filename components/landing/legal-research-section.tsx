import { RevealOnView } from "@/components/common/reveal-on-view";
import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { ResearchWorkspace } from "@/components/landing/research-workspace";
import { LEGAL_RESEARCH_COPY } from "@/lib/constants/legal-research";

export function LegalResearchSection() {
  return (
    <PageSection id="workflow" primary>
      <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24">
        <RevealOnView className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            inverted
            eyebrow={LEGAL_RESEARCH_COPY.eyebrow}
            title={LEGAL_RESEARCH_COPY.title}
            description={LEGAL_RESEARCH_COPY.description}
            className="max-w-[35rem] [&_h2]:leading-[1.12] [&_h2]:lg:text-[3rem]"
          />
          <p className="max-w-[35rem] border-l-2 border-primary-foreground/30 pl-4 text-sm leading-6 text-primary-foreground/70">
            {LEGAL_RESEARCH_COPY.statement}
          </p>
        </RevealOnView>
        <RevealOnView delay={150} className="mx-auto w-full max-w-xl lg:max-w-none">
          <ResearchWorkspace />
        </RevealOnView>
      </div>
    </PageSection>
  );
}
