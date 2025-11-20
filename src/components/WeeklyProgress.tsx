import React from 'react';
import { ArrowUp } from 'lucide-react';

interface WeeklyProgressProps {
  moodData: number[];
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ moodData }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ArrowUp className="mr-2 text-purple-600" />
        Weekly Progress
      </h2>
      <div className="h-32 flex items-end justify-around">
        {moodData.map((height, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-8 bg-purple-200 rounded-t-md relative group">
              <div
                className="absolute bottom-0 w-full bg-purple-600 rounded-t-md transition-all duration-500"
                style={{ height: `${height}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  Score: {height}%
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{days[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgress;