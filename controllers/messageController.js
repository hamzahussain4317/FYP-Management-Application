// Retrieve all messages in a conversation
export const fetchMessages = async (req, res) => {
  const { conversationID } = req.params;

  try {
    const query = `
    SELECT m.messageID, m.senderID, m.senderRole, m.groupID, m.createdAt, 
           mc.messageType, mc.textContent, mc.filePath, mc.imagePath
    FROM Message m
    JOIN MessageContent mc ON m.contentID = mc.contentID
    WHERE m.conversationID = ?;
  `;

    const [results] = await pool.query(query, [conversationID]); // Use the pool
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Database error" });
  }
};
