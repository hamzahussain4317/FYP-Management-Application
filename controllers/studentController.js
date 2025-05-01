const dbPool = require("../db/pool.js");
const upload = require("../middlewares/multer");

const addStudent = async (req, res) => {
  upload.single("profilePic")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    const {
      studentRoll,
      studentName,
      departmentName,
      email,
      dob,
      section,
      campus,
      batch,
    } = req.body;
    if (
      !studentRoll ||
      !studentName ||
      !email ||
      !dob ||
      !departmentName ||
      !section ||
      !campus ||
      !batch
    ) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imagePath = req.file.path;
    try {
      const query = `INSERT INTO students (
    "studentroll", 
    "studentname", 
    "departmentname", 
    "email", 
    "dateofbirth", 
    "section", 
    "batch", 
    "campus", 
    "profilepic"
) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
`;

      const values = [
        studentRoll,
        studentName,
        departmentName,
        email,
        dob,
        section,
        batch,
        campus,
        imagePath,
      ];

      dbPool.query(query, values, async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "database query execution failed",
            error: err.message,
          });
        }
        return res.status(200).json({ message: "student Successfully added" });
      });
    } catch (err) {
      return res.status(500).json({ message: "error assigning student" });
    }
  });
};

//get student info// //for home//
const getProfile = async (req, res) => {
  const { stdID } = req.params;

  try {
    const query1 = `SELECT * FROM "fypstudent" f JOIN "students" s ON f."fypstudentid" = s."studentid" WHERE f."fypstudentid" = $1`;
    const query2 = `SELECT f."groupid", p.*, pg.*, t."email", CONCAT(t."firstname", ' ', t."lastname") AS "fullName" FROM "fypstudent" f JOIN "projectgroup" pg ON f."groupid" = pg."groupid" JOIN "project" p ON pg."projectid" = p."projectid" JOIN "supervisor" s ON pg."supervisorid" = s."supervisorid" JOIN "teachers" t ON t."teacherid" = s."supervisorid" WHERE f."fypstudentid" = $1;`;

    const studentResults = await dbPool.query(query1, [stdID]);
    const groupProjectResults = await dbPool.query(query2, [stdID]);
    if (
      studentResults.rows.length === 0 &&
      groupProjectResults.rows.length === 0
    ) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("myresult", studentResults.rows[0]);
    if (studentResults.rows[0]?.profilepic) {
      studentResults.rows[0].profilepic = `data:image/jpeg;base64,${Buffer.from(
        studentResults.rows[0].profilepic
      ).toString("base64")}`;
    }

    return res.status(200).json({
      student: studentResults.rows[0],
      groupProjectInfo: groupProjectResults.rows,
    });
  } catch (err) {
    console.error("Error executing query: ", err);
    return res.status(500).json({ message: "Database query execution failed" });
  }
};

