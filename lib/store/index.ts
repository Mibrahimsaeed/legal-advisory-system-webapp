import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "@/lib/store/features/admin/adminSlice";
import authReducer from "@/lib/store/features/auth/authSlice";
import consultationsReducer from "@/lib/store/features/consultations/consultationsSlice";
import counterReducer from "@/lib/store/features/counter/counterSlice";
import ragReducer from "@/lib/store/features/rag/ragSlice";
import usageReducer from "@/lib/store/features/usage/usageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      counter: counterReducer,
      consultations: consultationsReducer,
      usage: usageReducer,
      admin: adminReducer,
      rag: ragReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
