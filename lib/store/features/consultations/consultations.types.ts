export type LegalDomain = "general" | "family" | "criminal";

interface SourceBase {
  id: string;
  title: string;
  passage: string;
  relevance: string;
}

export interface StatuteSource extends SourceBase {
  kind: "statute";
  provision: string;
}

export interface CaseSource extends SourceBase {
  kind: "case";
  court: string;
  principle: string;
}

export type LegalSource = StatuteSource | CaseSource;

export interface AnswerSegment {
  text: string;
  sourceId?: string;
}

export interface AnswerAuthority {
  sourceId: string;
  summary: string;
}

export interface LegalAnswer {
  issue: string;
  applicableLaw: AnswerAuthority[];
  caseLaw: AnswerAuthority[];
  analysis: AnswerSegment[];
  conclusion: AnswerSegment[];
  sources: LegalSource[];
  passageCount: number;
}

export interface ConsultationMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  answer?: LegalAnswer;
  error?: string;
}

export interface Consultation {
  id: string;
  title: string;
  domain: LegalDomain;
  updatedAt: string;
  messages: ConsultationMessage[];
}

export interface AskQuestionPayload {
  consultationId: string;
  question: string;
  domain: LegalDomain;
  askedAt: string;
}
