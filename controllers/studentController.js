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
// const assignGroup = async (req, res) => {
//   const { emails, leaderRoll } = req.body;
//   if (!emails || emails.length === 0 || !leaderRoll) {
//     return res
//       .status(400)
//       .json({ message: "Emails and group name are required" });
//   }
//   try {
//     // db.beginTransaction(err => {
//     //     if (err) throw err;

//     //     // Insert a new group
//     //     insertGroupQuery=`INSERT INTO projectGroup (leaderID)  SELECT f.fypStudentID FROM fypStudent f JOIN students s ON f.fypStudentID = s.studentID WHERE s.studentRoll = ?`;
//     //     db.query(insertGroupQuery, [leaderRoll], (err, result) => {
//     //         if (err) return db.rollback(() => { throw err; });

//     //         const groupId = result.insertId;

//     //         // Update students with the new group_id
//     //         const placeholders = emails.map(() => '?').join(',');
//     //         const query = `UPDATE fypStudent SET groupID = ? WHERE fypStudentID IN (select studentID from students WHERE email IN (${placeholders}))`;

//     //         db.query(query, [groupId, ...emails], (err) => {
//     //             if (err) return db.rollback(() => { throw err; });

//     //             db.commit(err => {
//     //                 if (err) return db.rollback(() => { throw err; });
//     //                 res.status(200).json({ message: 'Group assigned successfully', groupId });
//     //             });
//     //         });
//     //     });
//     // });
//     db.getConnection((err, connection) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "Database connection failed", error: err.message });
//       }

//       console.log(connection);
//       connection.beginTransaction((err) => {
//         if (err) {
//           connection.release(); // Always release the connection in case of errors
//           return res
//             .status(500)
//             .json({ message: "Transaction start failed", error: err.message });
//         }

//         // Continue with your logic using the `connection` object
//         const insertGroupQuery = `INSERT INTO projectGroup (leaderID)
//             SELECT f.fypStudentID FROM fypStudent f
//             JOIN students s ON f.fypStudentID = s.studentID
//             WHERE s.studentRoll = ?`;

//         connection.query(insertGroupQuery, [leaderRoll], (err, result) => {
//           if (err) {
//             return connection.rollback(() => {
//               connection.release();
//               res
//                 .status(500)
//                 .json({
//                   message: "Group insertion failed",
//                   error: err.message,
//                 });
//             });
//           }

//           const groupId = result.insertId;
//           const placeholders = emails.map(() => "?").join(",");
//           const updateQuery = `UPDATE fypStudent SET groupID = ? WHERE fypStudentID IN (select studentID from students WHERE email IN (${placeholders}))`;

//           connection.query(updateQuery, [groupId, ...emails], (err) => {
//             if (err) {
//               return connection.rollback(() => {
//                 connection.release();
//                 res
//                   .status(500)
//                   .json({ message: "Group update failed", error: err.message });
//               });
//             }

//             connection.commit((err) => {
//               if (err) {
//                 return connection.rollback(() => {
//                   connection.release();
//                   res
//                     .status(500)
//                     .json({
//                       message: "Transaction commit failed",
//                       error: err.message,
//                     });
//                 });
//               }
//               connection.release();
//               res
//                 .status(200)
//                 .json({ message: "Group assigned successfully", groupId });
//             });
//           });
//         });
//       });
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error assigning group", error: error.message });
//   }
// };

// const assignGroup = async (req, res) => {
//   const { emails, leaderRoll } = req.body;

//   if (!emails || emails.length === 0 || !leaderRoll) {
//     return res
//       .status(400)
//       .json({ message: "Emails and leaderRoll are required" });
//   }

//   db.getConnection((err, connection) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: "Database connection failed", error: err.message });
//     }

//     connection.beginTransaction(async (err) => {
//       if (err) {
//         connection.release();
//         return res
//           .status(500)
//           .json({ message: "Transaction start failed", error: err.message });
//       }

//       try {
//         const validateLeaderQuery = `SELECT s.studentRoll FROM students s  WHERE s.email IN (${emails.map(() => '?').join(',')}) and s.studentRoll=?`;
//         const [validationResult] = await connection
//         .promise()
//         .query(validateLeaderQuery, [...emails,leaderRoll]);
//         console.log(validationResult);
//         if (validationResult.length === 0) {
//           throw new Error("The leaderRoll must belong to one of the provided students.");
//         }

//         // Step 1: Insert new group
//         const insertGroupQuery = `
//           INSERT INTO projectGroup (leaderID)
//           SELECT f.fypStudentID 
//           FROM fypStudent f
//           JOIN students s ON f.fypStudentID = s.studentID
//           WHERE s.studentRoll = ?`;

//         const [groupResult] = await connection
//           .promise()
//           .query(insertGroupQuery, [leaderRoll]);
//         const groupId = groupResult.insertId;

//         if (!groupId) {
//           throw new Error("Failed to insert group; no groupId generated");
//         }

//         // Step 2: Update students with new groupId
//         const placeholders = emails.map(() => "?").join(",");
//         const updateQuery = `
//           UPDATE fypStudent 
//           SET groupID = ? 
//           WHERE fypStudentID IN (
//             SELECT studentID 
//             FROM students 
//             WHERE email IN (${placeholders})
//           )`;

//         const updateValues = [groupId, ...emails];
//         const [updateResult] = await connection
//           .promise()
//           .query(updateQuery, updateValues);

//         if (updateResult.affectedRows === 0) {
//           throw new Error(
//             "No students were updated; check the emails provided"
//           );
//         }

//         // Commit transaction
//         await connection.promise().commit();
//         connection.release();
//         return res
//           .status(200)
//           .json({ message: "Group assigned successfully", groupId });
//       } catch (error) {
//         // Rollback transaction on error
//         await connection.promise().rollback();
//         connection.release();
//         return res
//           .status(500)
//           .json({ message: "Error assigning group", error: error.message });
//       }
//     });
//   });
// };



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
        await connection
          .promise()
          .query(procedureCall, [...emails]);

        // Retrieve the output parameter
        const [result] = await connection
          .promise()
          .query("SELECT @groupCreated AS groupCreated");

        const groupCreated = result[1]?.groupCreated;
        console.log(groupCreated);

        if (groupCreated) {
          await connection.promise().commit();
          connection.release();
          return res
            .status(200)
            .json({ message: "Group assigned successfully." });
        } else {
          throw new Error("Group could not be created. Check input conditions.");
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


module.exports = {
  getProfile,
  assignGroup,
};
