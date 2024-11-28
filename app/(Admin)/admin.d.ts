type GroupDetails = {
  groupID: Integer;
  groupName: string;
  status: string;
  projectID: Integer;
  projectName: string;
  supervisorID: Integer;
  supervisorName: string;
  students: string[];
};

interface groupFilterBy {
  byGroupName: boolean;
  byProjectName: boolean;
  byStudentRoll: boolean;
}
