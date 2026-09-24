import type { Metadata } from "next";
import { AboutSection } from "@/components/landing/about-section";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { ShowcaseSection } from "@/components/landing/showcase-section";
import { WorkflowSection } from "@/components/landing/workflow-section";

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
        <WorkflowSection />
        <CapabilitiesSection />
        <ShowcaseSection />
        <AboutSection />
        <HowItWorksSection />
        <CtaSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </>
  );
}
