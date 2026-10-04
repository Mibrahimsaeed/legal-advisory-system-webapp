"use client";

import { useRef } from "react";
import { FileUpIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { RAG_ACCEPTED_FILES } from "@/lib/constants/rag";

interface RagFileFieldProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export function RagFileField({ file, onChange }: RagFileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Field>
      <FieldLabel htmlFor="rag-file">Upload document (optional)</FieldLabel>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed p-4">
        <input
          ref={inputRef}
          id="rag-file"
          type="file"
          accept={RAG_ACCEPTED_FILES}
          className="sr-only"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
          <FileUpIcon />
          Choose file
        </Button>
        {file ? (
          <span className="flex min-w-0 items-center gap-1 text-sm">
            <span className="truncate">{file.name}</span>
            <Button type="button" variant="ghost" size="icon-xs" aria-label="Remove file" onClick={clear}>
              <XIcon />
            </Button>
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">No file selected</span>
        )}
      </div>
      <FieldDescription>PDF, DOCX or TXT. Used instead of pasted content if provided.</FieldDescription>
    </Field>
  );
}
