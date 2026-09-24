import Link from "next/link";
import { BrandLogo } from "@/components/common/brand-logo";
import { Container } from "@/components/common/container";
import { APP_TAGLINE } from "@/lib/constants/app";
import { NAV_LINKS } from "@/lib/constants/landing";
import { ROUTES } from "@/lib/constants/routes";

const FOOTER_LINKS = [...NAV_LINKS, { label: "Launch App", href: ROUTES.login }];

export function LandingFooter() {
  return (
    <footer className="border-t bg-muted/50 py-14">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <BrandLogo className="text-xl" />
            <p className="text-sm leading-6 text-muted-foreground">{APP_TAGLINE}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-3 border-t pt-8 text-xs leading-5 text-muted-foreground">
          <p>
            Legal Intelligence is an AI-assisted research and decision-support
            system and does not constitute legal advice or replace qualified
            legal counsel.
          </p>
          <p>© 2026 Legal Intelligence. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
