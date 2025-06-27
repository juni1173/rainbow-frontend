import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const twilioApi = createApi({
  reducerPath: "twilioApi",
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
    getTwilioToken: builder.query<any, void>({
      query: () => "calls/outbound/user/twilio/token",
    }),
    // createBotCall: builder.query<any, string>({
    //   query: (leadId) => `/calls/outbound/create_call?lead_id${leadId}`,
    // }),
    createBotCall: builder.mutation({
      query: (lead_id) => ({
        url: `calls/outbound/bot/create_call`,
        method: "POST",
        body: lead_id,
      }),
    }),
    sendSms: builder.mutation({
      query: (body) => ({
        url: "sms/outbound",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetTwilioTokenQuery,
  useCreateBotCallMutation,
  useSendSmsMutation,
} = twilioApi;
