import { useContext, createContext } from "react";
import { useState } from "react";

const AdminContext = createContext<any>(undefined);

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [baseUrl, setBaseUrl] = useState<string>(
    "http://localhost:3001/admin/"
  );
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState<GroupDetails[]>([]);
  const [filterBy, setFilterBy] = useState<groupFilterBy>({
    byGroupName: true,
    byProjectName: false,
    byStudentRoll: false,
  });

  //   Handle Functionalities
  const fetchAllGroupDetails = async () => {
    //api
    try {
      const response = await fetch(`${baseUrl}/getAllGroups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseResults = await response.json();
        const { groupDetails = [] } = responseResults;
        setFilteredGroups(groupDetails);
      } else if (response.status === 500) {
        setError("Some Internale server Error");
      } else if (response.status === 404) {
        setError("Groups Not Found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      } else {
        console.log("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const findByGroupId = async (groupId: number) => {
    try {
      const response = await fetch(`${baseUrl}/getGroupById/${groupId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 404) {
        setError(`No group with ID: ${groupId} exist`);
      }
    } catch (err) {
      throw new Error(`${err}`);
    } finally {
      setIsLoading(true);
      console.log("Get data succesfully");
    }
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
        error,
        isLoading,
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
