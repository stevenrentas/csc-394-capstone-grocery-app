import React, { useState } from "react";
import config from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";

const UserLogin = () => {
  const api = axios.create({
    baseURL: config,
  });
  const navigate = useNavigate();

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

  async function processLogin() {
    const db_columns = {
      username: credentials.username,
      pword: credentials.password,
    };

    await api
      .post("/users", db_columns)
      .then(function (response) {
        if (response.data.isadmin === true) {
          setError({
            message: "User does not have required access",
          });
        } else {
          navigatePage(response);
        }
      })
      .catch(function (error) {
        console.log(error);
        setError({ message: "Invalid username or password" });
      });
  }

  const navigatePage = (response) => {
    if (response.statusText === "OK") {
      localStorage.clear();
      localStorage.setItem("user-token", response.data.token);
      localStorage.setItem("user-id", response.data.uid);
      navigate("/myfood");
    } else {
      setError({ message: "Invalid username or password" });
    }
  };

  const navigateSignup = () => {
    navigate("/signup");
  };

  return (
    <div id="login">
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
      <button id="authenticate" onClick={processLogin}>
        LOG IN
      </button>
      <p id="otherAuthPage">
        <a id="signupLink" onClick={navigateSignup}>
          Create an account
        </a>
      </p>
    </div>
  );
};

export default UserLogin;
