const io = require("../index"); // Import the io instance

// Join a room dynamically
exports.joinRoom = (socket, conversationId) => {
  socket.join(conversationId);
  console.log(`User with socket ID ${socket.id} joined room ${conversationId}`);
};

// Send a message to a specific room
exports.sendMessage = (socket, data) => {
  const { conversationId, message } = data;
  io.to(conversationId).emit("receiveMessage", message); // Broadcast message to the room
  console.log(`Message sent to room ${conversationId}:`, message);
};

// Handle user disconnection
exports.handleDisconnect = (socket) => {
  console.log(`User disconnected: ${socket.id}`);
};
