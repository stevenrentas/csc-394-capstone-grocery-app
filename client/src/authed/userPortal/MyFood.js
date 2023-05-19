import React, { useState } from "react";
import MyFoodModal from "../../unauthed/user/modals/MyFoodModal";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import config from "../../api/api";
import axios from "axios";
import FoodTable from "../../unauthed/user/assets/FoodTable";

const MyFood = () => {
  const api = axios.create({
    baseURL: config,
  });
  const [confirmChange, setConfirmChange] = useState(false);
  const { setShowModal, food, setFood, columns } = useUser();

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

  return (
    <div id="table">
      <div className="pageActionContainer">
        <button id="pageAction" onClick={(e) => setShowModal(true)}>
          Add +
        </button>
      </div>
      <FoodTable food={food} columns={columns}/>
      <MyFoodModal
        confirmChange={confirmChange}
        setConfirmChange={setConfirmChange}
      />
    </div>
  );
};

export default MyFood;
