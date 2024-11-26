"use client";
import { useState } from "react";
import Link from "next/link";

export default function ManageGroups() {
  const [groups, setGroups] = useState<groupDetails[]>([
    {
      groupId: 1,
      groupName: "Techno Gamers",
      studentRoll: ["22k-4318", "22k-4317", "22k-4316"],
      projectName: "FYP Portal",
      status: "In Progress",
    },
    {
      groupId: 2,
      groupName: "Techno Gamers",
      studentRoll: ["22k-4319", "22k-4311", "22k-4312"],
      projectName: "Zameen.com",
      status: "In Progress",
    },
    {
      groupId: 3,
      groupName: "Techno Gamers",
      studentRoll: ["22k-4280", "22k-4234", "22k-4270"],
      projectName: "Careem",
      status: "Not Started",
    },
    {
      groupId: 4,
      groupName: "Techno Gamers",
      studentRoll: ["22k-4123", "22k-4601", "22k-4449"],
      projectName: "Food On the GO",
      status: "Completed",
    },
  ]);
  return (
    <section className="wrapper">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Supervisor&apos;s Groups
        </h1>
        {groups.map((group) => {
          return (
            <div key={group.groupId} className="grid mb-4">
              <div className="bg-[#f9f9f9] border-[#f0a500] rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Group Name: {group.groupName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Group ID:</span>{" "}
                    {group.groupId}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Project Name:</span>{" "}
                    {group.projectName}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`font-semibold ${
                        group.status === "Completed"
                          ? "text-green-600"
                          : "text-blue-600"
                      } `}
                    >
                      {group.status}
                    </span>
                  </p>
                  <div className="mt-4">
                    <h3 className="text-gray-700 font-medium">Students:</h3>
                    <ul className="list-disc list-inside text-gray-600 grid md:flex justify-between space-x-1  min-w-[calc(100%)]">
                      {group.studentRoll.map((roll) => (
                        <li key={roll} className="list-none mb-1">
                          <Link
                            href={``}
                            className="w-auto flex items-center justify-betweem"
                          >
                            <span className="ml-2">{roll}</span>
                            <i
                              className={`fa-solid fa-paper-plane fa-3/2x sm:fa-lg`}
                            ></i>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
