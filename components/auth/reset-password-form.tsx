"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthNotice } from "@/components/auth/auth-notice";
import { LinkButton } from "@/components/common/link-button";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { useFormState } from "@/hooks/use-form-state";
import { ROUTES } from "@/lib/constants/routes";
import {
  passwordResetErrorCleared,
  selectPasswordResetEmail,
  selectPasswordResetError,
  selectPasswordResetting,
} from "@/lib/store/features/passwordReset/passwordResetSlice";
import { resetPassword } from "@/lib/store/features/passwordReset/passwordResetThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { validateResetPassword } from "@/lib/validators/auth";

export function ResetPasswordForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPasswordResetting);
  const error = useAppSelector(selectPasswordResetError);
  const email = useAppSelector(selectPasswordResetEmail);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);
  const { values, errors, handleChange, handleSubmit } = useFormState(
    { email, code: "", newPassword: "", confirmPassword: "" },
    validateResetPassword,
  );

  useEffect(() => {
    dispatch(passwordResetErrorCleared());
  }, [dispatch]);

  const onSubmit = async ({ email: accountEmail, code, newPassword }: typeof values) => {
    const result = await dispatch(resetPassword({ email: accountEmail, code, newPassword }));
    if (resetPassword.fulfilled.match(result)) setDoneMessage(result.payload);
  };

  if (doneMessage) {
    return (
      <div className="flex flex-col gap-5">
        <AuthNotice title="Password changed">{doneMessage}</AuthNotice>
        <LinkButton href={ROUTES.login} size="lg">
          Back to log in
        </LinkButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          label="Reset code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="6-digit code"
          maxLength={6}
          value={values.code}
          onChange={handleChange}
          error={errors.code}
        />
        <FormField
          label="New password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <FormField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <FieldError>{error}</FieldError>
        <SubmitButton loading={loading}>Reset password</SubmitButton>
        <p className="text-center text-sm text-muted-foreground">
          Code expired or not received?{" "}
          <Link href={ROUTES.forgotPassword} className="font-medium text-primary underline-offset-4 hover:underline">
            Request a new one
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
