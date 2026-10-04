"use client";

import { useState } from "react";
import type { FieldErrors } from "@/hooks/use-form-state";
import type { RagDocumentInput } from "@/lib/store/features/rag/rag.types";
import { hasErrors, validateRagDocument } from "@/lib/validators/rag";

type RagFormValues = Omit<RagDocumentInput, "file">;

const EMPTY_VALUES: RagFormValues = {
  title: "",
  documentType: "statute",
  jurisdiction: "Federal",
  year: "",
  category: "Civil",
  description: "",
  source: "",
  content: "",
};

export function useRagForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors<RagDocumentInput>>({});

  const setValue = <K extends keyof RagFormValues>(name: K, value: RagFormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const changeFile = (next: File | null) => {
    setFile(next);
    setErrors((prev) => ({ ...prev, content: undefined }));
  };

  const toInput = (): RagDocumentInput => ({
    ...values,
    file: file ? { name: file.name, size: file.size } : null,
  });

  const validate = (): RagDocumentInput | null => {
    const input = toInput();
    const found = validateRagDocument(input);
    setErrors(found);
    return hasErrors(found) ? null : input;
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setFile(null);
    setErrors({});
  };

  return { values, file, errors, setValue, changeFile, validate, reset };
}
