"use client";

import { CrownIcon } from "lucide-react";
import { LinkButton } from "@/components/common/link-button";
import { SettingsSection } from "@/components/settings/settings-section";
import { Badge } from "@/components/ui/badge";
import { useFreeUsage } from "@/hooks/use-free-usage";
import { formatResetTime, getRemainingQueries, getResetTime } from "@/lib/billing/free-usage";
import { FREE_QUERY_LIMIT, FREE_REFRESH_HOURS } from "@/lib/constants/billing";
import { ROUTES } from "@/lib/constants/routes";

export function PlanSettings() {
  const { usage, loaded } = useFreeUsage();
  const resetTime = getResetTime(usage);

  let status = `${FREE_QUERY_LIMIT} free queries every ${FREE_REFRESH_HOURS} hours`;
  if (loaded && resetTime !== null) status = `Limit reached. Refreshes ${formatResetTime(resetTime)}`;
  else if (loaded) status = `${getRemainingQueries(usage)} of ${FREE_QUERY_LIMIT} free queries left`;

  return (
    <SettingsSection title="Plan & usage" description="Your current plan and free query allowance.">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm font-medium">
            Current plan <Badge variant="outline">Free</Badge>
          </p>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
        <LinkButton href={ROUTES.upgrade} variant="outline" className="h-9 gap-2 px-3">
          <CrownIcon aria-hidden />
          View plans
        </LinkButton>
      </div>
    </SettingsSection>
  );
}
