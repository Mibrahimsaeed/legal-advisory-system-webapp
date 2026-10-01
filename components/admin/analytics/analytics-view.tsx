"use client";

import { AdminPage } from "@/components/admin/admin-page";
import { AnalyticsKpis } from "@/components/admin/analytics/analytics-kpis";
import { SectionCard } from "@/components/admin/section-card";
import { MonthlyTrendChart } from "@/components/admin/charts/monthly-trend-chart";
import { ShareBars } from "@/components/admin/charts/share-bars";
import { StatCardSkeleton } from "@/components/admin/stat-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminOverview } from "@/hooks/use-admin-overview";
import { formatCompactPKR, formatPKR } from "@/lib/admin/format";

export function AnalyticsView() {
  const { overview, failed } = useAdminOverview();

  return (
    <AdminPage
      title="Analytics"
      description="Business statistics derived from the sample overview data: conversion, usage and revenue trends."
      sampleData
    >
      {failed && <p role="alert" className="text-sm text-destructive">Analytics could not be loaded.</p>}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {overview ? <AnalyticsKpis overview={overview} /> : <StatCardSkeleton count={4} />}
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
        <Skeleton className="h-80 rounded-2xl" />
      )}
    </AdminPage>
  );
}
