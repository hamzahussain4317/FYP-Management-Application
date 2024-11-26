const db = require("../dbPool/createPool")

//controller for supervisorProfile
const getProfile = async(req,res)=>{
    const {supervisorID} = req.params;

    const getSupervisorDetails =   `SELECT * FROM supervisor s JOIN teacher t ON t.teacherID = s.supervisorID where supervisorID = ?`;
    db.query(getSupervisorDetails, [supervisorID], async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error! DataBase query execution failed" });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "Supervisor is not registered yet!" });
        }
        return res.status(200).json({ supervisor: result[0] });
      });
}


// const getSupervisingGroups = async(req,res){
//     const {supervisorID} = req.params;
//     const getGroupDetails = `SELECT * FROM groupID`
// }
module.exports = {
    getProfile,
    getSupervisingGroups,
}