//importing packages
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../dbPool/createPool");
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

//functionalities
// const signUp = async (req, res) => {
//   try{
//     createRegisterationSchema();
//   } catch(err){
//     console.log(err);
//   }

//   const { username, password, email, role } = req.body;

//   // Input validation (basic)
//   if (!username || !password || !email || !role) {
//     return res.status(400).json({ error: "Please fill in all fields" });
//   }

//   let hashedPassword;
//   try {
//     hashedPassword = await bcrypt.hash(password, 10);
//   } catch (err) {
//     console.log(err);
//   }
//   // SQL query to insert a new user
//   const query = `INSERT INTO registeration (username,password,email,role) VALUES (?, ?, ?,?)`;

//   // Execute the query with user data
//   db.query(query, [username, hashedPassword, email, role], (err, results) => {
//     if (err) {
//       console.error("Error Signing Up", err);
//       return res
//         .status(500)
//         .json({ message: "Failed to register user", error: err });
//     }

//     // Send success response
//     res.status(201).json({
//       message: "User registered successfully",
//       userId: results.insertId,
//     });
//   });
// };
//signup//
const signUp = async (req, res) => {
  try {
    // try {
    //   createRegistrationSchema();
    // } catch (err) {
    //   console.log(err);
    // }
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
      userQuery = `Select studentID from students where email = ?`;
    } else {
      userQuery = `Select teacherID from teachers where email = ?`;
    }
    //db query for checking user exists in student or supervisor table
    db.query(userQuery , [email] , async (err,results)=>{
      //handling validation error
      if(err){
        console.error("Error Validating user:",err);
        return res.status(500).json({message:"server error during validation"});
      }
      //error if no user exist with email provided
      if(results.length===0){
        return res.status(404).json({error:`${role} not found in the database`});
      }

      let userId;
      let insertQuery;
      if(userRole === 'student')
      {
        userId = results[0].studentID;
        insertQuery=`INSERT INTO registration (userName , hashedPassword , email , userRole , fypStudentID) VALUES (?, ?, ?, ? ,?)`;
      }
      else
      {
        userId = results[0].teacherID;
        insertQuery=`INSERT INTO registration (userName , hashedPassword , email , userRole , supervisorID) VALUES (?, ?, ? ,? ,?)`;
      }
      //encrypting password
      let hashedPassword;
      try{
        hashedPassword=await bycrpt.hash(password,10);
      }
      catch(err){
        //error handling for encrypting the password
        console.error("Error hashing Password: ",err);
        return res.status(500).json({message:"error hashing password"});
      }
      //query for inserting user data into the registrtation table
      
      db.query(insertQuery,[username ,hashedPassword , email   , role , userId ] ,  (err,result)=>{
        if(err){
          //error while registrting user or inserting user into registration
          console.error("error inserting into registration table: ",err);
          return res.status(500).json({message:"Failed to register user",error:err});
        }
        //user successfully added into registrtaion table
        res.status(201).json({
          message:"User registered successfully",
          userId:result.insertId,
        });
      });
    });

  } catch (err) {
    //error while running this function 
    console.errror("unexpected error during sign-up: ",err);
    res.status(500).json({message:"Unexpected server error",error:err});
  }
};

const signIn = async (req, res) => {
  const { email, password, role } = req.body;

  // Query the database
  const query = "SELECT * FROM registration WHERE email = ? and userRole = ?";

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
