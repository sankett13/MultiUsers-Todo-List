const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const saltRound = 10;
const secret_key = "jdfjgjughuajfnweghyhcnkjfkpokmkmjnjsfjwnfdmnv";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.header.authorization.split(" ")[1];
  console.log("Token from cookie:", token);

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.id;
    console.log("Decoded user ID:", decoded.id);
    next();
  });
};

// Routes

//signup
app.post("/signup", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await pool.query(
      "INSERT INTO user_info (username, password, name) VALUES($1, $2, $3) RETURNING *",
      [username, hashedPassword, name]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const okuser = await pool.query(
      "SELECT * FROM user_info WHERE username = $1",
      [username]
    );

    if (okuser.rows.length > 0) {
      const validPassword = await bcrypt.compare(
        password,
        okuser.rows[0].password
      );
      if (validPassword) {
        const token = jwt.sign({ id: okuser.rows[0].id }, secret_key, {
          expiresIn: "1h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
        });
        res.status(200).json({ message: "Successful" });
      } else {
        res.status(400).json({ error: "Invalid username or password" });
      }
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//create a todo

app.post("/todos", verifyToken, async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.userId;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, user_id) VALUES($1, $2) RETURNING *",
      [description, userId]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log("Error adding todo:", error.message);
    res.status(500).json({ error: "An error occurred while adding the todo" });
  }
});

//show all todo
app.get("/todos", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    const allTodo = await pool.query("SELECT * FROM todo WHERE user_id=$1", [
      userId,
    ]);

    res.json(allTodo.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred while retrieving todos" });
  }
});

//to get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the todo" });
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
    res.json("Todo was updated");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo" });
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the todo" });
  }
});

app.post("/logout", (req, res) => {
  console.log("Cookie cleared");
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout successful" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
