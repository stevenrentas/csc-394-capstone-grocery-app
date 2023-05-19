import React from "react";
import config from "../../../api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { ModalBody, ModalDialog, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useUser } from "../../../contexts/UserContext";
import IngredientPicker from "../assets/IngredientPicker";

const MyRecipesModal = () => {
    const api = axios.create({
        baseURL: config,
      });
    const [confirmChange, setConfirmChange] = useState(false);
    const {showModal, setShowModal, food, setFood, columns} = useUser();

    useEffect(() => {
        async function fetchInventory() {
          const userID = localStorage.getItem("user-id");
          const allFood = await api
            .get(`/getfood?userID=${userID}`)
            .then((resp) => {
              return resp.data.food;
            })
            .catch((error) => {
              console.error(error);
            });
          setFood(allFood);
        }
        setConfirmChange(false);
        fetchInventory();
      }, [confirmChange]);

    const backgroundColor = "#D9D9D9";
    if (showModal){
        return (
            <div id="modal">
                <ModalDialog style={{backgroundColor:backgroundColor}}>
                    <ModalHeader style={{backgroundColor:backgroundColor}}>
                        <button className="modalClose" onClick={e => setShowModal(false)}>X</button>
                        <ModalTitle style={{backgroundColor:backgroundColor, color: "#383838", display: "grid", justifyContent:"center", alignContent:"center"}}>GENERATE RECIPE</ModalTitle>
                    </ModalHeader>
                    <ModalBody style={{backgroundColor:backgroundColor}}>
                            <IngredientPicker/>
                    </ModalBody>
                </ModalDialog>
            </div>
        );
    }
}
export default MyRecipesModal;