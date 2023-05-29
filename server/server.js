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
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      prompt: prompt,
    });
    return res.send(response.data.choices[0].text);
  } catch (err) {
    console.error(err);
  }
});

// Check if user has an account
app.post("/api/v1/users", async (req, res) => {
  try {
    const { username, pword } = req.body;
    const checkUserExists = await db.query(
      `SELECT * FROM users WHERE username='${username}' AND pword='${pword}';`
    );
    if (checkUserExists.rowCount == 1) {
      res.status(200).json({
        status: "success",
        isAuthed: true,
        token: "isAuthed",
        uid: checkUserExists.rows.at(0).id,
        isadmin: checkUserExists.rows.at(0).isadmin,
      });
    } else {
      res.status(401).json({
        status: "failure",
        isAuthed: false,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// Retrieve list of all users for admin page
app.get("/api/v1/users", async (req, res) => {
  try {
    const allUsers = await db.query("SELECT * FROM users;");
    res.status(200).json(allUsers.rows);
  } catch (err) {
    console.error(err);
  }
});

// Retrieve one user based off an ID
app.post("/api/v1/user", async (req, res) => {
  try {
    const id = req.body.id;
    const allUsers = await db.query(`SELECT * FROM users WHERE id=${id};`);
    res.status(200).json(allUsers.rows);
  } catch (err) {
    console.error(err);
  }
});

// Add a user based on given input
app.post("/api/v1/adduser", async (req, res) => {
  try {
    const { username, first_name, last_name, email, pword, isAdmin } = req.body;
    const checkUserExists = await db.query(
      `SELECT * FROM users WHERE email='${email}' OR username = '${username}';`
    );
    if (checkUserExists.rowCount > 0) {
      res.status(204).json({
        status: "Error creating user",
      });
    } else {
      await db.query(
        `INSERT INTO users (username, first_name, last_name, email, pword, isAdmin) values ('${username}', '${first_name}', '${last_name}', '${email}', '${pword}', '${isAdmin}');`
      );
      res.status(200).json({
        status: "success",
      });
    }
  } catch (err) {
    console.error(err);
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
    console.error(err);
  }
});

// Update a user based on a given ID
app.put("/api/v1/users", async (req, res) => {
  try {
    const { id, username, first_name, last_name, email, pword, isAdmin } =
      req.body;
    await db.query(
      `UPDATE users SET username='${username}', first_name='${first_name}', last_name='${last_name}', email='${email}', pword='${pword}', isAdmin='${isAdmin}' WHERE id='${id}';`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/v1/addfood", async (req, res) => {
  try {
    const { userID, name, amount, dateAdded, expiryDate } = req.body;
    const intAmount = amount.substring(0, amount.indexOf("/"));
    const units = amount.substring(amount.indexOf("/") + 1);
    await db.query(
      `INSERT INTO inventory (user_id, description, date_added, expiry_date, amount, units) values ('${userID}', '${name}', '${dateAdded}', '${expiryDate}', '${intAmount}', '${units}');`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/v1/getfood", async (req, res) => {
  try {
    const { userID } = req.query;
    const allFood = await db.query(
      `select user_id, product_id as id, description, amount, date_added, expiry_date, units from inventory WHERE user_id=${userID};`
    );
    res.status(200).json({
      status: "success",
      food: allFood.rows,
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/v1/getfood/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await db.query(
      `SELECT user_id, product_id AS id, description, amount, date_added, expiry_date, units FROM inventory WHERE product_id = ${id};`
    );
    res.status(200).json({
      status: "success",
      food: foodItem.rows[0],
    });
  } catch (err) {
    console.error(err);
  }
});


app.get("/api/v1/getfoodpref/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foodPref = await db.query(
      `SELECT * FROM users WHERE id = ${id};`
    );
    res.status(200).json({
      status: "success",
      data: foodPref.rows[0] === undefined ? [] : foodPref.rows[0]
    });
  } catch (err) {
    console.error(err);
  }
});

const convertToSQLArray = (array) => {
  let stringBuilder = "{";

  for (let i = 0; i < array.length; i++){
    stringBuilder += array[i];
    if (i < array.length - 1){
      stringBuilder += ",";
    }
  }
  stringBuilder += "}";
  return stringBuilder;
}

app.post("/api/v1/addfoodpref/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {totalFoodPref} = req.body;
    const convertedFoodPref = convertToSQLArray(totalFoodPref);
    console.log(totalFoodPref);
    await db.query(
      `UPDATE users SET foodPref = '${convertedFoodPref}' WHERE id = ${id};`
    );
    res.status(200).json({
      status: "success"
    });
  } catch (err) {
    console.error(err);
  }
});

app.delete("/api/v1/deletefood/:user_id/:product_id", async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    await db.query(
      `DELETE FROM inventory
        WHERE user_id = ${user_id} and product_id = '${product_id}';`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.delete("/api/v1/deleterecipe/:user_id/:recipe_id", async (req, res) => {
  try {
    const { user_id, recipe_id } = req.params;
    await db.query(
      `DELETE FROM recipe_book
        WHERE user_id = ${user_id} and id = '${recipe_id}';`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/api/v1/updatefood/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userID, name, amount, dateAdded, expiryDate } = req.body;
    const intAmount = amount.substring(0, amount.indexOf("/"));
    const units = amount.substring(amount.indexOf("/") + 1);
    await db.query(
      `UPDATE inventory 
      SET user_id = '${userID}', 
          description = '${name}', 
          date_added = '${dateAdded}', 
          expiry_date = '${expiryDate}', 
          amount = '${intAmount}', 
          units = '${units}'
      WHERE product_id = ${id};`
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/v1/getrecipes", async (req, res) => {
  try {
    const { userID, onlyComplete } = req.query;

    // gets all recipes
    if (onlyComplete === "false") {
      const allRecipes = await db.query(
        `SELECT id, user_id, title, ingredients, instructions, date_added FROM recipe_book WHERE user_id = ${userID};`
      );
      res.status(200).json({
        status: "success",
        recipes: allRecipes.rows,
      });
    }

    // gets only complete recipes (those without missing ingredients)
    else {
      const allRecipes = await db.query(
        `SELECT id, user_id, title, ingredients, instructions, date_added FROM recipe_book WHERE user_id = ${userID}`
      );
      res.status(200).json({
        status: "success",
        recipes: allRecipes.rows,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/v1/addrecipe", async (req, res) => {
  try {
    const { user_id, title, ingredients, instructions, date_added } = req.body;

    await db.query(
      `INSERT INTO recipe_book (user_id, title, ingredients, instructions, date_added)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        user_id,
        title,
        JSON.stringify(ingredients),
        JSON.stringify(instructions),
        date_added,
      ]
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
