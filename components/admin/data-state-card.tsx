"use client";

import { InlineError } from "@/components/admin/inline-error";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DataStateCardProps {
  loading: boolean;
  refreshing?: boolean;
  error: string | null;
  empty: boolean;
  emptyMessage: string;
  onRetry: () => void;
  children: React.ReactNode;
}

// Shared loading / error / empty handling for admin tables backed by a Redux resource.
export function DataStateCard({ loading, refreshing = false, error, empty, emptyMessage, onRetry, children }: DataStateCardProps) {
  return (
    <Card className="rounded-2xl py-0 shadow-sm">
      <CardContent className="px-2 py-1">
        {loading ? (
          <div role="status" aria-label="Loading" className="flex flex-col gap-2 p-2">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-10" />
            ))}
          </div>
        ) : error ? (
          <InlineError message={error} onRetry={onRetry} className="justify-center p-8" />
        ) : empty ? (
          <p className="p-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <div aria-busy={refreshing} className={cn("transition-opacity", refreshing && "opacity-60")}>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
