"use client";
import React from "react";

interface TaskStatisticsProps {
  taskAssigned: number;
  taskCompleted: number;
  taskOverDue: number;
  // hiddenToggler: () => void;
}
const TaskStatistics: React.FC<TaskStatisticsProps> = ({
  taskAssigned,
  taskCompleted,
  taskOverDue,
  // hiddenToggler,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 h-[190px]">
        <div className="bg-white p-6 shadow-md rounded-md flex items-center justify-between h-full">
          <div>
            <h2 className="text-lg font-semibold">
              <button
                className="tasks-assigned"
                // onClick={() => hiddenToggler()}
              >
                Tasks Assigned
              </button>
            </h2>
            <p className="text-3xl font-bold text-blue-500">{taskAssigned}</p>
          </div>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md flex items-center justify-between h-full">
          <div>
            <h2 className="text-lg font-semibold">
              <button
                className="tasks-completed"
                // onClick={() => hiddenToggler()}
              >
                Tasks Completed
              </button>
            </h2>
            <p className="text-3xl font-bold text-green-500">{taskCompleted}</p>
          </div>
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md flex items-center justify-between h-full">
          <div>
            <h2 className="text-lg font-semibold">
              <button className="tasks-overdue" 
              // onClick={hiddenToggler}
              >
                Tasks OverDue
              </button>
            </h2>
            <p className="text-3xl font-bold text-red-500">{taskOverDue}</p>
          </div>
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2M12 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm7 14h.01M12 18h0"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskStatistics;
