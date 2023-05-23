import React from "react";
import config from "../../../api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ModalBody,
  ModalDialog,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useUser } from "../../../contexts/UserContext";
import IngredientPicker from "../assets/IngredientPicker";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  DialogTitle,
  Dialog,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import FoodTable from "../../user/assets/FoodTable";

const MyRecipesModal = (props) => {
  const { addDialogOpen, setConfirmChange, onClose } = props;
  const api = axios.create({
    baseURL: config,
  });
  const { showModal, setShowModal, food, setFood, columns } = useUser();

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
