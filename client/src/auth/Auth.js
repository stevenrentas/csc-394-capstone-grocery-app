import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "./navbar/AuthNavbar";
const Auth = () => {
  return (
    <React.Fragment>
      <AuthNavbar />
      <Outlet />
    </React.Fragment>
  );
};
export default Auth;
