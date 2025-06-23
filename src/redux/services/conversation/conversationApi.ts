import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const conversationApi = createApi({
  reducerPath: "conversationsApi",
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
    getConversation: builder.query<any, { lead_ID: string; offset: number }>({
      query: ({ lead_ID, offset }) =>
        `conversations?lead_id=${lead_ID}&offset=${offset}`,
    }),
  }),
});

export const { useGetConversationQuery } = conversationApi;
