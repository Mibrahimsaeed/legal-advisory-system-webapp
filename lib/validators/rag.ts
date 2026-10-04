import type { FieldErrors } from "@/hooks/use-form-state";
import type { RagDocumentInput } from "@/lib/store/features/rag/rag.types";

export function validateRagDocument(input: RagDocumentInput): FieldErrors<RagDocumentInput> {
  const year = Number(input.year);
  const currentYear = new Date().getFullYear();

  return {
    title: input.title.trim().length < 3 ? "Enter a title of at least 3 characters." : undefined,
    year:
      !/^\d{4}$/.test(input.year) || year < 1800 || year > currentYear
        ? `Enter a year between 1800 and ${currentYear}.`
        : undefined,
    source: input.source.trim() ? undefined : "Enter where this document comes from.",
    content:
      input.content.trim() || input.file ? undefined : "Paste the document content or upload a file.",
  };
}

export const hasErrors = <T>(errors: FieldErrors<T>) => Object.values(errors).some(Boolean);
