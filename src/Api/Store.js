import { LibraryApi } from "./BookApi.js";
import { UserApi } from "./UserApi.js";
import UserApiSlice from "./UserApiSlice.js";
import LibrarySlice from "./BookApiSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [LibraryApi.reducerPath]: LibraryApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    LibrarySlice, UserApiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LibraryApi.middleware, UserApi.middleware),
});
