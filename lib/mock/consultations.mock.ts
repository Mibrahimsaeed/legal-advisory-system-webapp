import { ANSWER_TEMPLATES, type AnswerTemplateId } from "@/lib/mock/legal-answers";
import type {
  Consultation,
  LegalAnswer,
  LegalDomain,
} from "@/lib/store/features/consultations/consultations.types";

const DAY_MS = 86_400_000;

function seed(
  id: string,
  title: string,
  domain: LegalDomain,
  question: string,
  template: AnswerTemplateId,
  daysAgo: number,
  now: number,
): Consultation {
  return {
    id,
    title,
    domain,
    updatedAt: new Date(now - daysAgo * DAY_MS).toISOString(),
    messages: [
      { id: `${id}-q`, role: "user", content: question },
      { id: `${id}-a`, role: "assistant", answer: ANSWER_TEMPLATES[template] },
    ],
  };
}

export function createSeedConsultations(now = Date.now()): Consultation[] {
  return [
    seed("divorce-maintenance", "Divorce & maintenance", "family", "My wife has filed for dissolution of marriage on the ground of cruelty. What legal provisions may apply?", "divorce", 0, now),
    seed("guardianship-minor", "Guardianship of minor", "family", "Can a mother seek custody of her minor child after divorce?", "guardianship", 1, now),
    seed("criminal-liability", "Criminal liability", "criminal", "What provisions of the Pakistan Penal Code may apply if a person causes the death of another during a quarrel?", "criminal", 3, now),
    seed("property-dispute", "Property dispute", "general", "The seller refuses to execute the sale deed after I paid an advance under a written agreement to sell. What can I do?", "property", 6, now),
  ];
}

export function pickAnswerTemplate(question: string, domain: LegalDomain): LegalAnswer {
  const text = question.toLowerCase();
  if (domain === "criminal" || /murder|kill|death|theft|fir\b|bail|offence|penal|arrest/.test(text)) return ANSWER_TEMPLATES.criminal;
  if (/custody|guardian|child|minor/.test(text)) return ANSWER_TEMPLATES.guardianship;
  if (domain === "family" || /divorce|marriage|maintenance|khula|dissolution|wife|husband/.test(text)) return ANSWER_TEMPLATES.divorce;
  return ANSWER_TEMPLATES.property;
}
