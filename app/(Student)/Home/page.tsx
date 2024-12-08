"use client";
import { useStudentContext } from "@/context/StudentContext";
import { useAppWrapper } from "@/context/AppDataContext";
import { useEffect, useState } from "react";
const defaultStudentDetails: ApiResponse = {
  student: [
    [
      {
        fypStudentID: 0,
        groupID: 0,
        midEvaluation: null,
        finalEvaluation: null,
        isLeader: 0,
        studentID: 0,
        studentRoll: "",
        studentName: "",
        email: "",
        dateOfBirth: "",
        profilePic: "",
        departmentName: "",
      },
    ],
    [
      {
        groupID: 0,
        projectID: 0,
        description: "",
        projectName: "",
        startDate: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        leaderID: 0,
        supervisorID: 0,
        groupName: "",
        created_at: "",
        updated_at: "",
        fullName: "",
        email: "",
      },
    ],
  ],
};

export default function StudentDashboard() {
  const { setHomeDetails} = useStudentContext();
  const { setUserName,setProfilePic } = useAppWrapper();
  const [studentDetails, setStudentDetails] = useState<ApiResponse>(
    defaultStudentDetails
  );

  useEffect(() => {
    sessionStorage.removeItem("groupID");
    sessionStorage.removeItem("isLeader");
    sessionStorage.removeItem("projectID");
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
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
        setStudentDetails(responseData);
        setHomeDetails(responseData);
        setUserName(responseData.student[0][0].studentName);
        setProfilePic(responseData.student[0][0].profilePic);
        sessionStorage.setItem("groupID",responseData.student[0][0].groupID.toString());
        sessionStorage.setItem("isLeader",responseData.student[0][0].isLeader.toString());
        sessionStorage.setItem("projectID",responseData.student[1][0]?.projectID.toString());

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
            {studentDetails.student[0][0].studentRoll}
          </h3>
          <h3>
            <span>Batch:</span>
            {`Fall ${studentDetails.student[0][0].studentRoll.substring(0, 2)}`}
          </h3>
          <h3>
            <span>Department:</span>
            {studentDetails.student[0][0].departmentName}
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
            {studentDetails.student[0][0].email}
          </h3>
        </div>
      </div>
      {studentDetails.student[1][0]?.projectID !== undefined ? (
        <>
          <div className="info">
            <div className="info-head">
              <i className="fa-solid fa-person"></i>
              <h3>Project Details</h3>
            </div>
            <div className="info-body">
              <h3>
                <span>Project Name:</span>
                {studentDetails.student[1][0].projectName}
              </h3>
              <h3>
                <span>Start Date:</span>
                {studentDetails.student[1][0].startDate}
              </h3>
              <h3>
                <span>Status:</span>
                {studentDetails.student[1][0].status}
              </h3>
              <h3>
                <span>Project Description:</span>
                {studentDetails.student[1][0].description}
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
                <span>Group ID:</span> {studentDetails.student[1][0].groupID}
              </h3>
              <h3>
                <span>Group Name:</span>
                {studentDetails.student[1][0].groupName}
              </h3>
              <h3>
                <span>Supervisor Name:</span>
                {studentDetails.student[1][0].fullName}
              </h3>
              <h3>
                <span>Supervisor Email:</span>
                {studentDetails.student[1][0].email}
              </h3>
            </div>
          </div>
        </>
      ) : (
        <div>No project Started Yet</div>
      )}
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
