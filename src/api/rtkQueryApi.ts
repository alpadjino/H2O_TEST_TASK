import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001/api";

const rtkQueryApi = createApi({
  reducerPath: "api",
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Cache-Control", "no-cache");
      headers.set("Origin", baseUrl);

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export { rtkQueryApi };
