const dummy_students: StudentList[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  rollNumber: `Roll-${i + 1}`,
  groupId: null, // will be assigned later
  groupName: null, // will be assigned later
  supervisorId: null, // will be assigned later
  supervisorName: null, // will be assigned later
  isRegistered: Math.random() < 0.5,
}));

const dummy_supervisors: SupervisorList[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i + 1,
    name: `Supervisor ${i + 1}`,
    email: `supervisor.${i + 1}@nu.edu.pk`,
    groupsHandled: 0,
    isRegistered: Math.random() < 0.5,
  })
);

const dummy_groups: GroupList[] = Array.from({ length: 30 }, (_, i) => {
  let supervisor = null;

  const index = Math.floor(Math.random() * dummy_supervisors.length);
  if (dummy_supervisors[index].groupsHandled < 3) {
    dummy_supervisors[index].groupsHandled += 1;
    supervisor = dummy_supervisors[index];
  }

  // Randomly pick 1 to 3 unassigned students
  const unassignedStudents = dummy_students.filter((s) => s.groupId === null);
  const groupSize = Math.min(
    Math.floor(Math.random() * 3) + 1,
    unassignedStudents.length
  );
  const assignedStudents = unassignedStudents.slice(0, groupSize);

  assignedStudents.forEach((student) => {
    student.groupId = i + 1;
    student.groupName = `Group ${i + 1}`;
    student.supervisorId = supervisor?.id || null;
    student.supervisorName = supervisor?.name || null;
  });

  return {
    id: i + 1,
    name: `Group ${i + 1}`,
    projectName: `Project ${i + 1}`,
    supervisorId: supervisor ? supervisor.id : null,
    supervisorName: supervisor ? supervisor.name : null,
    studentsCount: assignedStudents.length,
    completionRate: Math.random() * 100,
    status: Math.random() < 0.5 ? "Active" : "Inactive",
  };
});

export { dummy_students, dummy_supervisors, dummy_groups };
