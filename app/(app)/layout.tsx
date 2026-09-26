import { AuthGate } from "@/components/auth/auth-gate";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <WorkspaceShell>{children}</WorkspaceShell>
    </AuthGate>
  );
}
