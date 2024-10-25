require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const app = express();

const auth = require("./routes/auth");
const pool = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "22K4318hamdan",
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

module.exports = pool;
app.locals.pool = pool;
