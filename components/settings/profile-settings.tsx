"use client";

import { useState } from "react";
import { SettingsSection } from "@/components/settings/settings-section";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { useFormState } from "@/hooks/use-form-state";
import type { User } from "@/lib/store/features/auth/auth.types";
import { updateProfile } from "@/lib/store/features/auth/authThunks";
import { useAppDispatch } from "@/lib/store/hooks";
import { validateProfile } from "@/lib/validators/profile";

export function ProfileSettings({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { values, errors, handleChange, handleSubmit } = useFormState({ fullName: user.fullName }, validateProfile);
  const unchanged = values.fullName.trim() === user.fullName;

  const onSubmit = async (payload: typeof values) => {
    setSaving(true);
    setMessage(null);
    setError(null);
    const result = await dispatch(updateProfile(payload));
    setSaving(false);
    if (updateProfile.fulfilled.match(result)) setMessage("Profile updated.");
    else setError(result.payload ?? "Your profile could not be updated.");
  };

  return (
    <SettingsSection title="Profile" description="Your name appears in the sidebar and on your consultations.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Full name" name="fullName" autoComplete="name" value={values.fullName} onChange={handleChange} error={errors.fullName} />
            <FormField label="Email" name="email" type="email" value={user.email} readOnly disabled />
          </div>
          <FieldError>{error}</FieldError>
          <div className="flex flex-wrap items-center gap-3">
            <SubmitButton loading={saving} disabled={unchanged}>
              Save changes
            </SubmitButton>
            <p role="status" className="text-sm text-muted-foreground">
              {message}
            </p>
          </div>
        </FieldGroup>
      </form>
    </SettingsSection>
  );
}
