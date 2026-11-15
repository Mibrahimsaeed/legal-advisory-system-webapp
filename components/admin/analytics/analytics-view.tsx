"use client";

import { AdminPage } from "@/components/admin/admin-page";
import { AnalyticsActivity } from "@/components/admin/analytics/analytics-activity";
import { AnalyticsKpis } from "@/components/admin/analytics/analytics-kpis";
import { InlineError } from "@/components/admin/inline-error";
import { SectionCard } from "@/components/admin/section-card";
import { MonthlyTrendChart } from "@/components/admin/charts/monthly-trend-chart";
import { ShareBars } from "@/components/admin/charts/share-bars";
import { StatCardSkeleton } from "@/components/admin/stat-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminOverview } from "@/hooks/use-admin-overview";
import { formatCompactPKR, formatPKR } from "@/lib/admin/format";

export function AnalyticsView() {
  const { overview, error, reload } = useAdminOverview();

  return (
    <AdminPage title="Analytics" description="Conversion, usage and revenue trends calculated from live platform data.">
      {error && !overview && <InlineError message={error} onRetry={reload} />}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {overview ? <AnalyticsKpis overview={overview} /> : !error && <StatCardSkeleton count={4} />}
      </div>
      {overview ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SectionCard title="Queries" description="Questions asked per month">
            <MonthlyTrendChart data={overview.queries} label="Queries" variant="bar" />
          </SectionCard>
          <SectionCard title="Revenue Trend" description="Monthly subscription revenue in PKR">
            <MonthlyTrendChart
              data={overview.revenue}
              label="Revenue"
              variant="line"
              formatValue={formatPKR}
              formatAxis={formatCompactPKR}
            />
          </SectionCard>
          <SectionCard title="Subscribers by Plan" description="Paid accounts on each plan" className="lg:col-span-2">
            <ShareBars items={overview.subscribersByPlan} />
          </SectionCard>
        </div>
      ) : (
        !error && <Skeleton className="h-80 rounded-2xl" />
      )}
      <AnalyticsActivity />
    </AdminPage>
  );
}
