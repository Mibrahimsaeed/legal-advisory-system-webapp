import type { Metadata } from "next";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <AuthFormCard
      title="Set a new password"
      description="Enter the code we emailed you and choose a new password."
      footerText="Remembered it?"
      footerLinkLabel="Log in"
      footerLinkHref={ROUTES.login}
    >
      <ResetPasswordForm />
    </AuthFormCard>
  );
}
