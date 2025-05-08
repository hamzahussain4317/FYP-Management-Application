"use client";
import React from "react";
import EditStudentMarks from "./EditStudentMarks";

const EditGroupForm = ({ group }: { group: GroupDetails }) => {
  if (!group) {
    return <p>No group data available</p>;
  }
  return (
    <div className="h-full w-full p-4 rounded-md shadow-md p-6 md:p-2 space-y-6 overflow-y-auto">
      <h1 className=" font-bold text-center text-light-text dark:text-dark-text">
        Group Details
      </h1>

      <form className="space-y-6 [&_*]:global-text-size">
        <div className="h-full w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md md:grid-cols-2 grid gap-4">
          <div>
            <label htmlFor="groupID" className="block text-dark-primary mb-2">
              Group ID
            </label>
            <input
              type="text"
              id="groupID"
              value={group.id}
              readOnly
              className="block p-3 w-full rounded-md cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="groupName" className="block text-dark-primary mb-2">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={group.name}
              readOnly
              className="block p-3 w-full rounded-md cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="supervisorName"
              className="block text-dark-primary mb-2"
            >
              Supervisor Name
            </label>
            <input
              type="text"
              id="supervisorName"
              value={group.supervisorName}
              readOnly
              className="block p-3 w-full rounded-md cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="projectName"
              className="block text-dark-primary mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={group.projectName}
              readOnly
              className="block p-3 w-full rounded-md cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="projectName"
              className="block text-dark-primary mb-2"
            >
              Progress{" "}
            </label>
            <div className="mt-4 w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-dark-primary transition-all duration-300 "
                style={{ width: `${group.completion}%` }}
              ></div>
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-dark-primary mb-2">
              Status
            </label>
            <div>
              {group.status === "Active" ? (
                <span className="text-green-500 font-semibold ">Active</span>
              ) : (
                <span className="text-red-500 font-semibold ">Inactive</span>
              )}
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md md:grid-cols-2 grid gap-4">
          {group?.students?.map((student, index) => {
            return (
              <div
                key={index}
                className="p-3 flex flex-col justify-center items-center space-y-3 w-full border-gray-500 border-2 rounded-lg"
              >
                <EditStudentMarks student={student} />
              </div>
            );
          })}
        </div>
      </form>

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
