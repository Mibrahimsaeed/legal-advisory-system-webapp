import { createSeedConsultations, pickAnswerTemplate } from "@/lib/mock/consultations.mock";
import type {
  AskQuestionPayload,
  Consultation,
  LegalAnswer,
} from "@/lib/store/features/consultations/consultations.types";

// Prototype implementation backed by localStorage and canned answers. Replace with
// apiClient calls (GET /consultations, POST /consultations/:id/questions) later.
const ASK_LATENCY_MS = 1800;
const storageKey = (userId: string) => `li.consultations.${userId}`;

export function saveConsultations(userId: string, items: Consultation[]) {
  window.localStorage.setItem(storageKey(userId), JSON.stringify(items));
}

export const consultationsApi = {
  list: async (userId: string): Promise<Consultation[]> => {
    try {
      const raw = window.localStorage.getItem(storageKey(userId));
      if (raw) return JSON.parse(raw) as Consultation[];
    } catch {
      // fall through to seed data
    }
    return createSeedConsultations();
  },
  ask: async ({ question, domain }: AskQuestionPayload): Promise<LegalAnswer> => {
    await new Promise((resolve) => setTimeout(resolve, ASK_LATENCY_MS));
    return pickAnswerTemplate(question, domain);
  },
};
