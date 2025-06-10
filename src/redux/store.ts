import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth/authApi";
import { usersApi } from "./services/users/usersApi";
import authReducer from "./services/auth/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
