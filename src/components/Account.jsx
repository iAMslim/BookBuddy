import React, { useEffect, useCallback } from "react";
import { useGetMeQuery, useDeleteReservationsMutation } from "../Api/UserApi";
import { useDispatch } from "react-redux";
import { setToken } from "../Api/UserApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AccountDetails = () => {
  const dispatch = useDispatch();
  const { users, token } = useSelector((state) => state.UserApiSlice);
  const [returnBook] = useDeleteReservationsMutation()
  console.log("hello", users);

  // Retrieve token from localStorage
  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);
  console.log(getToken)

  const GetMe = useGetMeQuery(token);
  const navigate = useNavigate();

  useEffect(() => {
    //runs at page load, redirects if user is not logged in, cannot call navigate directly so have to use effect
    const redirect = () => {
      navigate("/users/login");
    };

    !token && redirect(); //same as if(!token) redirect();
  }, []);

  const logout = () => {
    dispatch(setToken(null));
    console.log({ token });
    navigate("/Books");
  };

  const bookReturn = async (e) => {
    let parameters = {
      id: e.target.id,
      token: token,
      body: {available: true}
    }
    let info = await returnBook (parameters)
    console.log( `test`,info)
  }

  return (
    users && (
      <div>
        <h1>
          Welcome, {users.firstname} {users.lastname}!
        </h1>
        <h2>Account Info</h2>
        <p>Email: {users.email}</p>
        <p>Books Checked Out: {users.books} 
        <button id={AccountDetails.books} onClick={ bookReturn }>Return</button></p>
        <button onClick={logout}> Logout </button>
      </div>
    )
  );
};

export default AccountDetails;
