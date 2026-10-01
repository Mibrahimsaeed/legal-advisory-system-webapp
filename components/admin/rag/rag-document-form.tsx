"use client";

import { DatabaseZapIcon } from "lucide-react";
import { RagFileField } from "@/components/admin/rag/rag-file-field";
import { FormField } from "@/components/forms/form-field";
import { FormSelectField } from "@/components/forms/form-select-field";
import { FormTextareaField } from "@/components/forms/form-textarea-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { useRagForm } from "@/hooks/use-rag-form";
import { CATEGORY_OPTIONS, DOCUMENT_TYPE_OPTIONS, JURISDICTION_OPTIONS } from "@/lib/constants/rag";
import { selectRagStage } from "@/lib/store/features/rag/ragSlice";
import { processRagDocument, submitRagDocument } from "@/lib/store/features/rag/ragThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function RagDocumentForm() {
  const dispatch = useAppDispatch();
  const stage = useAppSelector(selectRagStage);
  const busy = stage === "submitted" || stage === "processing";
  const { values, file, errors, setValue, changeFile, validate, reset } = useRagForm();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = validate();
    if (!input) return;
    const submitted = await dispatch(submitRagDocument(input));
    if (!submitRagDocument.fulfilled.match(submitted)) return;
    const processed = await dispatch(processRagDocument(submitted.payload.jobId));
    if (processRagDocument.fulfilled.match(processed)) reset();
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <FormSelectField label="Document type" name="documentType" value={values.documentType} options={DOCUMENT_TYPE_OPTIONS} onChange={(value) => setValue("documentType", value)} />
        <FormField label="Title" name="title" placeholder="e.g. Muslim Family Laws Ordinance, 1961" value={values.title} onChange={(event) => setValue("title", event.target.value)} error={errors.title} />
        <div className="grid gap-5 sm:grid-cols-3">
          <FormSelectField label="Jurisdiction" name="jurisdiction" value={values.jurisdiction} options={JURISDICTION_OPTIONS} onChange={(value) => setValue("jurisdiction", value)} />
          <FormField label="Year" name="year" inputMode="numeric" placeholder="1961" value={values.year} onChange={(event) => setValue("year", event.target.value)} error={errors.year} />
          <FormSelectField label="Category" name="category" value={values.category} options={CATEGORY_OPTIONS} onChange={(value) => setValue("category", value)} />
        </div>
        <FormField label="Source" name="source" placeholder="e.g. Pakistan Code, Gazette of Pakistan" value={values.source} onChange={(event) => setValue("source", event.target.value)} error={errors.source} />
        <FormTextareaField label="Description" name="description" rows={3} placeholder="Short summary of what this document covers" value={values.description} onChange={(event) => setValue("description", event.target.value)} />
        <FormTextareaField label="Document content" name="content" rows={8} placeholder="Paste the full text of the document" value={values.content} onChange={(event) => setValue("content", event.target.value)} error={errors.content} />
        <RagFileField file={file} onChange={changeFile} />
        <SubmitButton loading={busy} className="h-11 w-full gap-2 sm:w-auto sm:self-start sm:px-6">
          {!busy && <DatabaseZapIcon />}
          Add to RAG Pipeline
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
