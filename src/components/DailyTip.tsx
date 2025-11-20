import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { getTipsForMood } from '../services/tipsService';

const DailyTip = () => {
  const { currentUser } = useUser();
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    const generateTip = () => {
      let currentMood = null;
      
      if (currentUser?.moodHistory?.length > 0) {
        const latestMood = currentUser.moodHistory[currentUser.moodHistory.length - 1];
        currentMood = latestMood.mood;
      }

      const tipsList = getTipsForMood(currentMood);
      if (tipsList.length > 0) {
        setCurrentTip(tipsList[0].text);
      }
    };

    generateTip();
  }, [currentUser]);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center mb-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Brain className="mr-2 text-primary-600 animate-pulse-slow" />
        <h2 className="text-xl font-semibold text-gray-800">Daily Tip</h2>
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTip}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-[100px] flex items-center justify-center"
        >
          <p className="text-gray-600 text-center text-lg">{currentTip}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DailyTip;