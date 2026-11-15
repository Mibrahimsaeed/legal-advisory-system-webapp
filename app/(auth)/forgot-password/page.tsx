import type { Metadata } from "next";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthFormCard
      title="Forgot your password?"
      description="Enter the email you signed up with and we'll send you a reset code."
      footerText="Remembered it?"
      footerLinkLabel="Log in"
      footerLinkHref={ROUTES.login}
    >
      <ForgotPasswordForm />
    </AuthFormCard>
  );
}
