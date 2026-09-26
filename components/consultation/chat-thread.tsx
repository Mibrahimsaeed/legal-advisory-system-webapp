"use client";

import { useEffect, useRef } from "react";
import { LegalAnswer } from "@/components/consultation/legal-answer";
import { QuestionBlock } from "@/components/consultation/question-block";
import { ThinkingState } from "@/components/consultation/thinking-state";
import type { ConsultationMessage } from "@/lib/store/features/consultations/consultations.types";

interface ChatThreadProps {
  messages: readonly ConsultationMessage[];
  pending: boolean;
}

export function ChatThread({ messages, pending }: ChatThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, pending]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6">
      {messages.map((message) => (
        <div key={message.id} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
          {message.role === "user" && message.content && <QuestionBlock text={message.content} />}
          {message.role === "assistant" && message.answer && <LegalAnswer answer={message.answer} />}
          {message.role === "assistant" && message.error && (
            <p role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
              {message.error}
            </p>
          )}
        </div>
      ))}
      {pending && <ThinkingState />}
      <div ref={endRef} />
    </div>
  );
}
