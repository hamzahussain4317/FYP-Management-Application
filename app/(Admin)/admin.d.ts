type GroupList = {
  id: number;
  name: string;
  projectId: number | null;
  projectName: string | null;
  studentsCount: number;
  supervisorId: number | null;
  supervisorName: string | null;
  completionRate: number | 0;
  status: "Inactive" | "Active";
};

type SupervisorList = {
  id: number;
  name: string;
  email: string;
  isRegistered: boolean;
  groupsHandled: number;
};

type StudentList = {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  groupId: number | null;
  groupName: string | null;
  supervisorId: number | null;
  supervisorName: string | null;
  isRegistered: boolean;
};

interface groupFilterBy {
  byGroupName: boolean;
  byProjectName: boolean;
  byStudentRoll: boolean;
}

interface studentsFilterBy {
  byStudentRoll: boolean;
  byStudentName: boolean;
}

interface supervisorFilterBy {
  bySupervisorName: boolean;
  byGroupName: boolean;
  byProjectName: boolean;
}

interface RoomAvailability {
  room: string;
  availability: Record<string, number>;
}

interface SchedulerFormData {
  startDate: string;
  endDate: string;
  timeSlots: string[];
  csvRooms: RoomAvailability[];
  slotDuration: number;
  rooms: string[];
  evaluationType: string;
}

type FYPStudent = {
  id: number;
  email: string;
  studentRoll: string;
  name: string;
  midEvaluation: number;
  finalEvaluation: number;
};
type GroupDetails = {
  id: number;
  name: string;
  status: string;
  projectId: Integer;
  projectName: string;
  supervisorId: Integer;
  supervisorName: string;
  completion: number;
  students: FYPStudent[];
};
