import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "../../styles/style.css";

const AuthNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" id="navBar" elevation={0}>
        <Toolbar>
          <h1 id="appName">FOOD GPT</h1>
          <h4 className="links"><a href="/myfood">MY FOOD</a></h4>
          <h4 className="links"><a href="/myrecipes">MY RECIPES</a></h4>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AuthNavbar;
