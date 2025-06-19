"use client";
import { useStudentContext } from "@/context/StudentContext";
import { useAppWrapper } from "@/context/AppDataContext";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";

const defaultStudentDetails: ApiResponse = {
  student: {
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
    section: "",
    campus: "",
  },
  groupProjectInfo: [
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
      fullName: "",
      email: "",
      proposalstatus: "",
    },
  ],
};

export default function StudentDashboard() {
  const { setHomeDetails } = useStudentContext();
  const { setUserName, setProfilePic } = useAppWrapper();
  const [studentDetails, setStudentDetails] = useState<ApiResponse>(
    defaultStudentDetails
  );

  useEffect(() => {
    sessionStorage.removeItem("proposalStatus");
    sessionStorage.removeItem("groupID");
    sessionStorage.removeItem("isLeader");
    sessionStorage.removeItem("projectID");

    const storedUserId = sessionStorage.getItem("userId");
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
        setStudentDetails(responseData);
        setHomeDetails(responseData);
        setUserName(responseData.student.studentname);
        setProfilePic(responseData.student.profilepic);
        const proposalStatus = responseData.groupProjectInfo[0]?.proposalstatus;
        if (proposalStatus !== undefined && proposalStatus !== null) {
          sessionStorage.setItem("proposalStatus", proposalStatus);
        } else {
          console.warn("❗proposalStatus not found in response");
        }



         const groupid = responseData.student?.groupid;
        if (groupid !== undefined && groupid !== null) {
          sessionStorage.setItem("groupID", groupid.toString());
        } else {
          console.warn("❗groupID not found in response");
        }
        
        // sessionStorage.setItem(
        //   "groupID",
        //   responseData.student.groupid.toString()
        // );

         const isLeader = responseData.student?.isleader;
        if (isLeader !== undefined && isLeader !== null) {
          sessionStorage.setItem("isLeader", isLeader.toString());
        } else {
          console.warn("❗isLeader not found in response");
        }


        // sessionStorage.setItem(
        //   "isLeader",
        //   responseData.student.isleader.toString()
        // );
      
        const projectid = responseData.groupProjectInfo[0]?.projectid;
        if (projectid!== undefined && projectid !== null) {
          sessionStorage.setItem("projectID", projectid.toString());
        } else {
          console.warn("❗projectID not found in response");
        }
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
            {studentDetails.student.studentroll}
          </h3>
          <h3>
            <span>Batch:</span>
            {`Fall ${studentDetails.student.studentroll.substring(0, 2)}`}
          </h3>
          <h3>
            <span>Department:</span>
            {studentDetails.student.departmentname}
          </h3>
          <h3>
            <span>Section:</span>
            {studentDetails.student.section}
          </h3>
          <h3>
            <span>Campus:</span>
            {studentDetails.student.campus}
          </h3>
          <h3>
            <span>Email:</span>
            {studentDetails.student.email}
          </h3>
        </div>
      </div>
      {studentDetails.groupProjectInfo[0]?.projectid !== undefined ? (
        <>
          <div className="info">
            <div className="info-head">
              <i className="fa-solid fa-person"></i>
              <h3>Project Details</h3>
            </div>
            <div className="info-body">
              {studentDetails.groupProjectInfo[0].projectid !== null ? (
                <>
                  <h3>
                    <span>Project Name:</span>
                    {studentDetails.groupProjectInfo[0].projectname}
                  </h3>
                  <h3>
                    <span>Start Date:</span>
                    {studentDetails.groupProjectInfo[0].startdate}
                  </h3>
                  <h3>
                    <span>Status:</span>
                    {studentDetails.groupProjectInfo[0].status}
                  </h3>
                  <h3>
                    <span>Project Description:</span>
                    {studentDetails.groupProjectInfo[0].description}
                  </h3>
                </>
              ) : (
                <h3 className="text-center text-xl my-4 font-semibold text-red-600 flex justify-center items-center">
                  No project Started Yet!
                </h3>
              )}
            </div>
          </div>
          <div className="info">
            <div className="info-head">
              <i className="fa-solid fa-phone"></i>
              <h3>Group and Supervisor information</h3>
            </div>
            <div className="info-body">
              <h3>
                <span>Group ID:</span>{" "}
                {studentDetails.groupProjectInfo[0].groupid}
              </h3>
              <h3>
                <span>Group Name:</span>
                {studentDetails.groupProjectInfo[0].groupname}
              </h3>
              {/* <h3>
                <span>Supervisor Name:</span>
                { studentDetails.groupProjectInfo[0].fullName === " "?"Not decided Yet":studentDetails.groupProjectInfo[0].fullName}
                
              </h3> */}
              <h3>
                <span>Supervisor Name: </span>
                {studentDetails.groupProjectInfo[0].fullName === " " ? (
                  <span className="text-red-600 font-semibold">
                    Not decided Yet
                  </span>
                ) : (
                  studentDetails.groupProjectInfo[0].fullName
                )}
              </h3>
              <h3>
                <span>Supervisor Email: </span>
                {studentDetails.groupProjectInfo[0].email === null ? (
                  <span className="text-red-600 font-semibold">
                    Not decided Yet
                  </span>
                ) : (
                  studentDetails.groupProjectInfo[0].email
                )}
              </h3>
            </div>
          </div>
        </>
      ) : (
        // <div>No project Started Yet</div>
        <h1 className="text-center m-8">No Project Started Yet!</h1>
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
            {studentDetails.student.midevaluation === null ? (
              <span className="text-red-600 font-semibold">-</span>
            ) : (
              studentDetails.student.midevaluation
            )}
          </h3>
          <h3>
            <span>Final Evaluation Marks:</span>{" "}
            {studentDetails.student.finalevaluation === null ? (
              <span className="text-red-600 font-semibold">-</span>
            ) : (
              studentDetails.student.finalevaluation
            )}
          </h3>
        </div>
      </div>{" "}
    </section>
  );
}
