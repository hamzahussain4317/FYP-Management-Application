import { useContext, createContext } from "react";
import { useState } from "react";
import {
  dummy_groups,
  dummy_students,
  dummy_supervisors,
} from "@/dummydata/admin_data";

const AdminContext = createContext<any>(undefined);

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [baseUrl, setBaseUrl] = useState<string>(
    "http://localhost:3001/admin/"
  );

  // Task : Define types in admin.d.ts for all states
  const [students, setStudents] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);
  const [groups, setGroups] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState<GroupDetails[]>([]);
  const [filterBy, setFilterBy] = useState<groupFilterBy>({
    byGroupName: true,
    byProjectName: false,
    byStudentRoll: false,
  });

  // dummy functionalities
  const fetchDummyStudents = async (page = 1, pageSize = 10) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setIsLoading(true);
    setTimeout(() => {
      setTotal(dummy_students.length);
      const dummyStudents = dummy_students.slice(from, to);
      setStudents(dummyStudents);
      setError("");
      setIsLoading(false);
    }, 1000);
  };
  const fetchDummySupervisors = async (page = 1, pageSize = 10) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setIsLoading(true);
    setTimeout(() => {
      setTotal(dummy_supervisors.length);
      const dummySupervisors = dummy_supervisors.slice(from, to);
      setSupervisors(dummySupervisors);
      setError("");
      setIsLoading(false);
    }, 1000);
  };
  const fetchDummyGroups = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setTotal(dummy_groups.length);
      setGroups(dummy_groups);
      setError("");
      setIsLoading(false);
    }, 1000);
  };

  //   Handle Functionalities
  const fetchStudents = async (page: number, pageSize: number) => {
    const response = await fetch(
      `http://localhost:5000/students?page=${page}&pageSize=${pageSize}`
    );

    const data = await response.json();
    const { students, count } = data;
    if (!response.ok) {
      setError("Error fetching students");
      return;
    }
    if (students.length === 0) {
      setError("No students found");
      return;
    }
    setStudents(students);
    setTotal(count);
    setIsLoading(false);
    setError("");
  };

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
    console.log(groupId);
    try {
      const response = await fetch(`${baseUrl}/getGroupById/${groupId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseResult = await response.json();
        const { groupDetails } = responseResult;
        console.log(groupDetails);
        const {
          groupId,
          groupName,
          projectStatus,
          projectId,
          projectName,
          supervisorName,
        } = groupDetails[0];
        const students = groupDetails.map((item) => ({
          studentRoll: item.studentRoll,
          name: item.studentName,
          midEvaluation: item.midEvaluation,
          finalEvaluation: item.finalEvaluation,
        }));

        return {
          groupId,
          groupName,
          status: projectStatus,
          projectId,
          projectName,
          supervisorId: null,
          supervisorName,
          students,
        };
      } else if (response.status === 404) {
        setError(`No group with ID: ${groupId} exist`);
      }
    } catch (err) {
      throw new Error(`${err}`);
      // setError(err);
    } finally {
      setIsLoading(false);
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
        supervisors,
        students,
        groups,
        filteredGroups,
        filterBy,
        error,
        isLoading,
        total,
        setIsLoading,
        fetchStudents,
        fetchDummyStudents,
        fetchDummySupervisors,
        fetchDummyGroups,
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
