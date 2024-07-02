import { useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import bookLogo from "./assets/books.png";
import LoginForm from "./components/Login";
import Navbar from "./components/Navigations";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import AccountDetails from "./components/Account";
import { useGetBooksQuery } from "./Api/BookApi";
import { setToken } from "./Api/UserApiSlice";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(null);

  const { isLoading } = useGetBooksQuery();

  return !isLoading ? (
    <div>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path={"/books/:id"} element={<SingleBook />} />
          <Route path="/users/me" element={<AccountDetails />} />{" "}
          <Route path="/users/login" element={<LoginForm />} />
          <Route path="/users/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      {/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
