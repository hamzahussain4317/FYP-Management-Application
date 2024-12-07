"use client";
import GroupDetails from "../Components/GroupDetails";
import CreateGroup from "../Components/CreateGroup";
import { useStudentContext } from "@/context/StudentContext";
import { useState, useEffect } from "react";
const groupMember: Student[] = [
  {
    id: 1,
    name: "John Doe",
    studentId: "STU001",
    domain: "Web Development",
    department: "Computer Science",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  {
    id: 2,
    name: "Jane Smith",
    studentId: "STU002",
    domain: "Data Science",
    department: "Information Technology",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  {
    id: 3,
    name: "Alice Brown",
    studentId: "STU003",
    domain: "Cybersecurity",
    department: "Computer Engineering",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  // Add more students if needed
];

// const groupMember: Student[] = [];
const supervisor = {
  supervisorID: 1,
  supervisorName: "Saleh Vohra",
  supervisorDomain: "Artificial Intellligence",
  supervisorEmail: "saleh.vohra@nu.edu.pk",
};

export default function Group() {
  const {  HomeDetails } = useStudentContext();
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [groupId ,setGroupId]=useState<number>();

  const handleButton = () => {
    setIsButtonClicked(true);
  };

  useEffect(() => {
    
    
  }, []);
  useEffect(() => {
    const storedGroupId = sessionStorage.getItem("groupID");
    console.log("Group Id:",storedGroupId);
    console.log("global HomeDetails: ",HomeDetails);
    setGroupId(Number(storedGroupId));
    if (HomeDetails?.student[1][0]?.groupID !== undefined) {
      const storedUserId = sessionStorage.getItem("userId");
      console.log("Home Page:", storedUserId);
      if (storedUserId) {
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
        console.log("iloveyou: ",responseData);
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
      className={`wrapper justify-center items-center h-full ${
        !isButtonClicked && !groupMember.length && "flex"
      }`}
    >
      {groupId === undefined ? (
        <>
          {!isButtonClicked ? (
            <button
              id="create-button"
              className="h-[60px] w-[150px] blue-regular-button"
              onClick={handleButton}
            >
              Create Group
            </button>
          ) : (
            <CreateGroup />
          )}
        </>
      ) : (
        <GroupDetails groupMembers={groupMember} supervisor={supervisor} />
      )}
    </section>
  );
}
