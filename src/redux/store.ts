import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth/authApi";
import { usersApi } from "./services/users/usersApi";
import authReducer from "./services/auth/authSlice";
import { leadsapi } from "./services/leads/leadsApi";
import { conversationApi } from "./services/conversation/conversationApi";
import { twilioApi } from "./services/twilio/twilioApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [leadsapi.reducerPath]: leadsapi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
    [twilioApi.reducerPath]: twilioApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      leadsapi.middleware,
      conversationApi.middleware,
      twilioApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
