require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

// Request for chatgpt
app.post("/api/v1/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 100,
      prompt: prompt,
    });
    return res.send(response.data.choices[0].text);
  } catch (err) {
    console.log(error);
  }
});

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

// Retrieve list of all users for admin page
app.get("/api/v1/users", async (req, res) => {
  try {
    const allUsers = await db.query("SELECT * FROM users;");
    res.status(200).json(allUsers.rows);
  } catch (err) {
    console.log(err);
  }
});

// Retrieve one user based off an ID
app.post("/api/v1/user", async (req, res) => {
  try {
    const id = req.body.id;
    const allUsers = await db.query(`SELECT * FROM users WHERE id=${id};`);
    res.status(200).json(allUsers.rows);
  } catch (err) {
    console.log(err);
  }
});

// Add a user based on given input
app.post("/api/v1/adduser", async (req, res) => {
  try {
    const { username, first_name, last_name, email, pword } = req.body;
    const checkUserExists = await db.query(
      `SELECT * FROM users WHERE email='${email}';`
    );
    if (checkUserExists.rowCount > 0) {
      res.status(204).json({
        status: "Error creating user",
      });
    } else {
      await db.query(
        `INSERT INTO users (username, first_name, last_name, email, pword) values ('${username}', '${first_name}', '${last_name}', '${email}', '${pword}');`
      );
      res.status(200).json({
        status: "success",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Delete a user based on a given ID
app.delete("/api/v1/users", async (req, res) => {
  try {
    const { id } = req.body;
    await db.query(`DELETE FROM users WHERE id=${id};`);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a user based on a given ID
app.put("/api/v1/users", async (req, res) => {
  try {
    const { id, username, first_name, last_name, email, pword } = req.body;
    await db.query(
      `UPDATE users SET username='${username}', first_name='${first_name}', last_name='${last_name}', email='${email}', pword='${pword}' WHERE id='${id}';`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
