"use client";
import { useStudentContext } from "@/context/StudentContext";
import { useAppWrapper } from "@/context/AppDataContext";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";
const defaultStudentDetails: ApiResponse = {
  student: [
    [
      {
        fypstudentid: 0,
        groupid: 0,
        midevaluation: null,
        finalevaluation: null,
        isleader: 0,
        studentid: 0,
        studentroll: "",
        studentname: "",
        email: "",
        dateofbirth: "",
        profilepic: "",
        departmentname: "",
      },
    ],
    [
      {
        groupid: 0,
        projectid: 0,
        description: "",
        projectname: "",
        startdate: "",
        status: "",
        createdat: "",
        updatedat: "",
        leaderid: 0,
        supervisorid: 0,
        groupname: "",
        created_at: "",
        updated_at: "",
        fullname: "",
        email: "",
      },
    ],
  ],
};

export default function StudentDashboard() {
  const { setHomeDetails } = useStudentContext();
  const { setUserName, setProfilePic } = useAppWrapper();
  const [studentDetails, setStudentDetails] = useState<ApiResponse>(
    defaultStudentDetails
  );

  useEffect(() => {
    sessionStorage.removeItem("groupID");
    sessionStorage.removeItem("isLeader");
    sessionStorage.removeItem("projectID");
    const storedUserId = sessionStorage.getItem("userId");
    console.log("userID: ",storedUserId)
    if (storedUserId) {
      socket.emit("register", storedUserId);
      getProfile(Number(storedUserId));
    }
  }, []);

  const getProfile = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/student/getProfile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        console.log("student info",responseData.student.studentname)
        console.log("groupproject info",responseData.groupProjectInfo[0].projectname)
        console.log(studentDetails.student)
        setStudentDetails(responseData);
        setHomeDetails(responseData);
        setUserName(responseData.student.studentname);
        setProfilePic(responseData.student.profilepic);
        
        sessionStorage.setItem(
          "groupID",
          responseData.student.groupid.toString()
        );
        sessionStorage.setItem(
          "isLeader",
          responseData.student.isleader.toString()
        );
        sessionStorage.setItem(
          "projectID",
          responseData.student?.projectid.toString()
        );
        console.log(sessionStorage.getItem("groupID"));
        console.log(sessionStorage.getItem("isLeader"));
        console.log(sessionStorage.getItem("projectID"));
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
    <section className="wrapper flex-col items-center justify-center overflow-y-auto space-y-8">
      <h1 className="mt-[1rem] text-center font-semibold">Student | Home</h1>
      <div className="info">
        <div className="info-head ">
          <i className="fa-solid fa-user fa-2x"></i>
          <h3>Student Information</h3>
        </div>
        <div className="info-body">
          <h3>
            <span>Roll No:</span>
            {/* {studentDetails.student.studentroll} */}
          </h3>
          <h3>
            <span>Batch:</span>
            {/* {`Fall ${studentDetails.student.studentroll.substring(0, 2)}`} */}
          </h3>
          <h3>
            <span>Department:</span>
            {/* {studentDetails.student.departmentname} */}
          </h3>
          <h3>
            <span>Section:</span>
            BCS-5K
          </h3>
          <h3>
            <span>Campus:</span>
            Karachi
          </h3>
          <h3>
            <span>Email:</span>
            {/* {studentDetails.student.email} */}
          </h3>
        </div>
      </div>
      {/* {studentDetails.student[1][0]?.projectID !== undefined ? ( */}
        <>
          <div className="info">
            <div className="info-head">
              <i className="fa-solid fa-person"></i>
              <h3>Project Details</h3>
            </div>
            <div className="info-body">
              <h3>
                <span>Project Name:</span>
                {/* {studentDetails.student[1][0].projectName} */}
              </h3>
              <h3>
                <span>Start Date:</span>
                {/* {studentDetails.student[1][0].startDate} */}
              </h3>
              <h3>
                <span>Status:</span>
                {/* {studentDetails.student[1][0].status} */}
              </h3>
              <h3>
                <span>Project Description:</span>
                {/* {studentDetails.student[1][0].description} */}
              </h3>
            </div>
          </div>
          <div className="info">
            <div className="info-head">
              <i className="fa-solid fa-phone"></i>
              <h3>Group and Supervisor information</h3>
            </div>
            <div className="info-body">
              <h3>
                {/* <span>Group ID:</span> {studentDetails.student[1][0].groupID} */}
              </h3>
              <h3>
                <span>Group Name:</span>
                {/* {studentDetails.student[1][0].groupName} */}
              </h3>
              <h3>
                <span>Supervisor Name:</span>
                {/* {studentDetails.student[1][0].fullName} */}
              </h3>
              <h3>
                <span>Supervisor Email:</span>
                {studentDetails.student[1][0].email}
              </h3>
            </div>
          </div>
        </>
      {/* ) : ( */}
        <div>No project Started Yet</div>
      {/* )} */}
      <div className="info">
        <div
          className="info-head"
          onClick={() => {
            const el: HTMLElement = document.getElementById("marks-body")!;
            el.classList.toggle("hidden");
          }}
        >
          <i className="fa-solid fa-check"></i>
          <h3>Project Evaluation Marks</h3>
        </div>
        <div id="marks-body" className="marks-info info-body">
          <h3>
            <span>Mid Evaluation Marks:</span>{" "}
            {studentDetails.student[0][0].midEvaluation === null
              ? "-"
              : studentDetails.student[0][0].midEvaluation}
          </h3>
          <h3>
            <span>Final Evaluation Marks:</span>{" "}
            {studentDetails.student[0][0].finalEvaluation === null
              ? "-"
              : studentDetails.student[0][0].finalEvaluation}
          </h3>
        </div>
      </div>{" "}
    </section>
  );
}
