import type { Metadata } from "next";
import { AuthFormCard } from "@/components/auth/auth-form-card";
import { SignupForm } from "@/components/auth/signup-form";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <AuthFormCard
      title="Create your account"
      description="Get started with your legal advisory workspace."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref={ROUTES.login}
    >
      <SignupForm />
    </AuthFormCard>
  );
}
