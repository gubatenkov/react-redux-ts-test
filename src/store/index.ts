import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userApi } from "./api/userApi";
import { newsApi } from "./api/newsApi";

import { authReducer } from "./slices/authSlice";
import { newsReducer } from "./slices/newsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    auth: authReducer,
    news: newsReducer,
  })
);

const middleware = [userApi.middleware, newsApi.middleware];

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
