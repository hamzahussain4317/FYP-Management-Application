const db = require("../dbPool/createPool.js");
const upload = require("../middlewares/multer");


const addSupervisor=async(req,res)=>{
  upload.single("profilePic")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

  const {firstName , lastName , departmentName , email , dob }=req.body
  if(!firstName || !lastName || !email || !dob || !departmentName){
    return res.status(400).json({message:"Incomplete data"});
  }
  if(!req.file){
    return res.status(400).json({ message: "Image is required." });
  }

  const imagePath=req.file.path;
  try{
    query=`insert into teachers (firstName, lastName , departmentName, email , dateOfBirth , profilePic) values (?,?,?,?,?,?)`;
    db.query(query,[firstName , lastName , departmentName , email , dob , imagePath] ,async(err,result)=>{
      if(err){
        return res
        .status(500)
        .json({ message: "database query execution failed" , error:err.message});
        }
        return res.status(200).json({message:"teacher Successfully added"});
    })
  }
  catch(err){
    return res.status(500).json({message:"error assigning student"});
  }
})
}

//controller for supervisorProfile
const getProfile = async (req, res) => {
  const { supervisorID } = req.params;

  const getSupervisorDetails = `SELECT * FROM supervisor s JOIN teachers t ON t.teacherID = s.supervisorID where supervisorID = ?`;
  db.query(getSupervisorDetails, [supervisorID], async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error! DataBase query execution failed" });
    }
    
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Supervisor is not registered yet!" });
    }

    if(result[0].profilePic){
      result[0].profilePic = `data:image/jpeg;base64,${Buffer.from(
        result[0].profilePic
      ).toString("base64")}`;
    }
    return res.status(200).json({ supervisor: result[0] });
  });
};

// controller for Supervisor group Details
const getSupervisingGroups = async (req, res) => {
  const { supervisorID } = req.params;

  const getGroupDetails = `
    SELECT 
      g.groupID,
      g.groupName,
      p.projectName,
      p.status as projectStatus,
      p.startDate as projectStartDate,
      s.studentRoll 
    FROM 
      projectGroup g
    JOIN 
      fypStudent f ON f.groupID = g.groupID
    JOIN 
      Students s ON s.studentID = f.fypStudentID
    JOIN 
      project p ON p.projectID = g.projectID
    WHERE 
      g.supervisorID = ?`;

  db.query(getGroupDetails, [supervisorID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed." });
    }

    const groupMap = {};

    results.forEach((record) => {
      const {
        groupID,
        groupName,
        projectName,
        projectStatus,
        projectStartDate,
        studentRoll,
      } = record;

      if (!groupMap[groupID]) {
        groupMap[groupID] = {
          groupID,
          groupName,
          projectName,
          projectStatus,
          projectStartDate,
          students: [],
        };
      }

      groupMap[groupID].students.push(studentRoll);
    });

    const groupDetails = Object.values(groupMap);

    res.status(200).json({ groupDetails });
  });
};

module.exports = {
  getProfile,
  getSupervisingGroups,
  addSupervisor,
};
