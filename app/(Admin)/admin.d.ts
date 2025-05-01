type GroupDetails = {
  groupId: number;
  groupName: string;
  status: string;
  projectId: Integer;
  projectName: string;
  supervisorId: Integer;
  supervisorName: string;
  students: FYPStudent[];
};

type StudentList = {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  groupId: number;
  groupName: string;
  supervisorId: number;
  supervisorName: string;
};
type FYPStudent = {
  studentRoll: string;
  name: string;
  midEvaluation: number;
  finalEvaluation: number;
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
  byStudentRoll: boolean;
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
