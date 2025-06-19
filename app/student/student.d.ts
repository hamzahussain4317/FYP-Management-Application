interface StudentHome {
  fypstudentid: number;
  groupid: number;
  midevaluation: number | null;
  finalevaluation: number | null;
  isleader: number;
  studentid: number;
  studentroll: string;
  studentname: string;
  email: string;
  dateofbirth: string;
  profilepic: string;
  departmentname: string;
  section:string;
  campus:string;
   midevaluation:string;
  finalevaluation:string;
}

interface ProjectGroup {
  groupid: number;
  projectid: number;
  description: string;
  projectname: string;
  startdate: string;
  status: string;
  createdat: string;
  updatedat: string;
  leaderid: number;
  supervisorid: number;
  groupname: string;
  created_at: string;
  updated_at: string;
  fullName: string;
  email: string;
  proposalstatus: string;
 
}

interface ApiResponse {
  // student: [StudentHome[], ProjectGroup[]]; // Two arrays, one for student data, another for project and group data
      student:StudentHome;
      groupProjectInfo:ProjectGroup[];
}

interface groupStudents {
  studentid: number;
  studentroll: string;
  studentname: string;
  email: string;
  dateofbirth: string;
  profilepic: string;
  departmentname: string;
  section: string | null;
  batch: string | null;
  campus: string | null;
  isregister: boolean;
}

interface isLeadrAndSupervisor {
  isleader: boolean;
  teacherid: number;
  firstname: string;
  lastname: string;
  email: string;
  dateofbirth: string;
  profilepic: string;
  departmentname: string;
  contactno: string | null;
  designation: string | null;
  qualification: string | null;
  isregister: boolean;
}

interface groupDetails {
  // student: [group[], supervisor[]];
  groupStudents:groupStudents[];
  isLeadrAndSupervisor:isLeadrAndSupervisor[];
}

interface Supervisors {
  profilepic:string;
  email: string;
  supervisorid: number;
  supervisorname: string;
  departmentname: string;
  specializeddomain: string | null;
  groupscount: number | null;
  cgpacriteria: number | null;
  ratings: number |null;
}

interface SupervisorListResponse {
  supervisorList: Supervisors[];
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

interface overSightTask {
  taskID: number;
  projectID: number;
  fypStudentID: number;
  taskName: string;
  taskDescription: string;
  taskDeadline: string;
  assignedDate: string;
  taskStatus: number;
}
