import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
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
    } else if (adminToken == "isAuthed") {
      setIsAdminLoggedIn(true);
    } else if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, isAdminLoggedin]);
  return (
    <React.Fragment>
      {isLoggedIn || isAdminLoggedin ? props.children : null}
    </React.Fragment>
  );
};
export default ProtectedRoute;
