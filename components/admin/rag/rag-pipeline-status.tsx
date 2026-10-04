"use client";

import { CheckIcon, CircleAlertIcon, LoaderCircleIcon } from "lucide-react";
import { RAG_PIPELINE_STEPS } from "@/lib/constants/rag";
import { selectRagError, selectRagStage } from "@/lib/store/features/rag/ragSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const ORDER = ["idle", "submitted", "processing", "completed"] as const;

export function RagPipelineStatus() {
  const stage = useAppSelector(selectRagStage);
  const error = useAppSelector(selectRagError);
  const current = ORDER.indexOf(stage === "failed" ? "idle" : stage);

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-4" aria-live="polite">
        {RAG_PIPELINE_STEPS.map((step, index) => {
          const position = index + 1;
          const done = current > position || stage === "completed";
          const active = current === position && stage !== "completed";
          return (
            <li key={step.stage} className="flex gap-3">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-foreground",
                  !done && !active && "text-muted-foreground",
                )}
              >
                {done ? <CheckIcon className="size-3.5" /> : active ? <LoaderCircleIcon className="size-3.5 animate-spin" /> : position}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className={cn("text-sm font-medium", !done && !active && "text-muted-foreground")}>{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
      {stage === "failed" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
          <CircleAlertIcon className="size-4" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
