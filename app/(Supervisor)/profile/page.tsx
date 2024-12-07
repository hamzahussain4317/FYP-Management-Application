"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSupervisorContext } from "@/context/SupervisorContext";

// const supervisorDetails: SupervisorProfile = {
//   personalInfo: {
//     name: "Zain Noreen",
//     email: "zain.noreen.nu.edu.pk",
//     contactNumber: "+923042222123",
//     department: "Computer Science",
//   },
//   academicInfo: {
//     domain: "DataBase Design and Architecture",
//     cgpaCriteria: 3.5,
//     designation: "",
//     qualification: "",
//   },
//   projectDetails: {
//     currentProjects: 5,
//   },
// };
const Profile = () => {
  const { profile, fetchProfile,isLoading } = useSupervisorContext();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    fetchProfile(userId);
  });
  return (
    <section className="wrapper">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Supervisor | Profile
      </h1>
      {!isLoading && profile !== undefined ?
      (
        <>
          <div className="mb-10 bg-white p-6 rounded-lg shadow-md bg-[#f9f9f9] min-h-[30vh] flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>
            <ul className="space-y-4 text-gray-600 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 min-w-full flex-grow">
              <li className="mt-4">
                <strong>Name:</strong> {`${profile.personalInfo.name || "None"}`}
              </li>
              <li>
                <strong>Email:</strong> {`${profile.personalInfo.email || "None"}`}
              </li>
              <li>
                <strong>Contact Number:</strong>{" "}
                {`${profile.personalInfo.contactNumber || "None"}`}
              </li>
              <li>
                <strong>Department:</strong> {`${profile.personalInfo.department || "None"}`}
              </li>
              <button className="mt-auto col-span-2 text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                <Link href="/edit-profile">Edit</Link>
              </button>
            </ul>
          </div>

          <div className="mb-10 bg-white p-6 rounded-lg shadow-md bg-[#f9f9f9] min-h-[30vh] flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Academic Information
            </h2>
            <ul className="space-y-4 text-gray-600 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 min-w-full flex-grow">
              <li className="mt-4">
                <strong>Domain:</strong> {`${profile.academicInfo.domain || "None"}`}
              </li>
              <li>
                <strong>CGPA Criteria:</strong>{" "}
                {`${profile.academicInfo.cgpaCriteria || "None"}`}
              </li>
              <li>
                <strong>Qualification:</strong>{" "}
                 {`${profile.academicInfo.qualification || "None"}`}
              </li>
              <li>
                <strong>Designation:</strong>{" "}
                {`${profile.academicInfo.designation || "None"}`}
              </li>
              <button className="mt-auto col-span-2 text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                <Link href="/edit-profile">Edit</Link>
              </button>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md bg-[#f9f9f9] min-h-[30vh] flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Project Details
            </h2>
            <ul className="space-y-4 text-gray-600 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 min-w-full flex-grow">
              <li className="mt-4">
                <strong>Currently Handling Projects:</strong>{" "}
                {`${profile.projectDetails.currentProjects || "None"}`}
              </li>
              {/* <li>
            <strong>Completed Projects:</strong>{" "}
            {projectDetails.completedProjects}
            </li>
            <li>
            <strong>Supervised Projects:</strong>{" "}
            {projectDetails.supervisedProjects}
            </li>
            <li>
            <strong>Groups Handled:</strong> {projectDetails.groupsHandled}
            </li> */}
            </ul>
          </div>
        </>):(
          <div>Loading....</div>
        )
      }
    </section>
  );
};

export default Profile;
