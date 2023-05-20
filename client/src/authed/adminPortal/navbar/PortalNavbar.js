import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-id");
    window.location.reload(false);
  };

  const currPage = window.location.href.split("/")[3];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="navBar" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <h1 id="appName">FOOD GPT</h1>
          {currPage == "myfood" ? (
            <h4 className="currPage">
              <Link to="/myfood">MY FOOD</Link>
            </h4>
          ) : (
            <h4 className="links">
              <Link to="/myfood">MY FOOD</Link>
            </h4>
          )}
          {currPage == "myrecipes" ? (
            <h4 className="currPage">
              <Link to="/myrecipes">MY RECIPES</Link>
            </h4>
          ) : (
            <h4 className="links">
              <Link to="/myrecipes">MY RECIPES</Link>
            </h4>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AuthNavbar;
