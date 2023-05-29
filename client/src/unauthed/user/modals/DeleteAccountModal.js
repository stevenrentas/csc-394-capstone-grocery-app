import React, { useState } from "react";
import config from "../../../api/api";
import axios from "axios";
import { DialogTitle, Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddPrefModal = (props) => {
  const { confirmDeleteDialogOpen, onClose } = props;
  const api = axios.create({
    baseURL: config,
  });
  const navigate = useNavigate();
  const userID = localStorage.getItem("user-id");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: "",
  });

  const handleClose = () => {
    setError({ message: "" });
    onClose();
  };

  const onInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAccountDeletion = () => {
    async function deleteAccount() {
      await api
        .delete(`/deleteallinventory/${userID}`)
        .then()
        .catch((error) => console.error(error));
      await api
        .delete(`/deleteallrecipes/${userID}`)
        .then()
        .catch((error) => console.error(error));
      await api
        .delete("/users", {
          data: { id: userID },
        })
        .then()
        .catch((error) => {
          console.log(error);
        });
      localStorage.clear();
      navigate("/login");
    }
    async function checkPassword() {
      const userData = {
        id: userID,
      };
      await api
        .post(`/user`, userData)
        .then((response) => {
          if (password === response.data[0].pword) {
            deleteAccount();
          } else {
            setError({
              message: "Incorrect password",
            });
            setPassword("");
          }
        })
        .catch((error) => console.error(error));
    }
    checkPassword();
  };

  return (
    <Dialog onClose={handleClose} open={confirmDeleteDialogOpen} maxWidth="xl">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        DELETE ACCOUNT
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
              Enter your password to confirm deletion
              <input
                name="password"
                type="password"
                value={password}
                onChange={onInputChange}
              />
            </label>
            {error.message && (
              <p
                className="err"
                style={{ textAlign: "start", fontSize: "14px" }}
              >
                {error.message}
              </p>
            )}
          </span>
          <br></br>
          <br></br>
          <div style={{ textAlign: "end" }}>
            <button id="deletePageAction" onClick={handleAccountDeletion}>
              Delete Account
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddPrefModal;
