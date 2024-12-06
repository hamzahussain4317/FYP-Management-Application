const db = require("../dbPool/createPool.js");

const registerUser = async (req, res) => {};
const getAllGroupsDetails = async (req, res) => {
  const getAllGroupsQuery = `Select pg.groupId,pg.groupName,p.projectId,p.projectName,t.firstName || ' ' || t.lastName as superisorName,p.status,s.studentRoll from ProjectGroup pg JOIN Project p On p.projectId = pg.projectId JOIN teachers t ON t.teacherId = pg.supervisorId JOIN fypstudent f ON  f.groupId= pg.groupId JOIN students s ON s.studentId = f.fypStudentId`;
  try {
    const [response] = await db.promise().execute(getAllGroupsQuery);

    //Structuring the response of the query for frontend
    const results = Object.values(
      response.reduce((acc, item) => {
        if (!acc[item.groupId]) {
          acc[item.groupId] = {
            groupId: item.groupId,
            groupName: item.groupName,
            students: [],
          };
        }

        // Add the student to the group's students list
        acc[item.groupId].students.push({
          studentId: item.studentId,
          studentName: item.studentName,
        });

        return acc;
      }, {})
    );

    res.status(200).json({ groupDetails: results });
  } catch (err) {
    res.status(500).json({ errCode: 500, errorMessage: err.message });
  }
};
const getGroupById = async (req, res) => {
  const getGroupByIdQuery = `Select pg.groupId,pg.groupName,p.projectId,p.projectName,t.firstName || ' ' || t.lastName as supervisorName,p.status as projectStatus ,s.studentRoll from ProjectGroup pg JOIN Project p On p.projectId = pg.projectId AND pg.groupId = ' ' JOIN teachers t ON t.teacherId = pg.supervisorId JOIN fypstudent f ON  f.groupId= pg.groupId JOIN students s ON s.studentId = f.fypStudentId`;
  try {
    const [response] = db.promise().execute(getGroupByIdQuery);

    if (response.length === 0) {
      return res.json(404).json({ message: "No such group exist" });
    }
    const group = ({
      groupId,
      groupName,
      projectId,
      projectName,
      projectStatus,
      supervisorName,
    } = response[0]);

    const students = response.map((student) => {
      studentRoll: student.studentId;
    });

    const results = { group, students };

    return res.status(200).json({ groupDetails: results });
  } catch (err) {
    res.status(500).json({ errCode: 500, errorMessage: err.message });
  }
};
const patchGroupById = async (req, res) => {};
const deleteGroupBYId = async (req, res) => {};
const getAllSupervisorDetails = async (req, res) => {};

module.exports = {
  registerUser,
  getAllGroupsDetails,
  getGroupById,
  patchGroupById,
  deleteGroupBYId,
  getAllSupervisorDetails,
};
