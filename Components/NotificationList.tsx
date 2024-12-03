import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
type NotificationListProps = {
  receiverID: string;
};
const NotificationList: React.FC<NotificationListProps> = ({ receiverID }) => {
  const [notifications, setNotifications] = useState<NotificationList[]>([]);

  useEffect(() => {
    socket.on("receiveNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return (
    <ul className="realtive flex-col justify-center align-center space-y-3 w-full">
      {notifications.length === 0 ? (
        <li>Nothing Here in Notifications</li>
      ) : (
        notifications.map((notification) => (
          <li
            key={notification.notificationId}
            className="flex flex-col justify-center items-start"
          >
            {notification.message}
            <div className="flex justify-between items-center">
              <p>Status: {notification.isRead ? "Read" : "Unread"}</p>
              <p>
                Created At: {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default NotificationList;
