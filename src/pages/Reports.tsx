import React from 'react';
import { BarChart, Calendar, TrendingUp } from 'lucide-react';
import BackButton from '../components/BackButton';

const Reports = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to="/dashboard" />
      
      <div className="text-center mb-8">
        <BarChart className="h-12 w-12 text-purple-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Your Progress Reports</h1>
        <p className="text-gray-600">Track your mental wellbeing journey over time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-purple-600" />
            Monthly Overview
          </h2>
          <div className="h-64 flex items-end justify-around">
            {[65, 70, 85, 75, 90, 80, 85, 95, 70, 80, 85, 90].map((height, index) => (
              <div key={index} className="w-6 bg-purple-200 rounded-t-md relative group">
                <div
                  className="absolute bottom-0 w-full bg-purple-600 rounded-t-md transition-all duration-500"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Score: {height}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-purple-600" />
            Key Metrics
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Average Mood', value: '7.8/10', change: '+0.5' },
              { label: 'Sleep Quality', value: '8.2/10', change: '+1.2' },
              { label: 'Stress Level', value: '4.3/10', change: '-0.8' },
              { label: 'Anxiety Score', value: '3.5/10', change: '-1.1' },
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{metric.value}</span>
                  <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;