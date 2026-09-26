"use client";

import { useRef, useState } from "react";
import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getDomainLabel } from "@/lib/constants/consultation";
import type { LegalDomain } from "@/lib/store/features/consultations/consultations.types";

interface ConsultationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  domain: LegalDomain;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function ConsultationInput({ value, onChange, onSubmit, disabled, domain, inputRef }: ConsultationInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) onSubmit();
      }}
      className="border-t bg-background px-4 pt-3 pb-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-3xl rounded-xl border bg-card transition-shadow focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <Textarea
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (canSend) onSubmit();
            }
          }}
          rows={2}
          aria-label="Legal question"
          placeholder="Describe your legal issue or ask a question..."
          className="max-h-48 min-h-16 resize-none rounded-b-none border-0 bg-transparent px-4 pt-3 text-[15px] shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
        />
        <div className="flex items-center gap-2 px-3 pb-3">
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Attach a document"
            onClick={() => fileRef.current?.click()}
          >
            <PaperclipIcon />
          </Button>
          {fileName && (
            <Badge variant="secondary" className="max-w-40 gap-1">
              <span className="truncate">{fileName}</span>
              <button
                type="button"
                aria-label="Remove attachment"
                onClick={() => {
                  setFileName(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                <XIcon />
              </button>
            </Badge>
          )}
          <Badge variant="outline" className="ml-auto hidden sm:inline-flex">
            {getDomainLabel(domain)}
          </Badge>
          <Button type="submit" size="icon" aria-label="Send question" disabled={!canSend} className="sm:ml-0">
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
        Legal Intelligence supports legal research. It does not provide legal advice.
      </p>
    </form>
  );
}
