//importing packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../dbPool/createPool");
const registerationSchemaQuery = require("../models/registeration");

const createRegisterationSchema = () => {
  db.query(registerationSchemaQuery, (err, res) => {
    if (err) {
      console.log(err);
      return res.json({ message: "Error while creating schema", error: err });
    }
    console.log("Create Query Exexcuted Successfully");
  });
};

//functionalities
const signUp = async (req, res) => {
  createRegisterationSchema();

  const { username, password, email, role } = req.body;

  // Input validation (basic)
  if (!username || !password || !email || !role) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }
  // SQL query to insert a new user
  const query = `INSERT INTO registeration (username,password,email,role) VALUES (?, ?, ?,?)`;

  // Execute the query with user data
  db.query(query, [username, hashedPassword, email, role], (err, results) => {
    if (err) {
      console.error("Error Signing Up", err);
      return res
        .status(500)
        .json({ message: "Failed to register user", error: err });
    }

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      userId: results.insertId,
    });
  });
};

const signIn = async (req, res) => {
  const { email, password, role } = req.body;

  // Query the database
  const query = "SELECT * FROM registeration WHERE email = ? and role = ?";

  db.query(query, [email, role], async (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "Database query execution failed" });
    }

    const user = results[0];
    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered.Please check credentials" });
    }

    let isMatch;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.log(err);
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    //JWT generation
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Logged in successfully", token });
  });
};

//exporting module functions
module.exports = {
  signUp,
  signIn,
};
