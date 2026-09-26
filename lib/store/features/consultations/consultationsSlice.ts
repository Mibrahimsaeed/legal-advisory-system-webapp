import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { logoutUser } from "@/lib/store/features/auth/authThunks";
import type {
  Consultation,
  LegalDomain,
} from "@/lib/store/features/consultations/consultations.types";
import { titleFromQuestion } from "@/lib/store/features/consultations/consultations.utils";
import {
  askQuestion,
  loadConsultations,
} from "@/lib/store/features/consultations/consultationsThunks";

interface ConsultationsState {
  items: Consultation[];
  loaded: boolean;
  pendingIds: string[];
  error: string | null;
}

const initialState: ConsultationsState = {
  items: [],
  loaded: false,
  pendingIds: [],
  error: null,
};

const consultationsSlice = createSlice({
  name: "consultations",
  initialState,
  reducers: {
    consultationDomainChanged: (
      state,
      action: PayloadAction<{ id: string; domain: LegalDomain }>,
    ) => {
      const consultation = state.items.find((item) => item.id === action.payload.id);
      if (consultation) consultation.domain = action.payload.domain;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(loadConsultations.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadConsultations.rejected, (state, action) => {
        state.loaded = true;
        state.error = action.payload ?? "Could not load consultations.";
      })
      .addCase(askQuestion.pending, (state, action) => {
        const { consultationId, question, domain, askedAt } = action.meta.arg;
        let consultation = state.items.find((item) => item.id === consultationId);
        if (!consultation) {
          consultation = { id: consultationId, title: titleFromQuestion(question), domain, updatedAt: askedAt, messages: [] };
          state.items.unshift(consultation);
        }
        consultation.messages.push({ id: `${action.meta.requestId}-q`, role: "user", content: question });
        consultation.updatedAt = askedAt;
        state.pendingIds.push(consultationId);
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        const { consultationId } = action.meta.arg;
        state.items
          .find((item) => item.id === consultationId)
          ?.messages.push({ id: `${action.meta.requestId}-a`, role: "assistant", answer: action.payload });
        state.pendingIds = state.pendingIds.filter((id) => id !== consultationId);
      })
      .addCase(askQuestion.rejected, (state, action) => {
        const { consultationId } = action.meta.arg;
        state.items
          .find((item) => item.id === consultationId)
          ?.messages.push({
            id: `${action.meta.requestId}-a`,
            role: "assistant",
            error: action.payload ?? "The question could not be processed.",
          });
        state.pendingIds = state.pendingIds.filter((id) => id !== consultationId);
      });
  },
});

export const { consultationDomainChanged } = consultationsSlice.actions;
export default consultationsSlice.reducer;

export const selectConsultations = (state: RootState) => state.consultations.items;
export const selectConsultationsLoaded = (state: RootState) => state.consultations.loaded;
export const selectConsultationById = (id: string | null) => (state: RootState) =>
  id ? state.consultations.items.find((item) => item.id === id) : undefined;
export const selectIsConsultationPending = (id: string | null) => (state: RootState) =>
  id !== null && state.consultations.pendingIds.includes(id);
