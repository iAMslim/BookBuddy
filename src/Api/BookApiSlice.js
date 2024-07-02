import { createSlice } from "@reduxjs/toolkit";
import { LibraryApi } from "./BookApi";

const LibrarySlice = createSlice({
  name: "LibrarySlice",
  initialState: {
    books: [],
    searchQuery: "",
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      LibraryApi.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        state.books = payload.books;
        return state;
      }
    );
  },
});
export default LibrarySlice.reducer;
export const selectSearchQuery = (state) => state.Library.searchQuery;
