const db = require("../dbPool/createPool");

//get student info// //for home//
const getProfile = async (req, res) => {
  const { stdID } = req.params;

  const query =
    "SELECT * FROM fypstudent f JOIN students s ON f.fypStudentID = s.studentID WHERE f.fypStudentID = ?";
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

//create group//
const assignGroup = async (req, res) => {
  const { emails, leaderRoll } = req.body;
  if (!emails || emails.length === 0 || !leaderRoll) {
    return res
      .status(400)
      .json({ message: "Emails and group name are required" });
  }
  try {
    db.beginTransaction(err => {
        if (err) throw err;

        // Insert a new group        
        insertGroupQuery=`INSERT INTO projectGroup (leaderID)  SELECT f.fypStudentID FROM fypStudent f JOIN students s ON f.fypStudentID = s.studentID WHERE s.studentRoll = ?`;
        db.query(insertGroupQuery, [leaderRoll], (err, result) => {
            if (err) return db.rollback(() => { throw err; });

            const groupId = result.insertId;

            // Update students with the new group_id
            const placeholders = emails.map(() => '?').join(',');
            const query = `UPDATE fypstudent SET groupID = ? WHERE email IN (${placeholders})`;

            db.query(query, [groupId, ...emails], (err) => {
                if (err) return db.rollback(() => { throw err; });

                db.commit(err => {
                    if (err) return db.rollback(() => { throw err; });
                    res.status(200).json({ message: 'Group assigned successfully', groupId });
                });
            });
        });
    });
} catch (error) {
    res.status(500).json({ message: 'Error assigning group', error: error.message });
}
};

module.exports = {
  getProfile,
  assignGroup,
};
