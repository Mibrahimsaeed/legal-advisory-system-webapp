import type { Metadata } from "next";
import { CircleHelpIcon } from "lucide-react";
import { WorkspacePlaceholder } from "@/components/workspace/workspace-placeholder";

export const metadata: Metadata = { title: "Help" };

export default function Page() {
  return (
    <WorkspacePlaceholder
      title="Help"
      description="Guidance on framing legal questions and reading citations."
      icon={CircleHelpIcon}
    />
  );
}
