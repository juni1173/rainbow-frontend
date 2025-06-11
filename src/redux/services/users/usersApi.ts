// src/redux/services/usersApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
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
    getUsers: builder.query<any, void>({
      query: () => "users/list",
    }),

    createUser: builder.mutation<
      any,
      { first_name: string; email: string; role?: string; last_name?: string }
    >({
      query: (body) => ({
        url: "users/new",
        method: "POST",
        body: {
          ...body,
          role: body.role || "owner",
        },
      }),
    }),
    deactivateUser: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: "users/deactivate",
        method: "PATCH",
        body: { email },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeactivateUserMutation,
} = usersApi;
