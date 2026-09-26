import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/features/auth/authSlice";
import consultationsReducer from "@/lib/store/features/consultations/consultationsSlice";
import counterReducer from "@/lib/store/features/counter/counterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      counter: counterReducer,
      consultations: consultationsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
