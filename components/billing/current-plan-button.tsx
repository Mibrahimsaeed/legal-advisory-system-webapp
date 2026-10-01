"use client";

import { ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFreeUsage } from "@/hooks/use-free-usage";
import { formatResetTime, getRemainingQueries, getResetTime } from "@/lib/billing/free-usage";
import { FREE_QUERY_LIMIT, FREE_REFRESH_HOURS } from "@/lib/constants/billing";

export function CurrentPlanButton() {
  const { usage, loaded } = useFreeUsage();
  const resetTime = getResetTime(usage);

  let status = `Refreshes every ${FREE_REFRESH_HOURS} hours`;
  if (loaded && resetTime !== null) status = `Limit reached. Refreshes ${formatResetTime(resetTime)}`;
  else if (loaded) status = `${getRemainingQueries(usage)} of ${FREE_QUERY_LIMIT} free queries left`;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Button variant="outline" disabled className="h-12 w-full rounded-xl px-5 text-[15px]">
        Current plan
      </Button>
      <p className="flex min-h-5 items-center gap-1.5 text-center text-xs text-muted-foreground">
        <ClockIcon className="size-3.5 shrink-0" aria-hidden />
        {status}
      </p>
    </div>
  );
}
