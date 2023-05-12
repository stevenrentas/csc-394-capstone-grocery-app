import React from "react";
import { ModalBody, ModalDialog, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useUser } from "../../../contexts/UserContext";

const MyRecipesModal = () => {
    const {showModal, setShowModal} = useUser();

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
                        <form className="foodModal">
                            <h2>Food table goes here</h2>
                            <button type="button" id="modal-submit" onClick={e => console.log("eheh")}>Generate &gt;</button>
                        </form>
                    </ModalBody>
                </ModalDialog>
            </div>
        );
    }
}
export default MyRecipesModal;