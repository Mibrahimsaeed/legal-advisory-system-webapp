import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { PRINCIPLES } from "@/lib/constants/landing";

export function AboutSection() {
  return (
    <PageSection id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="About us"
            title="Making Legal Research More Accessible"
          />
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Legal Intelligence is designed to bridge the gap between complex
            legal information and accessible legal research. The platform
            combines artificial intelligence, information retrieval, knowledge
            representation, and citation-grounded generation to help users
            navigate Pakistani legal materials more efficiently.
          </p>
        </div>
        <ul className="flex flex-col divide-y rounded-2xl border bg-card">
          {PRINCIPLES.map(({ title, description, icon: Icon }) => (
            <li key={title} className="reveal flex gap-4 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-heading text-2xl leading-tight font-semibold">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}
