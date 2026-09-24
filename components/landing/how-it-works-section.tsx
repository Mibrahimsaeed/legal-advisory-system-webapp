import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { Fragment } from "react";
import { PageSection } from "@/components/common/page-section";
import { SectionHeading } from "@/components/common/section-heading";
import { COVERAGE, PIPELINE_STAGES } from "@/lib/constants/landing";

export function HowItWorksSection() {
  return (
    <PageSection id="how-it-works" muted>
      <SectionHeading
        eyebrow="How it works"
        title="Every Answer Follows a Traceable Path"
        description="Legal Intelligence retrieves relevant material first, then reasons over it, so what you read can be traced back to its sources."
      />
      <ol className="mt-14 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {PIPELINE_STAGES.map(({ title, description, icon: Icon }, index) => (
          <Fragment key={title}>
            <li className="reveal flex flex-1 flex-col gap-3 self-stretch rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="size-4" aria-hidden />
              </span>
              <h3 className="font-heading text-xl leading-tight font-semibold">
                {title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </li>
            {index < PIPELINE_STAGES.length - 1 && (
              <li aria-hidden className="flex justify-center text-muted-foreground">
                <ArrowDownIcon className="size-4 lg:hidden" />
                <ArrowRightIcon className="hidden size-4 lg:block" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      <div className="mt-16">
        <h3 className="text-center text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Working across
        </h3>
        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {COVERAGE.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex flex-col items-center gap-2 text-center">
              <Icon className="size-5" aria-hidden />
              <p className="text-sm font-medium">{title}</p>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}
