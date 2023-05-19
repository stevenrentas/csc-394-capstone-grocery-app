import React, { useContext, useState } from "react";
import {IconButton} from "@mui/material";
import { Edit } from "@mui/icons-material";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [food, setFood] = useState([]);

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
  ];

  return (
    <UserContext.Provider
      value={{
        showModal,
        setShowModal,
        food,
        setFood,
        columns
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
