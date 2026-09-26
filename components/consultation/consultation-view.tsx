"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthorityDrawer } from "@/components/consultation/authority-drawer";
import { ChatThread } from "@/components/consultation/chat-thread";
import { ConsultationHeader } from "@/components/consultation/consultation-header";
import { ConsultationInput } from "@/components/consultation/consultation-input";
import { EmptyState } from "@/components/consultation/empty-state";
import { LegalAuthority } from "@/components/consultation/legal-authority";
import { LinkButton } from "@/components/common/link-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { sourceCleared } from "@/lib/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function ConsultationView({ consultationId }: { consultationId: string | null }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const consultation = useAppSelector(selectConsultationById(consultationId));
  const loaded = useAppSelector(selectConsultationsLoaded);
  const pending = useAppSelector(selectIsConsultationPending(consultationId));
  const wide = useMediaQuery("(min-width: 1280px)");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  const [newDomain, setNewDomain] = useState<LegalDomain>("general");
  const domain = consultation?.domain ?? newDomain;

  const changeDomain = (next: LegalDomain) => {
    if (consultation) dispatch(consultationDomainChanged({ id: consultation.id, domain: next }));
    else setNewDomain(next);
  };

  const send = () => {
    const id = consultationId ?? createConsultationId();
    dispatch(sourceCleared());
    void dispatch(askQuestion({ consultationId: id, question: draft.trim(), domain, askedAt: new Date().toISOString() }));
    setDraft("");
    if (!consultationId) router.push(ROUTES.consultationDetail(id));
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
    <div className="flex min-h-0 flex-1">
      <section className="flex min-w-0 flex-1 flex-col">
        <ConsultationHeader
          title={consultation?.title ?? "New Consultation"}
          domain={domain}
          onDomainChange={changeDomain}
        />
        <div className="min-h-0 flex-1 overflow-y-auto">
          {consultationId && !loaded ? (
            <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : hasMessages && consultation ? (
            <ChatThread messages={consultation.messages} pending={pending} />
          ) : (
            <EmptyState onPick={pickExample} />
          )}
        </div>
        <ConsultationInput
          value={draft}
          onChange={setDraft}
          onSubmit={send}
          disabled={pending}
          domain={domain}
          inputRef={inputRef}
        />
      </section>
      {wide ? (
        <aside className="w-88 shrink-0 border-l bg-muted/30" aria-label="Legal authority">
          <LegalAuthority consultation={consultation} />
        </aside>
      ) : (
        <AuthorityDrawer consultation={consultation} />
      )}
    </div>
  );
}
