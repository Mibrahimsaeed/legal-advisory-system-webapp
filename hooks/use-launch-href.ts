"use client";

import { useEffect } from "react";
import { ROUTES } from "@/lib/constants/routes";
import { selectSessionChecked, selectUser } from "@/lib/store/features/auth/authSlice";
import { restoreSession } from "@/lib/store/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function useLaunchHref() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const checked = useAppSelector(selectSessionChecked);

  useEffect(() => {
    if (!checked) void dispatch(restoreSession());
  }, [checked, dispatch]);

  return user ? ROUTES.consultation : ROUTES.login;
}
