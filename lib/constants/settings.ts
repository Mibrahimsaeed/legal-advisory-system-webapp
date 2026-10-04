import { MonitorIcon, MoonIcon, SunIcon, type LucideIcon } from "lucide-react";
import type { ThemePreference } from "@/lib/theme";

export const THEME_OPTIONS: readonly { value: ThemePreference; label: string; description: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", description: "Bright background", icon: SunIcon },
  { value: "dark", label: "Dark", description: "Easier on the eyes at night", icon: MoonIcon },
  { value: "system", label: "System", description: "Match your device setting", icon: MonitorIcon },
];
