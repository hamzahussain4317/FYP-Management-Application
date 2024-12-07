type groupDetails = {
  groupId: number;
  groupName: string;
  studentRoll: string[];
  projectName: string;
  status: string;
};

interface SupervisorProfile {
  personalInfo: {
    name: string;
    email: string;
    contactNumber: string;
    department: string;
  };
  academicInfo: {
    domain: string;
    cgpaCriteria: number;
    designation: string;
    qualification: string;
  };
  projectDetails: {
    currentProjects: number;
    completedProjects: number;
    supervisedProjects: number;
    groupsHandled: number;
  };
}

interface Proposal {
  groupID: number;
  supervisorID: number;
  projectName: string;
  groupName: string;
  projectDomain?: string;
  projectDescription: string;
  projectFile?: string | null; // URL or null if no file
  proposalStatus: boolean; // false for pending, true for reviewed
}
