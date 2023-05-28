import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useUser } from "../../../contexts/UserContext";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddDialog from "../../../unauthed/user/modals/MyFoodModal";
import config from "../../../api/api";
import axios from "axios";

const FoodTable = (props) => {
  const api = axios.create({
    baseURL: config,
  });
  const [editId, setEditId] = React.useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { setIngredients } = useUser();
  const userID = localStorage.getItem("user-id");
  const food = props.food;
  const isIngredientPicker = props.isIngredientPicker;
  const setDeleteUsed = props.setDeleteUsed;
  const deleteUsed = props.deleteUsed;

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  const handleEditClick = (id) => {
    setAddDialogOpen(true);
    setEditId(id);
  };

  const deleteFood = (id) => {
    api
      .delete(`/deletefood/${userID}/${id}`)
      .then()
      .catch((error) => console.error(error));
    setDeleteUsed(!deleteUsed);
  };

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
        <div className="amountTableRow">
          <div>{params.row.amount}</div>
          <div>
            <span className="amountTag">{params.row.units}</span>
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
    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <div onClick={() => deleteFood(params.row.id)}>
          <IconButton>
            <Delete sx={{ height: "20px" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 655, width: "100%" }}>
      <DataGrid
        rows={food}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        checkboxSelection={isIngredientPicker}
        onRowSelectionModelChange={(item) => setIngredients(item)}
        sx={{
          width: "1000px",
          background: "#f0f0f0",
          color: "#000000",
        }}
      />
      <AddDialog
        addDialogOpen={addDialogOpen}
        onClose={handleAddClose}
        editId={editId}
      />
    </Box>
  );
};

export default FoodTable;
