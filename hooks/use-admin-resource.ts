"use client";

import { useCallback, useEffect } from "react";
import type { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { Resource } from "@/lib/store/features/admin/admin.types";
import { toRequestKey } from "@/lib/store/features/admin/adminThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

type LoadAction = ThunkAction<unknown, RootState, unknown, UnknownAction>;

// Loads when the query changes or the data was marked stale; failed requests wait for an explicit reload.
export function useAdminResource<T, Arg>(
  select: (state: RootState) => Resource<T>,
  load: (arg: Arg) => LoadAction,
  arg: Arg,
) {
  const dispatch = useAppDispatch();
  const resource = useAppSelector(select);
  const key = toRequestKey(arg);
  const stale = resource.status === "idle" || resource.requestKey !== key;

  // Rebuilt from the key so callers can pass inline query objects without re-running the effect each render.
  const reload = useCallback(() => {
    void dispatch(load(JSON.parse(key) as Arg));
  }, [dispatch, load, key]);

  useEffect(() => {
    if (stale) reload();
  }, [stale, reload]);

  return { ...resource, loading: resource.status === "loading" || stale, reload };
}
