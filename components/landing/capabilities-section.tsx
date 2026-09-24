import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CAPABILITIES } from "@/lib/constants/landing";

export function CapabilitiesSection() {
  return (
    <PageSection id="capabilities">
      <SectionHeading
        eyebrow="Core capabilities"
        title="Built for Legal Research"
        description="Tools that keep every answer connected to the authorities behind it."
      />
      <ul className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
        {CAPABILITIES.map(({ title, description, icon: Icon }) => (
          <li key={title} className="reveal">
            <Card className="h-full [--card-spacing:--spacing(6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-foreground/25">
              <CardHeader>
                <span className="mb-4 flex size-10 items-center justify-center rounded-lg border bg-muted">
                  <Icon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="leading-6">{description}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
