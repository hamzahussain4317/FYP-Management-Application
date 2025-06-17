"use client";
import GroupDetails from "../Components/GroupDetails";
import CreateGroup from "../Components/CreateGroup";
import { useStudentContext } from "@/context/StudentContext";
import { useState, useEffect } from "react";

const defaultGroupDetails: groupDetails = {
  groupStudents: [
    {
      studentid: 0,
      studentroll: "",
      studentname: "",
      email: "",
      dateofbirth: "",
      profilepic: "",
      departmentname: "",
      section: null,
      batch: null,
      campus: null,
      isregister: false,
    },
    {
      studentid: 0,
      studentroll: "",
      studentname: "",
      email: "",
      dateofbirth: "",
      profilepic: "",
      departmentname: "",
      section: null,
      batch: null,
      campus: null,
      isregister: false,
    },
    {
      studentid: 0,
      studentroll: "",
      studentname: "",
      email: "",
      dateofbirth: "",
      profilepic: "",
      departmentname: "",
      section: null,
      batch: null,
      campus: null,
      isregister: false,
    },
  ],
  isLeadrAndSupervisor: [
    {
      isleader: false,
      teacherid: 0,
      firstname: "",
      lastname: "",
      email: "",
      dateofbirth: "",
      profilepic: "",
      departmentname: "",
      contactno: null,
      designation: null,
      qualification: null,
      isregister: false,
    },
  ],
};

export default function Group() {
  const { HomeDetails } = useStudentContext();
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<number>();
  const [groupDetails, setGroupDetails] =
    useState<groupDetails>(defaultGroupDetails);

  const handleButton = () => {
    setIsButtonClicked(true);
  };

  // useEffect(() => {}, []);
  useEffect(() => {
    const storedGroupId = sessionStorage.getItem("groupID");
    console.log("Group Id:", storedGroupId);
    console.log("global HomeDetails: ", HomeDetails);
    setGroupId(Number(storedGroupId));
    if (HomeDetails?.student?.groupID !== null) {
      const storedUserId = sessionStorage.getItem("userId");
      console.log("Home Page:", storedUserId);
      if (storedUserId) {
        console.log("userId:", Number(storedUserId));
        getGroupDetails(Number(storedUserId));
      }
    }
  }, []);
  const getGroupDetails = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/student/GroupDetails/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setGroupDetails(responseData);
        sessionStorage.setItem("isLeader", responseData.student[1][0].isLeader);
      } else if (response.status === 500) {
        throw new Error("User already exist");
      } else {
        throw new Error("failed to signup");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section
      className={`wrapper flex-col items-center justify-center overflow-y-auto space-y-8
         ${!isButtonClicked && !groupDetails.groupStudents[0]!==null && "flex"}
      `}
    >
      {sessionStorage.getItem("groupID") === null ? (
        <>
          {!isButtonClicked ? (
             <div className="flex flex-col items-center justify-center h-[100vh] space-y-4">
             <h1>Your Project Group has not been created yet!</h1>
            <button
              id="create-button"
              className="h-[60px] w-[150px] text-white font-medium bg-[#28a745] hover:bg-[#218838] rounded-lg transition duration-300"
              onClick={handleButton}
            >
              Create Group
            </button>
            </div>
          ) : (
            <CreateGroup />
          )}
          
        </>
      ) : (
        <GroupDetails groupDetails={groupDetails} />
        // <div>Hello world</div>
      )}
    </section>
  );
}
