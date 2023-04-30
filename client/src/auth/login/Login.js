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

const Login = () => {
  const baseURL = "http://localhost:3001/api/v1/users";
  const axios = require("axios");
  const loginAPI = "/auth/api/v1/users";
  const navigate = useNavigate();
  const submitLoginForm = async () => {
    axios
      .post(baseURL, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.isAuthed) {
          alert("Unable to login. Please try after some time.");
          return;
        }
        localStorage.clear();
        localStorage.setItem("user-token", response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ m: 5 }}>
      <Typography>
        Welcome to our grocery list app! Please enter your credentials below.
      </Typography>
      <Stack>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormControl sx={{ maxWidth: "200px", mt: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={(e) => setPassword(e.target.value)}
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
            label="Password"
          />
        </FormControl>
      </Stack>
      <Button sx={{ mt: 2 }} variant="contained" onClick={submitLoginForm}>
        Submit
      </Button>
    </Box>
  );
};

export default Login;