const assignGroup = async (req, res) => {
  const { emails, p_groupname } = req.body;

  if (!emails || emails.length !== 3) {
    return res
      .status(400)
      .json({ message: "Exactly three emails are required." });
  }

  const client = await dbPool.connect();
  try {
    await client.query("BEGIN");
    const query = `SELECT * FROM checkandcreategroup($1, $2, $3, $4)`;
    const values = [...emails, p_groupname];

    const result = await client.query(query, values);
    const groupCreated = result.rows[0].checkandcreategroup;
    if (groupCreated === true) {
      await client.query("COMMIT");
      return res.status(200).json({ message: "Group assigned successfully." });
    } else if (groupCreated === false) {
      return res.status(200).json({
        message:
          "Student Does not exist or Some of the student have already belongs to specific group.",
      });
    } else {
      throw new Error("Group could not be created. Check input conditions.");
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error executing query: ", error);
    return res.status(500).json({
      message: "Database query execution failed",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

const getGroupDetails = async (req, res) => {
  const { stdID } = req.params;
  try {
    const query1 = `select * from students where studentid IN (select fypstudentid from fypStudent where groupid IN(select groupid from fypStudent where fypstudentid=$1))`;
    const query2 = `select f.isleader,t.* from fypStudent f left join projectgroup pg on f.groupid=pg.groupid left join supervisor s on pg.supervisorid = s.supervisorid left join teachers t on s.supervisorid=t.teacherid where f.fypstudentid=$1; `;

    const groupStudents = await dbPool.query(query1, [stdID]);
    const isLeadrAndSupervisor = await dbPool.query(query2, [stdID]);

    if (
      groupStudents.rows.length === 0 &&
      isLeadrAndSupervisor.rows.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "Student does not have any group" });
    }
    groupStudents.rows.map((item, index) => {
      if (item?.profilepic) {
        item.profilepic = `data:image/jpeg;base64,${Buffer.from(
          item.profilepic
        ).toString("base64")}`;
      }
    });

    return res.status(200).json({
      groupStudents: groupStudents.rows,
      isLeadrAndSupervisor: isLeadrAndSupervisor.rows,
    });
  } catch (err) {
    console.error("Error executing query: ", err);
    return res.status(500).json({ message: "Database query execution failed" });
  }
};
// CREATE OR REPLACE VIEW SupervisorList AS
// SELECT
// t.email,
// t.profilePic,
// s.supervisorID,
// CONCAT ( t.firstName,' ' , t.lastName) as supervisorName,
// t.departmentName as departmentName,
// s.specializedDomain,
// pg.groupsCount as groupsCount,
// s.cgpaCriteria
// FROM
// supervisor s
// JOIN
// teachers t
// ON t.teacherID = s.supervisorID
// LEFT JOIN
// (SELECT COUNT(groupID) as groupsCount,supervisorID from projectGroup GROUP BY supervisorID) pg
// ON pg.supervisorID = s.supervisorID
// LEFT JOIN
// (SELECT supervisorID,AVG(ratings) as ratings FROM supervisorRatings
// GROUP BY supervisorID) r
// ON r.supervisorID = s.supervisorID;

const getSupervisorList = async (req, res) => {
  const createViewQuery = `CREATE OR REPLACE VIEW supervisor_list AS
SELECT 
  t.email,
  t.profilepic,
  s.supervisorid,
  CONCAT(t.firstname, ' ', t.lastname) AS supervisorname,
  t.departmentname AS departmentname,
  s.specializeddomain,
  pg.groupscount AS groupscount,
  s.cgpacriteria,
  r.ratings AS ratings
FROM 
  supervisor s
JOIN 
  teachers t 
ON 
  t.teacherid = s.supervisorid
LEFT JOIN 
  (
    SELECT 
      supervisorid, 
      COUNT(groupid) AS groupscount 
    FROM 
      projectgroup 
    GROUP BY 
      supervisorid
  ) pg ON pg.supervisorid = s.supervisorid
LEFT JOIN 
  (
    SELECT 
      supervisorid, 
      AVG(ratings) AS ratings 
    FROM 
      supervisorratings 
    GROUP BY 
      supervisorid
  ) r ON r.supervisorid = s.supervisorid;
`;

  dbPool.query(createViewQuery, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ error: err, message: "Error while creating view" });
    }
    console.log(results);
    const retrievalQuery = "SELECT * from supervisor_list";
    dbPool.query(retrievalQuery, (err, results) => {
      if (err) {
        res.status(500).json({
          error: err,
          message: "Error while retreiving data from view",
        });
      }

      if (results.rows.length === 0) {
        res.status(404).json({ message: "No supervisor Registered Yet!" });
      }
      results.rows.map((item, index) => {
        if (item?.profilepic) {
          item.profilepic = `data:image/jpeg;base64,${Buffer.from(
            item.profilepic
          ).toString("base64")}`;
        }
      });
      console.log("supervisorList", results.rows);

      res.status(200).json({ supervisorList: results.rows });
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

    let {
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
    supervisorEmails = [supervisorEmails];
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
        SELECT teacherid
        FROM teachers
        WHERE email IN ANY($1)
      `;
      const [teachers] = await dbPool
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
  return date.toISOString().slice(0, 19).replace("T", " ");
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
      return res
        .status(400)
        .json({ message: "taskDeadline must be in the future" });
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
      return res
        .status(400)
        .json({ message: "Students do not belong to the same group" });
    }

    // Fetch student ID from email
    const [memberResult] = await db
      .promise()
      .query("SELECT studentID FROM students WHERE email = ?", [stdMail]);
    const memberID = memberResult[0]?.studentID;

    // Fetch project ID from the group
    const [projectResult] = await db
      .promise()
      .query(
        "SELECT p.projectID FROM fypStudent f JOIN projectGroup p ON f.groupID = p.groupID WHERE f.fypStudentID = ?",
        [stdID]
      );
    const projectID = projectResult[0]?.projectID;

    // Insert task into the tasks table
    const insertTaskQuery = `
      INSERT INTO tasks (projectID, fypStudentID, taskName, taskDescription, taskDeadline)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db
      .promise()
      .query(insertTaskQuery, [
        projectID,
        memberID,
        taskName,
        taskDescription,
        formattedDeadline,
      ]);

    return res.status(201).json({ message: "Task assigned successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ message: "Database query failed", error: error.message });
  }
};

const viewTask = async (req, res) => {
  const { stdID } = req.params;

  try {
    const taskQuery = `
      SELECT * FROM tasks
      WHERE fypStudentID = ?
    `;

    const [tasks] = await db.promise().query(taskQuery, [stdID]);

    if (tasks.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No tasks assigned to the student",
        tasks: [],
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Database error: ", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve tasks",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { stdID } = req.params;
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({
      status: "error",
      message: "Student ID and task name are required.",
    });
  }

  try {
    const updateTask = `update tasks set taskStatus = 1 where fypStudentID=? and taskName=?`;
    const [update] = await db.promise().query(updateTask, [stdID, taskName]);

    if (update.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "No tasks found for the provided student ID",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Tasks updated successfully",
      update,
    });
  } catch (err) {
    console.error("Database error: ", err);
    return res.status(500).json({
      status: "error",
      message: "failed to update tasks",
      error: err.message,
    });
  }
};

const projectOversight = async (req, res) => {
  const { stdID } = req.params;
  if (!stdID) {
    return res.status(400).json({ message: "studentID is required" });
  }
  try {
    const [retrieveProjectID] = await db
      .promise()
      .query("SELECT projectID FROM tasks WHERE fypStudentID = ?", [stdID]);
    const projectID = retrieveProjectID[0]?.projectID;
    if (!projectID) {
      return res
        .status(404)
        .json({ message: "No project found for this student" });
    }
    const [tasks] = await db
      .promise()
      .query("SELECT * FROM tasks WHERE projectID = ?", [projectID]);

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for this project" });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ message: "Database query failed", error: error.message });
  }
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
  projectOversight,
};
