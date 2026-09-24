import { RevealItem } from "@/components/common/reveal-item";
import { cn } from "@/lib/utils";

interface ResearchStepProps {
  index: number;
  label: string;
  last?: boolean;
  children: React.ReactNode;
}

export function ResearchStep({ index, label, last = false, children }: ResearchStepProps) {
  return (
    <RevealItem delay={250 + index * 130} className={cn("relative flex gap-4", !last && "pb-6")}>
      {!last && <span aria-hidden className="absolute top-6 -bottom-0 left-3 w-px -translate-x-1/2 bg-border" />}
      <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground ring-4 ring-card">
        {index + 1}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
          {label}
        </p>
        {children}
      </div>
    </RevealItem>
  );
}
