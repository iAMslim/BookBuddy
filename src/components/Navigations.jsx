/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Books">Home</Link>
        </li>
        <li>
          <Link to="/users/login">Login</Link>
        </li>
        <li>
          <Link to="/users/me">My Account</Link>
        </li>
        <li>
          <Link to="/users/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;