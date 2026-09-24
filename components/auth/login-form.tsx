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
import { loginUser } from "@/lib/store/features/auth/authThunks";
import { validateLogin } from "@/lib/validators/auth";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { values, errors, handleChange, handleSubmit } = useFormState(
    { email: "", password: "" },
    validateLogin,
  );

  useEffect(() => {
    dispatch(authErrorCleared());
  }, [dispatch]);

  const onSubmit = async (payload: typeof values) => {
    const result = await dispatch(loginUser(payload));
    if (loginUser.fulfilled.match(result)) router.push(ROUTES.home);
  };

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
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FieldError>{error}</FieldError>
        <SubmitButton loading={loading}>Log in</SubmitButton>
      </FieldGroup>
    </form>
  );
}
