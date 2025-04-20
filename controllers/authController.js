//importing packages
require("dotenv").config();
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../dbPool/createPool.js");
const registrationSchemaQuery = require("../models/registeration");

const createRegistrationSchema = () => {
  db.query(registrationSchemaQuery, (err, res) => {
    if (err) {
      console.log(err);
      return res.json({ message: "Error while creating schema", error: err });
    }
    console.log("Create Query Exexcuted Successfully");
  });
};

//signup//
const signUp = async (req, res) => {
  try {
    //check user enters all fields//
    const { username, password, email, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ err: "please fill in all fields" });
    }
    //validation role
    const userRole = role;
    let userQuery;
    if (userRole !== "student" && userRole !== "teacher") {
      return res.status(400).json({ err: "Invalid role specified" });
    } else if (userRole === "student") {
      userQuery = `Select studentID , studentName from students where email = ?`;
    } else {
      userQuery = `Select teacherID ,firstName , lastName from teachers where email = ?`;
    }
    //db query for checking user exists in student or supervisor table
    db.query(userQuery, [email], async (err, results) => {
      //handling validation error
      if (err) {
        console.error("Error Validating user:", err);
        return res
          .status(500)
          .json({ message: "server error during validation" });
      }
      //error if no user exist with email provided
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: `${role} not found in the database` });
      }
      if (role === "student") {
        if (results[0].studentName.toLowerCase() !== username.toLowerCase()) {
          return res
            .status(400)
            .json({ message: "enter the correct student name" });
        }
      } else if (role === "teacher") {
        if (username !== `${results[0].firstName} ${results[0].lastName}`) {
          return res
            .status(400)
            .json({ message: "enter the correct teacher name" });
        }
      }
      let userId;
      let insertQuery;
      if (userRole === "student") {
        userId = results[0].studentID;
        insertQuery = `INSERT INTO registration (userName , hashedPassword , email , userRole , fypStudentID) VALUES (?, ?, ?, ? ,?)`;
      } else {
        userId = results[0].teacherID;
        insertQuery = `INSERT INTO registration (userName , hashedPassword , email , userRole , supervisorID) VALUES (?, ?, ? ,? ,?)`;
      }
      //encrypting password
      let hashedPassword;
      try {
        hashedPassword = await bycrpt.hash(password, 10);
      } catch (err) {
        //error handling for encrypting the password
        console.error("Error hashing Password: ", err);
        return res.status(500).json({ message: "error hashing password" });
      }
      //query for inserting user data into the registrtation table

      db.query(
        insertQuery,
        [username, hashedPassword, email, role, userId],
        (err, result) => {
          if (err) {
            //error while registrting user or inserting user into registration
            console.error("error inserting into registration table: ", err);
            return res
              .status(500)
              .json({ message: "Failed to register user", error: err });
          }
          //user successfully added into registrtaion table
          res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    });
  } catch (err) {
    //error while running this function
    console.errror("unexpected error during sign-up: ", err);
    res.status(500).json({ message: "Unexpected server error", error: err });
  }
};

const signIn = async (req, res) => {
  const { email, password, role } = req.body;
  let query;
  if (role === "student") {
    query = ` SELECT registration.*, students.studentID as userId  FROM registration LEFT JOIN students ON registration.email = students.email  WHERE registration.email = ? AND registration.userRole = ?;`;
  } else if (role === "teacher") {
    query = ` SELECT registration.*, teachers.teacherID as userId FROM registration   LEFT JOIN teachers ON registration.email = teachers.email  WHERE registration.email = ? AND registration.userRole = ?`;
  }

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
      isMatch = await bycrpt.compare(password, user.hashedPassword);
    } catch (err) {
      console.log(err);
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    //JWT generation
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(
      { userId: user.id, role: user.userRole },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const userId = user.userId;
    res.status(201).json({ message: "Logged in successfully", token, userId });
  });
};

const adminSignIn = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ err: "please fill in all fields" });
  }

  const adminName = process.env.ADMIN_NAME || "admin";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@fyp.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "12345678";

  if (adminName !== username) {
    return res.status(401).json({ message: "Incorrect username" });
  } else if (adminEmail !== email) {
    return res.status(401).json({ message: "Incorrect email" });
  } else if (adminPassword !== password) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign({ userName: username, role: "admin" }, SECRET_KEY, {
    expiresIn: "2h",
  });
  res
    .status(201)
    .json({ message: "Logged in successfully", token, role: "admin" });
};
//exporting module functions
module.exports = {
  signUp,
  signIn,
  adminSignIn,
};
