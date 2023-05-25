import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { useUser } from "../../../contexts/UserContext";

const ViewRecipes = (props) => {
    const {recipe, onClose, isDialogOpen} = props;

    const handleClose = () => {
        onClose();
      };

    return (
    <Dialog onClose={handleClose} open={isDialogOpen}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        {recipe.title}
      </DialogTitle>
    </Dialog>
    );
}

export default ViewRecipes;