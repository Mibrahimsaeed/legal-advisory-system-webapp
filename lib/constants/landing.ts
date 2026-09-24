import {
  BookOpenIcon,
  FileSearchIcon,
  GavelIcon,
  QuoteIcon,
  ScrollTextIcon,
  SparklesIcon,
  TelescopeIcon,
  type LucideIcon,
} from "lucide-react";

export interface LandingItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "About", href: "/#about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
] as const;

export const CAPABILITIES: readonly LandingItem[] = [
  {
    title: "Pakistani Statutes",
    description: "Access relevant provisions from Pakistani legislation.",
    icon: ScrollTextIcon,
  },
  {
    title: "Case Law",
    description: "Find relevant judicial decisions and legal reasoning.",
    icon: GavelIcon,
  },
  {
    title: "Citation-Grounded Answers",
    description:
      "Connect generated answers to identifiable legal sources.",
    icon: QuoteIcon,
  },
  {
    title: "Scenario-Based Research",
    description:
      "Analyze a described legal situation and identify potentially relevant legal authorities.",
    icon: FileSearchIcon,
  },
];

export const PRINCIPLES: readonly LandingItem[] = [
  {
    title: "Grounded in Legal Sources",
    description:
      "Answers are built from statutes and case law rather than free-form generation.",
    icon: BookOpenIcon,
  },
  {
    title: "Designed for Transparency",
    description:
      "Every answer shows the authorities and evidence it relies on.",
    icon: TelescopeIcon,
  },
  {
    title: "Built as Decision Support",
    description:
      "An assistive research tool that supports, and never replaces, qualified legal counsel.",
    icon: SparklesIcon,
  },
];
