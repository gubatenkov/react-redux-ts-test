import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface QueryResponse<T> {
  status: string;
  articles: T;
  totalResults: number;
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/everything/",
    fetchFn: ({ url }: any) => {
      const request = new Request(`${proxyUrl}${url}`);
      return fetch(request);
    },
  }),
  endpoints: (builder) => ({
    fetchNews: builder.query<QueryResponse<Article[]>, number>({
      query: (pageNum = 1) => ({
        url: `?q=bitcoin&page=${pageNum}&pageSize=10&apiKey=${
          import.meta.env.VITE_APP_NEWS_API_KEY
        }`,
      }),
    }),
  }),
});

export const { useLazyFetchNewsQuery } = newsApi;
