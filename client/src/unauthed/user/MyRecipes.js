import React, {useState} from "react";
import { useUser } from "../../contexts/UserContext";
import MyRecipesModal from "./modals/MyRecipesModal";

const MyRecipes = () => {
    const {setShowModal} = useUser();
    
    return (
        <div id="table">
            <button id="pageAction" onClick={e => setShowModal(true)}>Generate Recipe</button>
            <h1>Recipe Table here</h1>
            <MyRecipesModal/>
        </div>
    );
}

export default MyRecipes;