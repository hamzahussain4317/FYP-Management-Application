import React from "react";
interface GroupDetailsProps {
  groupDetails: groupDetails;
}

const GroupDetails = ({ groupDetails }: GroupDetailsProps) => {
  const validStudents = groupDetails.groupStudents.filter(
    (student: groupStudents) => student.studentid && student.studentname
  );
  return (
    <>
      <h1 className="group-heading">Group Details</h1>
      <div className="group-details">
        {validStudents.map((student: groupStudents, index:number) => (
          <div key={student.studentid} className="card relative">
            <h2 className="heading-blue">Student {index + 1}</h2>
            <div className="card-grid">
              <p>
                <strong>Name:</strong> {student.studentname}
              </p>
              <p>
                <strong>ID:</strong> {student.studentroll}
              </p>
              <p>
                <strong>Domain:</strong> {student.departmentname}
              </p>
              <p>
                <strong>Department:</strong> {student.departmentname}
              </p>
              <p>
                <strong>Section:</strong> {student.section}
              </p>
              <p>
                <strong>Degree:</strong> {student.departmentname}
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
          {groupDetails.isLeadrAndSupervisor[0].teacherid === null ? (
            <h3 className="text-center text-xl my-4 font-semibold text-red-600">No Supervisor Assigned!</h3>
          ):(
          <div className="card-grid">
            <p>
              <strong>Supervisor ID: </strong>
              {(groupDetails.isLeadrAndSupervisor[0]?.teacherid===undefined)?"-":groupDetails.isLeadrAndSupervisor[0].teacherid}
            </p>
            <p>
              <strong>Supervisor Name: </strong>
              {(groupDetails.isLeadrAndSupervisor[0]?.firstname===undefined || groupDetails.isLeadrAndSupervisor[0]?.lastname===undefined)?"-":`${groupDetails.isLeadrAndSupervisor[0].firstname} ${groupDetails.isLeadrAndSupervisor[0].lastname}`}
            </p>
            <p>
              <strong>Supervisor Email: </strong>
              {(groupDetails.isLeadrAndSupervisor[0]?.email===undefined)?"-":groupDetails.isLeadrAndSupervisor[0].email}
            </p>
            <p>
              <strong>Supervisor Domain: </strong>
              {(groupDetails.isLeadrAndSupervisor[0]?.departmentname===undefined)?"-":groupDetails.isLeadrAndSupervisor[0].departmentname}
            </p>
          </div>
          )}
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
