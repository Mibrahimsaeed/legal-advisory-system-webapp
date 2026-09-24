"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/common/brand-logo";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/link-button";
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
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-border bg-background/90 shadow-sm backdrop-blur"
          : "border-transparent bg-background",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href={ROUTES.home} aria-label="Legal Intelligence home">
          <BrandLogo className="text-xl" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href={ROUTES.login}>Launch App</LinkButton>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
