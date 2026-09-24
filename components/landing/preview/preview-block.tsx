import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewBlockProps {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function PreviewBlock({
  icon: Icon,
  title,
  className,
  children,
}: PreviewBlockProps) {
  return (
    <section className={cn("flex flex-col gap-2.5", className)}>
      <h3 className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        <Icon className="size-3.5" aria-hidden />
        {title}
      </h3>
      {children}
    </section>
  );
}
