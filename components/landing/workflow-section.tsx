import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WORKFLOW_STEPS } from "@/lib/constants/landing";

export function WorkflowSection() {
  return (
    <PageSection id="workflow" muted>
      <SectionHeading
        eyebrow="The workflow"
        title="From Legal Questions to Grounded Answers"
        description="Four steps take a question from plain language to a response you can check against its sources."
      />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WORKFLOW_STEPS.map(({ title, description, icon: Icon }, index) => (
          <li key={title} className="reveal">
            <Card className="h-full [--card-spacing:--spacing(6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-foreground/25">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-heading text-4xl leading-none font-semibold text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                </div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="leading-6">{description}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
