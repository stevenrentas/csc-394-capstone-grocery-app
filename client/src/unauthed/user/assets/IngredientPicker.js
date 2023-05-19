import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import config from "../../../api/api";
import axios from "axios";
import { useUser } from "../../../contexts/UserContext";


const IngredientPicker = (props) => {
    const api = axios.create({
        baseURL: config,
      });

    const [ setConfirmChange] = useState(false);
    const {setShowModal} = useUser();
    const userID = localStorage.getItem("user-id");
    const [response, setResponse] = useState({});

    const generateRecipe = async () => {
        let db_columns = { rickRoll: "Sing me the lyrics for 'Never Gonna Give You Up' by Rick Astley"};
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
      };
    
    return (
        <div>
            <h2>{response === {} ? "sdfsdf" : "Generate recipe..."}</h2>
            <button type="button" id="modal-submit" onClick={generateRecipe}>Generate &gt;</button>
        </div>
    );
}

export default IngredientPicker;