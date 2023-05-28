import React, { useState } from "react";
import config from "../../../api/api";
import axios from "axios";
import {
  DialogTitle,
  Dialog,
} from "@mui/material";
import { useUser } from "../../../contexts/UserContext";

const AddPrefModal = (props) => {
  const { addDialogOpen, onClose } = props;
  const foodPref = props.foodPref;
  const { setFoodPref} = useUser();
  const [newFoodPref, setNewFoodPref] = useState("");
  const api = axios.create({
    baseURL: config,
  });
  const userID = localStorage.getItem("user-id");

  const handleClose = () => {
    onClose();
  };

  const addPref = async () => {
    setFoodPref([...foodPref, newFoodPref ]);
    const tmp = {totalFoodPref: [...foodPref, newFoodPref]};
    console.log(foodPref);
    await api
        .post(`/addfoodpref/${userID}`, tmp)
        .then((resp) => {
          console.log(resp);
          return resp.data;
        })
        .catch((error) => {
          console.error(error);
        });
    handleClose();
  };

  const onInputChange = (e) => {
    setNewFoodPref(e.target.value);
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
        ADD FOOD PREFERENCE
      </DialogTitle>
      <div className="ingredientModal preferencesModal">
        <label>Preference Name</label>
        <input name="newPreference" onChange={onInputChange}></input>
        <br></br>
        <br></br>
        <button id="pageAction" onClick={addPref}>
              Add +
        </button>
      </div>
    </Dialog>
  );
};
export default AddPrefModal;
