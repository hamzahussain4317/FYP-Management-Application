require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const app = express();

const auth = require("./routes/auth");
const student=require("./routes/student")

const pool = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "22k4317hamza",
  database: "fyp",
});

pool.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  }
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", auth);
app.use("/student",student);

module.exports = pool;
