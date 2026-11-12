import { ApiError } from "@/lib/api/client";
import { api } from "@/lib/axios";
import type {
  ArchetypeId,
  AskQuestionPayload,
  Consultation,
  ConsultationMessage,
  LegalAnswer,
  LegalDomain,
} from "@/lib/store/features/consultations/consultations.types";
import { titleFromQuestion } from "@/lib/store/features/consultations/consultations.utils";

interface MessageResponse {
  id: string;
  role: string;
  content: string;
  answer: LegalAnswer | null;
}

interface ConversationDetailResponse {
  id: string;
  title: string;
  domain: LegalDomain;
  archetype: ArchetypeId | null;
  updated_at: string;
  messages: MessageResponse[];
}

interface Paginated<T> {
  items: T[];
}

const HISTORY_LIMIT = 100;
// Generating an answer can take much longer than an ordinary request.
const ASK_TIMEOUT_MS = 120_000;

function toAnswer({ answer, content }: MessageResponse): LegalAnswer {
  return answer ?? { issue: "", applicableLaw: [], caseLaw: [], analysis: [{ text: content }], conclusion: [], sources: [] };
}

function toMessage(message: MessageResponse): ConsultationMessage {
  return message.role === "user"
    ? { id: message.id, role: "user", content: message.content }
    : { id: message.id, role: "assistant", answer: toAnswer(message) };
}

function toConsultation(conversation: ConversationDetailResponse): Consultation {
  return {
    id: conversation.id,
    title: conversation.title,
    domain: conversation.domain,
    archetype: conversation.archetype ?? undefined,
    updatedAt: conversation.updated_at,
    messages: conversation.messages.map(toMessage),
  };
}

const sendQuestion = ({ consultationId, question, domain, archetype }: AskQuestionPayload) =>
  api.post<MessageResponse>(
    `/chat/${consultationId}/message`,
    { question, domain, archetype },
    { timeout: ASK_TIMEOUT_MS },
  );

export const consultationsApi = {
  list: async (): Promise<Consultation[]> => {
    const { data } = await api.get<Paginated<ConversationDetailResponse>>("/conversations/with-messages", {
      params: { limit: HISTORY_LIMIT },
    });
    return data.items.map(toConsultation);
  },
  // New chats get their id in the browser; the conversation is created on the first 404.
  ask: async (payload: AskQuestionPayload): Promise<LegalAnswer> => {
    try {
      return toAnswer((await sendQuestion(payload)).data);
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 404)) throw error;
      const { consultationId, question, domain, archetype } = payload;
      await api.post("/conversations", { id: consultationId, title: titleFromQuestion(question), domain, archetype });
      return toAnswer((await sendQuestion(payload)).data);
    }
  },
};
