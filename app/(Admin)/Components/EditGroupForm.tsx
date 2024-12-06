"use client";
import React from "react";
import Link from "next/link";
const EditGroupForm = ({ group }: { group: GroupDetails[] }) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Group Details
      </h2>

      <form className="space-y-6">
        {/* Group ID */}
        <div>
          <label
            htmlFor="groupID"
            className="block text-sm font-medium text-gray-700"
          >
            Group ID
          </label>
          <input
            type="text"
            id="groupID"
            value={group[0].groupID}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Group Name */}
        <div>
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700"
          >
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={group[0].groupName}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            value={group[0].status}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Project */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={group[0].projectName}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Supervisor */}
        <div>
          <label
            htmlFor="supervisorName"
            className="block text-sm font-medium text-gray-700"
          >
            Supervisor Name
          </label>
          <input
            type="text"
            id="supervisorName"
            value={group[0].supervisorName}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Students */}
        <div>
          <label
            htmlFor="students"
            className="block text-sm font-medium text-gray-700"
          >
            Students
          </label>
          <ul>
            {group[0].students.map((student, index) => {
              return (
                <li key={index} value={student}>
                  <Link href={"/"}></Link>
                </li>
              );
            })}
          </ul>
          <textarea
            id="students"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          ></textarea>
        </div>
      </form>

      {/* Buttons */}
      <div className="flex justify-between space-x-4">
        <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Edit Group
        </button>
        <button className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Delete Group
        </button>
      </div>
    </div>
    // </div>
  );
};

export default EditGroupForm;
