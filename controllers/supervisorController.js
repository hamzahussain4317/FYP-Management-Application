const dbPool = require("../db/pool.js");
const upload = require("../middlewares/multer");

const addSupervisor = async (req, res) => {
  upload.single("profilePic")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    const { firstName, lastName, departmentName, email, dob, contactNo } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !dob ||
      !departmentName ||
      !contactNo
    ) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imagePath = req.file.path;
    try {
      query = `insert into teachers (firstname, lastname , departmentname, email , dateofbirth ,contactno, profilepic) values ($1,$2,$3,$4,$5,$6,$7)`;
      values = [
        firstName,
        lastName,
        departmentName,
        email,
        dob,
        contactNo,
        imagePath,
      ];
      dbPool.query(query, values, async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "database query execution failed",
            error: err.message,
          });
        }
        return res.status(200).json({ message: "teacher Successfully added" });
      });
    } catch (err) {
      return res.status(500).json({ message: "error assigning student" });
    }
  });
};

//controller for supervisorProfile
const getProfile = async (req, res) => {
  const { supervisorID } = req.params;

  const getSupervisorDetails = `SELECT * FROM supervisor s JOIN teachers t ON t.teacherid = s.supervisorid where supervisorid = $1`;
  try {
    const results = await dbPool.query(getSupervisorDetails, [supervisorID]);

    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Supervisor is not registered yet!" });
    }

    if (results.rows[0]?.profilepic) {
      results.rows[0].profilepic = `data:image/jpeg;base64,${Buffer.from(
        results.rows[0].profilepic
      ).toString("base64")}`;
    }
    return res.status(200).json({ supervisor: results.rows[0] });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error! DataBase query execution failed" });
  }
};

// controller for Supervisor group Details
const getSupervisingGroups = async (req, res) => {
  const { supervisorID } = req.params;

  const getGroupDetails = `SELECT 
  g.groupid,
  g.groupname,
  p.projectname,
  p.status AS projectstatus,
  p.startdate AS projectstartdate,
  s.studentroll
FROM 
  projectgroup g
JOIN 
  fypstudent f ON f.groupid = g.groupid
JOIN 
  students s ON s.studentid = f.fypstudentid
JOIN 
  project p ON p.projectid = g.projectid
WHERE 
  g.supervisorid = $1;`;
  
  try{
    const results= await dbPool.query(getGroupDetails, [supervisorID]);
    console.log("results: ", results.rows);
    const groupMap = {};
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "No groups found for this supervisor" });
    }

    results.rows.forEach((record) => {
      const {
        groupid,
        groupname,
        projectname,
        projectstatus,
        projectstartdate,
        studentroll,
      } = record;

      if (!groupMap[groupid]) {
        groupMap[groupid] = {
          groupid,
          groupname,
          projectname,
          projectstatus,
          projectstartdate,
          students: [],
        };
      }

      groupMap[groupid].students.push(studentroll);
    });

    const groupDetails = Object.values(groupMap);

    res.status(200).json({ groupDetails });
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: "Database query failed." });
  }
};

const updateProposal = async (req, res) => {
  const { groupID, supervisorID } = req.body;

  if (!groupID || !supervisorID) {
    return res.status(400).json({ message: "proposalID is required" });
  }

  const updateProposalQuery = `UPDATE Proposal SET proposalstatus = true WHERE groupid = $1 and supervisorid=$2`;

  try {
    console.log("groupID: ", groupID);
    const results = await dbPool.query(updateProposalQuery, [
      groupID,
      supervisorID,
    ]);
    console.log("results: ", results);
    if (results.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Proposal not found or already updated" });
    }
    res.status(200).json({ message: "Proposal updated successfully" });

    // dbPool.query(
    //   updateProposalQuery,
    //   [groupID, supervisorID],
    //   (err, result) => {
    //     if (err) {
    //       console.error("Database query failed:", err);
    //       return res.status(500).json({
    //         message: "Database query execution failed",
    //         error: err.message,
    //       });
    //     }

    //     if (result.affectedRows === 0) {
    //       return res
    //         .status(404)
    //         .json({ message: "Proposal not found or already updated" });
    //     }

    //     res.status(200).json({ message: "Proposal updated successfully" });
    //   }
    // );
  } catch (error) {
    console.error("Error updating proposal:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getProposalRequests = async (req, res) => {
  const { supervisorID } = req.params;

  const getProposalQuery = `SELECT 
    p.groupid,
    p.supervisorid,
    p.projectname,
    g.groupname,
    p.projectdomain,
    p.projectdescription,
    p.projectfile,
    p.proposalstatus
    FROM Proposal p
    JOIN ProjectGroup g ON p.groupid = g.groupid
    WHERE p.supervisorid = ?`;

  try {
    const [resultRows] = await dbPool
      .query(getProposalQuery, [supervisorID]);

    // Assuming the backend URL is stored in an environment variable
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

    const proposals = resultRows.map((row) => ({
      groupID: row.groupID,
      supervisorID: row.supervisorID,
      projectName: row.projectName,
      groupName: row.groupName,
      projectDomain: row.projectDomain || null,
      projectDescription: row.projectDescription,
      projectFile: row.projectFile
        ? `${backendUrl}/uploads/${row.projectFile}`
        : null,
      proposalStatus: row.proposalStatus === 1 ? "Accepted" : "Pending",
    }));

    console.log(proposals[0].projectFile);
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ error: "Failed to fetch proposals" });
  }
};

module.exports = {
  addSupervisor,
  getProfile,
  getSupervisingGroups,
  getProposalRequests,
  updateProposal,
};
