//importing packages
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbPool = require("../db/pool.js");
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
// const signUp = async (req, res) => {
//   try {
//     //check user enters all fields//
//     const { username, password, email, role } = req.body;
//     if (!username || !email || !password || !role) {
//       return res.status(400).json({ err: "please fill in all fields" });
//     }
//     //validation role
//     const userRole = role;
//     let userQuery;
//     if (userRole !== "student" && userRole !== "teacher") {
//       return res.status(400).json({ err: "Invalid role specified" });
//     } else if (userRole === "student") {
//       userQuery = `SELECT "studentID", "studentName" FROM "students" WHERE "email" = $1`;
//     } else {
//       userQuery = `SELECT "teacherID", "firstName", "lastName" FROM "teachers" WHERE "email" = $1`;
//     }
//     //db query for checking user exists in student or supervisor table
//     dbPool.query(userQuery, [email], async (err, results) => {
//       //handling validation error
//       if (err) {
//         console.error("Error Validating user:", err);
//         return res
//           .status(500)
//           .json({ message: "server error during validation", });
//       }
//       //error if no user exist with email provided
//       if (results.length === 0) {
//         return res
//           .status(404)
//           .json({ error: `${role} not found in the database` });
//       }
//       if (role === "student") {
//         if (results[0].studentName.toLowerCase() !== username.toLowerCase()) {
//           return res
//             .status(400)
//             .json({ message: "enter the correct student name" });
//         }
//       } else if (role === "teacher") {
//         if (username !== `${results[0].firstName} ${results[0].lastName}`) {
//           return res
//             .status(400)
//             .json({ message: "enter the correct teacher name" });
//         }
//       }
//       let userId;
//       let insertQuery;
//       if (userRole === "student") {
//         userId = results[0].studentID;
//         insertQuery = `INSERT INTO "registration" ("userName", "hashedPassword", "email", "userRole", "fypStudentID") VALUES ($1, $2, $3, $4, $5)`;
//       } else {
//         userId = results[0].teacherID;
//         insertQuery = `INSERT INTO "registration" ("userName", "hashedPassword", "email", "userRole", "supervisorID") VALUES ($1, $2, $3, $4, $5)`;
//       }
//       //encrypting password
//       let hashedPassword;
//       try {
//         hashedPassword = await bycrpt.hash(password, 10);
//       } catch (err) {
//         //error handling for encrypting the password
//         console.error("Error hashing Password: ", err);
//         return res.status(500).json({ message: "error hashing password" });
//       }
//       //query for inserting user data into the registrtation table

//       dbPool.query(
//         insertQuery,
//         [username, hashedPassword, email, role, userId],
//         (err, result) => {
//           if (err) {
//             //error while registrting user or inserting user into registration
//             console.error("error inserting into registration table: ", err);
//             return res
//               .status(500)
//               .json({ message: "Failed to register user", error: err });
//           }
//           //user successfully added into registrtaion table
//           res.status(201).json({
//             message: "User registered successfully",
//             userId: result.insertId,
//           });
//         }
//       );
//     });
//   } catch (err) {
//     //error while running this function
//     console.errror("unexpected error during sign-up: ", err);
//     res.status(500).json({ message: "Unexpected server error", error: err });
//   }
// };

const signUp = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ err: "Please fill in all fields" });
    }

    const userRole = role;
    let userQuery;
    if (userRole !== "student" && userRole !== "teacher") {
      return res.status(400).json({ err: "Invalid role specified" });
    } else if (userRole === "student") {
      userQuery = `SELECT "studentid", "studentname" FROM "students" WHERE "email" = $1`;
    } else {
      userQuery = `SELECT "teacherid", "firstname", "lastname" FROM "teachers" WHERE "email" = $1`;
    }

    dbPool.query(userQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error Validating user:", err);
        return res
          .status(500)
          .json({ message: "Server error during validation" });
      }

      if (results.rows.length === 0) {
        return res
          .status(404)
          .json({ error: `${role} not found in the database` });
      }

      const user = results.rows[0];

      if (role === "student") {
        if (user.studentname.toLowerCase() !== username.toLowerCase()) {
          return res
            .status(400)
            .json({ message: "Enter the correct student name" });
        }
      } else if (role === "teacher") {
        const fullName = `${user.firstname} ${user.lastname}`;
        if (username !== fullName) {
          return res
            .status(400)
            .json({ message: "Enter the correct teacher name" });
        }
      }

      let userId;
      let insertQuery;

      if (userRole === "student") {
        userId = user.studentid;
        insertQuery = `INSERT INTO "registration" ("username", "hashedpassword", "email", "userrole", "fypstudentid") VALUES ($1, $2, $3, $4, $5)`;
      } else {
        userId = user.teacherid;
        insertQuery = `INSERT INTO "registration" ("username", "hashedpassword", "email", "userrole", "supervisorid") VALUES ($1, $2, $3, $4, $5)`;
      }

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        console.error("Error hashing Password: ", err);
        return res.status(500).json({ message: "Error hashing password" });
      }


      dbPool.query(
        insertQuery,
        [username, hashedPassword, email, role, userId],
        (err, result) => {
          if (err) {
            console.error("Error inserting into registration table: ", err);
            return res
              .status(500)
              .json({ message: "Failed to register user", error: err });
          }

          res.status(201).json({
            message: "User registered successfully",
          });
        }
      );
    });
  } catch (err) {
    console.error("Unexpected error during sign-up: ", err);
    res.status(500).json({ message: "Unexpected server error", error: err });
  }
};

const signIn = async (req, res) => {
  const { email, password, role } = req.body;
  let query;
  if (role === "student") {
    query = ` SELECT registration.*, students."studentid" as userId  FROM "registration" LEFT JOIN "students" ON registration."email" = students."email"  WHERE registration."email" = $1 AND registration."userrole" = $2;`;
  } else if (role === "teacher") {
    query = ` SELECT registration.*, teachers."teacherid" as userId FROM "registration"   LEFT JOIN "teachers" ON registration."email" = teachers."email"  WHERE registration."email" = $1 AND registration."userrole" = $2`;
  }

  dbPool.query(query, [email, role], async (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "Database query execution failed" });
    }

    const user = results.rows[0];
    user.hashedpassword = user.hashedpassword.trim();
    console.log("our user: ", user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered.Please check credentials" });
    }

    let isMatch;
    console.log(user.hashedpassword,"hello")
    console.log(password)
    try {
      isMatch = await bcrypt.compare(password, user.hashedpassword);
    } catch (err) {
      console.log(err);
    }
    console.log("isMatch: ", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    //JWT generation
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(
      { userId: user.userid, role: user.userrole },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const userId = user.userid;
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
