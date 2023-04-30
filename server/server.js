require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Check if user has an account
app.post("/api/v1/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUserExists = await db.query(
      `SELECT * FROM users WHERE username='${username}' AND pword='${password}';`
    );
    if (checkUserExists.rowCount == 1) {
      res.status(200).json({
        status: "success",
        isAuthed: true,
        token: "isAuthed",
      });
    } else {
      res.status(200).json({
        status: "success",
        isAuthed: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
