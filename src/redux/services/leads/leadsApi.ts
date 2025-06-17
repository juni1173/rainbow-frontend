import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LeadType = {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  inquiry_type?: string;
  inquiry_status?: string;
  tag?: string;
  notes?: string;
  time_zone?: string;
  is_mobile?: boolean;
  preferred_calling_window?: number[];
};
export const leadsapi = createApi({
  reducerPath: "leadsApi",
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
    getLeads: builder.query<
      {
        data: any[];
        limit: number;
        next_page: number | null;
        prev_page: number | null;
        returned_records: number;
        total_records: number;
      },
      { tag?: string; limit?: number; offset?: number; name?: string }
    >({
      query: ({ tag, limit = 5, offset = 0, name }) => {
        const params = new URLSearchParams();
        if (tag && tag !== "All") params.append("tag", tag);
        if (name) params.append("name", name);
        params.append("limit", limit.toString());
        params.append("offset", offset.toString());
        return `leads?${params.toString()}`;
      },
    }),

    createLead: builder.mutation<any, LeadType[]>({
      query: (body) => ({
        url: "leads/new",
        method: "POST",
        body,
      }),
    }),
    getLeadById: builder.query<any, string>({
      query: (leadId) => `leads?lead_id=${leadId}`,
    }),
    updateLead: builder.mutation({
      query: (data) => ({
        url: `/leads`,
        method: "PATCH",
        body: data,
      }),
    }),
    getLeadsEnums: builder.query<any, void>({
      query: () => `leads/enums`,
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useGetLeadByIdQuery,
  useUpdateLeadMutation,
  useGetLeadsEnumsQuery
} = leadsapi;
