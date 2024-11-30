require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const http = require("http");
const cors = require("cors");

const db = require("./dbPool/createPool");
const initSocket = require("./socket");

const auth = require("./routes/auth");
const student = require("./routes/student");
const supervisor = require("./routes/supervisor");

const app = express();
//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "22k4317hamza",
  database: "fyp",
  multipleStatements: true,
});

app.use(morgan("dev"));

app.use("/auth", auth);
app.use("/student", student);
app.use("/supervisor", supervisor);

const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start the Server and Check DB Connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to MySQL database");
    connection.release(); // Release the connection back to the pool

    const PORT = 3001;
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

module.exports = db;
