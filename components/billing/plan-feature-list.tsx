import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeatureListProps {
  features: readonly string[];
  featured: boolean;
}

export function PlanFeatureList({ features, featured }: PlanFeatureListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 text-sm leading-6">
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ring-1",
              featured ? "bg-primary-foreground/10 ring-primary-foreground/15" : "bg-muted ring-border",
            )}
          >
            <CheckIcon className={cn("size-3", !featured && "text-primary")} aria-hidden />
          </span>
          {feature}
        </li>
      ))}
    </ul>
  );
}
