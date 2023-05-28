import React, { useContext } from "react";
import config from "../../../api/api";
import axios from "axios";
import { useUser } from "../../../contexts/UserContext";
import SnackbarContext from "../../../contexts/SnackbarContext";
import FoodTable from "./FoodTable";

const IngredientPicker = (props) => {
  const api = axios.create({
    baseURL: config,
  });
  const { onClose } = props;
  const { ingredients, food } = useUser();
  const { snackbarOpen, toggleSnackbar, addSnackbarData, removeSnackbarData } =
    useContext(SnackbarContext);
  const foodData = props.food;
  const columns = props.columns;

  const promptBuilder = async () => {
    let selectedIngredients = [];
    for (let i = 0; i < ingredients.length; i++) {
      for (let y = 0; y < food.length; y++) {
        if (food[y].id === ingredients[i]) {
          selectedIngredients.push(
            `${food[y].amount}${food[y].units} ${food[y].description}`
          );
        }
      }
    }

    const fakePref = ["Asian", "low-fat"];
    let prompt = `I have `;
    // filter in ingredients with amounts/units
    for (let i = 0; i < selectedIngredients.length; i++) {
      prompt += selectedIngredients[i];
      if (i !== selectedIngredients.length - 1) {
        prompt += ",";
      }
      if (i === selectedIngredients.length - 1) {
        prompt += ".";
      }
      prompt += " ";
    }

    prompt +=
      "What are some possible recipes I can make in that list if I want to make a ";
    // filter in preferences
    for (let i = 0; i < fakePref.length; i++) {
      prompt += fakePref[i];
      if (i !== fakePref.length - 1) {
        prompt += ",";
      }
      if (i === fakePref.length - 1) {
        prompt += " meal?";
      }
      prompt += " ";
    }

    prompt +=
      "Provide three recipes in an array and in the meantime, you don't need to use up all the ingredients in the list provided ";
    prompt +=
      "This is very important that you combine all the recipes and output the title, ingredients, and instructions in JSON format only. ";
    prompt +=
      "Inside the JSON format, there is a specific format inside the ingredients. ";
    prompt +=
      "For example, [amount: 1, denomination: lb, name: Chicken Breast, preparation: Sliced]. When structuring this piece, make sure to keep the same 'name' that was provided in the original list even if the spelling is incorrect, I need the names to match for my application. I.e. if something is spelled 'chickn brest' in the list, it must appear in the ingredient name as 'chickn brest'. ";
    prompt +=
      "Again, I don't want other texts and be sure to include something for all fields, even if it is an empty string. ";
    prompt +=
      "Also, be sure that the instructions are formatted into an array with each element being a separate step.";

    return prompt;
  };

  const generateRecipe = async () => {
    let db_columns = {
      prompt: await promptBuilder(),
    };
    removeSnackbarData();
    if (snackbarOpen !== true) {
      toggleSnackbar();
    }
    onClose();
    await api
      .post("/chat", db_columns)
      .then((resp) => {
        const tmp = resp.data;
        addSnackbarData(tmp);
      })
      .catch((error) => {
        console.error(error);
        toggleSnackbar();
      });
  };

  return (
    <div className="ingredientModal">
      <FoodTable food={foodData} columns={columns} isIngredientPicker={true} />
      <div className="pageActionContainer" style={{ marginTop: "20px" }}>
        <button
          id="pageActionWider"
          onClick={generateRecipe}
          style={{ marginLeft: "10px" }}
        >
          Generate &gt;
        </button>
      </div>
    </div>
  );
};

export default IngredientPicker;
