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

const axios = require("axios");
const api = axios.create({
  baseURL: config,
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
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleClose}>
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
      <DialogTitle>Edit User Details Below</DialogTitle>
      <Stack sx={{ ml: 3, mb: 3 }}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <TextField
          id="first_name"
          label="First Name"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <TextField
          id="last_name"
          label="Last Name"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={editUser}
          sx={{ mt: 2, maxWidth: "135px" }}
        >
          Submit
        </Button>
      </Stack>
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
      <DialogTitle>Input User Details Below</DialogTitle>
      <Stack sx={{ ml: 3, mb: 3 }}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="first_name"
          label="First Name"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="last_name"
          label="Last Name"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          sx={{ mt: 2, maxWidth: "200px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={addUser}
          sx={{ mt: 2, maxWidth: "135px" }}
        >
          Submit
        </Button>
      </Stack>
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    await api
      .post("/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
    setPrompt("");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", mt: 3, pl: 4, pr: 3 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Welcome Home Admin! You can manage users below.
        </Typography>
        <Button variant="contained" onClick={openAddDialog}>
          Create User
        </Button>
      </Box>
      <Box sx={{ m: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
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
        <TextField
          placeholder="Ask anything!"
          id="prompt"
          variant="outlined"
          sx={{ maxWidth: "200px", mr: 2 }}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        ></TextField>
        <Button variant="contained" onClick={handleChatGptRequest}>
          Ask
        </Button>
        <Typography sx={{ mt: 2 }}>
          {loading ? "loading..." : "Response logged to console!"}
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
