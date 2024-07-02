/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { useGetSingleBookQuery } from "../Api/BookApi";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { books, book } = useSelector((state) => state.LibrarySlice);
  console.log("hello", books);

  let data = [];
  if (!books.length) {
    useGetSingleBookQuery(id);
    data.push(book);
  } else {
    data = books.filter((books) => books.id === Number(id));
    //only searching for book with matching id
  }

  return data[0] ? (
    <div className="book-details">
      <div className="book-card">
        <img
          onClick={() => navigate(`/books`)}
          src={data[0].coverimage}
          alt={data[0].title}
          className="book-image"
        />
        <div className="book-details">
          <h2>Author: {data[0].author}</h2>
          <p>Title: {data[0].title}</p>
          <p>Description: {data[0].description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SingleBook;

// const [bookData, setBookData] = useState([]);
// const { data = {}, isLoading, isError } = useGetSingleBookQuery(params.id);
// console.log(data)
// useEffect(() => {
//   if (data?.id) {
//     setBookData(data.data.book);
//   }
// }, [data]);
