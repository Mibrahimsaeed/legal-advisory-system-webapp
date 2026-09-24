const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
}
