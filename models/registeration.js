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

const registerationSchema = `CREATE TABLE IF NOT EXISTS Registeration(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(10) CHECK (role IN ('student','teacher')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(registerationSchema, (err, result) => {
  if (err) {
    console.log("Error creating Registeration table", err);
  }
});

//As from here we are returning promise so while using this promise use try-catch block and also await for results
module.exports = db.promise();
