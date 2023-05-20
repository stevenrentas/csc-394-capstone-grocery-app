import React, { useState } from "react";
import config from "../../api/api";
import axios from "axios";
import "../../styles/style.css";

const SignUp = () => {
  const api = axios.create({
    baseURL: config,
  });

  const [credentials, setCredentials] = useState({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    username: "",
  });

  const [error, setError] = useState({
    emailAddress: "",
    confirmPassword: "",
    username: "",
    exist: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const validateCredentials = () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError({ confirmPassword: "Passwords do not match." });
      return false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        credentials.emailAddress
      )
    ) {
      setError({ emailAddress: "Enter a valid email address." });
      return false;
    } else if (credentials.password === "") {
      setError({ password: "Enter a valid password" });
      return false;
    }
    setError({ password: "" });
    setError({ confirmPassword: "" });
    setError({ emailAddress: "" });

    return true;
  };

  async function createAccount() {
    if (validateCredentials()) {
      const db_columns = {
        username: credentials.username,
        first_name: credentials.firstname,
        last_name: credentials.lastname,
        email: credentials.emailAddress,
        pword: credentials.password,
      };

      await api
        .post("/adduser", db_columns)
        .then(function (response) {
          navigatePage(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const navigatePage = (response) => {
    if (response.statusText === "OK") {
      window.location = "/login";
    } else {
      setError({ exist: "Username or email already exist" });
    }
  };

  return (
    <div id="login">
      <input
        placeholder="First Name"
        id="credBox"
        name="firstname"
        onChange={onInputChange}
      ></input>
      <input
        placeholder="Last Name"
        id="credBox"
        name="lastname"
        onChange={onInputChange}
      ></input>
      {error.exist && <p className="err">{error.exist}</p>}
      <input
        placeholder="Username"
        id="credBox"
        name="username"
        onChange={onInputChange}
      ></input>
      <input
        placeholder="Email Address"
        id="credBox"
        name="emailAddress"
        onChange={onInputChange}
      ></input>
      {error.emailAddress && <p className="err">{error.emailAddress}</p>}
      <input
        placeholder="Password"
        id="credBox"
        type="password"
        name="password"
        onChange={onInputChange}
      ></input>
      {error.password && <p className="err">{error.password}</p>}
      <input
        placeholder="Verify Password"
        id="credBox"
        type="password"
        name="confirmPassword"
        onChange={onInputChange}
      ></input>
      {error.confirmPassword && <p className="err">{error.confirmPassword}</p>}
      <button id="authenticate" onClick={createAccount}>
        CREATE ACCOUNT
      </button>
      <p id="otherAuthPage">
        <a id="otherAuthPage" href={"/login"}>
          Already a member?
        </a>
      </p>
    </div>
  );
};

export default SignUp;
