export const LEGAL_RESEARCH_COPY = {
  eyebrow: "Legal research, simplified",
  title: "From a legal question to a citation‑grounded answer.",
  description:
    "Legal Intelligence helps users investigate Pakistani legal issues by connecting the facts of a case with relevant statutes, provisions, and judicial decisions.",
  statement:
    "Built around Pakistani statutes, case law, and verifiable legal sources.",
} as const;

export const RESEARCH_PREVIEW = {
  productName: "Legal Intelligence",
  workspace: "Legal Research Workspace",
  question: "Can a mother seek custody of her child after divorce?",
  issue: "Child custody following dissolution of marriage",
  law: { title: "Guardians & Wards Act, 1890", provision: "Section 25" },
  cases: [
    "Case citation · Lahore High Court",
    "Case citation · Supreme Court of Pakistan",
    "Case citation · Islamabad High Court",
  ],
  evidenceAction: "View source",
  disclaimer: "Illustrative interface. Case citations are placeholders.",
} as const;
