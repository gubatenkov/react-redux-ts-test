import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../slices/authSlice";

interface UserCredentials {
  username: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, UserCredentials>({
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApi;
