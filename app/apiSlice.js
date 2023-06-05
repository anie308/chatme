import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROD = 'https://chatwave.onrender.com/api/v1'
// const PROD = "http://172.16.14.13:5000/api/v1";
export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: PROD }),
    keepUnusedDataFor: 10,
    tagTypes: ["messages"],
    endpoints: (builder) => ({}),
});
