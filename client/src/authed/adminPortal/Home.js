import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  DialogTitle,
  Dialog,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import config from "../../api/api";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const axios = require("axios");
const api = axios.create({
  baseURL: config,
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#698669",
      hover: "#283593", // Custom hover color for the primary button
    },
  },
});

function DeleteDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const deleteUser = async () => {
    await api
      .delete("/users", {
        data: { id: selectedValue },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    window.location.reload(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
      <Stack direction="row" sx={{ mb: 3, justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          color="primary"
          onClick={handleClose}
        >
          No
        </Button>
        <Button variant="contained" onClick={deleteUser}>
          Yes
        </Button>
      </Stack>
    </Dialog>
  );
}

function EditDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [adminPermissions, setAdminPermissions] = React.useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const editUser = async () => {
    await api
      .put("/users", {
        id: selectedValue,
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        pword: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    window.location.reload(false);
  };

  useEffect(() => {
    const getUser = async () => {
      api
        .post("/user", { id: selectedValue })
        .then((response) => {
          setUsername(response.data[0].username);
          setFirstName(response.data[0].first_name);
          setLastName(response.data[0].last_name);
          setEmail(response.data[0].email);
          setAdminPermissions(
            response.data[0].isadmin === true ? "admin" : "user"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };
    console.log(selectedValue);
    if (selectedValue !== null) {
      getUser();
    }
  }, [selectedValue]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        Edit User Details Below
      </DialogTitle>
      <form className="foodModal" onSubmit={(event) => event.preventDefault()}>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Username
              <input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              First name
              <input
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Last name
              <input
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Email
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Password
              <input
                name="name"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span id="adminInput">
            <label class="fieldLabel">
              Permissions
              <select
                name="adminPermissions"
                value={adminPermissions}
                onChange={(e) => setAdminPermissions(e.target.value)}
                style={{ width: "85px", marginTop: "5px" }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </span>
        </div>
        <div
          className="pageActionContainer"
          style={{ marginRight: "18px", marginTop: "35px" }}
        >
          <button id="pageAction" onClick={editUser}>
            Add +
          </button>
        </div>
      </form>
    </Dialog>
  );
}

function AddDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [adminPermissions, setAdminPermissions] = React.useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const addUser = async () => {
    await api
      .post("/adduser", {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        pword: password,
        isAdmin: adminPermissions === "admin" ? true : false,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    window.location.reload(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontFamily: '"Montserrat", sans-serif',
          backgroundColor: "#f0f0f0",
        }}
      >
        Input User Details Below
      </DialogTitle>
      <form className="foodModal" onSubmit={(event) => event.preventDefault()}>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Username
              <input
                name="name"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              First name
              <input
                name="name"
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Last name
              <input
                name="name"
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Email
              <input
                name="name"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span>
            <label class="fieldLabel">
              Password
              <input
                name="name"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
          </span>
        </div>
        <div class="inputField">
          <span id="quantityInput">
            <label class="fieldLabel">
              Permissions
              <select
                name="unit"
                onChange={(e) => setAdminPermissions(e.target.value)}
                style={{ width: "85px", marginTop: "5px" }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </span>
        </div>
        <div
          className="pageActionContainer"
          style={{ marginRight: "18px", marginTop: "35px" }}
        >
          <button id="pageAction" onClick={addUser}>
            Add +
          </button>
        </div>
      </form>
    </Dialog>
  );
}

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

AddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const Home = () => {
  const [userRows, setUserRows] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [addSelectedValue, setAddSelectedValue] = React.useState(null);
  const [editSelectedValue, setEditSelectedValue] = React.useState(null);
  const [deleteSelectedValue, setDeleteSelectedValue] = React.useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState("noRequest");

  useEffect(() => {
    console.log(response);
  }, [response]);

  useEffect(() => {
    const getAllUsers = async () => {
      api
        .get("/users")
        .then((response) => {
          setUserRows(response.data);
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllUsers();
  }, []);

  const openEditDialog = (index) => {
    setEditSelectedValue(index);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (index) => {
    setDeleteSelectedValue(index);
    setDeleteDialogOpen(true);
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleAddClose = (value) => {
    setAddDialogOpen(false);
    setAddSelectedValue(value);
  };

  const handleDeleteClose = (value) => {
    setDeleteDialogOpen(false);
    setDeleteSelectedValue(value);
  };

  const handleEditClose = (value) => {
    setEditDialogOpen(false);
    setEditSelectedValue(value);
  };

  const handleChatGptRequest = async () => {
    setLoading("request");
    await api
      .post("/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
    setLoading("logged");
    setPrompt("");
  };

  const onInputChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", mt: 3, pl: 4, paddingRight: "30px" }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Welcome Home! You can manage users below.
        </Typography>
        <button id="createAdminAction" onClick={openAddDialog}>
          Create User
        </button>
      </Box>
      <Box sx={{ m: 4 }}>
        <TableContainer
          component={Paper}
          sx={{
            background: "#f0f0f0",
            color: "#000000",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRows !== null &&
                userRows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{"********"}</TableCell>
                    <TableCell>{row.isadmin ? "Admin" : "User"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => openEditDialog(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openDeleteDialog(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {userRows === null && (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          ml: 4,
          mr: 4,
          mt: 2,
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ask ChatGPT Bot
        </Typography>
        <input
          placeholder="Ask anything!"
          id="askGpt"
          name="username"
          onChange={onInputChange}
        ></input>
        <button id="pageAction" onClick={handleChatGptRequest}>
          Ask
        </button>
        <Typography sx={{ mt: 2 }}>
          {loading === "request"
            ? "loading..."
            : loading === "noRequest"
            ? ""
            : "Response logged to console!"}
        </Typography>
      </Box>
      <EditDialog
        open={editDialogOpen}
        selectedValue={editSelectedValue}
        onClose={handleEditClose}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        selectedValue={deleteSelectedValue}
        onClose={handleDeleteClose}
      />
      <AddDialog
        open={addDialogOpen}
        selectedValue={addSelectedValue}
        onClose={handleAddClose}
      />
    </Box>
  );
};
export default Home;
