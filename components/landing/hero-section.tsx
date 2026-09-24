import { ArrowRightIcon } from "lucide-react";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/link-button";
import { HeroGraph } from "@/components/landing/hero-graph";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants/routes";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <Container className="pointer-events-none relative z-10 flex items-center py-16 sm:py-20 lg:min-h-[44rem] lg:py-24">
        <div className="pointer-events-auto flex flex-col items-start gap-7 lg:max-w-[46%]">
          <Badge variant="outline" className="h-7 px-3">
            Pakistani statutes · Case law · Citations
          </Badge>
          <h1 className="max-w-3xl font-heading text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl xl:text-7xl">
            AI-Powered Legal Intelligence for Pakistani Law
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Research Pakistani statutes and case law with an AI-powered
            decision-support system built to provide grounded answers, relevant
            authorities, and verifiable citations.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <LinkButton href={ROUTES.login} large>
              Launch Legal Intelligence
              <ArrowRightIcon />
            </LinkButton>
            <LinkButton href="/#how-it-works" variant="outline" large>
              Explore How It Works
            </LinkButton>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            An assistive research tool. It supports, and does not replace,
            qualified legal counsel.
          </p>
        </div>
      </Container>
      <HeroGraph className="h-[26rem]! sm:h-[34rem]! lg:absolute! lg:inset-0 lg:z-0 lg:h-auto!" />
    </section>
  );
}
