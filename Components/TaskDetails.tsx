import React from "react";

interface TaskDetailsProps {
  allTasks: Task[];
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ allTasks }) => {
  const assignedTasks: Task[] = allTasks.filter(
    (task) => task.status === "Pending"
  );
  const completedTasks: Task[] = allTasks.filter(
    (task) => task.status === "Completed"
  );
  const overdueTasks: Task[] = allTasks.filter(
    (task) => task.status === "Overdue"
  );

  return (
    <div id="task-details" className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Task Details</h2>

      {/* Tasks Assigned */}
      <div>
        <p className="w-full text-left p-4 bg-blue-200 rounded-md mt-4">
          Tasks Assigned
        </p>
        {assignedTasks.map((task) => (
          <div key={task.id} className="mt-2">
            <div className="bg-white shadow-md rounded-md p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Priority</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{task.title}</td>
                    <td className="p-2">{task.priority}</td>
                    <td className="p-2">{task.status}</td>
                    <td className="p-2">{task.dueDate || "N/A"}</td>
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
          <div key={task.id} className="mt-2">
            <div className="bg-white shadow-md rounded-md p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Completion Date</th>
                    <th className="text-left p-2">Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{task.title}</td>
                    <td className="p-2">{task.completionDate || "N/A"}</td>
                    <td className="p-2">{task.assignee || "N/A"}</td>
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
          <div key={task.id} className="mt-2">
            <div className="bg-white shadow-md rounded-md p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Due Date</th>
                    <th className="text-left p-2">Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{task.title}</td>
                    <td className="p-2">{task.dueDate || "N/A"}</td>
                    <td className="p-2">{task.assignee || "N/A"}</td>
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
