import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PortalNavbar from "./authed/adminPortal/navbar/PortalNavbar";
import Login from "./unauthed/user/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedin, setIsAdminLoggedIn] = useState(false);
  const checkUserToken = () => {
    const adminPortalPage =
      window.location.href.split("/")[3] +
      "/" +
      window.location.href.split("/")[4];
    console.log(adminPortalPage);

    const userToken = localStorage.getItem("user-token");
    const adminToken = localStorage.getItem("admin-token");
    if (
      (!adminToken || adminToken === "undefined") &&
      adminPortalPage == "admin/portal"
    ) {
      setIsAdminLoggedIn(false);
      window.location.href = "/admin";
    } else if (adminToken == "isAuthed") {
      setIsAdminLoggedIn(true);
    } else if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      window.location.href = "/login";
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, isAdminLoggedin]);
  return (
    <React.Fragment>
      {(isLoggedIn || isAdminLoggedin) && <PortalNavbar />}
      <Outlet />
    </React.Fragment>
  );
}
export default App;
