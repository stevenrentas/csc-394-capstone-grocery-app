import React, { useState } from "react";
import MyFoodModal from "../../unauthed/user/modals/MyFoodModal";
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
  const [confirmChange, setConfirmChange] = useState(false);
  const { food, setFood, columns } = useUser();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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
    setConfirmChange(false);
    fetchInventory();
  }, [confirmChange]);

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setAddDialogOpen(true);
  };

  return (
    <div id="table">
      <div className="pageActionContainer">
        <button id="pageAction" onClick={handleOpenDialog}>
          Add +
        </button>
      </div>
      <Box sx={{ pt: 3 }}>
        <FoodTable food={food} columns={columns} />
      </Box>
      <AddDialog
        addDialogOpen={addDialogOpen}
        setConfirmChange={setConfirmChange}
        onClose={handleAddClose}
      />
    </div>
  );
};

export default MyFood;
