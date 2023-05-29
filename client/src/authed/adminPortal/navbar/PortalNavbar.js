import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  const currPage = window.location.href.split("/")[3];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="navBar" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <h1 id="appName">FOOD GPT</h1>
          {currPage !== "admin" &&
            (currPage === "myfood" ? (
              <h4 className="currPage">
                <Link to="/myfood">MY FOOD</Link>
              </h4>
            ) : (
              <h4 className="links">
                <Link to="/myfood">MY FOOD</Link>
              </h4>
            ))}
          {currPage !== "admin" &&
            (currPage === "myrecipes" ? (
              <h4 className="currPage">
                <Link to="/myrecipes">MY RECIPES</Link>
              </h4>
            ) : (
              <h4 className="links">
                <Link to="/myrecipes">MY RECIPES</Link>
              </h4>
            ))}
            {currPage !== "admin" &&
            (currPage == "profile" ? (
              <h4 className="currPage">
                <Link to="/profile">PROFILE</Link>
              </h4>
            ) : (
              <h4 className="links">
                <Link to="/profile">PROFILE</Link>
              </h4>
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AuthNavbar;
