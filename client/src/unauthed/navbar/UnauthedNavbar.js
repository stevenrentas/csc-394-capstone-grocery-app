import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "../../styles/style.css";

const AuthNavbar = () => {
  const currPage = window.location.href.split("/")[3];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="navBar" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <h1 id="appName">FOOD GPT</h1>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AuthNavbar;
