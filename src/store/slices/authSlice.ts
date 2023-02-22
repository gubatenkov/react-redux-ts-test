import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

const initialState: { user: User | null; lang: "eng" | "ua" } = {
  user: null,
  lang: "eng",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLangToStore: (state, action: PayloadAction<"eng" | "ua">) => {
      state.lang = action.payload;
    },
    setUserToStore: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUserFromStore: (state) => {
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setLangToStore, setUserToStore, removeUserFromStore } =
  authSlice.actions;
