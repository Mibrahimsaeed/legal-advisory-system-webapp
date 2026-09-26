"use client";

import { useEffect, useRef } from "react";
import { LegalAnswer } from "@/components/consultation/legal-answer";
import { MessageActions } from "@/components/consultation/message-actions";
import { ThinkingState } from "@/components/consultation/thinking-state";
import { UserMessage } from "@/components/consultation/user-message";
import type { ConsultationMessage } from "@/lib/store/features/consultations/consultations.types";

interface ChatThreadProps {
  messages: readonly ConsultationMessage[];
  pending: boolean;
  onRegenerate: (question: string) => void;
}

export function ChatThread({ messages, pending, onRegenerate }: ChatThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const lastIndex = messages.length - 1;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, pending]);

  return (
    <div className="mx-auto flex w-full max-w-[51rem] flex-col gap-10 px-4 py-8 sm:px-6">
      {messages.map((message, index) => {
        const question = messages[index - 1]?.content;
        const canRegenerate = index === lastIndex && !pending && question !== undefined;
        return (
          <div key={message.id} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
            {message.role === "user" && message.content && <UserMessage text={message.content} />}
            {message.role === "assistant" && message.answer && (
              <div className="flex flex-col gap-5">
                <LegalAnswer answer={message.answer} />
                <MessageActions
                  answer={message.answer}
                  onRegenerate={canRegenerate ? () => onRegenerate(question) : undefined}
                />
              </div>
            )}
            {message.role === "assistant" && message.error && (
              <p role="alert" className="text-sm text-destructive">
                {message.error}
              </p>
            )}
          </div>
        );
      })}
      {pending && <ThinkingState />}
      <div ref={endRef} />
    </div>
  );
}
