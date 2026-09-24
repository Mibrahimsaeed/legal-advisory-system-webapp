import { ArrowRightIcon } from "lucide-react";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/link-button";
import { ROUTES } from "@/lib/constants/routes";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <h2 className="font-heading max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            Start Exploring Pakistani Law
          </h2>
          <p className="max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
            Explore legal questions through a research workflow designed around
            relevant authorities, evidence, and citations.
          </p>
          <LinkButton href={ROUTES.login} variant="secondary" large>
            Launch Legal Intelligence
            <ArrowRightIcon />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
