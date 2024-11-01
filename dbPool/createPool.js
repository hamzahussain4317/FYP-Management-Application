const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "22K4318hamdan",
  database: "fyp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//As from here we are returning promise so while using this promise use try-catch block and also await for results
module.exports = db;

