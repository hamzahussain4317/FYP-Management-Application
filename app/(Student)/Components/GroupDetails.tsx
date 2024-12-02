import React from "react";
type GroupSupervisor = {
  supervisorID: number;
  supervisorName: string;
  supervisorEmail: string;
  supervisorDomain: string;
};
interface GroupDetailsProps {
  groupMembers: Student[];
  supervisor: GroupSupervisor;
}
const GroupDetails = ({ groupMembers, supervisor }: GroupDetailsProps) => {
  return (
    <>
      <h1 className="group-heading">Group Details</h1>
      <div className="group-details">
        {groupMembers.map((student: Student, index) => (
          <div key={student.id} className="card relative">
            <h2 className="heading-blue">Student {index + 1}</h2>
            <div className="card-grid">
              <p>
                <strong>Name:</strong> {student.name}
              </p>
              <p>
                <strong>ID:</strong> {student.studentId}
              </p>
              <p>
                <strong>Domain:</strong> {student.domain}
              </p>
              <p>
                <strong>Department:</strong> {student.department}
              </p>
              <p>
                <strong>Section:</strong> {student.section}
              </p>
              <p>
                <strong>Degree:</strong> {student.Degree}
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
              {supervisor.supervisorID}
            </p>
            <p>
              <strong>Supervisor Name: </strong>
              {supervisor.supervisorName}
            </p>
            <p>
              <strong>Supervisor Email: </strong>
              {supervisor.supervisorEmail}
            </p>
            <p>
              <strong>Supervisor Domain: </strong>
              {supervisor.supervisorDomain}
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
