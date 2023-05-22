import React, { useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import config from "../../../api/api";
import axios from "axios";
import { useUser } from "../../../contexts/UserContext";
import SnackbarContext from "../../../contexts/SnackbarContext";
import FoodTable from "./FoodTable";

const IngredientPicker = (props) => {
  const foodData = props.food;
  const columns = props.columns;

  const api = axios.create({
    baseURL: config,
  });

  const [setConfirmChange] = useState(false);
  const { setShowModal, ingredients, food } = useUser();
  const userID = localStorage.getItem("user-id");
  const [response, setResponse] = useState({});
  const { toggleSnackbar } = useContext(SnackbarContext);

  const promptBuilder = () => {
    let selectedIngredients = [];
    for (let i = 0; i < ingredients.length; i++){
      for (let y = 0; y < food.length; y++){
        if (food[y].id === ingredients[i]){
          selectedIngredients.push(`${food[y].amount}${food[y].units} ${food[y].description}`);
        }
      }
    }

    const fakePref = ["Asian", "low-fat"];
    let prompt = `I have `;
    // filter in ingredients with amounts/units
    for (let i = 0; i < selectedIngredients.length; i++){
      prompt += selectedIngredients[i];
      if (i !== selectedIngredients.length - 1){
        prompt += ",";
      }
      if (i === selectedIngredients.length - 1){
        prompt += ".";
      }
      prompt += " ";
    }

    prompt += "What are some possible recipes I can make in that list if I want to make a ";
    // filter in preferences
    for (let i = 0; i < fakePref.length; i++){
      prompt += fakePref[i];
      if (i !== fakePref.length - 1){
        prompt += ",";
      }
      if (i === fakePref.length - 1){
        prompt += " meal?";
      }
      prompt += " ";
    }

    prompt += "Provide more than one recipe and in the meantime, you don't need to use up all the ingredients in the list provided. ";
    prompt += "This is very important that you combine all the recipes and output the title, ingredients, and instructions in JSON format only. Again, I don't want other texts. ";
    prompt += "Also, when formatting ingredients, build an array with the amount of the ingredient needed with just the numerical amount, the name of just the ingredient itself with no additional ";
    prompt += "text such as \"sliced\" or \"minced\", and lastly with the unit of measurement needed that was omitted in the amount section, ";
    prompt += "i.e. \"lb\", \"each\", \"cup\", \"teaspoon\", etc.";

    return prompt;
  };

  const generateRecipe = async () => {
    let db_columns = {
      prompt:
        promptBuilder()
    };
    api
      .post("/chat", db_columns)
      .then((resp) => {
        setConfirmChange(true);
        setShowModal(false);
        setResponse(resp);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    toggleSnackbar();
  };

  return (
    <div className="ingredientModal">
      <FoodTable food={foodData} columns={columns} />
      <div className="pageActionContainer" style={{ marginRight: "45px" }}>
        <button id="pageActionWider" onClick={generateRecipe}>
          Generate &gt;
        </button>
      </div>
    </div>
  );
};

export default IngredientPicker;
