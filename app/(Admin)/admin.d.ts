type GroupDetails = {
  groupID: number;
  groupName: string;
  status: string;
  projectID: Integer;
  projectName: string;
  supervisorID: Integer;
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
