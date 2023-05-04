import React from "react";
import { Outlet } from "react-router-dom";
import UnauthedNavbar from "./navbar/UnauthedNavbar";
const Auth = () => {
  return (
    <React.Fragment>
      <UnauthedNavbar />
      <Outlet />
    </React.Fragment>
  );
};
export default Auth;
