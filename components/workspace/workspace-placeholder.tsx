import type { LucideIcon } from "lucide-react";
import { LinkButton } from "@/components/common/link-button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/constants/routes";

interface WorkspacePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function WorkspacePlaceholder({ title, description, icon: Icon }: WorkspacePlaceholderProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="font-heading text-2xl font-semibold">{title}</h1>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl border bg-card">
          <Icon className="size-5" aria-hidden />
        </span>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Not part of this prototype yet</p>
        <LinkButton href={ROUTES.consultation} variant="outline">Back to consultations</LinkButton>
      </div>
    </div>
  );
}
