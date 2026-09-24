"use client";

import dynamic from "next/dynamic";

const LegalIntelligenceGraph = dynamic(
  () => import("@/components/landing/LegalIntelligenceGraph"),
  { ssr: false },
);

export function HeroGraph({ className }: { className?: string }) {
  return <LegalIntelligenceGraph className={className} style={undefined} />;
}
