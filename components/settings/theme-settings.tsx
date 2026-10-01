"use client";

import { SettingsSection } from "@/components/settings/settings-section";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useThemePreference } from "@/hooks/use-theme-preference";
import { THEME_OPTIONS } from "@/lib/constants/settings";
import { isThemePreference } from "@/lib/theme";

export function ThemeSettings() {
  const { theme, setTheme } = useThemePreference();

  return (
    <SettingsSection title="Appearance" description="Choose how Legal Intelligence looks on this device.">
      <RadioGroup
        aria-label="Theme"
        value={theme}
        onValueChange={(value) => {
          if (isThemePreference(value)) setTheme(value);
        }}
        className="grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {THEME_OPTIONS.map(({ value, label, description, icon: Icon }) => (
          <label
            key={value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50 has-data-checked:border-primary has-data-checked:bg-muted/50"
          >
            <RadioGroupItem value={value} aria-label={label} className="mt-0.5" />
            <span className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Icon className="size-4" aria-hidden />
                {label}
              </span>
              <span className="text-xs text-muted-foreground">{description}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </SettingsSection>
  );
}
