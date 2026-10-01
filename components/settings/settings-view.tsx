"use client";

import { DataSettings } from "@/components/settings/data-settings";
import { PlanSettings } from "@/components/settings/plan-settings";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { ThemeSettings } from "@/components/settings/theme-settings";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import { useAppSelector } from "@/lib/store/hooks";

export function SettingsView() {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="font-heading text-2xl font-semibold">Settings</h1>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
          <ThemeSettings />
          {user && <ProfileSettings key={user.id} user={user} />}
          <PlanSettings />
          <DataSettings />
        </div>
      </div>
    </div>
  );
}
