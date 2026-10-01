import type { FieldErrors } from "@/hooks/use-form-state";
import type { UpdateProfilePayload } from "@/lib/store/features/auth/auth.types";

export function validateProfile({ fullName }: UpdateProfilePayload): FieldErrors<UpdateProfilePayload> {
  return {
    fullName: fullName.trim().length < 2 ? "Enter your full name." : undefined,
  };
}
