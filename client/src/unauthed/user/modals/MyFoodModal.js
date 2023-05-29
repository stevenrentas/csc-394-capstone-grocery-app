import React, { useState, useEffect } from "react";
import config from "../../../api/api";
import axios from "axios";
import { DialogTitle, Dialog } from "@mui/material";
import { useUser } from "../../../contexts/UserContext";

const MyFoodModal = (props) => {
  const api = axios.create({
    baseURL: config,
  });
  const [foodToAdd, setFoodToAdd] = useState({
    name: "",
    amount: "",
    dateAdded: "",
    expiryDate: "",
  });
  const [selectValue, setSelectValue] = React.useState("");
  const { addDialogOpen, onClose, editId } = props;
  const { setFood } = useUser();
  const userID = localStorage.getItem("user-id");

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
    if (
      db_columns.name !== "" &&
      db_columns.dateAdded !== "" &&
      db_columns.amount !== "" &&
      db_columns.expiryDate !== ""
    ) {
      if (db_columns.amount.split("/")[1] === undefined) {
        db_columns.amount = db_columns.amount + "/" + "lb";
      }
      db_columns.userID = userID;
      api
        .post("/addfood", db_columns)
        .then((resp) => {
          handleClose();
          setFoodToAdd({
            name: "",
            amount: "",
            dateAdded: "",
            expiryDate: "",
          });
          setSelectValue("");
        })
        .catch((error) => {
          console.error(error);
          setFoodToAdd({
            name: "",
            amount: "",
            dateAdded: "",
            expiryDate: "",
          });
          setSelectValue("");
        });
    }
  };

  const editFood = async () => {
    let db_columns = { ...foodToAdd };
    if (
      db_columns.name !== "" &&
      db_columns.dateAdded !== "" &&
      db_columns.amount !== "" &&
      db_columns.expiryDate !== ""
    ) {
      if (db_columns.amount.split("/")[1] === undefined) {
        db_columns.amount = db_columns.amount + "/" + selectValue;
      }
      db_columns.userID = userID;
      api
        .put(`/updatefood/${editId}`, db_columns)
        .then((resp) => {
          handleClose();
          setFoodToAdd({
            name: "",
            amount: "",
            dateAdded: "",
            expiryDate: "",
          });
          setSelectValue("");
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
          fetchInventory();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    async function fetchFoodItem() {
      try {
        const response = await api.get(`/getfood/${editId}`);
        const foodItem = response.data.food;
        setFoodToAdd({
          name: foodItem.description,
          amount: foodItem.amount + "/" + foodItem.units,
          dateAdded: foodItem.date_added,
          expiryDate: foodItem.expiry_date,
        });
        setSelectValue(foodItem.units);
      } catch (error) {
        console.error(error);
      }
    }
    if (editId) {
      fetchFoodItem();
    }
  }, [addDialogOpen]);

  const handleSelectChange = (e) => {
    var { value } = e.target;
    setSelectValue(value);
    onInputChange(e);
  };

  return (
    <Dialog onClose={handleClose} open={addDialogOpen}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        ADD FOOD
      </DialogTitle>
      <form className="foodModal" onSubmit={(event) => event.preventDefault()}>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Name
              <input
                name="name"
                value={foodToAdd.name}
                onChange={onInputChange}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span id="quantityInput">
            <label class="fieldLabel">
              Quantity
              <input
                name="amount"
                value={foodToAdd.amount.split("/")[0]}
                onChange={onInputChange}
              ></input>
              <select
                name="unit"
                onChange={handleSelectChange}
                style={{ width: "fit-content" }}
                value={foodToAdd.amount.split("/")[1]}
              >
                <option value="lb">pound (lb)</option>
                <option value="oz">ounce (oz)</option>
                <option value="kg">kilogram (kg)</option>
                <option value="g">gram (g)</option>
                <option value="L">liter (L)</option>
                <option value="ml">milliliter (ml)</option>
                <option value="fl oz">fluid ounce (fl oz)</option>
                <option value="gal">gallon</option>
                <option value="pt">pint (pt)</option>
                <option value="qt">quart (qt)</option>
              </select>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Expiration Date
              <input
                name="expiryDate"
                value={foodToAdd.expiryDate}
                onChange={onInputChange}
              ></input>
            </label>
          </span>
        </div>
        <div
          className="pageActionContainer"
          style={{ marginRight: "18px", marginTop: "35px" }}
        >
          {(editId === undefined || editId === null) && (
            <button id="pageAction" onClick={addFood}>
              Add +
            </button>
          )}
          {editId !== undefined && editId !== null && (
            <button id="pageAction" onClick={editFood}>
              Edit +
            </button>
          )}
        </div>
      </form>
    </Dialog>
  );
};
export default MyFoodModal;
