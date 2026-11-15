import { Badge } from "@/components/ui/badge";
import { SERVICE_HEALTH_LABELS } from "@/lib/constants/admin-tables";
import type { ServiceHealth, ServiceStatus } from "@/lib/store/features/admin/admin.types";

const VARIANTS: Record<ServiceHealth, "secondary" | "outline" | "destructive"> = {
  ok: "secondary",
  simulated: "outline",
  not_configured: "outline",
  error: "destructive",
};

export function ServiceStatusList({ services }: { services: ServiceStatus[] }) {
  return (
    <ul className="flex flex-col divide-y">
      {services.map((service) => (
        <li key={service.name} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-sm font-medium">{service.name}</p>
            <p className="text-xs break-words text-muted-foreground">{service.detail}</p>
          </div>
          <Badge variant={VARIANTS[service.status] ?? "outline"} className="shrink-0">
            {SERVICE_HEALTH_LABELS[service.status] ?? service.status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
