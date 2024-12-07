"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSupervisorContext } from "@/context/SupervisorContext";


const supervisorDetails: SupervisorProfile = {
  personalInfo: {
    name: "Zain Noreen",
    email: "zain.noreen.nu.edu.pk",
    contactNumber: "+923042222123",
    department: "Computer Science",
  },
  academicInfo: {
    domain: "DataBase Design and Architecture",
    cgpaCriteria: 3.5,
    designation: "",
    qualification: "",
  },
  projectDetails: {
    currentProjects: 5,
    completedProjects: 20,
    supervisedProjects: 25,
    groupsHandled: 20,
  },
};
const Profile = () => {
  const {fetchProfile}=useSupervisorContext();
  const { personalInfo, academicInfo, projectDetails } = supervisorDetails;

  useEffect(()=>{
   const userId= sessionStorage.getItem("userId");
    fetchProfile(userId);
  },[])
  return (
    <section className="wrapper">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Supervisor | Profile
      </h1>

      {/* Personal Information Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md bg-[#f9f9f9] min-h-[30vh] flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h2>
        <ul className="space-y-4 text-gray-600 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 min-w-full flex-grow">
          <li className="mt-4">
            <strong>Name:</strong> {personalInfo.name}
          </li>
          <li>
            <strong>Email:</strong> {personalInfo.email}
          </li>
          <li>
            <strong>Contact Number:</strong> {personalInfo.contactNumber}
          </li>
          <li>
            <strong>Department:</strong> {personalInfo.department}
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
            <strong>Domain:</strong> {academicInfo.domain}
          </li>
          <li>
            <strong>CGPA Criteria:</strong> {academicInfo.cgpaCriteria}
          </li>
          <li>
            <strong>Experience:</strong> {academicInfo.experience}
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
            {projectDetails.currentProjects}
          </li>
          <li>
            <strong>Completed Projects:</strong>{" "}
            {projectDetails.completedProjects}
          </li>
          <li>
            <strong>Supervised Projects:</strong>{" "}
            {projectDetails.supervisedProjects}
          </li>
          <li>
            <strong>Groups Handled:</strong> {projectDetails.groupsHandled}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
