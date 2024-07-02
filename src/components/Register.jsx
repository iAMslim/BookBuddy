/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../Api/UserApi";
import { setToken } from "../Api/UserApiSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);
      if( response.data && response.data.token) {
        const token = response.data.token 
        localStorage.setItem("authToken", token)
        console.log("Registration successful. Token saved to local storage:",
         token)
         navigate("/users/Login")
      } else {
        console.error("Registration failed:invalid response or missing token");
      }
    } catch (error) {
        console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={firstname}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={lastname}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        {isError && <p>Error: {isError.message}</p>}
      </form>
    </div>
  );
};

export default Register