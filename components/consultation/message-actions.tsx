"use client";

import { useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  RefreshCwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { answerToText } from "@/lib/consultation-text";
import type { LegalAnswer } from "@/lib/store/features/consultations/consultations.types";
import { cn } from "@/lib/utils";

type Feedback = "up" | "down" | null;

interface MessageActionsProps {
  answer: LegalAnswer;
  onRegenerate?: () => void;
}

const ACTION_CLASS = "text-muted-foreground hover:text-foreground";

export function MessageActions({ answer, onRegenerate }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(answerToText(answer));
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(answerToText(answer));
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const rate = (next: Exclude<Feedback, null>) => setFeedback((current) => (current === next ? null : next));

  return (
    <div className="-ml-2 flex items-center gap-0.5">
      <Button variant="ghost" size="icon-sm" aria-label={copied ? "Copied" : "Copy answer"} className={ACTION_CLASS} onClick={copy}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      {canSpeak && (
        <Button variant="ghost" size="icon-sm" aria-label={speaking ? "Stop reading" : "Read aloud"} className={ACTION_CLASS} onClick={toggleSpeech}>
          {speaking ? <VolumeXIcon /> : <Volume2Icon />}
        </Button>
      )}
      <Button variant="ghost" size="icon-sm" aria-label="Good answer" aria-pressed={feedback === "up"} className={cn(ACTION_CLASS, feedback === "up" && "text-foreground")} onClick={() => rate("up")}>
        <ThumbsUpIcon className={cn(feedback === "up" && "fill-current")} />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Poor answer" aria-pressed={feedback === "down"} className={cn(ACTION_CLASS, feedback === "down" && "text-foreground")} onClick={() => rate("down")}>
        <ThumbsDownIcon className={cn(feedback === "down" && "fill-current")} />
      </Button>
      {onRegenerate && (
        <Button variant="ghost" size="icon-sm" aria-label="Regenerate answer" className={ACTION_CLASS} onClick={onRegenerate}>
          <RefreshCwIcon />
        </Button>
      )}
    </div>
  );
}
