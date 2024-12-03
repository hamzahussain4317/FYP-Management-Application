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

type Student = {
  id: number;
  name: string;
  studentId: string;
  domain: string;
  department: string;
  section: string;
  Degree: string;
};

type Supervisor = {
  id: number;
  name: string;
  image: string;
  projectsSupervised: number;
  rating: number;
  email: string;
  cgpaCriteria: number;
};

type Home = {
  fypStudentID: number;
  groupID: number;
  midEvaluation: number;
  finalEvaluation: number;
  isLeader: boolean;
  studentRoll: string;
  studentName: string;
  email: string;
  dateOfBirth: date;
  profilePic: string;
  departmentName: string;
};
