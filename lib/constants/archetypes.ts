import {
  GavelIcon,
  GitPullRequestIcon,
  ScrollTextIcon,
  ShieldAlertIcon,
  type LucideIcon,
} from "lucide-react";
import type { ArchetypeId } from "@/lib/store/features/consultations/consultations.types";

export interface Archetype {
  id: ArchetypeId;
  label: string;
  icon: LucideIcon;
  heading: string;
  description: string;
  placeholder: string;
  prompts: readonly string[];
}

export const ARCHETYPES: readonly Archetype[] = [
  {
    id: "scenario-analysis",
    label: "Scenario Analysis",
    icon: GitPullRequestIcon,
    heading: "Analyse a legal scenario",
    description:
      "Describe the facts as they stand. Legal Intelligence will identify the legal issues and the statutes and precedents that may apply.",
    placeholder: "Describe the facts of your scenario...",
    prompts: [
      "My wife has filed for dissolution of marriage on the ground of cruelty. What legal provisions may apply?",
      "The seller refuses to execute the sale deed after I paid an advance. What can I do?",
    ],
  },
  {
    id: "statutory-provision",
    label: "Statutory Provision",
    icon: ScrollTextIcon,
    heading: "Look up a statutory provision",
    description:
      "Name a Pakistani statute or section, or describe what the provision should cover, and get its scope and how it is applied.",
    placeholder: "Name a statute or section, or describe what it should cover...",
    prompts: [
      "What does section 25 of the Guardians and Wards Act, 1890 provide?",
      "Which provisions of the Pakistan Penal Code define qatl-i-amd?",
    ],
  },
  {
    id: "case-law-research",
    label: "Case-Law Research",
    icon: GavelIcon,
    heading: "Research case law",
    description:
      "Ask how the courts have treated an issue. Legal Intelligence will surface the judgments and the principles they set out.",
    placeholder: "Describe the issue or principle you want case law on...",
    prompts: [
      "How have courts treated the welfare of the minor in custody disputes?",
      "What have courts said about proving cruelty as a ground for dissolution of marriage?",
    ],
  },
  {
    id: "legal-remedies",
    label: "Legal Remedies",
    icon: ShieldAlertIcon,
    heading: "Explore legal remedies",
    description:
      "Describe a wrong or a dispute and see the remedies Pakistani law provides, with the forum and the time limits that apply.",
    placeholder: "Describe the dispute and the outcome you are seeking...",
    prompts: [
      "What remedies are available if a seller refuses to execute a sale deed?",
      "What remedies can a wife seek if her husband fails to maintain her?",
    ],
  },
];

export const getArchetype = (id: string | null | undefined) =>
  ARCHETYPES.find((archetype) => archetype.id === id) ?? null;

export const archetypeHref = (id: ArchetypeId, base: string) => `${base}?type=${id}`;
