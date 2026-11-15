"use client";

import { CircleAlertIcon, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InlineErrorProps {
  message: string;
  onRetry: () => void;
  className?: string;
}

export function InlineError({ message, onRetry, className }: InlineErrorProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
        <CircleAlertIcon className="size-4 shrink-0" aria-hidden />
        {message}
      </p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RotateCwIcon />
        Try again
      </Button>
    </div>
  );
}
