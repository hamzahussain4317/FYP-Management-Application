"use client";
import { useState } from "react";

interface MessageFormData {
  senderID: number;
  senderRole: "student" | "supervisor" | "admin";
  receiverID: number;
  receiverRole: "student" | "supervisor" | "admin";
  groupID?: number | null;
  contentID: number;
}

const SendMessage: React.FC = () => {
  const [formData, setFormData] = useState<MessageFormData>({
    senderID: 0,
    senderRole: "student",
    receiverID: 0,
    receiverRole: "student",
    groupID: null,
    contentID: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "senderID" || name === "receiverID" || name === "contentID"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        console.error("Error sending message:", result.error);
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send a Message</h2>
      <div>
        <label>Sender ID:</label>
        <input
          type="number"
          name="senderID"
          value={formData.senderID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Sender Role:</label>
        <select
          name="senderRole"
          value={formData.senderRole}
          onChange={handleChange}
          required
        >
          <option value="student">Student</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label>Receiver ID:</label>
        <input
          type="number"
          name="receiverID"
          value={formData.receiverID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Receiver Role:</label>
        <select
          name="receiverRole"
          value={formData.receiverRole}
          onChange={handleChange}
          required
        >
          <option value="student">Student</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label>Group ID (Optional):</label>
        <input
          type="number"
          name="groupID"
          value={formData.groupID || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Content ID:</label>
        <input
          type="number"
          name="contentID"
          value={formData.contentID}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default SendMessage;
