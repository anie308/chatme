import { apiSlice } from "../../apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({userId, ...rest}) => ({
        url: `/user/update/${userId}`,
        method: "PUT",
        rest,
    }),
  }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    getAllUsers : builder.query({
      query: (token) => `/user/${token}`,
   }),
    getSingleUser : builder.query({
      query: (userId) => `/user/single/${userId}`,
   }),
   addMessage: builder.mutation({
    query: (body) => ({
      url: "/message/add",
      method: "POST",
      body,

    }),
    invalidatesTags: ['messages']
  }),

  getMessages: builder.query({
    query: (body) => ({
      url: "/message/getmsgs",
      method: "POST",
      body,
    }),
    providesTags: ['messages']
    
  })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetAllUsersQuery, useGetSingleUserQuery, useAddMessageMutation ,useGetMessagesQuery, useUpdateUserMutation } = clientApi;
