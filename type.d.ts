type Task = {
  id: number;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
  completionDate: string;
  assignee: string;
};

type individualTaskFilters = {
  priority: string;
  status: string;
  dueDate: string;
};

type navItems = {
  dashboardName: string;
  profileName: string;
  profilePhoto: string;
  notificationNumber: number;
  gender: string;
};

type sideBarItems = {
  itemRoute: string;
  itemName: string;
  itemIcon: string;
};

type NotificationList = {
  notificationId: number;
  conversationID: number;
  senderName: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

type Message = {
  senderId: string;
  senderRole: string;
  senderName: string;
  messageType: "text" | "file" | "image";
  textContent: string;
  filePath: string;
  imagePath: string;
  createdAt: string;
};
