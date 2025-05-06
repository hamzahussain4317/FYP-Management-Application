const db = require("../db/pool.js");
const { sendPasswordEmail } = require("../utils/email.cjs");
const { generateRandomPassword } = require("../utils/passwordGenerator.cjs");

const registerUser = async (req, res) => {
  const { registration_scenario, role, user_ids } = req.body;

  let usersToRegister = [];

  const table = role === "student" ? "students" : "supervisors";
  if (registration_scenario === "ALL") {
    const query = `SELECT * FROM ${table} WHERE isRegistered = false`;
    usersToRegister = await db.query(query);
  } else if (registration_scenario === "SELECTED") {
    const query = `SELECT * FROM ${table} WHERE isRegistered = false and id IN (${user_ids.join(
      ", "
    )})`;
    usersToRegister = await db.query(query);
  }

  if (usersToRegister.length === 0) {
    return res.status(200).json({
      message: "No users to register | Already Registered",
      usersToRegister: usersToRegister,
    });
  }

  for (const user of usersToRegister) {
    const plainPassword = generateRandomPassword();
    console.log(plainPassword);
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      //TODO: registeration table name verification
      const registrationQuery = `INSERT INTO registeration (email, password, role) VALUES (?, ?, ?)`;
      try {
        await db.query(registrationQuery, [user.email, hashedPassword, role]);
      } catch (error) {
        console.error("Error inserting into registeration table:", error);
        return res.status(500).json({
          message: "Error inserting into registeration table",
          error: error.message,
        });
      }

      try {
        await sendPasswordEmail({
          email: user.email,
          password: plainPassword,
          role,
        });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          message: "Error sending email",
          error: error.message,
        });
      }
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({
        message: "Error hashing password",
        error: error.message,
      });
    }
  }

  return res
    .status(200)
    .json({ message: "Users registered and notified via email" });
};
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
  const { groupID } = req.params;
  const getGroupByIdQuery = `Select pg.groupId as groupId,pg.groupName,p.projectId,p.projectName,CONCAT(t.firstName , ' ' , t.lastName) as supervisorName,p.status as projectStatus ,s.studentId as studentId ,s.studentRoll as studentRoll,s.studentName,f.midEvaluation as midEvaluation,f.finalEvaluation as finalEvaluation from ProjectGroup pg JOIN Project p On p.projectId = pg.projectId JOIN teachers t ON t.teacherId = pg.supervisorId JOIN fypstudent f ON  f.groupId= pg.groupId JOIN students s ON s.studentId = f.fypStudentId where pg.groupId = ? `;
  try {
    let [response] = await db.promise().execute(getGroupByIdQuery, [groupID]);

    if (response.length === 0) {
      return res.status(404).json({ message: "No such group exist" });
    }

    return res.status(200).json({ groupDetails: response });
  } catch (err) {
    res.status(500).json({ errCode: 500, errorMessage: err.message });
  }
};
const patchGroupById = async (req, res) => {
  try {
    const { students } = req.body;

    if (!Array.isArray(students)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const studentJSON = JSON.stringify(students);

    const query = `CALL UpdateStudentMarks(?)`;

    const [response] = db.promise().execute(query, studentJSON);

    res
      .status(200)
      .json({ message: "Marks updated successfully!", data: response });
  } catch (err) {
    res.status(500).josn({ errCode: res.status, errMessage: err.message });
  }
};
const deleteGroupById = async (req, res) => {
  const { groupID } = req.body;
  const deleteQuery = `DELETE FROM ProjectGroup where groupID=?`;

  try {
    const [response] = await db.promise().execute(deleteQuery, groupID);

    res.status(200).json({ Message: "Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ errCode: res.status, errMessage: err.message });
  }
};
const getAllSupervisorDetails = async (req, res) => {};

module.exports = {
  registerUser,
  getAllGroupsDetails,
  getGroupById,
  patchGroupById,
  deleteGroupById,
  getAllSupervisorDetails,
};
