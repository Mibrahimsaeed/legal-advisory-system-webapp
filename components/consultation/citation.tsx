"use client";

import { sourceSelected, selectSelectedSourceId } from "@/lib/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

interface CitationProps {
  sourceId: string;
  number: number;
  label?: string;
}

export function Citation({ sourceId, number, label }: CitationProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedSourceId) === sourceId;
  const open = () => dispatch(sourceSelected(sourceId));

  if (label) {
    return (
      <button
        type="button"
        onClick={open}
        className={cn(
          "text-left font-mono text-xs underline-offset-4 transition-colors hover:underline",
          selected ? "text-foreground underline" : "text-primary",
        )}
      >
        [{label}]
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open source ${number}`}
      className={cn(
        "mx-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full border px-1 align-baseline text-[10px] leading-none font-medium transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-primary/40 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground",
      )}
    >
      {number}
    </button>
  );
}
