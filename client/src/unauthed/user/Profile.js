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

const Profile = () => {
const { foodPref, setFoodPref } = useUser();

  const api = axios.create({
    baseURL: config,
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const userID = localStorage.getItem("user-id");

  const handleAddClose = () => {
    setAddDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setAddDialogOpen(true);
  };

//   const deleteFoodPref = (id) => {
//     let data = { 
      
//     };
//     api.delete(`/deletefoodPref/${userID}/${id}`)
//       .then()
//       .catch((error) => console.error(error)
//     );
//   };

//   const columns = [
//     { field: "foodPref", headerName: "Preference", width: 300 },
//     {
//       field: "delete",
//       headerName: "",
//       width: 60,
//       renderCell: (params) => (
//         <div onClick={() => deleteFoodPref(params.row.id)}>
//           <IconButton>
//             <Delete sx={{ height: "20px" }} />
//           </IconButton>
//         </div>
//       ),
//     }
//   ];

  useEffect(() => {
    async function fetchPreferences() {
      const allFoodPref = await api
        .get(`/getfoodpref/${userID}`)
        .then((resp) => {
          console.log(resp.data.data.foodPref);
          return resp.data.data.foodpref;
        })
        .catch((error) => {
          console.error(error);
        });
      setFoodPref(allFoodPref);
      console.log(foodPref);
    }
    fetchPreferences();
  }, []);

  return (
    <div className="profilePage">
        <h1>Manage Profile</h1>
        <span className="userInfoGroup">
            <h4>Preferences</h4>
            <br></br>
            <button id="pageActionWider" onClick={handleOpenDialog}>
                Add Preference
            </button>
        </span>
        <ul>
              {foodPref.length > 0 ? foodPref.map(pref => <li className="">{pref}</li>) : <p>Your food preferences will appear here!</p>}
            </ul>
    <AddPrefModal 
        addDialogOpen={addDialogOpen}
        onClose={handleAddClose}
        foodPref={foodPref}
        />
    </div>
  );
};

export default Profile;
