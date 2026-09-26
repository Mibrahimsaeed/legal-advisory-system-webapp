import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/features/auth/authSlice";
import consultationsReducer from "@/lib/store/features/consultations/consultationsSlice";
import counterReducer from "@/lib/store/features/counter/counterSlice";
import workspaceReducer from "@/lib/store/features/workspace/workspaceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      counter: counterReducer,
      consultations: consultationsReducer,
      workspace: workspaceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
