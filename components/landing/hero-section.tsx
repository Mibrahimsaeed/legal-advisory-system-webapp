import { ArrowRightIcon } from "lucide-react";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/link-button";
import { HeroGraph } from "@/components/landing/hero-graph";
import { LaunchButton } from "@/components/landing/launch-button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <Container className="pointer-events-none relative z-10 flex items-center py-16 sm:py-20 lg:min-h-[100svh] lg:py-24">
        <div className="pointer-events-auto flex flex-col items-start gap-7 lg:max-w-[46%]">
          <Badge variant="outline" className="h-7 px-3">
            Pakistani statutes · Case law · Citations
          </Badge>
          <h1 className="font-heading text-[clamp(1.5rem,6.6vw,2.25rem)] leading-[1.1] font-semibold tracking-tight md:text-5xl lg:text-[min(3.2vw,2.9rem)]">
            AI-Powered Legal Intelligence
            <br />
            for Pakistani Law
          </h1>
          
        
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <LaunchButton large>
              Launch Legal Intelligence
              <ArrowRightIcon />
            </LaunchButton>
            <LinkButton href="/#how-it-works" variant="outline" large>
              Explore How It Works
            </LinkButton>
          </div>
          <p className="max-w-md text-sm text-foreground">
            An assistive research tool. It supports, and does not replace,
            qualified legal counsel.
          </p>
        </div>
      </Container>
      <HeroGraph className="h-[26rem]! sm:h-[34rem]! lg:absolute! lg:inset-0 lg:z-0 lg:h-auto!" />
    </section>
  );
}
