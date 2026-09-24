import type { Metadata } from "next";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { LoginForm } from "@/components/auth/login-form";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthFormCard
      title="Welcome back"
      description="Log in to your account to continue."
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerLinkHref={ROUTES.signup}
    >
      <LoginForm />
    </AuthFormCard>
  );
}
