import React, { useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import config from "../../../api/api";
import axios from "axios";
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

const MyFoodModal = (props) => {
  const { addDialogOpen, setConfirmChange, onClose } = props;
  const api = axios.create({
    baseURL: config,
  });
  const userID = localStorage.getItem("user-id");

  const [foodToAdd, setFoodToAdd] = useState({
    name: "",
    amount: "",
    dateAdded: "",
    expiryDate: "",
  });

  const onInputChange = (e) => {
    var { name, value } = e.target;

    if (name === "unit") {
      const amount =
        foodToAdd.amount.indexOf("/") > -1
          ? foodToAdd.amount.substring(0, foodToAdd.amount.indexOf("/"))
          : foodToAdd.amount;
      setFoodToAdd({
        ...foodToAdd,
        amount: amount + "/" + value,
        dateAdded: new Date().toLocaleDateString("en-US"),
      });
    } else {
      setFoodToAdd({
        ...foodToAdd,
        [name]: value,
        dateAdded: new Date().toLocaleDateString("en-US"),
      });
    }
  };

  const addFood = async () => {
    let db_columns = { ...foodToAdd };
    if (db_columns.amount.split("/" === 0)) {
      db_columns.amount = db_columns.amount + "/" + "lb";
    }
    db_columns.userID = userID;
    api
      .post("/addfood", db_columns)
      .then((resp) => {
        setConfirmChange(true);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={addDialogOpen}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        ADD FOOD
      </DialogTitle>
      <form className="foodModal" onSubmit={(event) => event.preventDefault()}>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Name
              <input name="name" onChange={onInputChange}></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span id="quantityInput">
            <label class="fieldLabel">
              Quantity
              <input name="amount" onChange={onInputChange}></input>
              <select
                name="unit"
                onChange={onInputChange}
                style={{ width: "68px" }}
              >
                <option value="lb">lb</option>
                <option value="kg">kg</option>
                <option value="oz">oz</option>
                <option value="fl oz">fl oz</option>
                <option value="tbsp">tbsp</option>
                <option value="tsp">tsp</option>
                <option value="each">each</option>
                <option value="cup">cup</option>
                <option value="gram">gram</option>
              </select>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Expiration Date
              <input name="expiryDate" onChange={onInputChange}></input>
            </label>
          </span>
        </div>
        <div
          className="pageActionContainer"
          style={{ marginRight: "18px", marginTop: "35px" }}
        >
          <button id="pageAction" onClick={addFood}>
            Add +
          </button>
        </div>
      </form>
    </Dialog>
  );
};
export default MyFoodModal;
