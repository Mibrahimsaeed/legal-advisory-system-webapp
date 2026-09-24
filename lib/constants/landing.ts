import {
  BookOpenIcon,
  DatabaseIcon,
  FileSearchIcon,
  GavelIcon,
  LandmarkIcon,
  LinkIcon,
  MessageSquareTextIcon,
  NetworkIcon,
  QuoteIcon,
  ScaleIcon,
  ScrollTextIcon,
  SearchIcon,
  ShieldCheckIcon,
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

export const WORKFLOW_STEPS: readonly LandingItem[] = [
  {
    title: "Ask",
    description:
      "Describe a legal situation or ask a direct question in plain language.",
    icon: MessageSquareTextIcon,
  },
  {
    title: "Retrieve",
    description:
      "The system searches relevant Pakistani statutes and case law.",
    icon: SearchIcon,
  },
  {
    title: "Reason",
    description:
      "The legal issue is connected with applicable authorities and supporting evidence.",
    icon: ScaleIcon,
  },
  {
    title: "Verify",
    description:
      "Answers include citations so you can trace the underlying legal sources.",
    icon: ShieldCheckIcon,
  },
];

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

export const PIPELINE_STAGES: readonly LandingItem[] = [
  {
    title: "User Question",
    description: "A direct question or a described scenario.",
    icon: MessageSquareTextIcon,
  },
  {
    title: "Retrieval",
    description: "Relevant provisions and judgments are located.",
    icon: SearchIcon,
  },
  {
    title: "Legal Knowledge",
    description: "Sources are linked through a structured knowledge layer.",
    icon: NetworkIcon,
  },
  {
    title: "AI Reasoning",
    description: "The issue is analysed against the retrieved authorities.",
    icon: SparklesIcon,
  },
  {
    title: "Cited Answer",
    description: "A response with references you can check.",
    icon: QuoteIcon,
  },
];

export const COVERAGE: readonly LandingItem[] = [
  {
    title: "Pakistani statutes",
    description: "Acts, ordinances and their individual sections.",
    icon: ScrollTextIcon,
  },
  {
    title: "Case law",
    description: "Judgments and the reasoning behind them.",
    icon: GavelIcon,
  },
  {
    title: "Legal entities",
    description: "Courts, provisions and legal concepts, connected.",
    icon: LandmarkIcon,
  },
  {
    title: "Citations",
    description: "Identifiable references for each authority used.",
    icon: LinkIcon,
  },
  {
    title: "Evidence",
    description: "The source passages that support each answer.",
    icon: DatabaseIcon,
  },
];
