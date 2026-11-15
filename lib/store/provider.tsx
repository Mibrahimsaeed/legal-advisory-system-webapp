"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { setUnauthorizedHandler } from "@/lib/axios";
import { makeStore } from "@/lib/store";
import { logoutUser } from "@/lib/store/features/auth/authThunks";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  // An expired session goes through the normal logout so every slice resets.
  useEffect(() => {
    setUnauthorizedHandler(() => void store.dispatch(logoutUser()));
    return () => setUnauthorizedHandler(null);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
