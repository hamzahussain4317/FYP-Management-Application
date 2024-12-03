"use client";
import React from "react";
import { useEffect, useState } from "react";
import socket from "../utils/socket";
// import axios from "axios";
type User = {
  senderId: string;
  senderName: string;
};

const messages: Message[] = [
  {
    senderId: "1",
    senderName: "Hamdan Vohra",
    textContent: "Hello I am messsaging you.",
    createdAt: "12-09-2024",
    senderRole: "student",
    messageType: "text",
    filePath: String(null),
    imagePath: String(null),
  },
  {
    senderId: "2",
    senderName: "Saleh Vohra",
    textContent: "Hello I am messsaging you..",
    createdAt: "12-09-2023",
    senderRole: "supervisor",
    messageType: "text",
    filePath: String(null),
    imagePath: String(null),
  },
  {
    senderId: "1",
    senderName: "Hamdan Vohra",
    textContent: "Hello I am not messaging you.",
    createdAt: "09-09-2022",
    senderRole: "student",
    messageType: "text",
    filePath: String(null),
    imagePath: String(null),
  },
  {
    senderId: "2",
    senderName: "Saleh Vohra",
    textContent: "Hello I am not messsaging you..",
    createdAt: "02-09-2024",
    senderRole: "supervisor",
    messageType: "text",
    filePath: String(null),
    imagePath: String(null),
  },
];

const MessageHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpener = () => {
    setIsOpen(!isOpen);
  };

  const [userId, setUserId] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("1");

  useEffect(() => {
    // Register user with the backend
    if (userId) {
      socket.emit("register", userId);
    }

    // listen for incoming messages
    socket.on("receiveMessage", (data) => {
      setReceivedMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  const sendMessage = () => {
    if (userId && recipientId && message) {
      socket.emit("sendMessage", { senderId: userId, recipientId, message });
      setMessage(""); // Clear input
    }
  };

  const messagesBySender = messages.reduce((acc, message) => {
    const { senderId } = message;
    if (!acc[senderId]) {
      acc[senderId] = [];
    }
    acc[senderId].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const allSenders = receivedMessages.reduce((acc, message) => {
    const { senderId, senderName } = message;
    // if (!acc[senderId] && senderId != myID) {  it will exclude its own id
    if (!acc[senderId]) {
      acc[senderId] = {
        senderId,
        senderName,
      };
    }
    return acc;
  }, {} as Record<string, User>);

  const handleSwitchToUser = (selectedId: string) => {
    setSelectedUser(selectedId);
  };

  return (
    <section
      className={`absolute ${
        !isOpen
          ? "min-h-[60px] min-w-[60px] bottom-10 right-10 rounded-full flex justify-center items-center"
          : "min-h-[calc(100vh-5.5rem)] min-w-[calc(100vw - 10rem)] rounded-xl bottom-0 right-0 flex flex-col space-y-2 "
      } z-999`}
      style={{ background: "#c0cfe0" }}
    >
      {!isOpen ? (
        <i
          className="fa-regular fa-message fa-2x hover:text-green-500"
          style={{ color: "black", cursor: "pointer" }}
          onClick={toggleOpener}
        ></i>
      ) : (
        <>
          <div className="min-h-[calc(100% - 20px)] w-full flex-1 overflow-y-auto p-4 grid grid-cols-3 gap-4 border-b-2 border-grey-500">
            <div className="col-span-1 flex flex-col justify-end items-start space-y-3 px-2 border-r-2 border-grey-500">
              <div>
                <i
                  className="fa-regular fa-circle-left fa-2x"
                  style={{ color: "black" }}
                  onClick={toggleOpener}
                ></i>
              </div>
              {Object.entries(allSenders).map(([senderId, { senderName }]) => (
                <div
                  key={senderId}
                  onClick={() => handleSwitchToUser(senderId)}
                  className={`w-full hover:bg-sky-700 rounded-lg border-b-2 active:bg-sky-700 ${
                    selectedUser === senderId ? "active " : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <p>
                    <b>{senderName}</b>
                  </p>
                </div>
              ))}
            </div>
            <div className="col-span-2 overflow-y-hidden flex flex-col justify-end items-center">
              <ul
                key={selectedUser}
                className="flex flex-col justify-end items-center space-y-3 w-full"
              >
                {messagesBySender[selectedUser].map((msg, index) => (
                  <li
                    key={index}
                    className="w-full rounded-lg border-2 px-2"
                    style={{ border: "#eee 2px solid" }}
                  >
                    <p>{msg.senderName}:</p>
                    <p>{msg.textContent}</p>
                    <p>{new Date(msg.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="h-10 w-full flex justify-between space-x-4 rounded-xl px-2"
            style={{ background: "white" }}
          >
            <input
              type="text"
              // value={newMessage}
              // onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="h-20px flex-1 focus:outline-none"
            />
            <button
              className="min-h-auto min-w-4 items-center"
              onClick={sendMessage}
            >
              <i
                className="fa-solid fa-arrow-right fa-2x h-full w-full"
                style={{ color: "green" }}
              ></i>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default MessageHub;
