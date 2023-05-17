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
import React from "react";
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
        username: username,
        pword: password,
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 5 }}>
        <Typography>
          Welcome to our grocery list app! Please enter your credentials below.
        </Typography>
        <Stack>
          <TextField
            id="username"
            color="primary"
            label="Username"
            variant="filled"
            sx={{
              mt: 2,
              maxWidth: "200px",
              color: theme.palette.secondary,
              backgroundColor: "#fffff0",
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl
            sx={{ m: 1, maxWidth: "200px", ml: 0, backgroundColor: "#fffff0" }}
            variant="filled"
          >
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              onChange={(e) => setPassword(e.target.value)}
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
        <Button
          sx={{ mt: 2, backgroundColor: "#698669" }}
          variant="contained"
          onClick={submitLoginForm}
        >
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
