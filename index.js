require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const db = require("./dbPool/createPool.js");
const { isValidToken } = require("./middlewares/validations.js");

const auth = require("./routes/auth");
const student = require("./routes/student");
const supervisor = require("./routes/supervisor");
const { socketRouter } = require("./routes/socket.js");

const app = express();
//Creating Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//middlewares for http-requests using express app
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
app.use(morgan("dev"));

// dynamic routes for http-requests using express app
app.use("/auth", auth);
app.use("/student", student);
app.use("/supervisor", supervisor);

// middleware for authentication for socket
io.use((socket, next) => {
  const token = socket.handshake.auth.token; //retrieve token from the client
  if (isValidToken(token)) {
    // attach user info to the socket for further use
    socket.user = decoded;
    next(); // Proceed with the connection
  } else {
    next(new Error("Authentication error")); // Reject the connection
  }
});

socketRouter(io);

// Start the Server and Check DB Connection
(async () => {
  db.getConnection((err, connection) => {
    if (err) console.error("Error connecting to the database:", err);

    console.log("Connected to MySQL database");
    const PORT = 3001 | process.env.PORT;
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      connection.release();
    });
  });
})();

module.exports = io;
