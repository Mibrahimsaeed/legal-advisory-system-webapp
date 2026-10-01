"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { ROUTES } from "@/lib/constants/routes";
import { selectSessionChecked } from "@/lib/store/features/auth/authSlice";
import { restoreSession } from "@/lib/store/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const checked = useAppSelector(selectSessionChecked);
  const { user, isAdmin } = useAdminAccess();

  useEffect(() => {
    if (!checked) void dispatch(restoreSession());
  }, [checked, dispatch]);

  useEffect(() => {
    if (!checked) return;
    if (!user) router.replace(ROUTES.login);
    else if (!isAdmin) router.replace(ROUTES.consultation);
  }, [checked, user, isAdmin, router]);

  if (!checked || !isAdmin) {
    return (
      <div role="status" className="grid min-h-svh place-items-center bg-background">
        <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" aria-label="Loading admin panel" />
      </div>
    );
  }

  return <>{children}</>;
}
