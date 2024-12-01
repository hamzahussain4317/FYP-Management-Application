const socketController = require("../controllers/socketController");

const socketRouter = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.user);

    // Handle room joining
    socket.on("joinConversation", (conversationId) => {
      socketController.joinRoom(socket, conversationId);
    });

    // Handle message sending
    socket.on("sendMessage", (data) => {
      socketController.sendMessage(socket, data);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      socketController.handleDisconnect(socket);
    });
  });
};

module.exports = { socketRouter };
