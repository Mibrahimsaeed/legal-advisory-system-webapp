import { BrandLogo } from "@/components/common/brand-logo";
import { APP_TAGLINE } from "@/lib/constants/app";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <BrandLogo className="text-lg" />
        <p className="max-w-sm font-heading text-3xl leading-tight font-medium">
          {APP_TAGLINE}
        </p>
      </aside>
      <main className="flex flex-col items-center justify-center gap-8 bg-background p-6">
        <BrandLogo className="text-lg lg:hidden" />
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
