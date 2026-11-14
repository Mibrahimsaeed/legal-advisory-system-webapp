import type { Metadata } from "next";
import { DocumentsView } from "@/components/admin/documents/documents-view";

export const metadata: Metadata = { title: "Documents" };

export default function AdminDocumentsPage() {
  return <DocumentsView />;
}
