const db = require("../dbPool/createPool");

//get student info// //for home//
const getProfile = async (req, res) => {
  const { stdID } = req.params;

  const query = "Select * from fypstudent where fypStudentID = ?";
  db.query(query, [stdID], async (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res
        .status(500)
        .json({ message: "Database query execution failed" });
    }
    if (result.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.status(200).json({ student: result[0] });
  });
};
module.exports={
    getProfile
}