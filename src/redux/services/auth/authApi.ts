import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ajzjuk1jch.execute-api.us-east-2.amazonaws.com/dev/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("id_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/logIn",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "auth/forgotPass",
        method: "POST",
        body,
      }),
    }),
    firstLoginPassword: builder.mutation<
      any,
      { session: string; new_password: string; email: string }
    >({
      query: (body) => ({
        url: "/auth/changePass/firstLogIn",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      any,
      { confirmation_code: string; new_password: string; email: string }
    >({
      query: (body) => ({
        url: "auth/changePass/reset",
        method: "POST",
        body,
      }),
    }),

    logOut: builder.mutation<any, { token: any }>({
      query: ({ token }) => ({
        url: "auth/logOut",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    selfChangePassword: builder.mutation<
      any,
      { previous_password: string; new_password: string }
    >({
      query: (body) => ({
        url: "auth/changePass/self",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useForgotPasswordMutation,
  useFirstLoginPasswordMutation,
  useResetPasswordMutation,
  useSelfChangePasswordMutation,
  useLogOutMutation,
} = authApi;
