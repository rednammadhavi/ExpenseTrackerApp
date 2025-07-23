import React from 'react';

const LineProgressBar = ({ label, percentage, lineColor }) => {
  return (
    <div className="w-full max-w-xl px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex justify-between items-center mb-2 text-xs sm:text-sm font-medium text-gray-600">
        <span className="truncate">{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-in-out rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: lineColor }}
        />
      </div>
    </div>
  );
};

export default LineProgressBar;
