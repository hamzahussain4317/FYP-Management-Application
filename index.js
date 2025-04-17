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
const messages = require("./routes/messages");
const admin = require("./routes/admin.cjs");
const { socketRouter } = require("./routes/socket.js");

const app = express();
//Creating Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//middlewares for http-requests using express app
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH",
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
app.use("/messages", messages);
app.use("/admin", admin);

// middleware for authentication for socket
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token; //retrieve token from the client
//   if (isValidToken(token)) {
//     // attach user info to the socket for further use
//     socket.user = decoded;
//     next();
//   } else {
//     next(new Error("Authentication error"));
//   }
// });

//socket route handler
socketRouter(io);

// db connection check and server start
(async () => {
  db.getConnection((err, connection) => {
    if (err) console.error("Error connecting to the database:", err);

    console.log("Connected to MySQL database");
    const PORT = 5000 | process.env.SOCKET_PORT;
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      // connection.release();
    });
  });
})();

module.exports = io;
