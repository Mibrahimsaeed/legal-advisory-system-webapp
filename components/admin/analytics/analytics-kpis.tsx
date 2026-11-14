import { BanknoteIcon, MessagesSquareIcon, PercentIcon, RepeatIcon } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { formatNumber, formatPKR, formatPercent, safeRatio } from "@/lib/admin/format";
import type { AdminOverview } from "@/lib/store/features/admin/admin.types";

export function AnalyticsKpis({ overview }: { overview: AdminOverview }) {
  const { stats, revenue } = overview;
  const previousRevenue = revenue.at(-2)?.value ?? 0;
  const revenueGrowth = previousRevenue ? stats.monthlyRevenue / previousRevenue - 1 : 0;

  const cards = [
    { label: "Conversion Rate", value: formatPercent(safeRatio(stats.paidUsers, stats.totalUsers)), hint: "Paid users / total users", icon: PercentIcon },
    { label: "Queries per Active User", value: formatNumber(Math.round(safeRatio(stats.totalQueries, stats.activeUsers))), hint: "Total queries / active users", icon: MessagesSquareIcon },
    { label: "Revenue per Paid User", value: formatPKR(Math.round(safeRatio(stats.monthlyRevenue, stats.paidUsers))), hint: "This month's revenue / paid users", icon: BanknoteIcon },
    { label: "Revenue Growth", value: formatPercent(revenueGrowth), hint: "Compared with last month", icon: RepeatIcon },
  ];

  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </>
  );
}
