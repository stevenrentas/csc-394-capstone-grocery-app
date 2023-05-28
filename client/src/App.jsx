import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import PortalNavbar from "./authed/adminPortal/navbar/PortalNavbar";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SnackbarContext from "./contexts/SnackbarContext";
import { useLocation } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import config from "./api/api";
import axios from "axios";
import { useUser } from "./contexts/UserContext";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const { toggleSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedin, setIsAdminLoggedIn] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const api = axios.create({
    baseURL: config,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  const checkUserToken = () => {
    const adminPortalPage =
      window.location.href.split("/")[3] +
      "/" +
      window.location.href.split("/")[4];
    const userToken = localStorage.getItem("user-token");
    const adminToken = localStorage.getItem("admin-token");
    if (
      (!adminToken || adminToken === "undefined") &&
      adminPortalPage === "admin/portal"
    ) {
      setIsAdminLoggedIn(false);
      window.location.href = "/admin";
    } else if (adminToken === "isAuthed") {
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

  const { snackbarOpen, snackbarData, removeSnackbarData } =
    useContext(SnackbarContext);

  const [missingIngredients, setMissingIngredients] = React.useState({
    recipe1: 0,
    recipe2: 0,
    recipe3: 0,
  });

  const calculateMissingIngredients = (snackbarData) => {
    // snackbarData[0].map
  };

  useEffect(() => {
    calculateMissingIngredients(snackbarData);
    console.log(snackbarData);
    console.log(snackbarData.length);
    if (snackbarData[0] !== undefined) {
      console.log(snackbarData[0]);
      console.log(snackbarData[0].length);
    }
  }, [snackbarData]);

  const [dots, setDots] = useState(".");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === ".") {
          return "..";
        } else if (prevDots === "..") {
          return "...";
        } else {
          return ".";
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const userID = localStorage.getItem("user-id");
  const { setRecipes } = useUser();

  const handleAddRecipes = async () => {
    const checkedRecipes = Object.keys(checkedItems).filter(
      (item) => checkedItems[item]
    );
    for (const recipe of checkedRecipes) {
      let recipeId;
      if (recipe === "recipe1") {
        recipeId = 0;
      } else if (recipe === "recipe2") {
        recipeId = 1;
      } else if (recipe === "recipe3") {
        recipeId = 2;
      }
      try {
        const recipeData = {
          user_id: userID,
          title: snackbarData[0][recipeId].title,
          ingredients: snackbarData[0][recipeId].ingredients,
          instructions: snackbarData[0][recipeId].instructions,
          date_added: new Date().toLocaleDateString("en-US"),
          missing_ingredients: ["Broccoli", "Carrot"],
        };

        await api.post("/addrecipe", recipeData);
        console.log("Recipe added successfully!");
      } catch (error) {
        console.error(error);
      }
    }
    toggleSnackbar();
    async function fetchRecipes() {
      const userID = localStorage.getItem("user-id");
      const allRecipes = await api
        .get(`/getrecipes?userID=${userID}`)
        .then((resp) => {
          return resp.data.recipes;
        })
        .catch((error) => {
          console.error(error);
        });
      setRecipes(allRecipes);
    }
    fetchRecipes();
    removeSnackbarData();
  };

  useEffect(() => {
    handleRetrieveCheckedItems();
  }, [checkedItems]);

  const handleRetrieveCheckedItems = () => {
    Object.keys(checkedItems).filter((item) => checkedItems[item]);
  };

  const handleClick = () => {
    toggleSnackbar();
    removeSnackbarData();
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        {(isLoggedIn || isAdminLoggedin) && <PortalNavbar />}
        <Outlet />
        <Snackbar open={snackbarOpen}>
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              width: "425px",
              height: "300px",
            }}
          >
            {snackbarData.length[0] !== 3 ||
              (snackbarData.length !== 0 && (
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClick}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ))}
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              <Typography sx={{ fontWeight: 700, mt: "20px" }}>
                ChatGPT Response
              </Typography>
            </Stack>
            {snackbarData.length === 0 ? (
              <Stack
                direction="row"
                sx={{ justifyContent: "center", mt: "60px" }}
              >
                <Typography>Loading response</Typography>
                <Typography sx={{ width: "5px" }}>{dots}</Typography>
              </Stack>
            ) : snackbarData[0].length === 3 ? (
              <Box sx={{ ml: 3, mt: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="recipe1"
                        checked={checkedItems.recipe1 || false}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <Stack>
                        <Typography>{snackbarData[0][0].title}</Typography>
                        <Typography>
                          {/* Missing ingredients: {missingIngredients.recipe1} */}
                        </Typography>
                      </Stack>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="recipe2"
                        checked={checkedItems.recipe2 || false}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <Stack>
                        <Typography>{snackbarData[0][1].title}</Typography>
                        <Typography>
                          {/* Missing ingredients: {missingIngredients.recipe2} */}
                        </Typography>
                      </Stack>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="recipe3"
                        checked={checkedItems.recipe3 || false}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <Stack>
                        <Typography>{snackbarData[0][2].title}</Typography>
                        <Typography>
                          {/* Missing ingredients: {missingIngredients.recipe3} */}
                        </Typography>
                      </Stack>
                    } //snackbarData[0][2].title
                  />
                </FormGroup>
                <Box sx={{ mr: 2 }}>
                  <div className="pageActionContainer">
                    <button id="pageActionRecipe" onClick={handleAddRecipes}>
                      Confirm Recipes
                    </button>
                  </div>
                </Box>
              </Box>
            ) : (
              <Stack
                direction="column"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "60px",
                }}
              >
                <Typography>There was a ChatGPT response error!</Typography>
                <Typography>Please try again!</Typography>
              </Stack>
            )}
          </Card>
        </Snackbar>
      </React.Fragment>
    </ThemeProvider>
  );
}
export default App;
