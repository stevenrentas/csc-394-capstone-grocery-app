import React, { useState, useEffect, useContext } from "react";
import { useUser } from "../../contexts/UserContext";
import MyRecipesModal from "../../unauthed/user/modals/MyRecipesModal";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import config from "../../api/api";
import axios from "axios";
import ViewRecipes from "../../unauthed/user/modals/ViewRecipes";
import SnackbarContext from "../../contexts/SnackbarContext";

const MyRecipes = () => {
  const api = axios.create({
    baseURL: config,
  });
  const [selectedRecipe, setSelectedRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: [],
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [toggleCompleteRecipes, setToggleCompleteRecipes] = useState(false);
  const [deleteUsed, setDeleteUsed] = useState(false);
  const { food, recipes, setRecipes } = useUser();
  const userID = localStorage.getItem("user-id");
  recipes.map((item) => {
    item.missingIngredients = item.missing_ingredients.join(", ");
  });
  const { snackbarOpen } = useContext(SnackbarContext);

  const deleteRecipe = (id) => {
    api
      .delete(`/deleterecipe/${userID}/${id}`)
      .then()
      .catch((error) => console.error(error));
    setDeleteUsed(!deleteUsed);
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setViewDialogOpen(true);
  };

  const noMissingIngredients = () => {
    setToggleCompleteRecipes(!toggleCompleteRecipes);
  };

  const handleMissingIngredients = (ingredients) => {
    if (ingredients !== undefined) {
      let missingIngredients = "";
      ingredients.forEach((ingredient) => {
        if (!food.some((item) => item.description === ingredient.name)) {
          if (missingIngredients !== "") {
            missingIngredients += ", ";
          }
          missingIngredients += ingredient.name;
        }
      });
      return missingIngredients;
    }
    return "";
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: (params) => (
        <div
          className="viewRecipe"
          onClick={() => handleViewRecipe(params.row)}
        >
          {params.row.title}
        </div>
      ),
      width: 350,
    },
    {
      field: "missingaIngredients",
      headerName: "Missing Ingredients",
      flex: 1,
      renderCell: (params) => {
        return handleMissingIngredients(params.row.ingredients);
      },
    },
    {
      field: "date_added",
      headerName: "Date Added",
      width: 160,
    },
    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <div onClick={() => deleteRecipe(params.row.id)}>
          <IconButton>
            <Delete sx={{ height: "20px" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function fetchRecipes() {
      const userID = localStorage.getItem("user-id");
      const allRecipes = await api
        .get(
          `/getrecipes?userID=${userID}&onlyComplete=${toggleCompleteRecipes}`
        )
        .then((resp) => {
          return resp.data.recipes;
        })
        .catch((error) => {
          console.error(error);
        });
      setRecipes(allRecipes);
    }
    fetchRecipes();
  }, [deleteUsed, snackbarOpen, toggleCompleteRecipes]);

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  const handleViewClose = () => {
    setSelectedRecipe({
      title: "",
      ingredients: [],
      instructions: [],
    });
    setViewDialogOpen(false);
  };

  return (
    <div id="table">
      <div className="pageActionContainer">
        <button
          id="pageActionRecipe"
          className="filterRecipes"
          onClick={noMissingIngredients}
        >
          {toggleCompleteRecipes ? "Show All Recipes" : "Show Complete Recipes"}
        </button>
        <button id="pageActionRecipe" onClick={(e) => setAddDialogOpen(true)}>
          Generate Recipe
        </button>
      </div>
      <Box sx={{ height: 655, width: "100%", pt: 3 }}>
        <DataGrid
          rows={recipes}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          sx={{ width: "1000px", background: "#f0f0f0", color: "#000000" }}
        />
      </Box>
      <MyRecipesModal addDialogOpen={addDialogOpen} onClose={handleAddClose} />
      <ViewRecipes
        recipe={selectedRecipe}
        isDialogOpen={viewDialogOpen}
        onClose={handleViewClose}
      />
    </div>
  );
};

export default MyRecipes;
