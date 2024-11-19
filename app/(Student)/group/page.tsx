import ProjectStatisticsChart from "@/Components/ProjectStatisticsChart";
const groupMembers: Student[] = [
  {
    id: 1,
    name: "John Doe",
    studentId: "STU001",
    domain: "Web Development",
    department: "Computer Science",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  {
    id: 2,
    name: "Jane Smith",
    studentId: "STU002",
    domain: "Data Science",
    department: "Information Technology",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  {
    id: 3,
    name: "Alice Brown",
    studentId: "STU003",
    domain: "Cybersecurity",
    department: "Computer Engineering",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  // Add more students if needed
];

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

export default function Group() {
  return (
    <section className="Group">
      <h1 className="group-heading">Group Details</h1>
      <div className="group-details">
        {groupMembers.map((student, index) => (
          <div key={student.id} className="student-card">
            <h2 className="student-heading">Student {index + 1}</h2>
            <div className="student-info-grid">
              <p>
                <strong>Name:</strong> {student.name}
              </p>
              <p>
                <strong>ID:</strong> {student.studentId}
              </p>
              <p>
                <strong>Domain:</strong> {student.domain}
              </p>
              <p>
                <strong>Department:</strong> {student.department}
              </p>
              <p>
                <strong>Section:</strong> {student.section}
              </p>
              <p>
                <strong>Degree:</strong> {student.Degree}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-[2rem]">
        <h1 className="items-left text-[32px]">Project Statistics</h1>
        <ProjectStatisticsChart data={stats} />
      </div>
    </section>
  );
}
