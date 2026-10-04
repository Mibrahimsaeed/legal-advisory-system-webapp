"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHomeRoute } from "@/lib/auth/roles";
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
    if (user) router.replace(getHomeRoute(user));
  }, [user, router]);

  return <>{children}</>;
}
