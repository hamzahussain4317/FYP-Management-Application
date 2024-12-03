const io = require("../index");

const connectedUsers = {};

const socketController = {
  register: async (socket, conversationId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User registered: ${userId} -> Socket ID: ${socket.id}`);
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
      const [conversationResults] = await db.execute(insertIntoConversation, [
        messageID,
        receiverID,
        receiverRole,
      ]);

      //notification has four attributes in which notificationID is AutoIncrement while isRead is by default false and createdAt is by default current timestamp
      const insertIntoNotification =
        "INSERT INTO Notification (conversationID) VALUES (?,?,?)";
      const [notificationResults] = await db.execute(insertIntoNotification, [
        messageID,
      ]);

      const notificationId = notificationResults.insertId;

      let selectQuery;
      if (tolower(senderRole) === "student")
        selectQuery = "select studentName from students where studentID = ?";
      else selectQuery = "select teacherName from students where teacherID = ?";

      const [results] = await db.execute(selectQuery, [senderID]);
      let senderName;
      if (tolower(senderRole) === "student")
        senderName = results[0].studentName;
      else studentName = results[0].teacherName;

      //these are the socket functionalititis fetched from client side
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

      const receipentSocketId = connectedUsers[receiverID];
      if (receiverID) {
        io.to(receipentSocketId).emit("receiveMessage", messageData);
      }

      const notificationContent = textContent
        ? textContent.length > 25
          ? textContent.substr(0, 25)
          : textContent
        : filePath
        ? `File Provided From ${senderID}`
        : `Image is provided from ${senderID}`;

      const notificationData = {
        messageID,
        notificationContent,
        createdAt: new Date(),
      };
      socket.io(receiverID).emit("sendNotification", notificationData);

      console.log("Message sent successfully:", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },

  sendNotification: async ({ receipentId, notification }) => {
    const recipientSocketId = connectedUsers[receipentId];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveNotification", notification);
    }
  },

  handleDisconnect: async (socket) => {
    console.log(`User disconnected: ${socket.id}`);

    // removing user from connected users that have joined room
    for (const [userId, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  },
};

module.exports = socketController;
