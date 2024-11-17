"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectStatistics {
  month: string;
  assigned: number;
  completed: number;
}

interface ProjectStatisticsChartProps {
  data: ProjectStatistics[];
}

const ProjectStatisticsChart: React.FC<ProjectStatisticsChartProps> = ({
  data,
}) => {
  const chartData = {
    labels: data.map((entry) => entry.month),
    datasets: [
      {
        label: "Tasks Assigned",
        data: data.map((entry) => entry.assigned),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Tasks Completed",
        data: data.map((entry) => entry.completed),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "FYP Monthly Task Statistics",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ProjectStatisticsChart;
