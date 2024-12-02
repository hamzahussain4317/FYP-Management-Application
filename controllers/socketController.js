const io = require("../index");

const socketController = {
  joinRoom: async (socket, conversationId) => {
    socket.join(conversationId);
    console.log(
      `User with socket ID ${socket.id} joined room ${conversationId}`
    );
  },

  // Send a message to a specific room
  sendMessage: async (socket, data) => {
    const {
      senderID,
      senderRole,
      groupID,
      messageType,
      textContent,
      filePath,
      imagePath,
      receiverID,
      receiverRole,
    } = data;

    try {
      const insertIntoMessageContent =
        "INSERT INTO MessageContent (messageType, textContent, filePath, imagePath) VALUES (?, ?, ?, ?)";

      const [contentResult] = await db.execute(insertIntoMessageContent, [
        messageType,
        textContent,
        filePath,
        imagePath,
      ]);

      const contentID = contentResult.insertId;

      const insertIntoMessage =
        "INSERT INTO Message (senderID, senderRole, groupID, contentID) VALUES (?, ?, ?, ?)";

      const [messageResult] = await db.execute(insertIntoMessage, [
        senderID,
        senderRole,
        groupID,
        contentID,
      ]);

      const messageID = messageResult.insertId;

      const insertIntoConversation =
        "INSERT INTO Conversation (conversationID, receiverID, receiverRole) VALUES (?, ?, ?)";
      await db.execute(insertIntoConversation, [
        messageID,
        receiverID,
        receiverRole,
      ]);

      const insertIntoNotification =
        "INSERT INTO Notification (conversationID) VALUES (?)";
      await db.execute(insertIntoNotification, [messageID]);

      let selectQuery;
      if (tolower(senderRole) === "student")
        selectQuery = "select studentName from students where studentID = ?";
      else selectQuery = "select teacherName from students where teacherID = ?";

      const [results] = await db.execute(selectQuery, [senderID]);
      let senderName;
      if (tolower(senderRole) === "student")
        senderName = results[0].studentName;
      else studentName = results[0].teacherName;

      const messageData = {
        senderID,
        senderRole,
        senderName,
        messageType,
        textContent,
        filePath,
        imagePath,
        createdAt: new Date(),
      };
      socket.to(messageID).emit("receiveMessage", messageData);

      // const notificationData = {};
      // socket.io(notificationId).emit("receiveNotification", notificationData);

      console.log("Message sent successfully:", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },

  // Handle user disconnection
  handleDisconnect: async (socket) => {
    console.log(`User disconnected: ${socket.id}`);
  },
};

module.exports = socketController;
