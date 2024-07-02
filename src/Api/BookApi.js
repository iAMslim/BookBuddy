import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LibraryApi = createApi({
  reducerPath: "LibraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
    }),
    getSingleBook: builder.query({
      query: (id) => "books/" + id,
    }),
    updateBook: builder.mutation({
      query: ({ bookId, token, body }) => ({
        url: `books/${bookId}`,
        method: "PATCH",
        body: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} = LibraryApi;
