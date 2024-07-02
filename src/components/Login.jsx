/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../Api/UserApi";

function LoginForm() {
  const [data] = useLoginUserMutation();
  const [form, setForm] = useState({
    //form data
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    //sets the form property based on whatever the user changes, in this case only email or password
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let info = await data(form);
    console.log(info.data);

    navigate("/users/me");

    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>

        <input type="text" id="username" name="email" onChange={login} />
      </div>

      <div>
        <label htmlFor="password">Password:</label>

        <input type="password" id="password" name="password" onChange={login} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
