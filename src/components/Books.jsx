/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React from "react";
import { createAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateBookMutation } from "../Api/BookApi";
import { useGetMeQuery } from "../Api/UserApi";

const Books = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.LibrarySlice);
  const { data: usersData } = useGetMeQuery();
  const { token } = useSelector((state) => state.UserApiSlice);
  const [updateBook] = useUpdateBookMutation();
  const bookReservation = async (e) => {
    let parameters = {
      id: e.target.id,
      token: token,
      body: { available: false },
    };
    let info = await updateBook(parameters);
    console.log(`test`, info);
  };

  return (
    <div className="books">
      <input
        type="number"
        placeholder="Search by book id"
        // value={searchQuery}
        // onChange={handleSearchChange}
      />
      {books.map((books) => (
        <div key={books.id} className="book-card">
          <img
            onClick={() => navigate(`/books/${books.id}`)}
            src={books.coverimage}
            alt={books.title}
            className="books-image"
          />
          <div className="books-details">
            <h2> {books.title} </h2>
            <h3> {books.author} </h3>
            <p> {books.description} </p>
            <p>{books ? "Available" : "Checked Out"} </p>
            {books && (
              <button id={books.id} onClick={bookReservation}>
                Checkout
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Books;
export const setSearchQuery = createAction("search/setQuery");
export const clearSearchQuery = createAction("search/clearQuery");

// const { data = {}, error, isLoading } = useGetBooksQuery();
// const [booksData, setbooksData] = useState([]);
// const [searchQuery, setSearchQuery] = useState("");

// useEffect(() => {
//   if (data?.data?.id) {
//     // Filter books based on the search query
//     const filteredBooks = data.data.id.filter((books) =>
//       books.id.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setbooksData(filteredBooks);
//   }
// }, [data, searchQuery]);

// const handleSearchChange = (e) => {
//   setSearchQuery(e.target.value);
// };

// if (error) {
//   return <div>Error: Can't Fetch Books - {error.message}</div>;
// }
