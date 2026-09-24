import type { LegalGraphTheme } from "@/components/legal/legal-graph-engine";

export const KNOWLEDGE_GRAPH_COPY = {
  eyebrow: "How legal knowledge connects",
  title: "Where legal knowledge becomes connected.",
  description:
    "Legal Intelligence connects questions, legal issues, statutes, provisions, judgments, and evidence into a structured knowledge graph—making the path from a question to its supporting authority traceable.",
  legend: { path: "Reasoning path", related: "Related authority" },
  note: "Illustrative sample graph. Labels are placeholders, not real legal authorities.",
} as const;

// SVG attributes cannot read Tailwind tokens, so the graph's overrides live here.
// The primary color stays the engine's own oklch(0.2643 0.0345 262.71).
export const KNOWLEDGE_GRAPH_THEME: Partial<LegalGraphTheme> = {
  paper: "#FFFFFF",
  monoFont: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};
