"use client";

import { useEffect } from "react";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import { selectConsultationsLoaded } from "@/lib/store/features/consultations/consultationsSlice";
import { loadConsultations } from "@/lib/store/features/consultations/consultationsThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loaded = useAppSelector(selectConsultationsLoaded);
  const userId = user?.id;

  useEffect(() => {
    if (userId && !loaded) void dispatch(loadConsultations());
  }, [userId, loaded, dispatch]);

  return (
    <SidebarProvider className="h-svh">
      <WorkspaceSidebar />
      <SidebarInset className="min-h-0 overflow-hidden">{children}</SidebarInset>
    </SidebarProvider>
  );
}
