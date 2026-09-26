"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/common/brand-logo";
import { Container } from "@/components/common/container";
import { LaunchButton } from "@/components/landing/launch-button";
import { MobileNav } from "@/components/landing/mobile-nav";
import { useScrolled } from "@/hooks/use-scrolled";
import { NAV_LINKS } from "@/lib/constants/landing";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

export function LandingHeader() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b text-primary-foreground transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-primary-foreground/10 bg-primary/95 shadow-md backdrop-blur"
          : "border-transparent bg-primary",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link href={ROUTES.home} aria-label="Legal Intelligence home">
          <BrandLogo className="text-xl md:text-2xl [&>svg]:size-5 md:[&>svg]:size-6" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LaunchButton
            variant="secondary"
            size="lg"
            className="md:h-11 md:px-5"
          >
            Launch App
          </LaunchButton>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
