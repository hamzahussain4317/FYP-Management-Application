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
    experience: string;
  };
  projectDetails: {
    currentProjects: number;
    completedProjects: number;
    supervisedProjects: number;
    groupsHandled: number;
  };
}
