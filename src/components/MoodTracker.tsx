import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { motion } from 'framer-motion';

export type Mood = 'happy' | 'neutral' | 'sad' | null;

interface MoodTrackerProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelect, selectedMood }) => {
  const moodOptions = [
    { mood: 'happy', icon: Smile, color: 'text-green-500', label: 'Happy' },
    { mood: 'neutral', icon: Meh, color: 'text-yellow-500', label: 'Neutral' },
    { mood: 'sad', icon: Frown, color: 'text-red-500', label: 'Sad' },
  ];

  return (
    <div className="flex justify-around">
      {moodOptions.map(({ mood, icon: Icon, color, label }, index) => (
        <motion.button
          key={mood}
          onClick={() => onMoodSelect(mood as Mood)}
          className={`p-4 rounded-xl transition-colors flex flex-col items-center ${
            selectedMood === mood ? 'bg-primary-100' : 'hover:bg-primary-50'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Icon className={`h-10 w-10 ${color} ${selectedMood === mood ? 'animate-wiggle' : ''}`} />
          <span className={`mt-2 text-sm ${selectedMood === mood ? 'text-primary-700' : 'text-gray-600'}`}>
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default MoodTracker;