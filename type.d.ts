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
  notificationID: number;
  conversationID: number;
  isRead: boolean;
  createdAt: string;
};

type Message = {
  sender_id: string;
  sender_name: string;
  message_text: string;
  deliveredAt: string;
};
