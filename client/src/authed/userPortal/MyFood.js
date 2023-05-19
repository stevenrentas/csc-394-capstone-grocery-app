import React, { useState } from "react";
import MyFoodModal from "../../unauthed/user/modals/MyFoodModal";
import { useUser } from "../../contexts/UserContext";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useEffect } from "react";
import config from "../../api/api";
import axios from "axios";

const MyFood = () => {
  const api = axios.create({
    baseURL: config,
  });
  const [confirmChange, setConfirmChange] = useState(false);
  const { setShowModal, food, setFood } = useUser();
  const handleEditClick = () => {};

  const columns = [
    { field: "description", headerName: "Name", width: 300 },
    {
      field: "edit",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <div onClick={() => handleEditClick(params.row.id)}>
          <IconButton>
            <Edit sx={{ height: "20px" }} />
          </IconButton>
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      renderCell: (params) => (
        <div class="amountTableRow">
          <div>{params.row.amount}</div>
          <div>
            <span class="amountTag">{params.row.units}</span>
          </div>
        </div>
      ),
    },
    {
      field: "date_added",
      headerName: "Date Added",
      width: 160,
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      width: 160,
    },
  ];

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
      <div class="pageActionContainer">
        <button id="pageAction" onClick={(e) => setShowModal(true)}>
          Add +
        </button>
      </div>
      <Box sx={{ height: 655, width: "100%", pt: 3 }}>
        <DataGrid
          rows={food}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          checkboxSelection
          sx={{ width: "1000px", background: "#f0f0f0", color: "#000000" }}
        />
      </Box>
      <MyFoodModal
        confirmChange={confirmChange}
        setConfirmChange={setConfirmChange}
      />
    </div>
  );
};

export default MyFood;
