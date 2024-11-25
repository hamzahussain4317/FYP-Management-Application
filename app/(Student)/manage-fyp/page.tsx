"use client";
import React, { useState } from "react";
import TaskFilters from "@/Components/TaskFilters";
import SearchBar from "@/Components/SearchBar";
import TaskForm from "@/Components/TaskForm";
import ProgressBar from "@/Components/ProgressBar";
import TaskStatistics from "@/Components/TaskStatistics";
import TaskDetails from "@/Components/TaskDetails";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Task 1",
      priority: "High",
      status: "Pending",
      dueDate: "2024-11-25",
      completionDate: "",
      assignee: "Hamdan Vohra",
    },
    {
      id: 2,
      title: "Task 2",
      priority: "Medium",
      status: "Completed",
      completionDate: "2024-11-18",
      dueDate: "2024-11-20",
      assignee: "Hamza",
    },
    {
      id: 3,
      title: "Task 3",
      priority: "Low",
      status: "Overdue",
      dueDate: "2024-11-10",
      completionDate: "",
      assignee: "Ghulam Hussian",
    },
  ]);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const handleFilter = (filters: individualTaskFilters) => {
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

  const hiddenToggler = () => {
    const detailsEl: HTMLElement = document.getElementById("task-details")!;
    if (detailsEl instanceof HTMLElement) {
      const show: boolean = detailsEl.checkVisibility();
      if (!show) detailsEl.classList.toggle("hidden");
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <section className="wrapper">
      <div className="max-w-6xl mx-auto">
        <div className="flex align-center justify-between w-full mb-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Task Management
          </h1>

          <div className="flex items-center">
            <SearchBar onSearch={handleSearch} hiddenToggler={hiddenToggler} />
          </div>
        </div>
        <div className="mb-6">
          <TaskFilters onFilter={handleFilter} />
        </div>
        <div className="mb-6">
          <TaskStatistics
            taskAssigned={tasks.length}
            taskCompleted={completedTasks}
            taskOverDue={completedTasks}
            hiddenToggler={hiddenToggler}
          />
          {/* <TaskPieChart /> */}
        </div>

        {/* Progress   Tracking */}
        <div className="mb-6">
          <ProgressBar completed={completedTasks} total={tasks.length} />
        </div>

        {/* Task List */}
        <div className="mb-6">
          <TaskDetails allTasks={filteredTasks} />
        </div>

        {/* Task Creation Form */}
        <div className="mb-6 hidden">
          <TaskForm onSubmit={handleCreateTask} />
        </div>
      </div>
    </section>
  );
};

export default TasksPage;
