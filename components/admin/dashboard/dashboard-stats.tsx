import {
  BanknoteIcon,
  CrownIcon,
  FileTextIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  UserCheckIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { formatNumber, formatPKR } from "@/lib/admin/format";
import type { AdminStats } from "@/lib/store/features/admin/admin.types";

export function DashboardStats({ stats }: { stats: AdminStats }) {
  const cards = [
    { label: "Total Users", value: formatNumber(stats.totalUsers), hint: "All registered accounts", icon: UsersIcon },
    { label: "Active Users", value: formatNumber(stats.activeUsers), hint: "Active in the last 30 days", icon: UserCheckIcon },
    { label: "New Users", value: formatNumber(stats.newUsers), hint: "Joined this month", icon: UserPlusIcon },
    { label: "Total Queries", value: formatNumber(stats.totalQueries), hint: "Questions asked to date", icon: MessagesSquareIcon },
    { label: "Free Chats Used", value: formatNumber(stats.freeChatsUsed), hint: "Queries on the free plan", icon: MessageSquareIcon },
    { label: "Paid Users", value: formatNumber(stats.paidUsers), hint: "Monthly and quarterly plans", icon: CrownIcon },
    { label: "Revenue", value: formatPKR(stats.monthlyRevenue), hint: "This month", icon: BanknoteIcon },
    { label: "RAG Documents", value: formatNumber(stats.ragDocuments), hint: "Indexed legal sources", icon: FileTextIcon },
  ];

  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </>
  );
}
