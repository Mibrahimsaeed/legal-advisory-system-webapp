import type { Metadata } from "next";
import { AboutSection } from "@/components/landing/about-section";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { KnowledgeGraphSection } from "@/components/landing/knowledge-graph-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LegalResearchSection } from "@/components/landing/legal-research-section";
import { ShowcaseSection } from "@/components/landing/showcase-section";

export const metadata: Metadata = {
  title: { absolute: "Legal Intelligence | AI-Powered Legal Research for Pakistani Law" },
  description:
    "Research Pakistani statutes and case law with an AI-powered decision-support system built to provide grounded answers, relevant authorities, and verifiable citations.",
};

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main>
        <HeroSection />
        <LegalResearchSection />
        <KnowledgeGraphSection />
        <CapabilitiesSection />
        <ShowcaseSection />
        <AboutSection />
        <CtaSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </>
  );
}
