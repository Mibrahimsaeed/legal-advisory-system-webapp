import { AuthVideoPanel } from "@/components/auth/auth-video-panel";
import { BrandLogo } from "@/components/common/brand-logo";
import { APP_TAGLINE } from "@/lib/constants/app";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
        <AuthVideoPanel />
        <div aria-hidden className="absolute inset-0 bg-linear-to-br from-primary/95 via-primary/70 to-primary/30" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <BrandLogo className="text-lg" />
          <p className="max-w-sm font-heading text-3xl leading-tight font-medium">
            {APP_TAGLINE}
          </p>
        </div>
      </aside>
      <main className="flex flex-col items-center justify-center gap-8 bg-background p-6">
        <BrandLogo className="text-lg lg:hidden" />
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
