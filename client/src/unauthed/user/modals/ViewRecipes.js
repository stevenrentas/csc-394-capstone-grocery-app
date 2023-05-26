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
          fontSize: "2em"
        }}
      >
        {recipe.title}
      </DialogTitle>
      <div className="recipeText">
        <div className="ingredients">
          <h4>Ingredients</h4>
            <ul>
              {recipe !== undefined ? recipe.ingredients.map(ing => <li className="recipeDetails">{ing.amount} {ing.denomination} {ing.preparation} {ing.name}</li>): null}
            </ul>
        </div>
        <div className="instructions">
        <h4>Instructions</h4>
          <ol>
              {recipe !== undefined ? recipe.instructions.map(inst => <li className="recipeDetails">{inst}</li>): null}
            </ol>
        </div>
      </div>
    </Dialog>
    );
}

export default ViewRecipes;