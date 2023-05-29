import React, { useState } from "react";
import config from "../../../api/api";
import axios from "axios";
import { useUser } from "../../../contexts/UserContext";
import { DialogTitle, Dialog, DialogContent } from "@mui/material";

const AddPrefModal = (props) => {
  const { addDialogOpen, onClose } = props;
  const foodPref = props.foodPref;
  const { setFoodPref } = useUser();
  const [newFoodPref, setNewFoodPref] = useState("");
  const api = axios.create({
    baseURL: config,
  });
  const userID = localStorage.getItem("user-id");

  const handleClose = () => {
    onClose();
  };

  const addPref = async () => {
    if (foodPref !== null) {
      setFoodPref([...foodPref, newFoodPref]);
    } else {
      setFoodPref([newFoodPref]);
    }
    let tmp;
    if (foodPref !== null) {
      tmp = { totalFoodPref: [...foodPref, newFoodPref] };
    } else {
      tmp = { totalFoodPref: [newFoodPref] };
    }
    await api
      .post(`/addfoodpref/${userID}`, tmp)
      .then((resp) => {
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
      <DialogContent
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        <div class="inputField">
          <span>
            <label class="fieldLabel" style={{ textAlign: "left" }}>
              Preference Name
              <input name="newPreference" onChange={onInputChange}></input>
            </label>
          </span>
          <br></br>
          <br></br>
          <div style={{ textAlign: "end" }}>
            <button id="pageAction" onClick={addPref}>
              Add +
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddPrefModal;
