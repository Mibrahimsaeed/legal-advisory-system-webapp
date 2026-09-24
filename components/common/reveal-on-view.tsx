"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealOnViewProps extends React.ComponentProps<"div"> {
  delay?: number;
}

export function RevealOnView({ delay = 0, className, style, ...props }: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={cn(
        "group/reveal motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-safe:data-[shown=false]:translate-y-4 motion-safe:data-[shown=false]:opacity-0",
        "[@media(scripting:none)]:data-[shown=false]:translate-y-0 [@media(scripting:none)]:data-[shown=false]:opacity-100",
        className,
      )}
      {...props}
    />
  );
}
