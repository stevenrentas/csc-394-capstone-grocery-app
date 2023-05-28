import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import config from "../../api/api";
import axios from "axios";
import FoodTable from "../../unauthed/user/assets/FoodTable";
import AddDialog from "../../unauthed/user/modals/MyFoodModal";
import { Box } from "@mui/material";

const MyFood = () => {
  const api = axios.create({
    baseURL: config,
  });
  const { food, setFood, columns } = useUser();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteUsed, setDeleteUsed] = useState(false);

  useEffect(() => {
    async function fetchInventory() {
      const userID = localStorage.getItem("user-id");
      const allFood = await api
        .get(`/getfood?userID=${userID}`)
        .then((resp) => {
          return resp.data.food;
        })
        .catch((error) => {
          console.error(error);
        });
      setFood(allFood);
    }
    fetchInventory();
  }, [addDialogOpen, deleteUsed]);

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setAddDialogOpen(true);
  };

  return (
    <div id="table">
      <div className="pageActionContainer">
        <button id="pageActionWider" onClick={handleOpenDialog}>
          Add Food
        </button>
      </div>
      <Box sx={{ pt: 3 }}>
        <FoodTable
          food={food}
          columns={columns}
          setDeleteUsed={setDeleteUsed}
          deleteUsed={deleteUsed}
        />
      </Box>
      <AddDialog addDialogOpen={addDialogOpen} onClose={handleAddClose} />
    </div>
  );
};

export default MyFood;
