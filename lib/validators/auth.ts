import type { FieldErrors } from "@/hooks/use-form-state";
import { validateEmail } from "@/lib/validators/common";

// Mirrors the backend rules (app/auth/schemas.py RegisterRequest / ResetPasswordRequest).
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;
const RESET_CODE_PATTERN = /^\d{6}$/;

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignupValues extends LoginValues {
  fullName: string;
  confirmPassword: string;
}

export function validateLogin({
  email,
  password,
}: LoginValues): FieldErrors<LoginValues> {
  return {
    email: validateEmail(email),
    password: password ? undefined : "Password is required.",
  };
}

export function validateSignup({
  fullName,
  email,
  password,
  confirmPassword,
}: SignupValues): FieldErrors<SignupValues> {
  return {
    fullName: fullName.trim() ? undefined : "Full name is required.",
    email: validateEmail(email),
    password:
      password.length >= MIN_PASSWORD_LENGTH
        ? undefined
        : `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    confirmPassword:
      confirmPassword === password ? undefined : "Passwords do not match.",
  };
}

export interface ForgotPasswordValues {
  email: string;
}

export interface ResetPasswordValues {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

function validateNewPassword(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (password.length > MAX_PASSWORD_LENGTH) return `Password must be at most ${MAX_PASSWORD_LENGTH} characters.`;
}

export function validateForgotPassword({ email }: ForgotPasswordValues): FieldErrors<ForgotPasswordValues> {
  return { email: validateEmail(email) };
}

export function validateResetPassword({
  email,
  code,
  newPassword,
  confirmPassword,
}: ResetPasswordValues): FieldErrors<ResetPasswordValues> {
  return {
    email: validateEmail(email),
    code: RESET_CODE_PATTERN.test(code.trim()) ? undefined : "Enter the 6-digit code from the email.",
    newPassword: validateNewPassword(newPassword),
    confirmPassword: confirmPassword === newPassword ? undefined : "Passwords do not match.",
  };
}
