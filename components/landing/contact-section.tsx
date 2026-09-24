import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactForm } from "@/components/landing/contact-form";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <PageSection id="contact" muted>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="Contact"
          title="Get in Touch"
          description="Questions about the platform, feedback on the research workflow, or interested in learning more? Send us a message."
        />
        <Card className="reveal [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </PageSection>
  );
}
