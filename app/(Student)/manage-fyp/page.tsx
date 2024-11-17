import ProjectStatisticsChart from "@/Components/ProjectStatisticsChart";

export default function Group() {
  const stats = [
    { month: "January", assigned: 10, completed: 8 },
    { month: "February", assigned: 15, completed: 12 },
    { month: "March", assigned: 20, completed: 15 },
    { month: "April", assigned: 25, completed: 20 },
    { month: "May", assigned: 30, completed: 25 },
    { month: "June", assigned: 35, completed: 28 },
    { month: "July", assigned: 40, completed: 35 },
    { month: "August", assigned: 45, completed: 40 },
    { month: "September", assigned: 50, completed: 45 },
    { month: "October", assigned: 55, completed: 50 },
    { month: "November", assigned: 60, completed: 55 },
    { month: "December", assigned: 65, completed: 60 },
  ];

  return (
    <section className="manage-FYP">
      <div className="grids">
        <div className="left">
          <ProjectStatisticsChart data={stats} />
        </div>
        <div className="right">
          {/* <ProjectStatisticsChart data={stats} /> */}
        </div>
      </div>
    </section>
  );
}
