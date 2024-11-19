"use client";
import React, { useState } from "react";
import TaskFilters from "@/Components/TaskFilters";
import SearchBar from "@/Components/SearchBar";
import TaskForm from "@/Components/TaskForm";
import ProgressBar from "@/Components/ProgressBar";
import TaskPieChart from "@/Components/TaskPieChart";
import TaskStatistics from "@/Components/TaskStatistics";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete Project Proposal",
      description: "Submit the proposal to the supervisor",
      priority: "high",
      status: "completed",
      dueDate: "2024-11-20",
    },
    {
      id: 2,
      title: "Prepare Slides for Presentation",
      description: "Create slides for the weekly update meeting",
      priority: "medium",
      status: "pending",
      dueDate: "2024-11-22",
    },
  ]);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const handleFilter = (filters: any) => {
    const { priority, status, dueDate } = filters;
    let filtered = tasks;

    if (priority)
      filtered = filtered.filter((task) => task.priority === priority);
    if (status) filtered = filtered.filter((task) => task.status === status);
    if (dueDate) filtered = filtered.filter((task) => task.dueDate === dueDate);
    setFilteredTasks(filtered);
  };

  const handleSearch = (query: string) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
    setFilteredTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <section className="manage-fyp">
      <div className="wrapper">
        <div className="max-w-6xl mx-auto">
          <div className="flex align-center justify-between w-full mb-6">
            {/* Page Header */}
            <h1 className="text-2xl font-bold text-center mb-6">
              Task Management
            </h1>

            {/* Search Bar */}
            <div className="flex items-center">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <TaskFilters onFilter={handleFilter} />
          </div>

          <div className="mb-6">
            <TaskStatistics
              taskAssigned={tasks.length}
              taskCompleted={completedTasks}
              taskOverDue={completedTasks}
            />
            {/* <TaskPieChart /> */}
          </div>

          {/* Progress   Tracking */}
          <div className="mb-6">
            <ProgressBar completed={completedTasks} total={tasks.length} />
          </div>

          {/* Task Creation Form */}
          <div className="mb-6">
            <TaskForm onSubmit={handleCreateTask} />
          </div>

          {/* Task List */}
          <div className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Task List</h2>
            {filteredTasks.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-600">
                        {task.description}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No tasks found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasksPage;
