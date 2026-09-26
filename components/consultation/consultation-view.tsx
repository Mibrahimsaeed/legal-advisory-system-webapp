"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatThread } from "@/components/consultation/chat-thread";
import { ConsultationHeader } from "@/components/consultation/consultation-header";
import { ConsultationInput } from "@/components/consultation/consultation-input";
import { EmptyState } from "@/components/consultation/empty-state";
import { LinkButton } from "@/components/common/link-button";
import { getArchetype } from "@/lib/constants/archetypes";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/lib/constants/routes";
import type { LegalDomain } from "@/lib/store/features/consultations/consultations.types";
import { createConsultationId } from "@/lib/store/features/consultations/consultations.utils";
import {
  consultationDomainChanged,
  selectConsultationById,
  selectConsultationsLoaded,
  selectIsConsultationPending,
} from "@/lib/store/features/consultations/consultationsSlice";
import { askQuestion } from "@/lib/store/features/consultations/consultationsThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

interface ConsultationViewProps {
  consultationId: string | null;
  archetypeId?: string | null;
}

export function ConsultationView({ consultationId, archetypeId = null }: ConsultationViewProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const consultation = useAppSelector(selectConsultationById(consultationId));
  const loaded = useAppSelector(selectConsultationsLoaded);
  const pending = useAppSelector(selectIsConsultationPending(consultationId));
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  const [newDomain, setNewDomain] = useState<LegalDomain>("general");
  const domain = consultation?.domain ?? newDomain;
  const archetype = getArchetype(consultation?.archetype ?? archetypeId);

  const changeDomain = (next: LegalDomain) => {
    if (consultation) dispatch(consultationDomainChanged({ id: consultation.id, domain: next }));
    else setNewDomain(next);
  };

  const submit = (question: string) => {
    const id = consultationId ?? createConsultationId();
    void dispatch(askQuestion({ consultationId: id, question, domain, archetype: archetype?.id, askedAt: new Date().toISOString() }));
    if (!consultationId) router.push(ROUTES.consultationDetail(id));
  };

  const send = () => {
    submit(draft.trim());
    setDraft("");
  };

  const pickExample = (text: string) => {
    setDraft(text);
    inputRef.current?.focus();
  };

  if (consultationId && loaded && !consultation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-heading text-3xl font-semibold">Consultation not found</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This consultation is not available in your workspace. It may belong to another account or have been removed.
        </p>
        <LinkButton href={ROUTES.consultation}>Start a new consultation</LinkButton>
      </div>
    );
  }

  const hasMessages = (consultation?.messages.length ?? 0) > 0;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <ConsultationHeader
        title={consultation?.title ?? "New Consultation"}
        domain={domain}
        archetypeLabel={archetype?.label}
        onDomainChange={changeDomain}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {consultationId && !loaded ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : hasMessages && consultation ? (
          <ChatThread messages={consultation.messages} pending={pending} onRegenerate={submit} />
        ) : (
          <EmptyState onPick={pickExample} archetype={archetype} />
        )}
      </div>
      <ConsultationInput
        value={draft}
        onChange={setDraft}
        onSubmit={send}
        disabled={pending}
        domain={domain}
        placeholder={archetype?.placeholder ?? "Describe your legal issue or ask a question..."}
        inputRef={inputRef}
      />
    </section>
  );
}
