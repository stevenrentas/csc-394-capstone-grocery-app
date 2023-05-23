import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import MyRecipesModal from "../../unauthed/user/modals/MyRecipesModal";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import MyFoodModal from "../../unauthed/user/modals/MyFoodModal";
import config from "../../api/api";
import axios from "axios";
import FoodTable from "../../unauthed/user/assets/FoodTable";
import AddDialog from "../../unauthed/user/modals/MyFoodModal";

const MyRecipes = () => {
  const { setShowModal } = useUser();
  const api = axios.create({
    baseURL: config,
  });
  const { recipes, setRecipes, food, setFood } = useUser();
  const handleEditClick = () => {};
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [confirmChange, setConfirmChange] = useState(false);
  recipes.map((item) => {
    item.missingIngredients = item.missing_ingredients.join(", ");
  });

  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "edit",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <div onClick={() => handleEditClick(params.row.id)}>
          <IconButton>
            <Edit sx={{ height: "20px" }} />
          </IconButton>
        </div>
      ),
    },
    {
      field: "missingIngredients",
      headerName: "Missing Ingredients",
      flex: 1,
    },
    {
      field: "date_added",
      headerName: "Date Added",
      width: 160,
    },
  ];

  useEffect(() => {
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
    setConfirmChange(false);
    fetchRecipes();
  }, [confirmChange]);

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  return (
    <div id="table">
      <div className="pageActionContainer">
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
          checkboxSelection
          sx={{ width: "1000px", background: "#f0f0f0", color: "#000000" }}
        />
      </Box>
      <MyRecipesModal
        addDialogOpen={addDialogOpen}
        setConfirmChange={setConfirmChange}
        onClose={handleAddClose}
      />
    </div>
  );
};

export default MyRecipes;
