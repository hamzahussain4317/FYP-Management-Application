const db = require("../dbPool/createPool");
const upload = require("../middlewares/multer");

//get student info// //for home//
const getProfile = async (req, res) => {
  const { stdID } = req.params;

  const query = `SELECT * FROM fypstudent f JOIN students s ON f.fypStudentID = s.studentID WHERE f.fypStudentID = ?;
  select f.groupID, p.* from fypStudent f join projectGroup pg on f.groupID = pg.groupID join project p on pg.projectID=p.projectID where f.fypStudentID=?;`;
  db.query(query, [stdID, stdID], async (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res
        .status(500)
        .json({ message: "Database query execution failed" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ student: result });
  });
};

const assignGroup = async (req, res) => {
  const { emails } = req.body;

  if (!emails || emails.length !== 3) {
    return res
      .status(400)
      .json({ message: "Exactly three emails are required." });
  }

  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database connection failed", error: err.message });
    }

    connection.beginTransaction(async (err) => {
      if (err) {
        connection.release();
        return res
          .status(500)
          .json({ message: "Transaction start failed", error: err.message });
      }

      try {
        // Call the stored procedure
        const procedureCall = `SET @groupCreated = NULL;
        CALL CheckAndCreateGroup(?, ?, ?, @groupCreated);`;
        await connection.promise().query(procedureCall, [...emails]);

        // Retrieve the output parameter
        const [result] = await connection
          .promise()
          .query("SELECT @groupCreated AS groupCreated");

        const groupCreated = result[0]?.groupCreated;
        console.log(groupCreated);

        if (groupCreated) {
          await connection.promise().commit();
          connection.release();
          return res
            .status(200)
            .json({ message: "Group assigned successfully." });
        } else {
          throw new Error(
            "Group could not be created. Check input conditions."
          );
        }
      } catch (error) {
        // Rollback transaction on error
        await connection.promise().rollback();
        connection.release();
        return res
          .status(500)
          .json({ message: "Error assigning group", error: error.message });
      }
    });
  });
};

const getGroupDetails = async (req, res) => {
  const { stdID } = req.params;
  const groupDetailsQuery = `select * from students where studentID IN (select fypStudentID from fypStudent where groupID IN(select groupID from fypStudent where fypStudentID=?))`;
  db.query(groupDetailsQuery, [stdID], async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "database query execution failed" });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Student does not have any group" });
    }
    return res.status(200).json({ student: result });
  });
};

const createProposal = async (req, res) => {
  upload.single("projectFile")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    const {
      projectName,
      projectDomain,
      projectDescription,
      groupID,
      supervisorEmails,
    } = req.body;

    // Validate input
    if (
      !projectName ||
      !projectDomain ||
      !projectDescription ||
      !groupID ||
      !supervisorEmails
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!Array.isArray(supervisorEmails) || supervisorEmails.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "Supervisor emails must be an array with at least one email.",
        });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Project file is required." });
    }

    const projectFilePath = req.file.path; // Path of the uploaded file

    try {
      // Fetch teacherIDs for the provided emails
      const emailQuery = `
        SELECT teacherID 
        FROM teachers
        WHERE email IN (?)
      `;
      const [teachers] = await db
        .promise()
        .query(emailQuery, [supervisorEmails]);

      if (teachers.length === 0) {
        return res
          .status(404)
          .json({
            message: "No matching supervisors found for the provided emails.",
          });
      }

      // Create proposals for each supervisor
      const proposalQuery = `
        INSERT INTO proposal 
        (projectName, projectDomain, projectDescription, groupID, supervisorID, projectFile)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const insertPromises = teachers.map((teacher) =>
        db
          .promise()
          .query(proposalQuery, [
            projectName,
            projectDomain,
            projectDescription,
            groupID,
            teacher.teacherID,
            projectFilePath,
          ])
      );

      await Promise.all(insertPromises);

      return res.status(201).json({
        message: "Proposals uploaded successfully.",
        supervisors: teachers.map((teacher) => teacher.email),
      });
    } catch (error) {
      console.error("Database error: ", error);
      return res
        .status(500)
        .json({ message: "Database query failed", error: error.message });
    }
  });
};

module.exports = {
  getProfile,
  assignGroup,
  getGroupDetails,
  createProposal,
};
