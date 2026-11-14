"use client";

import { FileTextIcon, MessageCircleQuestionIcon, MessagesSquareIcon, UserPlusIcon } from "lucide-react";
import { InlineError } from "@/components/admin/inline-error";
import { SectionCard } from "@/components/admin/section-card";
import { ShareBars } from "@/components/admin/charts/share-bars";
import { StatCard } from "@/components/admin/stat-card";
import { StatCardSkeleton } from "@/components/admin/stat-card-skeleton";
import { useAdminResource } from "@/hooks/use-admin-resource";
import { formatBytes, formatNumber } from "@/lib/admin/format";
import { selectAdminStats } from "@/lib/store/features/admin/adminSlice";
import { loadAdminStats } from "@/lib/store/features/admin/adminThunks";

export function DashboardActivity() {
  const { data: stats, error, reload } = useAdminResource(selectAdminStats, loadAdminStats, undefined);

  const cards = stats
    ? [
        { label: "Conversations", value: formatNumber(stats.totalConversations), hint: `${formatNumber(stats.totalQuestions)} questions in total`, icon: MessagesSquareIcon },
        { label: "Questions (7 days)", value: formatNumber(stats.questions7d), hint: "Asked in the last 7 days", icon: MessageCircleQuestionIcon },
        { label: "Sign-ups (7 days)", value: formatNumber(stats.newUsers7d), hint: `${formatNumber(stats.enabledAccounts)} of ${formatNumber(stats.totalUsers)} accounts enabled`, icon: UserPlusIcon },
        { label: "Uploaded Documents", value: formatNumber(stats.totalDocuments), hint: `${formatBytes(stats.storageBytes)} stored`, icon: FileTextIcon },
      ]
    : [];

  return (
    <section aria-labelledby="platform-activity" className="flex flex-col gap-4">
      <h2 id="platform-activity" className="font-heading text-xl font-semibold">
        Platform activity
      </h2>
      {error && !stats && <InlineError message={error} onRetry={reload} />}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats ? cards.map((card) => <StatCard key={card.label} {...card} />) : !error && <StatCardSkeleton count={4} />}
      </div>
      {stats && (
        <SectionCard title="Question Topics" description="Legal area of questions asked in the last 30 days">
          {stats.topics.length ? (
            <ShareBars items={stats.topics} />
          ) : (
            <p className="text-sm text-muted-foreground">No questions in the last 30 days.</p>
          )}
        </SectionCard>
      )}
    </section>
  );
}
