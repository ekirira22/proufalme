
import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar = ({ value, max }: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 transition-all duration-200"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
