"use client";

import { AdminPage } from "@/components/admin/admin-page";
import { InlineError } from "@/components/admin/inline-error";
import { SectionCard } from "@/components/admin/section-card";
import { MonthlyTrendChart } from "@/components/admin/charts/monthly-trend-chart";
import { ShareBars } from "@/components/admin/charts/share-bars";
import { DashboardActivity } from "@/components/admin/dashboard/dashboard-activity";
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats";
import { StatCardSkeleton } from "@/components/admin/stat-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminOverview } from "@/hooks/use-admin-overview";
import { formatCompactPKR, formatPKR } from "@/lib/admin/format";

export function DashboardView() {
  const { overview, error, reload } = useAdminOverview();

  return (
    <AdminPage title="Dashboard" description="A high-level view of users, usage and revenue, calculated from live platform data.">
      {error && !overview && <InlineError message={error} onRetry={reload} />}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {overview ? <DashboardStats stats={overview.stats} /> : !error && <StatCardSkeleton count={8} />}
      </div>
      {overview ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SectionCard title="User Growth" description="Total registered users over the last 6 months">
              <MonthlyTrendChart data={overview.userGrowth} label="Users" variant="line" />
            </SectionCard>
            <SectionCard title="Revenue" description="Monthly subscription revenue in PKR">
              <MonthlyTrendChart
                data={overview.revenue}
                label="Revenue"
                variant="bar"
                formatValue={formatPKR}
                formatAxis={formatCompactPKR}
              />
            </SectionCard>
          </div>
          <SectionCard title="User Distribution" description="Accounts by type">
            <ShareBars items={overview.userDistribution} />
          </SectionCard>
        </>
      ) : (
        !error && <Skeleton className="h-80 rounded-2xl" />
      )}
      <DashboardActivity />
    </AdminPage>
  );
}
