import { Citation } from "@/components/consultation/citation";
import type { AnswerSegment, LegalSource } from "@/lib/store/features/consultations/consultations.types";

interface SegmentedTextProps {
  segments: readonly AnswerSegment[];
  sources: readonly LegalSource[];
}

export function SegmentedText({ segments, sources }: SegmentedTextProps) {
  return (
    <p className="text-[15px] leading-7">
      {segments.map((segment, index) => {
        const number = sources.findIndex((source) => source.id === segment.sourceId) + 1;
        return (
          <span key={index}>
            {segment.text}
            {segment.sourceId && number > 0 && <Citation number={number} />}
          </span>
        );
      })}
    </p>
  );
}
