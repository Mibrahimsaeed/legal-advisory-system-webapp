import type { FieldErrors } from "@/hooks/use-form-state";
import { validateEmail } from "@/lib/validators/common";

const MIN_MESSAGE_LENGTH = 10;

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContact({
  name,
  email,
  subject,
  message,
}: ContactValues): FieldErrors<ContactValues> {
  return {
    name: name.trim() ? undefined : "Name is required.",
    email: validateEmail(email),
    subject: subject.trim() ? undefined : "Subject is required.",
    message:
      message.trim().length >= MIN_MESSAGE_LENGTH
        ? undefined
        : `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`,
  };
}
