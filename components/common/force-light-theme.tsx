"use client";

import { useEffect } from "react";
import { applyThemePreference, readThemePreference } from "@/lib/theme";

// Keeps a page in light mode, then restores the saved theme when leaving it.
export function ForceLightTheme() {
  useEffect(() => {
    applyThemePreference("light");
    return () => applyThemePreference(readThemePreference());
  }, []);

  return null;
}
