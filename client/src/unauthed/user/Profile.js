import React, { useEffect, useState } from "react";
import config from "../../api/api";
import axios from "axios";
import "../../styles/style.css";
import { useUser } from "../../contexts/UserContext";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddPrefModal from "./modals/AddPrefModal";
import DeleteAccountModal from "./modals/DeleteAccountModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { foodPref, setFoodPref } = useUser();
  const [prefDeleted, setPrefDeleted] = useState(false);
  const navigate = useNavigate();
  let prefWithID;
  if (foodPref !== null) {
    prefWithID = foodPref.map((row, x) => {
      return {
        id: x,
        description: foodPref[x],
      };
    });
  } else {
    prefWithID = [];
  }

  const columns = [
    { field: "description", headerName: "Name", flex: 1 },
    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <div onClick={() => deletePref(params.row.description)}>
          <IconButton>
            <Delete sx={{ height: "20px" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  const api = axios.create({
    baseURL: config,
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const userID = localStorage.getItem("user-id");
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setAddDialogOpen(true);
  };

  const deletePref = (pref) => {
    api
      .delete(`/deletefoodPref/${userID}/${pref}`)
      .then(() => setPrefDeleted(true))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    async function fetchPreferences() {
      const allFoodPref = await api
        .get(`/getfoodpref/${userID}`)
        .then((resp) => {
          return resp.data.data.foodpref;
        })
        .catch((error) => {
          console.error(error);
        });
      setFoodPref(allFoodPref);
      setPrefDeleted(false);
    }
    fetchPreferences();
  }, [prefDeleted]);

  const handleConfirmDeleteOpen = () => {
    setConfirmDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profilePage">
      <h1>Manage Profile</h1>
      <span className="userInfoGroup">
        <h4>Preferences</h4>
        <button id="pageActionWider" onClick={handleOpenDialog}>
          Add Preference
        </button>
      </span>
      <Box sx={{ height: 400, width: "50%" }}>
        <DataGrid
          rows={prefWithID}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          sx={{
            width: "500px",
            background: "#f0f0f0",
            color: "#000000",
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "50px",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <button id="deletePageAction" onClick={handleConfirmDeleteOpen}>
          Delete Account
        </button>
        <button id="logoutPageAction" onClick={handleLogout}>
          Logout
        </button>
      </Box>
      <AddPrefModal
        addDialogOpen={addDialogOpen}
        onClose={handleAddClose}
        foodPref={foodPref}
      />
      <DeleteAccountModal
        confirmDeleteDialogOpen={confirmDeleteDialogOpen}
        onClose={handleDeleteClose}
      />
    </div>
  );
};

export default Profile;
