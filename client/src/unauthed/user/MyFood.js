import React, {useState} from "react";
import MyFoodModal from "./modals/MyFoodModal";
import { useUser } from "../../contexts/UserContext";

const MyFood = () => {
    const {setShowModal} = useUser();
    
    return (
        <div id="table">
            <button id="pageAction" onClick={e => setShowModal(true)}>Add +</button>
            <h1>Food Table here</h1>
            <MyFoodModal/>
        </div>
    );
}

export default MyFood;