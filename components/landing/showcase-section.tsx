import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { DomainShowcase } from "@/components/landing/preview/domain-showcase";
import { SAMPLE_DISCLAIMER } from "@/lib/constants/landing-samples";

export function ShowcaseSection() {
  return (
    <PageSection id="product" muted>
      <SectionHeading
        eyebrow="The product"
        title="A Research Workspace Built Around Sources"
        description="Choose a legal domain, describe a scenario, and review the issue, applicable law, case law and reasoning alongside the evidence."
      />
      <div className="reveal mx-auto mt-14 max-w-6xl">
        <DomainShowcase />
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {SAMPLE_DISCLAIMER}
        </p>
      </div>
    </PageSection>
  );
}
