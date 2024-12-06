import GroupDetails from "@/app/(Student)/Components/GroupDetails";
import { useContext, createContext } from "react";
import { useState } from "react";

const AdminContext = createContext<any>(undefined);

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filteredGroups, setFilteredGroups] = useState<GroupDetails[]>([]);

  const [filterBy, setFilterBy] = useState<groupFilterBy>({
    byGroupName: true,
    byProjectName: false,
    byStudentRoll: false,
  });

  //   Handle Functionalities

  const fetchAllGroupDetails = () => {
    //api
    setFilteredGroups([
      {
        groupID: 0,
        groupName: "Group 1",
        status: "Completed",
        projectID: 12,
        projectName: "Food On the Go",
        supervisorID: 100,
        supervisorName: "Hamdan Vohra",
        students: [
          {
            studentRoll: "22K-4318",
            name: "Hamdan Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4317",
            name: "Hamza Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4280",
            name: "Ghulam Vohra",
            midEvaluation: 10,
            finalEvaluation: 0,
          },
        ],
      },
      {
        groupID: 1,
        groupName: "Group 2",
        status: "Not Started",
        projectID: 11,
        projectName: "My Project",
        supervisorID: 101,
        supervisorName: "Daniyal Vohra",
        students: [
          {
            studentRoll: "22K-4327",
            name: "Saleh Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4218",
            name: "Usama Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4380",
            name: "Talha Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
        ],
      },
      {
        groupID: 2,
        groupName: "Group 3",
        status: "Completed",
        projectID: 10,
        projectName: "Kitty",
        supervisorID: 102,
        supervisorName: "Junaid Vohra",
        students: [
          {
            studentRoll: "22K-2122",
            name: "Monis Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "23K-4317",
            name: "Fahad Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4210",
            name: "Ghulam Hussain",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
        ],
      },
      {
        groupID: 3,
        groupName: "Group 4",
        status: "Completed",
        projectID: 14,
        projectName: "FYP Portal",
        supervisorID: 105,
        supervisorName: "Qadir Vohra",
        students: [
          {
            studentRoll: "22K-4318",
            name: "Shuja Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4317",
            name: "Subhan Vohra",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
          {
            studentRoll: "22K-4280",
            name: "Talha Kahsan",
            midEvaluation: 0,
            finalEvaluation: 0,
          },
        ],
      },
    ]);
  };
  const findByGroupId = (groupId: number) => {
    //fetch api by groupId
    return filteredGroups.filter((group) => group.groupID === groupId);
  };

  const handleSearch = (searchText: string) => {
    let filtered = filteredGroups;

    if (filterBy?.byGroupName)
      filtered = filteredGroups.filter((group) =>
        group.groupName.toLowerCase().includes(searchText.toLowerCase())
      );
    else if (filterBy?.byProjectName)
      filtered = filteredGroups.filter((group) =>
        group.projectName.toLowerCase().includes(searchText.toLowerCase())
      );
    else if (filterBy?.byStudentRoll)
      filtered = filteredGroups.filter((group) =>
        group.students.forEach((student) =>
          student.studentRoll.toLowerCase().includes(searchText.toLowerCase())
            ? true
            : false
        )
      );
    setFilteredGroups(filtered);
  };
  const handleFilterBy = (filterBy: groupFilterBy) => {
    setFilterBy(filterBy);
  };

  return (
    <AdminContext.Provider
      value={{
        filteredGroups,
        filterBy,
        fetchAllGroupDetails,
        findByGroupId,
        handleSearch,
        handleFilterBy,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdminContext = () => useContext(AdminContext);
