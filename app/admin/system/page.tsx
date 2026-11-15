import type { Metadata } from "next";
import { SystemView } from "@/components/admin/system/system-view";

export const metadata: Metadata = { title: "System" };

export default function AdminSystemPage() {
  return <SystemView />;
}
