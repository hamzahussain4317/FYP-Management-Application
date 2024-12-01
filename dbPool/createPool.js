const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "22K4318hamdan",
  database: "fyp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

// (async () => {
//   try {
//     const connection = await db.getConnection();
//     console.log("Connected to MySQL database");
//     connection.release();
//   } catch (err) {
//     console.error("Error connecting to MySQL:", err);
//   }
// })();

module.exports = db;
