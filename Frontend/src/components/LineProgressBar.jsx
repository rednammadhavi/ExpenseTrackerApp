import React from 'react';

const LineProgressBar = ({ label, percentage, lineColor }) => {
  return (
    <div className="w-full max-w-md mb-6">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-300">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-6 overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-in-out"
          style={{ width: `${percentage}%`, backgroundColor: lineColor }}
        />
      </div>
    </div>
  );
};

export default LineProgressBar;
