import {
  Typography,
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../api/api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FilledInput from "@mui/material/FilledInput";

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
        if (!response.data.isAuthed) {
          alert("Unable to login. Please try after some time.");
          return;
        }
        localStorage.setItem("admin-token", response.data.token);
        setTimeout(() => {
          navigate("/admin/portal");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#698669",
        hover: "#283593", // Custom hover color for the primary button
      },
      secondary: {
        main: "#fffff0",
        hover: "#283593", // Custom hover color for the primary button
      },
    },
  });

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /* New */
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
        navigate("/admin/portal");
      })
      .catch(function (error) {
        console.log(error);
        setError({ message: "Invalid username or password" });
      });
  }

  return (
    <div id="login">
      <p class="adminLoginTitle">Admin Login</p>
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
      <p id="otherAuthPage">
        <a id="otherAuthPage" href={"/signup"}>
          Create an account
        </a>
      </p>
    </div>
  );
};

export default Login;
