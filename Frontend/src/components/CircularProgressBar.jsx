import React, { useEffect, useState } from 'react';

const CircularProgressBar = ({ percentage, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const circleVars = {
    '--circumference': circumference,
    '--progress': progress,
    '--color': color,
  };

  return (
    <div className="relative inline-block w-[25vw] max-w-[120px] min-w-[60px] aspect-square">
      <style>
        {`
          @keyframes progressAnimation {
            from {
              stroke-dashoffset: var(--circumference);
            }
            to {
              stroke-dashoffset: var(--progress);
            }
          }
        `}
      </style>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle
          r={radius}
          cx="50"
          cy="50"
          stroke="#d3d3d3"
          strokeWidth="7"
          fill="transparent"
          className="transform -rotate-90 origin-center"
          style={{ strokeDasharray: circumference }}
        />
        <circle
          r={radius}
          cx="50"
          cy="50"
          stroke={color}
          strokeWidth="7"
          fill="transparent"
          strokeLinecap="round"
          className="transform -rotate-90 origin-center"
          style={{
            ...circleVars,
            strokeDasharray: circumference,
            strokeDashoffset: progress,
            animation: isAnimating ? 'progressAnimation 2s ease-out forwards' : 'none',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[1.2em] sm:text-[1.4em] font-semibold text-white">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
