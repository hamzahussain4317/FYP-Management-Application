import ProjectStatisticsChart from "@/Components/ProjectStatisticsChart";
interface chart {
  month: string;
  assigned: number;
  completed: number;
}
const stats: chart[] = [
  { month: "Jan", assigned: 10, completed: 8 },
  { month: "Feb", assigned: 15, completed: 12 },
  { month: "Mar", assigned: 20, completed: 15 },
  { month: "Apr", assigned: 25, completed: 20 },
  { month: "May", assigned: 30, completed: 25 },
  { month: "Jun", assigned: 35, completed: 28 },
  { month: "Jul", assigned: 40, completed: 35 },
  { month: "Aug", assigned: 45, completed: 40 },
  { month: "Sep", assigned: 50, completed: 45 },
  { month: "Oct", assigned: 55, completed: 50 },
  { month: "Nov", assigned: 60, completed: 55 },
  { month: "Dec", assigned: 65, completed: 60 },
];

export default function ProjectOversight() {
  return (
    <section className="wrapper">
      <div className="mt-5 p-[2rem]">
        <h1 className="items-left text-[32px]">Project Statistics</h1>
        <ProjectStatisticsChart data={stats} />
      </div>
    </section>
  );
}
