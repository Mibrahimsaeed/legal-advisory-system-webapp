import { PageSection } from "@/components/common/page-section";
import { RevealOnView } from "@/components/common/reveal-on-view";
import { SectionHeading } from "@/components/common/section-heading";
import LegalKnowledgeGraph from "@/components/legal/LegalKnowledgeGraph";
import { KNOWLEDGE_GRAPH_COPY, KNOWLEDGE_GRAPH_THEME } from "@/lib/constants/knowledge-graph";

const { eyebrow, title, description, legend, note } = KNOWLEDGE_GRAPH_COPY;

export function KnowledgeGraphSection() {
  return (
    <PageSection id="how-it-works">
      <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <RevealOnView className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="max-w-[28rem] [&_h2]:lg:text-[3rem]"
          />
          <div className="flex max-w-[28rem] flex-col gap-2.5 border-t pt-4 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            <span className="flex items-center gap-2.5">
              <span aria-hidden className="h-[1.6px] w-6 bg-primary" />
              {legend.path}
            </span>
            <span className="flex items-center gap-2.5">
              <span aria-hidden className="h-px w-6 bg-border" />
              {legend.related}
            </span>
            <span className="leading-5 tracking-[0.04em] normal-case">{note}</span>
          </div>
        </RevealOnView>
        <LegalKnowledgeGraph theme={KNOWLEDGE_GRAPH_THEME} />
      </div>
    </PageSection>
  );
}
