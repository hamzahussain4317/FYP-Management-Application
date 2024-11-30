const { Server } = "socket.io";
const { handleSocketEvents } = "./controllers/notificationController";

const initSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    handleSocketEvents(io, socket);
  });
};

module.exports = initSocket;
