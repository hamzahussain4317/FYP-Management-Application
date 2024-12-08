"use client";
import React, { useState, useEffect } from "react";
import TaskFilters from "@/Components/TaskFilters";
import SearchBar from "@/Components/SearchBar";
import TaskForm from "@/Components/TaskForm";
import ProgressBar from "@/Components/ProgressBar";
import TaskStatistics from "@/Components/TaskStatistics";
import TaskDetails from "@/Components/TaskDetails";
import Link from "next/link";

const defaultTask: Task[] = [];

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTask);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(defaultTask);

  // const handleFilter = (filters: individualTaskFilters) => {
  //   const { priority, status, dueDate } = filters;
  //   let filtered = tasks;

  //   if (priority)
  //     filtered = filtered.filter((tasks: Task) => tasks.priority === priority);
  //   if (status)
  //     filtered = filtered.filter((tasks: Task) => tasks.status === status);
  //   if (dueDate)
  //     filtered = filtered.filter((tasks: Task) => tasks.dueDate === dueDate);
  //   setFilteredTasks(filtered);
  // };

  // const handleSearch = (query: string) => {
  //   const filtered = tasks.filter((task) =>
  //     task.title.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredTasks(filtered);
  // };

  // const handleCreateTask = (newTask: Task) => {
  //   setTasks((prevTasks) => [
  //     ...prevTasks,
  //     { ...newTask, id: prevTasks.length + 1 },
  //   ]);
  //   setFilteredTasks((prevTasks) => [
  //     ...prevTasks,
  //     { ...newTask, id: prevTasks.length + 1 },
  //   ]);
  // };

  // const hiddenToggler = () => {
  //   const detailsEl: HTMLElement = document.getElementById("task-details")!;
  //   if (detailsEl instanceof HTMLElement) {
  //     const show: boolean = detailsEl.checkVisibility();
  //     if (!show) detailsEl.classList.toggle("hidden");
  //   }
  // };

  const completedTasks = tasks.filter((task) => task.taskStatus === 1).length;
  const AssignedTasks = tasks.length;
  const overDueTask = tasks.filter(
    (task) => new Date(task.taskDeadline) < new Date()
  ).length;

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      viewTasks(Number(storedUserId));
    }
    console.log(tasks);
  }, []);

  const viewTasks = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/student/viewTasks/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setTasks(responseData.tasks);
      } else if (response.status === 500) {
        throw new Error("User already exist");
      } else {
        throw new Error("failed to signup");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="wrapper">
      <div className="max-w-6xl mx-auto">
        <div className="flex align-center justify-between w-full mb-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Task Management
          </h1>
          {/* <div className="flex items-center">
            <SearchBar onSearch={handleSearch} hiddenToggler={hiddenToggler} />
          </div> */}
          {Number(sessionStorage.getItem("isLeader")) === 1 ? (
        <div className="flex items-center">
          <Link
            href="/assignTask"
            className="mt-auto col-span-2 text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Assign Task
          </Link>
        </div>
      ) : null}
        </div>
        {/* <div className="mb-6">
          <TaskFilters onFilter={handleFilter} />
        </div> */}
        <div className="mb-6">
          <TaskStatistics
            taskAssigned={AssignedTasks}
            taskCompleted={completedTasks}
            taskOverDue={overDueTask}
            // hiddenToggler={hiddenToggler}
          />
          {/* <TaskPieChart /> */}
        </div>

        {/* Progress   Tracking */}
        <div className="mb-6">
          <ProgressBar completed={completedTasks} total={tasks.length} />
        </div>

        {/* Task List */}
        <div className="mb-6">
          <TaskDetails allTasks={tasks} fetchTasks={viewTasks} />
        </div>

        {/* Task Creation Form */}
        <div className="mb-6 hidden">
          {/* onSubmit={handleCreateTask} */}
          <TaskForm />
        </div>
      </div>
    </section>
  );
};

export default TasksPage;
