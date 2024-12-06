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







interface StudentHome {
  fypStudentID: number;
  groupID: number;
  midEvaluation: number | null;
  finalEvaluation: number | null;
  isLeader: number;
  studentID: number;
  studentRoll: string;
  studentName: string;
  email: string;
  dateOfBirth: string;
  profilePic: string;
  departmentName: string;
}

interface ProjectGroup {
  groupID: number;
  projectID: number;
  description: string;
  projectName: string;
  startDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  leaderID: number;
  supervisorID: number;
  groupName: string;
  created_at: string;
  updated_at: string;
  fullName:string;
  email:string;
}

interface ApiResponse {
  student: [StudentHome[], ProjectGroup[]];  // Two arrays, one for student data, another for project and group data
}


