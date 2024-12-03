"use client";
import React, { useState } from "react";

const AssignTask = () => {
  const [formData, setFormData] = useState({
    email: "",
    taskName: "",
    taskDescription: "",
    taskDeadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // You can add API integration here to send data to the backend
  };

  return (
    <section className="wrapper min-h-full space-y-4 p-6">
      <h1 className="text-2xl font-bold mb-10 text-center text-gray-700">
        Assign Task
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8  ">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="taskName"
            className="block text-sm font-medium text-gray-600"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="taskDescription"
            className="block text-sm font-medium text-gray-600"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="taskDeadline"
            className="block text-sm font-medium text-gray-600"
          >
            Task Deadline
          </label>
          <input
            type="datetime-local"
            id="taskDeadline"
            name="taskDeadline"
            value={formData.taskDeadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bottom-0"
        >
          Assign Task
        </button>
      </form>
    </section>
  );
};

export default AssignTask;
