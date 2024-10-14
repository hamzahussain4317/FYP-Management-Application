//importing packages
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "myKey";
const db = require("../models/registeration");

//functionalities
const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  // Input validation (basic)
  if (!username || !password || !email) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert a new user
    const query = `INSERT INTO registeration (username,password,email) VALUES (?, ?, ?)`;

    // Execute the query with user data
    const [results] = await db.query(query, [username, hashedPassword, email]);

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      userId: results.insertId,
    });
  } catch (err) {
    console.error("Error Signing Up", err);
    return res.status(500).json({ message: "Failed to register user" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Query the database
  const query = "SELECT * FROM registeration WHERE email = ?";

  try {
    const [results] = await db.query(query, [email]);

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ message: "Database query execution failed" });
  }
};

//exporting module functions
module.exports = {
  signUp,
  signIn,
};
