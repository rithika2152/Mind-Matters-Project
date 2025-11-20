import React, { useState, useEffect } from 'react';
import { Heart, Clock, Play, Pause } from 'lucide-react';
import BackButton from '../components/BackButton';

const Mindfulness = () => {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeExercise !== null) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= exercises[activeExercise].duration * 60) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });

        // Update breathing phase every 4 seconds
        const cycle = timer % 12;
        if (cycle < 4) setBreathingPhase('inhale');
        else if (cycle < 8) setBreathingPhase('hold');
        else setBreathingPhase('exhale');
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeExercise, timer]);

  const exercises = [
    {
      title: 'Deep Breathing',
      duration: 5, // minutes
      description: 'Focus on slow, deep breaths to reduce stress and anxiety.',
      instructions: {
        inhale: 'Breathe in slowly through your nose...',
        hold: 'Hold your breath...',
        exhale: 'Exhale slowly through your mouth...'
      }
    },
    {
      title: 'Box Breathing',
      duration: 5,
      description: 'Equal duration breathing pattern: inhale, hold, exhale, hold.',
      instructions: {
        inhale: 'Inhale for 4 counts...',
        hold: 'Hold for 4 counts...',
        exhale: 'Exhale for 4 counts...'
      }
    },
    {
      title: '4-7-8 Breathing',
      duration: 7,
      description: 'Inhale for 4, hold for 7, exhale for 8 counts.',
      instructions: {
        inhale: 'Inhale through nose for 4 counts...',
        hold: 'Hold breath for 7 counts...',
        exhale: 'Exhale through mouth for 8 counts...'
      }
    },
    {
      title: 'Mindful Walking',
      duration: 15,
      description: 'Practice mindfulness while walking to stay present.',
      instructions: {
        inhale: 'Breathe in as you step...',
        hold: 'Notice your surroundings...',
        exhale: 'Breathe out as you step...'
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to="/dashboard" />
      
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-purple-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Mindfulness Exercises</h1>
        <p className="text-gray-600">Practice mindfulness to improve your mental wellbeing</p>
      </div>

      {activeExercise !== null && isPlaying && (
        <div className="bg-white p-8 rounded-xl shadow-md mb-6 text-center">
          <div className="text-4xl font-bold text-purple-600 mb-4">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
          <div className="text-xl font-medium text-gray-800 mb-2">
            {exercises[activeExercise].instructions[breathingPhase]}
          </div>
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-purple-600 animate-pulse" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-xl shadow-md transition-all ${
              activeExercise === index ? 'ring-2 ring-purple-600' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{exercise.title}</h2>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">{exercise.duration} minutes</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            <button
              onClick={() => {
                if (activeExercise === index && isPlaying) {
                  setIsPlaying(false);
                } else {
                  setActiveExercise(index);
                  setIsPlaying(true);
                  setTimer(0);
                }
              }}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {activeExercise === index && isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>{activeExercise === index && isPlaying ? 'Pause' : 'Start'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mindfulness;