import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./userSlice/searchSlice";
import userSlice from "./userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    searchUsers: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
