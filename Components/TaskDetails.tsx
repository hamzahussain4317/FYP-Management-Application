import React from "react";
import { format } from "date-fns";

interface TaskDetailsProps {
  allTasks: Task[];
  fetchTasks: (userId: number) => Promise<void>;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ allTasks ,fetchTasks }) => {
  const formatDateTime = (isoDate: string): string => {
    return format(new Date(isoDate), "MMM dd, yyyy, hh:mm a");
  };
  const assignedTasks: Task[] = allTasks.filter((task) => {
    const deadline = new Date(task.taskDeadline.replace(" ", "T"));
    return deadline.getTime() > Date.now() && task.taskStatus !== 1;
  });
  const completedTasks: Task[] = allTasks.filter(
    (task) => task.taskStatus === 1
  );
  const overdueTasks: Task[] = allTasks.filter((task) => {
    const deadline = new Date(task.taskDeadline.replace(" ", "T"));
    return deadline.getTime() < Date.now() && task.taskStatus !== 1;
  });

  const handleTask = async (taskName:string) => {
    
    try {
      const response = await fetch(
        `http://localhost:3001/student/updateTask/${Number(sessionStorage.getItem("userId"))}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           taskName:taskName
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
    
        await fetchTasks(Number(sessionStorage.getItem("userId")));
      } else if (response.status === 400) {
        throw new Error("Student ID and task name are required.");
      } else if (response.status === 404) {
        throw new Error("No tasks found for the provided student ID");
      } else {
        throw new Error("failed to update tasks");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div id="task-details" className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Task Details</h2>

      {/* Tasks Assigned */}
      <div>
        <p className="w-full text-left p-4 bg-blue-200 rounded-md mt-4">
          Tasks Assigned
        </p>
        {assignedTasks.map((task) => (
          <div key={task.taskID} className="mt-2">
            <div className="bg-white shadow-md rounded-md p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Task Description</th>
                    <th className="text-left p-2">Task Deadline</th>
                    <th className="text-left p-2">Mark Task As Done</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{task.taskName}</td>
                    <td className="p-2">{task.taskDescription}</td>
                    <td className="p-2">
                      {formatDateTime(task.taskDeadline) || "N/A"}
                    </td>
                    <td className="p-2">
                      <button
                        className="mt-auto col-span-2 text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => handleTask(task.taskName)}
                      >
                        TAsk Completed
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks Completed */}
      <div>
        <p className="w-full text-left p-4 bg-green-200 rounded-md mt-4">
          Tasks Completed
        </p>
        {completedTasks.map((task) => (
          <div key={task.taskID} className="mt-2">
            <div className="bg-white shadow-md rounded-md p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Task Description</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{task.taskName}</td>
                    <td className="p-2">{task.taskDescription || "N/A"}</td>
                    <td className="p-2 text-green-500">Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks Overdue */}
      <div>
        <p className="w-full text-left p-4 bg-red-200 rounded-md mt-4">
          Tasks Overdue
        </p>
        {overdueTasks.map((task) => (
          <div key={task.taskID} className="mt-2">
            <div className="bg-white shadow-md rounded-md p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Task Description</th>
                    <th className="text-left p-2">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{task.taskName}</td>
                    <td className="p-2">{task.taskDescription || "N/A"}</td>
                    <td className="p-2">
                      {formatDateTime(task.taskDeadline) || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
