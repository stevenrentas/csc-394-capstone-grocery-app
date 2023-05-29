import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../api/api";

const Login = () => {
  const axios = require("axios");
  const api = axios.create({
    baseURL: config,
  });
  const navigate = useNavigate();
  const submitLoginForm = async () => {
    api
      .post("/users", {
        username: credentials.username,
        pword: credentials.password,
      })
      .then((response) => {
        if (response.data.isadmin !== true) {
          setError({
            message: "User does not have required access",
          });
          return;
        } else {
          localStorage.clear();
          localStorage.setItem("admin-token", response.data.token);
          localStorage.setItem("user-id", response.data.uid);
          setTimeout(() => {
            navigate("/admin/portal");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    message: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <div id="login">
      <p className="adminLoginTitle">Admin Login</p>
      {error.message && <p className="err">{error.message}</p>}
      <input
        placeholder="Username"
        id="credBox"
        name="username"
        onChange={onInputChange}
      ></input>
      <input
        placeholder="Password"
        id="credBox"
        type="password"
        name="password"
        onChange={onInputChange}
      ></input>
      <button id="authenticate" onClick={submitLoginForm}>
        LOG IN
      </button>
    </div>
  );
};

export default Login;
