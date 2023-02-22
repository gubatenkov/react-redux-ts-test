import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Article {
  id: number;
  body: string;
  title: string;
  userId: number;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    fetchNews: builder.query<Article[], number>({
      query: () => ({
        url: "posts/",
      }),
    }),
  }),
});

export const { useLazyFetchNewsQuery } = newsApi;
