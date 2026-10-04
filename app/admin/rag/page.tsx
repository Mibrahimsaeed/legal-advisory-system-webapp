import type { Metadata } from "next";
import { RagView } from "@/components/admin/rag/rag-view";

export const metadata: Metadata = { title: "RAG Data Management" };

export default function AdminRagPage() {
  return <RagView />;
}
