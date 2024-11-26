// components/TaskForm.tsx
import React, { useState } from "react";

const TaskForm = ({ onSubmit }: { onSubmit: (task: any) => void }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, priority, dueDate, description });
    setTitle("");
    setPriority("low");
    setDueDate("");
    setDescription("");
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create Task</h2>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Task Title"
          className="p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          className="p-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded-md"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
