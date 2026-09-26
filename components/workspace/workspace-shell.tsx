"use client";

import { useEffect } from "react";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { saveConsultations } from "@/lib/api/consultations.api";
import { selectUser } from "@/lib/store/features/auth/authSlice";
import {
  selectConsultations,
  selectConsultationsLoaded,
} from "@/lib/store/features/consultations/consultationsSlice";
import { loadConsultations } from "@/lib/store/features/consultations/consultationsThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectConsultations);
  const loaded = useAppSelector(selectConsultationsLoaded);
  const userId = user?.id;

  useEffect(() => {
    if (userId && !loaded) void dispatch(loadConsultations(userId));
  }, [userId, loaded, dispatch]);

  useEffect(() => {
    if (userId && loaded) saveConsultations(userId, items);
  }, [userId, loaded, items]);

  return (
    <SidebarProvider className="h-svh">
      <WorkspaceSidebar />
      <SidebarInset className="min-h-0 overflow-hidden">{children}</SidebarInset>
    </SidebarProvider>
  );
}
