"use client";
import GroupDetails from "../Components/GroupDetails";
import CreateGroup from "../Components/CreateGroup";
import { useStudentContext } from "@/context/StudentContext";
import { useState, useEffect } from "react";
// const groupMember: Student[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     studentId: "STU001",
//     domain: "Web Development",
//     department: "Computer Science",
//     section: "BCS-5K",
//     Degree: "BS(CS)",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     studentId: "STU002",
//     domain: "Data Science",
//     department: "Information Technology",
//     section: "BCS-5K",
//     Degree: "BS(CS)",
//   },
//   {
//     id: 3,
//     name: "Alice Brown",
//     studentId: "STU003",
//     domain: "Cybersecurity",
//     department: "Computer Engineering",
//     section: "BCS-5K",
//     Degree: "BS(CS)",
//   },
//   // Add more students if needed
// ];

// // const groupMember: Student[] = [];
// const supervisor = {
//   supervisorID: 1,
//   supervisorName: "Saleh Vohra",
//   supervisorDomain: "Artificial Intellligence",
//   supervisorEmail: "saleh.vohra@nu.edu.pk",
// };


const defaultGroupDetails: groupDetails = {
  student: [
    [
      {
        studentID: 0,
        studentRoll: "",
        studentName: "",
        email: "",
        dateOfBirth: "",
        profilePic:"",
        departmentName: "",
        section: null,
        batch: null,
        campus: null,
      },
      {
        studentID: 0,
        studentRoll: "",
        studentName: "",
        email: "",
        dateOfBirth: "",
        profilePic:"",
        departmentName: "",
        section: null,
        batch: null,
        campus: null,
      },
      {
        studentID: 0,
        studentRoll: "",
        studentName: "",
        email: "",
        dateOfBirth: "",
        profilePic:"",
        departmentName: "",
        section: null,
        batch: null,
        campus: null,
      },
    ],
    [
      {
        teacherID: 0,
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        profilePic:"",
        departmentName: "",
        contactNo: null,
        designation: null,
        qualification: null,
      },
    ],
  ],
};



export default function Group() {
  const { HomeDetails } = useStudentContext();
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [groupId ,setGroupId]=useState<number>();
  const [groupDetails , setGroupDetails]=useState<groupDetails>(defaultGroupDetails);

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
    if (HomeDetails?.student[1][0]?.groupID !== null) {
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
        console.log(responseData.student[0][0].studentName);
        setGroupDetails(responseData);
        sessionStorage.setItem("isLeader",responseData.student[1][0].isLeader);

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
        !isButtonClicked && !groupDetails.student[0].length && "flex"
      }`}
    >
      {sessionStorage.getItem("groupID") === null ? (
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
        <GroupDetails groupDetails={groupDetails}  />
      )}
    </section>
  );
}
