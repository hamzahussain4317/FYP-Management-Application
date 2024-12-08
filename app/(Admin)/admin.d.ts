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
