const TITLE_MAX_LENGTH = 48;

export const createConsultationId = () => window.crypto.randomUUID();

export function titleFromQuestion(question: string) {
  const clean = question.trim().replace(/\s+/g, " ");
  return clean.length > TITLE_MAX_LENGTH ? `${clean.slice(0, TITLE_MAX_LENGTH - 1).trimEnd()}…` : clean;
}
