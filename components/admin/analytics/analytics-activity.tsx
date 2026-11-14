"use client";

import { InlineError } from "@/components/admin/inline-error";
import { SectionCard } from "@/components/admin/section-card";
import { MonthlyTrendChart } from "@/components/admin/charts/monthly-trend-chart";
import { ShareBars } from "@/components/admin/charts/share-bars";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { formatDayLabel } from "@/lib/admin/format";
import type { DayCount } from "@/lib/store/features/admin/admin.types";
import { selectAdminStats } from "@/lib/store/features/admin/adminSlice";
import { loadAdminStats } from "@/lib/store/features/admin/adminThunks";

const toChartData = (days: DayCount[]) => days.map(({ date, count }) => ({ month: formatDayLabel(date), value: count }));

export function AnalyticsActivity() {
  const { data: stats, error, reload } = useAdminResource(selectAdminStats, loadAdminStats, undefined);

  if (!stats) return error ? <InlineError message={error} onRetry={reload} /> : <Skeleton className="h-80 rounded-2xl" />;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SectionCard title="Daily Questions" description="Questions asked per day, last 30 days">
        <MonthlyTrendChart data={toChartData(stats.questionsPerDay)} label="Questions" variant="bar" period="day" />
      </SectionCard>
      <SectionCard title="Daily Sign-ups" description="New accounts per day, last 30 days">
        <MonthlyTrendChart data={toChartData(stats.signupsPerDay)} label="Sign-ups" variant="bar" period="day" />
      </SectionCard>
      <SectionCard title="Uploaded Documents by Type" description="Files users have uploaded" className="lg:col-span-2">
        {stats.documentsByType.length ? (
          <ShareBars items={stats.documentsByType} />
        ) : (
          <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
        )}
      </SectionCard>
    </div>
  );
}
