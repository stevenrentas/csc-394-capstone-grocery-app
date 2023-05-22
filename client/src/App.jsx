import React, { useEffect, useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import PortalNavbar from "./authed/adminPortal/navbar/PortalNavbar";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarContext from "./contexts/SnackbarContext";
import { useLocation } from "react-router-dom";

function App() {
  const { toggleSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedin, setIsAdminLoggedIn] = useState(false);

  const checkUserToken = () => {
    const adminPortalPage =
      window.location.href.split("/")[3] +
      "/" +
      window.location.href.split("/")[4];
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
      if (
        (adminPortalPage !== "admin/portal" ||
          window.location.href.split("/")[3] !== "admin") &&
        window.location.href.split("/")[3] !== "login"
      ) {
        navigate("/admin/portal");
        setIsLoggedIn(false);
      }
    } else if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      window.location.href = "/login";
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, isAdminLoggedin, location]);

  useEffect(() => {
    checkUserToken();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#698669",
      },
    },
  });

  const handleClick = () => {
    toggleSnackbar();
  };

  const { snackbarOpen } = useContext(SnackbarContext);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        {(isLoggedIn || isAdminLoggedin) && <PortalNavbar />}
        <Outlet />
        <Snackbar open={snackbarOpen}>
          <Card
            sx={{
              backgroundColor: "rgb(217, 217, 217)",
              width: "500px",
              height: "200px",
            }}
          >
            <Stack direction="row" sx={{ justifyContent: "center", mt: 2 }}>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClick}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ mt: "3px" }}>ChatGPT Response</Typography>
            </Stack>
          </Card>
        </Snackbar>
      </React.Fragment>
    </ThemeProvider>
  );
}
export default App;
