import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import MoodTracker, { Mood } from '../components/MoodTracker';
import DailyTip from '../components/DailyTip';
import { useUser } from '../contexts/UserContext';

const Dashboard = () => {
  const { currentUser, saveMood } = useUser();
  const [todaysMood, setTodaysMood] = useState<Mood>(null);
  const [weeklyMoods, setWeeklyMoods] = useState<number[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Load user's mood history
      const moodHistory = currentUser.moodHistory || [];
      const today = new Date().toISOString().split('T')[0];
      const todaysMoodEntry = moodHistory.find(m => m.date.startsWith(today));
      
      if (todaysMoodEntry) {
        setTodaysMood(todaysMoodEntry.mood as Mood);
      }

      // Calculate weekly moods
      const weekMoods = Array(7).fill(0);
      const moodValues = { happy: 100, neutral: 50, sad: 25 };
      
      moodHistory.forEach(entry => {
        const date = new Date(entry.date);
        const dayIndex = date.getDay();
        weekMoods[dayIndex] = moodValues[entry.mood as keyof typeof moodValues] || 0;
      });

      setWeeklyMoods(weekMoods);
    }
  }, [currentUser]);

  const handleMoodSelect = async (mood: Mood) => {
    if (!mood) return;

    try {
      await saveMood({ mood });
      setTodaysMood(mood);

      const moodValues = { happy: 100, neutral: 50, sad: 25 };
      const today = new Date().getDay();
      const newWeeklyMoods = [...weeklyMoods];
      newWeeklyMoods[today] = moodValues[mood as keyof typeof moodValues];
      setWeeklyMoods(newWeeklyMoods);

      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 2000);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const getColorForMood = (value: number) => {
    if (value === 100) return 'bg-green-500';
    if (value === 50) return 'bg-yellow-500';
    if (value === 25) return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {currentUser?.name}!</h1>
        <p className="text-gray-600">Track your mental wellbeing journey</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-purple-600" />
            Today's Mood
          </h2>
          <MoodTracker onMoodSelect={handleMoodSelect} selectedMood={todaysMood} />
          {isUpdated && (
            <p className="mt-2 text-sm text-green-600">Mood recorded in Weekly Progress!</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <div className="flex space-x-2">
            {weeklyMoods.map((mood, index) => (
              <div
                key={index}
                className={`h-10 w-full rounded-lg ${getColorForMood(mood)} transition-colors`}
              ></div>
            ))}
          </div>
        </div>

        <DailyTip />
      </div>
    </div>
  );
};

export default Dashboard;