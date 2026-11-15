"use client";

import { AdminPage } from "@/components/admin/admin-page";
import { InlineError } from "@/components/admin/inline-error";
import { SectionCard } from "@/components/admin/section-card";
import { ServiceStatusList } from "@/components/admin/system/service-status-list";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { formatNumber } from "@/lib/admin/format";
import { selectAdminSystem } from "@/lib/store/features/admin/adminSlice";
import { loadAdminSystem } from "@/lib/store/features/admin/adminThunks";

export function SystemView() {
  const { data: system, error, loading, reload } = useAdminResource(selectAdminSystem, loadAdminSystem, undefined);

  return (
    <AdminPage title="System" description="Health of the backend services and the size of the main database tables.">
      {error && !system && <InlineError message={error} onRetry={reload} />}
      {system ? (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <SectionCard title="Services" description="Status reported by the backend">
            <ServiceStatusList services={system.services} />
          </SectionCard>
          <SectionCard title="Database" description="Rows per table">
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="self-start">Environment: {system.appEnv}</Badge>
              <dl className="flex flex-col gap-2 text-sm">
                {system.tableCounts.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground capitalize">{label}</dt>
                    <dd className="font-medium tabular-nums">{formatNumber(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </SectionCard>
        </div>
      ) : (
        loading && <Skeleton className="h-80 rounded-2xl" />
      )}
    </AdminPage>
  );
}
