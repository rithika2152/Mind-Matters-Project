import React from 'react';
import { Music, Palette, Headphones, PersonStanding } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Activities = () => {
  const navigate = useNavigate();

  const handleMusicClick = () => {
    window.open('https://www.youtube.com/watch?v=lFcSrYw-ARY', '_blank');
  };

  const handleDrawingClick = () => {
    navigate('/drawing');
  };

  const activities = [
    {
      icon: <Music className="h-6 w-6" />,
      title: 'Listen to Calming Music',
      description: 'Relax with a curated playlist of peaceful and calming music.',
      duration: '15-30 minutes',
      action: handleMusicClick,
      buttonText: 'Open Playlist'
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Mindful Drawing',
      description: 'Express yourself through simple, relaxing drawing exercises.',
      duration: '20-30 minutes',
      action: handleDrawingClick,
      buttonText: 'Start Drawing'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Singing',
      description: 'Sing along to your favorite songs to boost mood.',
      duration: '15-20 minutes',
      action: () => window.open('https://www.youtube.com/watch?v=lp-EO5I60KA', '_blank'),
      buttonText: 'Open Songs'
    },
    {
      icon: <PersonStanding className="h-6 w-6" />,
      title: 'Nature Walk',
      description: 'Take a refreshing walk in the park or nature trail.',
      duration: '30-45 minutes',
      buttonText: 'View Tips'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to="/dashboard" />
      
      <div className="text-center mb-8">
        <Music className="h-12 w-12 text-primary-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Mood Boosting Activities</h1>
        <p className="text-gray-600">Engage in activities that can help improve your mood</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                {activity.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{activity.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Suggested duration: {activity.duration}
              </span>
              <button 
                onClick={activity.action}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {activity.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;