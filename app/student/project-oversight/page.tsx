"use client";
import ProjectStatisticsChart from "@/Components/ProjectStatisticsChart";
import { useState, useEffect } from "react";
interface chart {
  month: string;
  assigned: number;
  completed: number;
}

const defaultOverSightTask: overSightTask[] = []

// const stats: chart[] = [
//   { month: "Jan", assigned: 10, completed: 8 },
//   { month: "Feb", assigned: 15, completed: 12 },
//   { month: "Mar", assigned: 20, completed: 15 },
//   { month: "Apr", assigned: 25, completed: 20 },
//   { month: "May", assigned: 30, completed: 25 },
//   { month: "Jun", assigned: 35, completed: 28 },
//   { month: "Jul", assigned: 40, completed: 35 },
//   { month: "Aug", assigned: 45, completed: 40 },
//   { month: "Sep", assigned: 50, completed: 45 },
//   { month: "Oct", assigned: 55, completed: 50 },
//   { month: "Nov", assigned: 60, completed: 55 },
//   { month: "Dec", assigned: 65, completed: 60 },
// ];

export default function ProjectOversight() {
  const [oversightTask, setOversightTask] =useState<overSightTask[]>(defaultOverSightTask);
  const [stats, setStats] = useState<chart[]>([]);
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      getProjectOversight(Number(storedUserId));
    }
  }, []);
  const getProjectOversight = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/student/projectOversight/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setOversightTask(responseData.tasks);
        const groupedStats = computeStatistics(responseData.tasks);
        setStats(groupedStats);
      } else if (response.status === 404) {
        throw new Error("No project found for this student");
      } else if (response.status === 500) {
        throw new Error("Database query failed");
      } else {
        throw new Error("failed to signup");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const computeStatistics = (tasks: overSightTask[]): chart[] => {
    const grouped = tasks.reduce((acc: Record<string, { assigned: number; completed: number }>, task) => {
      const month = new Date(task.taskDeadline).toLocaleString("default", { month: "short" }); // Extract month name
      if (!acc[month]) {
        acc[month] = { assigned: 0, completed: 0 };
      }

      acc[month].assigned += 1; 
      if (task.taskStatus === 1) acc[month].completed += 1; 

      return acc;
    }, {});

    const result = Object.keys(grouped).map((month) => ({
      month,
      assigned: grouped[month].assigned,
      completed: grouped[month].completed,
    }));

    return result;
  };

  return (
    <section className="wrapper">
      <div className="mt-5 p-[2rem]">
        <h1 className="items-left text-[32px]">Project Statistics</h1>
        <ProjectStatisticsChart data={stats} />
      </div>
    </section>
  );
}
