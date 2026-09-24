"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export type FieldErrors<T> = Partial<Record<keyof T, string | undefined>>;

export function useFormState<T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => FieldErrors<T>,
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit =
    (onValid: (values: T) => void | Promise<void>) =>
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const found = validate(values);
      setErrors(found);
      if (Object.values(found).every((message) => !message)) {
        void onValid(values);
      }
    };

  return { values, errors, handleChange, handleSubmit, reset };
}
