import React from "react";

const EditStudentMarks = ({ student }: { student: FYPStudent }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-x-3 w-full md:flex-row md:justify-around ">
        <p>
          <b>Student ID: </b> {student.studentRoll}
        </p>
        <p>
          <b>Student Name: </b>
          {student.name}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-3 justify-around items-center space-y-3 w-full ">
        <label
          htmlFor="midMarks"
          className="block text-sm font-medium text-gray-700 w-[2rem]"
        >
          Mid:
        </label>
        <input
          type="number"
          id="midMarks"
          defaultValue={student.midEvaluation}
          className="m-0 p-2 block w-auto rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 "
        />
        <label
          htmlFor="finalMarks"
          className="block text-sm font-medium text-gray-700"
        >
          Final:
        </label>
        <input
          type="number"
          id="finalMarks"
          defaultValue={student.finalEvaluation}
          className="mt-1 p-2 block w-auto rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
        />
      </div>
    </>
  );
};

export default EditStudentMarks;
