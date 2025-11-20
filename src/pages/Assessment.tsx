import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const moodQuestions = {
  positive: [
    {
      id: 1,
      question: "What made you feel particularly good today?",
      options: ["Accomplishments", "Social Interactions", "Personal Time", "Other"]
    },
    {
      id: 2,
      question: "How would you like to maintain this positive mood?",
      options: ["Continue current activities", "Try new experiences", "Share with others", "Document it"]
    },
    {
      id: 3,
      question: "Would you like to share your positive energy with others?",
      options: ["Yes, definitely", "Maybe later", "Not right now", "Prefer to reflect"]
    }
  ],
  neutral: [
    {
      id: 1,
      question: "What could make your day better?",
      options: ["Social activities", "Relaxation", "Physical activity", "Creative expression"]
    },
    {
      id: 2,
      question: "How is your energy level right now?",
      options: ["Good", "Moderate", "Could be better", "Low"]
    },
    {
      id: 3,
      question: "Would you like to try something new today?",
      options: ["Yes, definitely", "Maybe", "Not sure", "Prefer routine"]
    }
  ],
  negative: [
    {
      id: 1,
      question: "What's affecting your mood the most?",
      options: ["Work/Study", "Personal matters", "Health", "Other concerns"]
    },
    {
      id: 2,
      question: "Would you like to talk to someone about it?",
      options: ["Yes, professional help", "Yes, friends/family", "Not right now", "Prefer self-reflection"]
    },
    {
      id: 3,
      question: "What usually helps you feel better?",
      options: ["Physical activity", "Creative activities", "Rest", "Social support"]
    }
  ]
};

const Assessment = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<'positive' | 'neutral' | 'negative' | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleMoodSelect = (mood: 'positive' | 'neutral' | 'negative') => {
    setCurrentMood(mood);
    setAnswers({});
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMood) {
      const assessmentData = {
        mood: currentMood,
        answers: answers
      };
      localStorage.setItem('assessmentResults', JSON.stringify(assessmentData));
      navigate('/assessment/result');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton to="/dashboard" />
      
      <div className="text-center mb-8">
        <ClipboardCheck className="h-12 w-12 text-purple-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Daily Assessment</h1>
        <p className="text-gray-600">Let's understand how you're feeling today</p>
      </div>

      {!currentMood ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['positive', 'neutral', 'negative'].map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood as 'positive' | 'neutral' | 'negative')}
                className="p-4 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors"
              >
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {moodQuestions[currentMood].map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleAnswer(q.id, option)}
                      className="form-radio text-purple-600"
                      required
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Complete Assessment
          </button>
        </form>
      )}
    </div>
  );
};

export default Assessment;