"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSupervisorContext } from "@/context/SupervisorContext";

export default function ManageGroups() {
  const { supervisorId, fetchGroups, groups, isLoading, error } =
    useSupervisorContext();

  useEffect(() => {
    fetchGroups(supervisorId);
  });
  return (
    <section className="wrapper">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Supervisor&apos;s Groups
        </h1>
        {error && <div className="text-red-500 font-bold">{error}</div>}
        {isLoading && <div>Loading Groups...</div>}
        {!isLoading && !error && groups.length ? (
          groups.map((group: groupDetails) => {
            return (
              <div key={group.groupId} className="grid mb-4">
                <div className="bg-[#f9f9f9] border-[#f0a500] rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Group Name:{`${group.groupName} || 'None'`}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Group ID:</span>{" "}
                      {`${group.groupId} || 'None'`}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Project Name:</span>{" "}
                      {`${group.projectName} || 'None'`}
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
                        {`${group.status} || 'None'`}
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
                              <span className="ml-2">{roll}</span>{" "}
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
          })
        ) : (
          <div>No Supervised Groups Yet</div>
        )}
      </div>
    </section>
  );
}
