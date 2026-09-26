import type { Metadata } from "next";
import { SettingsIcon } from "lucide-react";
import { WorkspacePlaceholder } from "@/components/workspace/workspace-placeholder";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return (
    <WorkspacePlaceholder
      title="Settings"
      description="Manage your profile and workspace preferences."
      icon={SettingsIcon}
    />
  );
}
