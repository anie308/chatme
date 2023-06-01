import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const DEV = 'http://localhost:2003/api/v1'
const PROD = 'https://003b-197-210-84-111.eu.ngrok.io/api/v1'
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: PROD}),
    keepUnusedDataFor: 10,
    tagTypes: ['messages'],
    endpoints:(builder) => ({})
})