import type { LegalDomain } from "@/lib/store/features/consultations/consultations.types";

export const DOMAIN_OPTIONS: readonly { value: LegalDomain; label: string }[] = [
  { value: "general", label: "General Pakistani Law" },
  { value: "family", label: "Family Law" },
  { value: "criminal", label: "Criminal Law" },
];

export const isLegalDomain = (value: unknown): value is LegalDomain =>
  DOMAIN_OPTIONS.some((option) => option.value === value);

export const getDomainLabel = (domain: LegalDomain) =>
  DOMAIN_OPTIONS.find((option) => option.value === domain)?.label ?? domain;

export const EXAMPLE_PROMPTS = [
  { kind: "Direct question", text: "What are the grounds for dissolution of marriage under Pakistani law?" },
  { kind: "Scenario", text: "My wife has filed for dissolution of marriage on the ground of cruelty. What legal provisions may apply?" },
  { kind: "Criminal law", text: "What provisions of the Pakistan Penal Code may apply to this situation?" },
] as const;

export const RESEARCH_STEPS = [
  "Question",
  "Legal issue",
  "Statutes + case law",
  "Evidence",
  "Grounded answer",
] as const;

export const THINKING_STEPS = [
  "Identifying the legal issue",
  "Retrieving statutes and provisions",
  "Finding relevant case law",
  "Linking supporting evidence",
  "Preparing the grounded answer",
] as const;

export const PROTOTYPE_NOTICE =
  "Prototype data: citations and passages are illustrative placeholders, not verified authorities.";
