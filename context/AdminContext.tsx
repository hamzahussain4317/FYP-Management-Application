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
        students: ["22k-4318", "22k-4317", "22k-4280"],
      },
      {
        groupID: 1,
        groupName: "Group 2",
        status: "Not Started",
        projectID: 12,
        projectName: "Food On the Go",
        supervisorID: 100,
        supervisorName: "Hamdan Vohra",
        students: ["22k-4318", "22k-4317", "22k-4280"],
      },
      {
        groupID: 2,
        groupName: "Group 3",
        status: "Completed",
        projectID: 12,
        projectName: "Hello",
        supervisorID: 100,
        supervisorName: "Hamdan Vohra",
        students: ["22k-4318", "22k-4317", "22k-4280"],
      },
      {
        groupID: 3,
        groupName: "Group 4",
        status: "Completed",
        projectID: 12,
        projectName: "FYP Portal",
        supervisorID: 100,
        supervisorName: "Hamdan Vohra",
        students: ["22k-4318", "22k-4317", "22k-4280"],
      },
      {
        groupID: 4,
        groupName: "Group 5",
        status: "Completed",
        projectID: 12,
        projectName: "Food On the Go",
        supervisorID: 100,
        supervisorName: "Hamdan Vohra",
        students: ["22k-4318", "22k-4317", "22k-4280"],
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
        group.students.forEach((rollNo) =>
          rollNo.toLowerCase().includes(searchText.toLowerCase()) ? true : false
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
