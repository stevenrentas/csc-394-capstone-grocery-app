import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import MyRecipesModal from "./modals/MyRecipesModal";
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

const MyRecipes = () => {
  const { setShowModal } = useUser();

  const handleEditClick = () => {};

  const columns = [
    { field: "name", headerName: "Name", width: 300 },
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
      width: 200,
    },
    {
      field: "dateAdded",
      headerName: "Date Added",
      width: 160,
    },
    {
      field: "favoriteLevel",
      headerName: "Favorite Level",
      width: 160,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Chicken Orzo Soup",
      missingIngredients: "0",
      dateAdded: "4/28/2023",
      favoriteLevel: "1",
    },
    {
      id: 2,
      name: "Chilaquiles",
      missingIngredients: "1",
      dateAdded: "4/21/2023",
      favoriteLevel: "2",
    },
    {
      id: 3,
      name: "Banana Nutella French Toast",
      missingIngredients: "3",
      dateAdded: "3/14/2023",
      favoriteLevel: "3",
    },
    {
      id: 4,
      name: "Stuffed Portabella w/ Quinoa",
      missingIngredients: "4",
      dateAdded: "4/28/2023",
      favoriteLevel: "3",
    },
  ];

  return (
    <div id="table">
      <div class="pageActionContainer">
        <button id="pageActionRecipe" onClick={(e) => setShowModal(true)}>
          Generate Recipe
        </button>
      </div>
      <Box sx={{ height: 655, width: "100%", pt: 3 }}>
        <DataGrid
          rows={rows}
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
      <MyRecipesModal />
    </div>
  );
};

export default MyRecipes;
