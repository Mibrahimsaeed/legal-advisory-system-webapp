import { LinkIcon } from "lucide-react";
import { PreviewBlock } from "@/components/landing/preview/preview-block";
import { Badge } from "@/components/ui/badge";
import type { SampleSource } from "@/lib/constants/landing-samples";
import { cn } from "@/lib/utils";

interface SourcePanelProps {
  sources: readonly SampleSource[];
  className?: string;
}

export function SourcePanel({ sources, className }: SourcePanelProps) {
  return (
    <PreviewBlock icon={LinkIcon} title="Citations & evidence" className={className}>
      <ol className="flex flex-col gap-2">
        {sources.map((source) => (
          <li
            key={source.id}
            className={cn(
              "flex gap-3 rounded-lg border bg-background p-3 transition-colors",
              "hover:border-primary/30 hover:bg-muted/60",
            )}
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {source.id}
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-xs leading-5 font-medium">{source.label}</p>
              <p className="text-xs text-muted-foreground">{source.detail}</p>
              <Badge variant="outline" className="mt-0.5 h-4 text-[10px]">
                {source.kind}
              </Badge>
            </div>
          </li>
        ))}
      </ol>
    </PreviewBlock>
  );
}
