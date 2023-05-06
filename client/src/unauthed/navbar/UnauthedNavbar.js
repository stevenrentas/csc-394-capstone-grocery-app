import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../../styles/style.css";

const AuthNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" id="navBar" elevation={0}>
        <Toolbar>
          <h2 id="appName">FOOD GPT</h2>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AuthNavbar;
