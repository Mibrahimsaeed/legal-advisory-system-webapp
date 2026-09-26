"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormState } from "@/hooks/use-form-state";
import { ROUTES } from "@/lib/constants/routes";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  authErrorCleared,
  selectAuthError,
  selectAuthLoading,
} from "@/lib/store/features/auth/authSlice";
import { signupUser } from "@/lib/store/features/auth/authThunks";
import { validateSignup } from "@/lib/validators/auth";

export function SignupForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { values, errors, handleChange, handleSubmit } = useFormState(
    { fullName: "", email: "", password: "", confirmPassword: "" },
    validateSignup,
  );

  useEffect(() => {
    dispatch(authErrorCleared());
  }, [dispatch]);

  const onSubmit = async ({ fullName, email, password }: typeof values) => {
    const result = await dispatch(signupUser({ fullName, email, password }));
    if (signupUser.fulfilled.match(result)) router.push(ROUTES.consultation);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <FormField
          label="Full name"
          name="fullName"
          placeholder="Jane Doe"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
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
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <FieldError>{error}</FieldError>
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </FieldGroup>
    </form>
  );
}
