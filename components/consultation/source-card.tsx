"use client";

import { sourceSelected, selectSelectedSourceId } from "@/lib/store/features/workspace/workspaceSlice";
import type { LegalSource } from "@/lib/store/features/consultations/consultations.types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export function SourceCard({ source, number }: { source: LegalSource; number: number }) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedSourceId) === source.id;

  return (
    <button
      type="button"
      onClick={() => dispatch(sourceSelected(source.id))}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border bg-background p-3 text-left transition-colors hover:border-primary/40 hover:bg-muted/60",
        selected && "border-primary",
      )}
    >
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
        {number}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm leading-5 font-semibold">{source.title}</span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {source.kind === "statute" ? source.provision : source.court}
        </span>
      </span>
    </button>
  );
}
