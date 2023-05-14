import React, { useState } from "react";
import MyFoodModal from "./modals/MyFoodModal";
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

const MyFood = () => {
  const { setShowModal } = useUser();

  const handleEditClick = () => {};

  const columns = [
    { field: "name", headerName: "Name", width: 300 },
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
          <div>{params.value.split("/")[0]}</div>
          <div>
            <span class="amountTag">{params.value.split("/")[1]}</span>
          </div>
        </div>
      ),
    },
    {
      field: "dateAdded",
      headerName: "Date Added",
      width: 160,
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      width: 160,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Chicken Breast",
      amount: "4/lb",
      dateAdded: "4/28/2023",
      expiryDate: "5/02/2023",
    },
    {
      id: 2,
      name: "Gala Apples",
      amount: "12/each",
      dateAdded: "4/21/2023",
      expiryDate: "5/21/2023",
    },
    {
      id: 3,
      name: "Broccoli Rabe",
      amount: "5/cup",
      dateAdded: "3/14/2023",
      expiryDate: "N/A",
    },
    {
      id: 4,
      name: "Goldfish",
      amount: "2/container",
      dateAdded: "4/28/2023",
      expiryDate: "5/14/2025",
    },
  ];

  return (
    <div id="table">
      <div class="pageActionContainer">
        <button id="pageAction" onClick={(e) => setShowModal(true)}>
          Add +
        </button>
      </div>
      <Box sx={{ height: 655, width: "100%", pt: 3 }}>
        <DataGrid
          rows={rows}
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
      <MyFoodModal />
    </div>
  );
};

export default MyFood;
