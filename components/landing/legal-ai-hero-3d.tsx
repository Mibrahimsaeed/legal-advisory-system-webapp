"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const LegalAIHeroScene = dynamic(
  () =>
    import("@/components/landing/legal-ai-hero-scene").then(
      (module) => module.LegalAIHeroScene,
    ),
  { ssr: false },
);

function supportsWebGL() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export function LegalAIHero3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsWebGL()) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setMounted(true);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive 3D graph connecting statutes, case law, evidence and citations through an AI core"
      className={cn(
        "relative aspect-square w-full transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <div className="pointer-events-none absolute -inset-[10%] sm:-inset-[23%]">
        {mounted && <LegalAIHeroScene active={inView} onReady={handleReady} />}
      </div>
    </div>
  );
}
