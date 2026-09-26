import { AuthShell } from "@/components/auth/auth-shell";
import { GuestGate } from "@/components/auth/guest-gate";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGate>
      <AuthShell>{children}</AuthShell>
    </GuestGate>
  );
}
