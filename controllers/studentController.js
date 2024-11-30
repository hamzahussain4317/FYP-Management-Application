const db = require("../dbPool/createPool");
const upload = require("../middlewares/multer");

const addStudent = async (req, res) => {
  upload.single("profilePic")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    const { studentRoll, studentName, departmentName, email, dob } = req.body;
    if (!studentRoll || !studentName || !email || !dob || !departmentName) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imagePath = req.file.path;
    try {
      query = `insert into students (studentRoll, studentName, departmentName, email, dateOfBirth,profilePic) values (?,?,?,?,?,?)`;
      db.query(
        query,
        [studentRoll, studentName, departmentName, email, dob, imagePath],
        async (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "database query execution failed",
              error: err.message,
            });
          }
          return res
            .status(200)
            .json({ message: "student Successfully added" });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: "error assigning student" });
    }
  });
};

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
  const { emails, groupName } = req.body;

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
        CALL CheckAndCreateGroup(?, ?, ? , ? , @groupCreated);`;
        await connection.promise().query(procedureCall, [...emails, groupName]);

        // Retrieve the output parameter
        const [result] = await connection
          .promise()
          .query("SELECT @groupCreated AS groupCreated");

        const groupCreated = result[0]?.groupCreated;

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

const getSupervisorList = async (req, res) => {
  const { studentID } = req.params;

  const createViewQuery = `CREATE OR REPLACE VIEW SupervisorList AS
        SELECT 
          s.supervisorID,
          t.firstName OR ' ' OR t.lastName as supervisorName,
          t.departmentId as departmentName,
          s.specializedDomain,
          pg.groupsCount as groupsCount,
          s.cgpaCriteria
        FROM 
          supervisor s
        JOIN 
          teachers t 
        ON t.teacherID = s.supervisorID
        JOIN 
          (SELECT COUNT(groupID) as groupsCount,supervisorID from projectGroup GROUP BY supervisorID) pg
        ON pg.supervisorID = s.supervisorID
        JOIN 
          (SELECT supervisorID,AVG(ratings) as ratings FROM supervisorRatings
          GROUP BY supervisorID) r
        ON r.supervisorID = s.supervisorID;`;

  db.query(createViewQuery, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ error: err, message: "Error while creating view" });
    }

    const retrievalQuery = "SELECT * from supervisorList";
    db.query(retrievalQuery, (err, results) => {
      if (err) {
        res.status(500).json({
          error: err,
          message: "Error while retreiving data from view",
        });
      }

      if (results.length() === 0) {
        res.status(404).json({ message: "No supervisor Registered Yet!" });
      }

      res.status(200).json({ supervisorList: results });
    });
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
      groupName,
      supervisorEmails,
    } = req.body;

    // Validate input
    if (
      !projectName ||
      !projectDomain ||
      !projectDescription ||
      !groupName ||
      !supervisorEmails
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!Array.isArray(supervisorEmails) || supervisorEmails.length === 0) {
      return res.status(400).json({
        message: "Supervisor emails must be an array with at least one email.",
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
      console.log("teachers:", teachers);

      if (teachers.length === 0) {
        return res.status(404).json({
          message: "No matching supervisors found for the provided emails.",
        });
      }
      const groupQuery = `SELECT groupID FROM projectGroup WHERE groupName = ?`;
      const [groupResult] = await db.promise().query(groupQuery, [groupName]);

      if (groupResult.length === 0) {
        return res.status(404).json({ message: "Group not found." });
      }

      const groupID = groupResult[0].groupID;
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
      return res.status(500).json({
        message: "Database query failed OR no group exists",
        error: error.message,
      });
    }
  });
};




const formatMySQLDateTime = (dateString) => {
  const date = new Date(dateString); 
  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

const assignTask = async (req, res) => {
  const { stdID } = req.params;
  const { stdMail, taskName, taskDescription, taskDeadline } = req.body;

  if (!stdMail || !taskName || !taskDescription || !taskDeadline) {
    return res.status(400).json({ message: "Incomplete Data" });
  }

  try {
    const formattedDeadline = formatMySQLDateTime(taskDeadline);

    const currentDate = new Date();
    if (new Date(formattedDeadline) <= currentDate) {
      return res.status(400).json({ message: "taskDeadline must be in the future" });
    }


    const [groupOneResult] = await db
      .promise()
      .query("SELECT groupID FROM fypStudent WHERE fypStudentID = ?", [stdID]);
    const groupIdOne = groupOneResult[0]?.groupID;

  
    const [groupTwoResult] = await db
      .promise()
      .query(
        "SELECT f.groupID FROM students s JOIN fypStudent f ON s.studentID = f.fypStudentID WHERE s.email = ?",
        [stdMail]
      );
    const groupIdTwo = groupTwoResult[0]?.groupID;

    // Check if students are in the same group
    if (groupIdOne !== groupIdTwo) {
      return res.status(400).json({ message: "Students do not belong to the same group" });
    }

    // Fetch student ID from email
    const [memberResult] = await db
      .promise()
      .query("SELECT studentID FROM students WHERE email = ?", [stdMail]);
    const memberID = memberResult[0]?.studentID;

    // Fetch project ID from the group
    const [projectResult] = await db
      .promise()
      .query("SELECT p.projectID FROM fypStudent f JOIN projectGroup p ON f.groupID = p.groupID WHERE f.fypStudentID = ?", [stdID]);
    const projectID = projectResult[0]?.projectID;

    // Insert task into the tasks table
    const insertTaskQuery = `
      INSERT INTO tasks (projectID, fypStudentID, taskName, taskDescription, taskDeadline)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.promise().query(insertTaskQuery, [
      projectID,
      memberID,
      taskName,
      taskDescription,
      formattedDeadline,
    ]);

    return res.status(201).json({ message: "Task assigned successfully" });

  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Database query failed", error: error.message });
  }
};



const viewTask = async (req, res) => {
  console.log("View Task");
};

const updateTask = async (req, res) => {
  console.log("update Task");
};

module.exports = {
  getProfile,
  assignGroup,
  getGroupDetails,
  getSupervisorList,
  createProposal,
  addStudent,
  assignTask,
  viewTask,
  updateTask,
};
