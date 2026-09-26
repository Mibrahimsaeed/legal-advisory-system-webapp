"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { selectSessionChecked, selectUser } from "@/lib/store/features/auth/authSlice";
import { restoreSession } from "@/lib/store/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function GuestGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const checked = useAppSelector(selectSessionChecked);

  useEffect(() => {
    if (!checked) void dispatch(restoreSession());
  }, [checked, dispatch]);

  useEffect(() => {
    if (user) router.replace(ROUTES.consultation);
  }, [user, router]);

  return <>{children}</>;
}
