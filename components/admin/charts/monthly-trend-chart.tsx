"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TooltipValue } from "@/components/admin/charts/tooltip-value";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { formatNumber } from "@/lib/admin/format";
import type { MonthlyValue } from "@/lib/store/features/admin/admin.types";

interface MonthlyTrendChartProps {
  data: MonthlyValue[];
  label: string;
  variant: "line" | "bar";
  formatValue?: (value: number) => string;
  formatAxis?: (value: number) => string;
}

export function MonthlyTrendChart({
  data,
  label,
  variant,
  formatValue = formatNumber,
  formatAxis = formatNumber,
}: MonthlyTrendChartProps) {
  const config = { value: { label, color: "var(--primary)" } } satisfies ChartConfig;
  const Chart = variant === "line" ? LineChart : BarChart;

  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full" aria-label={`${label} by month`}>
      <Chart accessibilityLayer data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={44} tickLine={false} axisLine={false} tickMargin={4} tickFormatter={formatAxis} />
        <ChartTooltip
          cursor={variant === "line" ? true : { fillOpacity: 0.6 }}
          content={
            <ChartTooltipContent
              formatter={(value) => <TooltipValue label={label} value={formatValue(Number(value))} />}
            />
          }
        />
        {variant === "line" ? (
          <Line
            dataKey="value"
            type="monotone"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ) : (
          <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} maxBarSize={44} />
        )}
      </Chart>
    </ChartContainer>
  );
}
