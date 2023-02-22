import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../api/newsApi";

const initialState: {
  page: number;
  articles: Article[];
} = {
  page: 1,
  articles: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    loadNextPage: (state) => {
      ++state.page;
    },
    setArticlesToStore: (state, action: PayloadAction<Article[]>) => {
      const titles = state.articles.map((art) => art.title);
      action.payload.forEach((article) =>
        titles.includes(article.title) ? null : state.articles.push(article)
      );
    },
    removeArticleByTitle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(
        (article) => article.title !== action.payload
      );
    },
  },
});

export const newsReducer = newsSlice.reducer;
export const { loadNextPage, setArticlesToStore, removeArticleByTitle } =
  newsSlice.actions;
