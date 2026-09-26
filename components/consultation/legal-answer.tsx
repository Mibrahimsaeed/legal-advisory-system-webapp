import { AnswerSection } from "@/components/consultation/answer-section";
import { AuthorityItem } from "@/components/consultation/authority-item";
import { SegmentedText } from "@/components/consultation/segmented-text";
import type { LegalAnswer as LegalAnswerData } from "@/lib/store/features/consultations/consultations.types";

function AuthorityList({ answer, authorities }: { answer: LegalAnswerData; authorities: LegalAnswerData["applicableLaw"] }) {
  return (
    <>
      {authorities.map(({ sourceId, summary }) => {
        const index = answer.sources.findIndex((source) => source.id === sourceId);
        if (index < 0) return null;
        return <AuthorityItem key={sourceId} source={answer.sources[index]} number={index + 1} summary={summary} />;
      })}
    </>
  );
}

export function LegalAnswer({ answer }: { answer: LegalAnswerData }) {
  return (
    <article className="flex flex-col gap-8 rounded-xl border bg-card p-5 sm:p-7">
      <AnswerSection index="01" title="Legal issue">
        <p className="text-[15px] leading-7">{answer.issue}</p>
      </AnswerSection>
      <AnswerSection index="02" title="Applicable law">
        <AuthorityList answer={answer} authorities={answer.applicableLaw} />
      </AnswerSection>
      <AnswerSection index="03" title="Relevant case law">
        <AuthorityList answer={answer} authorities={answer.caseLaw} />
      </AnswerSection>
      <AnswerSection index="04" title="Analysis">
        <SegmentedText segments={answer.analysis} sources={answer.sources} />
      </AnswerSection>
      <AnswerSection index="05" title="Conclusion">
        <SegmentedText segments={answer.conclusion} sources={answer.sources} />
      </AnswerSection>
      <p className="border-t pt-4 text-xs leading-5 text-muted-foreground">
        Legal research output for decision support. It is not legal advice and does not replace qualified legal counsel.
      </p>
    </article>
  );
}
