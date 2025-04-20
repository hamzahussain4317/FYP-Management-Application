const express = require("express");
const db = require("../db/pool");
const router = express.Router();

router.get("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  try {
    const [messages] = await db.promise.execute(
      `SELECT 
         m.messageID, 
         m.senderID, 
         m.senderRole, 
         mc.messageType, 
         mc.textContent, 
         mc.filePath, 
         mc.imagePath, 
         m.createdAt 
       FROM Message m
       JOIN MessageContent mc ON m.contentID = mc.contentID
       WHERE m.messageID = ?`,
      [conversationId]
    );

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

module.exports = router;
