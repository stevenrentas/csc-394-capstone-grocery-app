import React from "react";
import config from "../../../api/api";
import axios from "axios";
import { useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import IngredientPicker from "../assets/IngredientPicker";
import { DialogTitle, Dialog } from "@mui/material";

const MyRecipesModal = (props) => {
  const api = axios.create({
    baseURL: config,
  });
  const { addDialogOpen, onClose } = props;
  const { food, setFood, columns } = useUser();

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
  }, [addDialogOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={addDialogOpen} maxWidth="xl">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        GENERATE RECIPE
      </DialogTitle>
      <IngredientPicker onClose={handleClose} food={food} columns={columns} />
    </Dialog>
  );
};
export default MyRecipesModal;
