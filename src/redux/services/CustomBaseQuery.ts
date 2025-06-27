import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://ajzjuk1jch.execute-api.us-east-2.amazonaws.com/dev/",
  prepareHeaders: (headers) => {
    const token = Cookies.get("id_token") || sessionStorage.getItem("id_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token is invalid or expired — perform logout actions
    Cookies.remove("id_token");
    sessionStorage.clear();

    if (typeof window !== "undefined") {
      window.location.href = "/auth/sign-in"; // redirect to login
    }
  }

  return result;
};

export default customBaseQuery;
