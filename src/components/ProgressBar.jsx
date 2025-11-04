import React from 'react';

const ProgressBar = ({ percentage, label, showLabel = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-5'
  };

  const getColorClass = (percent) => {
    if (percent >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (percent >= 50) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    if (percent >= 25) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-700">{label}</span>
          <span className="text-sm font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded-lg">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} shadow-inner`}>
        <div
          className={`${getColorClass(percentage)} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out shadow-md`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
