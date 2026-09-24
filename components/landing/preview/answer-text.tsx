import { CitationMarker } from "@/components/landing/preview/citation-marker";
import type { AnswerSegment } from "@/lib/constants/landing-samples";

export function AnswerText({ segments }: { segments: readonly AnswerSegment[] }) {
  return (
    <p className="text-sm leading-7">
      {segments.map((segment, index) => (
        <span key={index}>
          {segment.text}
          {segment.cite !== undefined && <CitationMarker id={segment.cite} />}
        </span>
      ))}
    </p>
  );
}
