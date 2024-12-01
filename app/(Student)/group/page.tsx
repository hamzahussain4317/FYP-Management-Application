import GroupDetails from "../Components/GroupDetails";
import CreateGroup from "../Components/CreateGroup";

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

const supervisor = {
  supervisorID: 1,
  supervisorName: "Saleh Vohra",
  supervisorDomain: "Artificial Intellligence",
  supervisorEmail: "saleh.vohra@nu.edu.pk",
};

export default function Group() {
  return (
    <section className="wrapper">
      {groupMembers.length === 0 ? (
        <CreateGroup />
      ) : (
        <GroupDetails groupMembers={groupMembers} supervisor={supervisor} />
      )}
    </section>
  );
}
