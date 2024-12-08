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
  fullName: string;
  email: string;
}

interface ApiResponse {
  student: [StudentHome[], ProjectGroup[]]; // Two arrays, one for student data, another for project and group data
}

interface group {
  studentID: number;
  studentRoll: string;
  studentName: string;
  email: string;
  dateOfBirth: string;
  profilePic: string;
  departmentName: string;
  section: string | null;
  batch: string | null;
  campus: string | null;
}

interface supervisor{
  teacherID: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  profilePic: string;
  departmentName: string;
  contactNo: string | null;
  designation: string | null;
  qualification: string | null;
}

interface groupDetails{
  student:[group[],supervisor[]];
}


interface Supervisor {
  email: string;
  profilePic: string;
  supervisorID: number;
  supervisorName: string;
  departmentName: string;
  specializedDomain: string | null;
  groupsCount: number | null;
  cgpaCriteria: number | null;
}

interface SupervisorListResponse {
  supervisorList: Supervisor[];
}


interface Task {
  taskID: number;
  projectID: number;
  fypStudentID: number;
  taskName: string;
  taskDescription: string;
  taskDeadline: string; // ISO 8601 formatted date
  assignedDate: string; // ISO 8601 formatted date
  taskStatus: number; // Use enum for clarity if possible
}



