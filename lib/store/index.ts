import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/features/auth/authSlice";
import consultationsReducer from "@/lib/store/features/consultations/consultationsSlice";
import counterReducer from "@/lib/store/features/counter/counterSlice";
import usageReducer from "@/lib/store/features/usage/usageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      counter: counterReducer,
      consultations: consultationsReducer,
      usage: usageReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
