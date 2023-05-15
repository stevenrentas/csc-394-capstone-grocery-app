import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PortalNavbar from "./authed/adminPortal/navbar/PortalNavbar";
import Login from "./unauthed/user/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn && <PortalNavbar />}
      <Outlet />
    </React.Fragment>
  );
}
export default App;
