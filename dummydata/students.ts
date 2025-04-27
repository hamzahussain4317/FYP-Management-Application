const dummy_students = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  department: ["CS", "EE", "ME"][i % 3],
}));

export default dummy_students;
