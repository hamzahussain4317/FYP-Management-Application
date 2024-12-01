"use client";
import React from "react";
import { useState } from "react";
type User = {
  sender_id: string;
  sender_name: string;
};
const messages: Message[] = [
  {
    sender_id: "1",
    sender_name: "Hamdan Vohra",
    message_text: "Hello I am messsaging you.",
    deliveredAt: "12-09-2024",
  },
  {
    sender_id: "2",
    sender_name: "Saleh Vohra",
    message_text: "Hello I am messsaging you..",
    deliveredAt: "12-09-2023",
  },
  {
    sender_id: "1",
    sender_name: "Hamdan Vohra",
    message_text: "Hello I am not messaging you.",
    deliveredAt: "09-09-2022",
  },
  {
    sender_id: "2",
    sender_name: "Saleh Vohra",
    message_text: "Hello I am not messsaging you..",
    deliveredAt: "02-09-2024",
  },
];

const MessageHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpener = () => {
    setIsOpen(!isOpen);
  };

  //   const [messages, setMessages] = useState<any[]>([]);
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await fetch("https://messages");
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch data");
  //         }
  //         const data = await response.json();
  //         setMessages(data);
  //       } catch (err: any) {
  //         setError(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  const [selectedUser, setSelectedUser] = useState<string>("1");
  const [showMessages, setShowMessages] = useState<Message[]>();

  const messagesBySender = messages.reduce((acc, message) => {
    const { sender_id } = message;
    if (!acc[sender_id]) {
      acc[sender_id] = [];
    }
    acc[sender_id].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const allSenders = messages.reduce((acc, message) => {
    const { sender_id, sender_name } = message;
    // if (!acc[sender_id] && sender_id != myID) {  it will exclude its own id
    if (!acc[sender_id]) {
      acc[sender_id] = {
        sender_id,
        sender_name,
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
          ? "min-h-20 min-w-20 bottom-10 right-10 rounded-full flex justify-center items-center"
          : "min-h-[calc(100vh-5.5rem)] min-w-[calc(100vw - 10rem)] rounded-xl bottom-0 right-0 flex flex-col space-y-2 "
      } z-999`}
      style={{ background: "#c0cfe0" }}
    >
      {!isOpen ? (
        <i
          className="fa-regular fa-message fa-3x"
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
              {Object.entries(allSenders).map(([senderId, { sender_name }]) => (
                <div
                  key={senderId}
                  onClick={() => handleSwitchToUser(senderId)}
                  className={`w-full hover:bg-sky-700 rounded-lg border-b-2 active:bg-sky-700 ${
                    selectedUser === senderId ? "active " : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <p>
                    <b>{sender_name}</b>
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
                    <p>{msg.sender_name}:</p>
                    <p>{msg.message_text}</p>
                    <p>{new Date(msg.deliveredAt).toLocaleString()}</p>
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
              placeholder="Message"
              className="h-20px flex-1 focus:outline-none"
            />
            <button className="min-h-auto min-w-4 items-center">
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
