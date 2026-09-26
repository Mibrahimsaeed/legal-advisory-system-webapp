"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectSessionChecked, selectUser } from "@/lib/store/features/auth/authSlice";
import { restoreSession } from "@/lib/store/features/auth/authThunks";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const checked = useAppSelector(selectSessionChecked);

  useEffect(() => {
    if (!checked) void dispatch(restoreSession());
  }, [checked, dispatch]);

  useEffect(() => {
    if (checked && !user) router.replace(ROUTES.login);
  }, [checked, user, router]);

  if (!checked || !user) {
    return (
      <div role="status" className="grid min-h-svh place-items-center bg-background">
        <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" aria-label="Loading workspace" />
      </div>
    );
  }

  return <>{children}</>;
}
