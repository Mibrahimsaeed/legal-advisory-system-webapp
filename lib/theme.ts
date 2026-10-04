export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "li.theme";
export const DEFAULT_THEME: ThemePreference = "light";

const DARK_QUERY = "(prefers-color-scheme: dark)";
// The marketing landing page is designed for light mode only.
const LIGHT_ONLY_PATH = "/";

export const isThemePreference = (value: unknown): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system";

export function readThemePreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyThemePreference(preference: ThemePreference) {
  const dark = preference === "dark" || (preference === "system" && window.matchMedia(DARK_QUERY).matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export function watchSystemTheme(onChange: () => void) {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Runs before the page paints so a saved dark theme does not flash light first.
export const THEME_INIT_SCRIPT = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}");var d=location.pathname!=="${LIGHT_ONLY_PATH}"&&(p==="dark"||(p==="system"&&matchMedia("${DARK_QUERY}").matches));if(d){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}}catch(e){}})();`;
