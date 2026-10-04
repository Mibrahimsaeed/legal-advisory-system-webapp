import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm [--card-spacing:--spacing(4)] sm:[--card-spacing:--spacing(5)]">
      <CardContent className="flex flex-col gap-2 sm:gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon className="size-4" aria-hidden />
          </span>
        </div>
        <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">{value}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
