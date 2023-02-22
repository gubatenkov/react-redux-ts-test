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
      const idArr = state.articles.map((art) => art.id);
      action.payload.forEach((article) =>
        idArr.includes(article.id) ? null : state.articles.push(article)
      );
    },
    removeArticleById: (state, action: PayloadAction<number>) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
  },
});

export const newsReducer = newsSlice.reducer;
export const { loadNextPage, setArticlesToStore, removeArticleById } =
  newsSlice.actions;
