const dbPool = require("../db/pool.js");
const bcrypt = require("bcrypt");
const { sendPasswordEmail } = require("../utils/email.cjs");
const { generateRandomPassword } = require("../utils/passwordGenerator.cjs");

const registerUser = async (req, res) => {
  const { registration_scenario, role, user_ids } = req.body;

  let usersToRegister;
  const table = role === "student" ? "students" : "supervisors";

  users = await dbPool.query(
    `SELECT * FROM ${table} WHERE isregister = false and studentid IN (53)`
  );

  let query = "";
  if (registration_scenario === "ALL") {
    query = `SELECT * FROM ${table} WHERE isregister = false`;
  } else if (registration_scenario === "SELECTED" && Array.isArray(user_ids)) {
    const placeholders = user_ids.map((_, idx) => `$${idx + 1}`).join(", ");
    query = `SELECT * FROM ${table} WHERE isregister = false and studentid IN ($1)`;
  } else {
    return res.status(200).json({
      message: "No Users Selected | Unusual registration_scenario",
      usersToRegister: [],
    });
  }

  usersToRegister = await dbPool.query(query, user_ids);

  if (
    !usersToRegister ||
    !Array.isArray(usersToRegister.rows) ||
    usersToRegister.rows.length === 0
  ) {
    console.log("No users to register | Already Registered");
    return res.status(200).json({
      message: "No users to register | Already Registered",
      usersToRegister: [],
    });
  }

  for (const user of usersToRegister.rows) {
    const plainPassword = generateRandomPassword();
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const registrationQuery = `INSERT INTO registration (username,email, hashedpassword, userrole) VALUES ($1,$2,$3,$4)`;
      try {
        await dbPool.query(registrationQuery, [
          user.studentname,
          user.email,
          hashedPassword,
          role,
        ]);
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
    const [response] = await dbPool.promise().execute(getAllGroupsQuery);

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
    let [response] = await dbPool
      .promise()
      .execute(getGroupByIdQuery, [groupID]);

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

    const [response] = dbPool.promise().execute(query, studentJSON);

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
    const [response] = await dbPool.promise().execute(deleteQuery, groupID);

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
