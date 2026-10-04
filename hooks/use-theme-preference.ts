"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  applyThemePreference,
  readThemePreference,
  watchSystemTheme,
  type ThemePreference,
} from "@/lib/theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useThemePreference() {
  const theme = useSyncExternalStore(subscribe, readThemePreference, () => DEFAULT_THEME);

  useEffect(() => {
    if (theme !== "system") return;
    return watchSystemTheme(() => applyThemePreference("system"));
  }, [theme]);

  const setTheme = (next: ThemePreference) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
    applyThemePreference(next);
    listeners.forEach((listener) => listener());
  };

  return { theme, setTheme };
}
