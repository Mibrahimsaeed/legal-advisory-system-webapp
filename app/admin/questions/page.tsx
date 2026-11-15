import type { Metadata } from "next";
import { QuestionsView } from "@/components/admin/questions/questions-view";

export const metadata: Metadata = { title: "Questions" };

export default function AdminQuestionsPage() {
  return <QuestionsView />;
}
