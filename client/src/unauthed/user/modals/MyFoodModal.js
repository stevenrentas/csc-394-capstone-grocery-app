import React from "react";
import { ModalBody, ModalDialog, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useUser } from "../../../contexts/UserContext";

const MyFoodModal = () => {
    const {showFoodModal, setShowFoodModal} = useUser();

    const backgroundColor = "#D9D9D9";
    if (showFoodModal){
        return (
            <div id="modal">
                <ModalDialog style={{backgroundColor:backgroundColor}}>
                    <ModalHeader style={{backgroundColor:backgroundColor}}>
                        <button className="modalClose" onClick={e => setShowFoodModal(false)}>X</button>
                        <ModalTitle style={{backgroundColor:backgroundColor, color: "#383838", display: "grid", justifyContent:"center", alignContent:"center"}}>ADD FOOD</ModalTitle>
                    </ModalHeader>
                    <ModalBody style={{backgroundColor:backgroundColor}}>
                        <form className="foodModal">
                            <span>
                                <label>Name
                                    <input name="foodName"></input>
                                </label>
                            </span>
                            <span id="quantityInput">
                            <label>Quantity
                                    <input name="foodQuantity"></input>
                                    <select>
                                            <option value="lb">lb</option>
                                            <option value="kg">kg</option>
                                            <option value="oz">oz</option>
                                            <option value="fl oz">fl oz</option>
                                            <option value="tbsp">tbsp</option>
                                            <option value="tsp">tsp</option>
                                            <option value="each">each</option>
                                            <option value="cup">cup</option>
                                        </select>
                                </label>
                            </span>
                            <span>
                                <label>Expiration Date
                                    <input name="foodExpiration"></input>
                                </label>
                            </span>
                            <button type="button" id="modal-submit" onClick={e => console.log("eheh")}>Add +</button>
                        </form>
                    </ModalBody>
                </ModalDialog>
            </div>
        );
    }
}
export default MyFoodModal;