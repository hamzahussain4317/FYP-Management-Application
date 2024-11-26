// components/TaskFilters.tsx
import React, { useState } from "react";

const TaskFilters = ({ onFilter }: { onFilter: (filters: individualTaskFilters) => void }) => {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const applyFilters = () => {
    onFilter({ priority, status, dueDate });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="p-2 border rounded-md"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="p-2 border rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded-md"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default TaskFilters;
