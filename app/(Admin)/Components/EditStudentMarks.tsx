import React from "react";

const EditStudentMarks = ({ student }: { student: FYPStudent }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-x-3 w-full md:flex-row md:justify-around ">
        <p className="text-center text-light-primary dark:text-dark-primary">
          Roll:
          <span className="text-dark-text"> {student.studentRoll}</span>
        </p>
        <p className="text-center text-light-primary dark:text-dark-primary">
          Student Name:
          <span className="text-dark-text"> {student.name}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-3 justify-around items-center space-y-3 w-full ">
        <label
          htmlFor="midMarks"
          className="block w-[2rem] text-center text-light-primary dark:text-dark-primary"
        >
          Mid:
        </label>
        <input
          type="number"
          id="mid-marks"
          defaultValue={student.midEvaluation.toFixed(2)}
          step="0.01"
          min="0"
          className="m-0 p-2 block w-auto rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
        />
        <label
          htmlFor="finalMarks"
          className="block text-center text-light-primary dark:text-dark-primary"
        >
          Final:
        </label>
        <input
          type="number"
          id="final-marks"
          defaultValue={student.finalEvaluation.toFixed(2)}
          step="0.01"
          min="0"
          className="m-0 p-2 block w-auto rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
        />
      </div>
    </>
  );
};

export default EditStudentMarks;
