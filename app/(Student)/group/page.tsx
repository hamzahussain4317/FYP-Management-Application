import StdSideBar from "../../../Components/stdSideBar";
import StdNavBar from "../../../Components/stdNavBar";
type Student = {
  id: number;
  name: string;
  studentId: string;
  domain: string;
  department: string;
  section:string;
  Degree:string;
};

const groupMembers: Student[] = [
  {
    id: 1,
    name: "John Doe",
    studentId: "STU001",
    domain: "Web Development",
    department: "Computer Science",
    section:"BCS-5K",
    Degree:"BS(CS)"
  },
  {
    id: 2,
    name: "Jane Smith",
    studentId: "STU002",
    domain: "Data Science",
    department: "Information Technology",
    section:"BCS-5K",
    Degree:"BS(CS)"
  },
  {
    id: 3,
    name: "Alice Brown",
    studentId: "STU003",
    domain: "Cybersecurity",
    department: "Computer Engineering",
    section:"BCS-5K",
    Degree:"BS(CS)"
  },
  // Add more students if needed
];

export default function Group() {
  return (
    <section className="stdDashboard">
      <StdNavBar />
      <StdSideBar />
      <div className="Group">
        <h1 className="group-heading">Group Details</h1>
      <div className="group-details">
      {groupMembers.map((student, index) => (
        <div key={student.id} className="student-card">
          <h2 className="student-heading">Student {index + 1}</h2>
          <div className="student-info-grid">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>ID:</strong> {student.studentId}</p>
            <p><strong>Domain:</strong> {student.domain}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Degree:</strong> {student.Degree}</p>
          </div>
        </div>
      ))}
    </div>
      </div>
    </section>
  );
}
