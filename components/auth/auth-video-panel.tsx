"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { AUTH_VIDEO_SRC } from "@/lib/constants/app";

export function AuthVideoPanel() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useReducedMotion();

  if (!isDesktop || reducedMotion) return null;

  return (
    <video
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={AUTH_VIDEO_SRC}
      className="absolute inset-0 size-full object-cover"
    />
  );
}
