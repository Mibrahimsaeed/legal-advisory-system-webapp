import type {
  AnswerSegment,
  LegalAnswer,
} from "@/lib/store/features/consultations/consultations.types";

const joinSegments = (segments: readonly AnswerSegment[]) => segments.map((segment) => segment.text).join("");

export function answerToText(answer: LegalAnswer): string {
  const authorities = (items: LegalAnswer["applicableLaw"]) =>
    items
      .map(({ sourceId, summary }) => {
        const source = answer.sources.find((item) => item.id === sourceId);
        if (!source) return null;
        const where = source.kind === "statute" ? source.provision : source.court;
        return `- ${source.title}, ${where}: ${summary}`;
      })
      .filter((line): line is string => line !== null)
      .join("\n");

  return [
    `Legal issue\n${answer.issue}`,
    `Applicable law\n${authorities(answer.applicableLaw)}`,
    `Relevant case law\n${authorities(answer.caseLaw)}`,
    `Analysis\n${joinSegments(answer.analysis)}`,
    `Conclusion\n${joinSegments(answer.conclusion)}`,
  ].join("\n\n");
}
