"use client";

import { useEffect, useState } from "react";
import { AuthNotice } from "@/components/auth/auth-notice";
import { LinkButton } from "@/components/common/link-button";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { useFormState } from "@/hooks/use-form-state";
import { ROUTES } from "@/lib/constants/routes";
import {
  passwordResetErrorCleared,
  selectPasswordResetEmail,
  selectPasswordResetError,
  selectPasswordResetRequesting,
} from "@/lib/store/features/passwordReset/passwordResetSlice";
import { requestPasswordReset } from "@/lib/store/features/passwordReset/passwordResetThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { validateForgotPassword } from "@/lib/validators/auth";

export function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPasswordResetRequesting);
  const error = useAppSelector(selectPasswordResetError);
  const rememberedEmail = useAppSelector(selectPasswordResetEmail);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const { values, errors, handleChange, handleSubmit } = useFormState({ email: rememberedEmail }, validateForgotPassword);

  useEffect(() => {
    dispatch(passwordResetErrorCleared());
  }, [dispatch]);

  const onSubmit = async (payload: typeof values) => {
    const result = await dispatch(requestPasswordReset(payload));
    if (requestPasswordReset.fulfilled.match(result)) setSentMessage(result.payload);
  };

  if (sentMessage) {
    return (
      <div className="flex flex-col gap-5">
        <AuthNotice title="Check your email">
          {sentMessage} Enter the 6-digit code on the next page. It is valid for a limited time, and only the newest
          code works.
        </AuthNotice>
        <LinkButton href={ROUTES.resetPassword} size="lg">
          Enter reset code
        </LinkButton>
        <Button variant="ghost" onClick={() => setSentMessage(null)}>
          Use a different email
        </Button>
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
        <FieldError>{error}</FieldError>
        <SubmitButton loading={loading}>Send reset code</SubmitButton>
      </FieldGroup>
    </form>
  );
}
