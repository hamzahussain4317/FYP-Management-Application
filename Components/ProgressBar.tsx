// components/ProgressBar.tsx
import React from "react";

const ProgressBar = ({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="p-4 bg-white rounded-md shadow-md h-[150px] flex flex-col justify-center">
      <h2 className="text-lg font-semibold mb-2">Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">
        {completed} of {total} tasks completed ({percentage}%)
      </p>
    </div>
  );
};

export default ProgressBar;
