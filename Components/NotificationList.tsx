import { useEffect, useState } from "react";
type NotificationListProps = {
  receiverID: string;
};
const NotificationList: React.FC<NotificationListProps> = ({ receiverID }) => {
  const [notifications, setNotifications] = useState<NotificationList[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/notifications/${receiverID}`)
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [receiverID]);

  return (
    <ul className="realtive flex-col justify-center align-center space-y-3 w-full">
      {notifications.length === 0 ? (
        <li>Nothing Here in Notifications</li>
      ) : (
        notifications.map((notification) => (
          <li key={notification.notificationID}>
            Conversation ID: {notification.conversationID}, Status:{" "}
            {notification.isRead ? "Read" : "Unread"}, Created At:{" "}
            {new Date(notification.createdAt).toLocaleString()}
          </li>
        ))
      )}
    </ul>
  );
};

export default NotificationList;
