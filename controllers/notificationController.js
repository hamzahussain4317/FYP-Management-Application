// const insertMessage = require("../models/messageModel");

export const handleSocketEvents = (io, socket) => {
  console.log("A user connected:", socket.id);

  // Join a conversation room
  socket.on("joinConversation", (conversationID) => {
    socket.join(conversationID);
    console.log(`User joined conversation: ${conversationID}`);
  });

  // Handle sending a message
  socket.on("sendMessage", async (message) => {
    console.log("New message received:", message);

    const {
      senderID,
      senderRole,
      receiverID,
      receiverRole,
      groupID,
      contentID,
      conversationID,
    } = message;

    // Save the message to the database
    try {
      await insertMessage(
        conversationID,
        senderID,
        senderRole,
        groupID || null,
        contentID
      );

      // Emit the message to all participants in the room
      io.to(conversationID).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
};
