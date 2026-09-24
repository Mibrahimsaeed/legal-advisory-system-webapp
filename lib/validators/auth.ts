import type { FieldErrors } from "@/hooks/use-form-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignupValues extends LoginValues {
  fullName: string;
  confirmPassword: string;
}

function validateEmail(email: string) {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
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
