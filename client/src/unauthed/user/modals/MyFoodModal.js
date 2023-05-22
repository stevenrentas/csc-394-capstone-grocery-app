import React, { useState } from "react";
import {
  ModalBody,
  ModalDialog,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useUser } from "../../../contexts/UserContext";
import config from "../../../api/api";
import axios from "axios";

const MyFoodModal = ({ confirmChange, setConfirmChange }) => {
  const api = axios.create({
    baseURL: config,
  });
  const userID = localStorage.getItem("user-id");

  const { showModal, setShowModal } = useUser();

  const [foodToAdd, setFoodToAdd] = useState({
    name: "",
    amount: "",
    dateAdded: "",
    expiryDate: "",
  });

  const onInputChange = (e) => {
    var { name, value } = e.target;

    if (name === "unit") {
      const amount =
        foodToAdd.amount.indexOf("/") > -1
          ? foodToAdd.amount.substring(0, foodToAdd.amount.indexOf("/"))
          : foodToAdd.amount;
      setFoodToAdd({
        ...foodToAdd,
        amount: amount + "/" + value,
        dateAdded: new Date().toLocaleDateString("en-US"),
      });
    } else {
      setFoodToAdd({
        ...foodToAdd,
        [name]: value,
        dateAdded: new Date().toLocaleDateString("en-US"),
      });
    }
  };
  const addFood = async () => {
    let db_columns = { ...foodToAdd };
    if (db_columns.amount.split("/" === 0)) {
      db_columns.amount = db_columns.amount + "/" + "lb";
    }
    db_columns.userID = userID;
    api
      .post("/addfood", db_columns)
      .then((resp) => {
        setConfirmChange(true);
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const backgroundColor = "#D9D9D9";
  if (showModal) {
    return (
      <div id="modal">
        <ModalDialog style={{ backgroundColor: backgroundColor }}>
          <ModalHeader style={{ backgroundColor: backgroundColor }}>
            <button className="modalClose" onClick={(e) => setShowModal(false)}>
              X
            </button>
            <ModalTitle
              style={{
                backgroundColor: backgroundColor,
                color: "#383838",
                display: "grid",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              ADD FOOD
            </ModalTitle>
          </ModalHeader>
          <ModalBody style={{ backgroundColor: backgroundColor }}>
            <form className="foodModal">
              <span>
                <label>
                  Name
                  <input name="name" onChange={onInputChange}></input>
                </label>
              </span>
              <span id="quantityInput">
                <label>
                  Quantity
                  <input name="amount" onChange={onInputChange}></input>
                  <select name="unit" onChange={onInputChange}>
                    <option value="lb" selected>lb</option>
                    <option value="kg">kg</option>
                    <option value="oz">oz</option>
                    <option value="fl oz">fl oz</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="each">each</option>
                    <option value="cup">cup</option>
                    <option value="gram">gram</option>
                  </select>
                </label>
              </span>
              <span>
                <label>
                  Expiration Date
                  <input name="expiryDate" onChange={onInputChange}></input>
                </label>
              </span>
              <div
                className="pageActionContainer"
                style={{ marginRight: "45px" }}
              >
                <button id="pageAction" onClick={addFood}>
                  Add +
                </button>
              </div>
            </form>
          </ModalBody>
        </ModalDialog>
      </div>
    );
  }
};
export default MyFoodModal;
