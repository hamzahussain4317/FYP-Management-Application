import React from "react";
interface GroupDetailsProps {
  groupDetails: groupDetails;
}

const GroupDetails = ({ groupDetails }: GroupDetailsProps) => {
  const validStudents = groupDetails.student[0].filter(
    (student: group) => student.studentID && student.studentName
  );
  return (
    <>
      <h1 className="group-heading">Group Details</h1>
      <div className="group-details">
        {validStudents.map((student: group, index:number) => (
          <div key={student.studentID} className="card relative">
            <h2 className="heading-blue">Student {index + 1}</h2>
            <div className="card-grid">
              <p>
                <strong>Name:</strong> {student.studentName}
              </p>
              <p>
                <strong>ID:</strong> {student.studentRoll}
              </p>
              <p>
                <strong>Domain:</strong> {student.departmentName}
              </p>
              <p>
                <strong>Department:</strong> {student.departmentName}
              </p>
              <p>
                <strong>Section:</strong> {student.section}
              </p>
              <p>
                <strong>Degree:</strong> {student.departmentName}
              </p>
            </div>
            <button className="absolute top-0 right-0 rounded-full border-2 ">
              <i
                className={`fa-solid fa-paper-plane fa-2x sm:fa-lg hover:text-blue-700 duration-400`}
              ></i>
            </button>
          </div>
        ))}
        <div className="card relative">
          <h2 className="heading-blue">Supervisor</h2>
          <div className="card-grid">
            <p>
              <strong>Supervisor ID: </strong>
              {(groupDetails.student[1][0]?.teacherID===undefined)?"-":groupDetails.student[1][0].teacherID}
            </p>
            <p>
              <strong>Supervisor Name: </strong>
              {(groupDetails.student[1][0]?.firstName===undefined || groupDetails.student[1][0]?.lastName===undefined)?"-":`${groupDetails.student[1][0].firstName} ${groupDetails.student[1][0].lastName}`}
            </p>
            <p>
              <strong>Supervisor Email: </strong>
              {(groupDetails.student[1][0]?.email===undefined)?"-":groupDetails.student[1][0].email}
            </p>
            <p>
              <strong>Supervisor Domain: </strong>
              {(groupDetails.student[1][0]?.departmentName===undefined)?"-":groupDetails.student[1][0].departmentName}
            </p>
          </div>
          <button className="absolute top-0 right-0 rounded-full border-2">
            <i
              className={`fa-solid fa-paper-plane fa-2x sm:fa-lg  hover:text-blue-700 duration-400`}
            ></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
