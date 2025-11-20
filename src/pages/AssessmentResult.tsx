import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Brain, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

interface AssessmentData {
  mood: 'positive' | 'neutral' | 'negative';
  answers: Record<number, string>;
}

interface Recommendation {
  title: string;
  description: string;
  benefits: string[];
}

const getRecommendations = (mood: string, answers: Record<number, string>): Recommendation[] => {
  const recommendations: Record<string, Recommendation[]> = {
    positive: [
      {
        title: "Mindful Meditation",
        description: "Continue your positive journey with mindfulness practice",
        benefits: ["Maintains emotional balance", "Enhances focus", "Reduces stress"]
      },
      {
        title: "Creative Expression",
        description: "Channel your positive energy into creative activities",
        benefits: ["Boosts mood further", "Provides sense of achievement", "Encourages self-expression"]
      },
      {
        title: "Social Connection",
        description: "Share your positivity with others",
        benefits: ["Strengthens relationships", "Spreads positive energy", "Creates lasting memories"]
      }
    ],
    neutral: [
      {
        title: "Physical Activity",
        description: "Engage in light exercise or stretching",
        benefits: ["Increases energy levels", "Improves mood", "Enhances focus"]
      },
      {
        title: "Nature Walk",
        description: "Take a refreshing walk outdoors",
        benefits: ["Clears mind", "Reduces stress", "Connects with nature"]
      },
      {
        title: "Music Therapy",
        description: "Listen to uplifting music",
        benefits: ["Elevates mood", "Reduces anxiety", "Increases motivation"]
      }
    ],
    negative: [
      {
        title: "Breathing Exercises",
        description: "Practice deep breathing techniques",
        benefits: ["Reduces anxiety", "Calms mind", "Improves focus"]
      },
      {
        title: "Gentle Movement",
        description: "Try simple stretching or yoga",
        benefits: ["Releases tension", "Improves mood", "Increases energy"]
      },
      {
        title: "Expressive Writing",
        description: "Write down your thoughts and feelings",
        benefits: ["Processes emotions", "Provides clarity", "Reduces stress"]
      }
    ]
  };

  return recommendations[mood] || [];
};

const recommendations = {
  positive: {
    title: "Keep Up the Great Energy!",
    message: "You're doing great! Here are some ways to maintain your positive mood:",
    suggestions: [
      "Share your positivity with friends or family",
      "Document your good moments in a journal",
      "Try a new hobby or activity you've been interested in",
      "Express gratitude through meditation or writing",
      "Set new goals while you're feeling motivated"
    ]
  },
  neutral: {
    title: "Let's Boost Your Mood!",
    message: "Your mood is balanced. Here are some ways to lift your spirits:",
    suggestions: [
      "Take a short walk in nature",
      "Listen to uplifting music",
      "Try a quick meditation session",
      "Connect with a friend",
      "Do something creative for 15 minutes"
    ]
  },
  negative: {
    title: "We're Here to Support You",
    message: "It's okay to not feel okay. Here are some helpful suggestions:",
    suggestions: [
      "Practice deep breathing exercises",
      "Talk to someone you trust about your feelings",
      "Try some gentle physical activity",
      "Use our mindfulness exercises",
      "Consider scheduling a consultation with a professional"
    ]
  }
};

const AssessmentResult = () => {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const savedAssessment = localStorage.getItem('assessmentResults');
    if (savedAssessment) {
      const parsedAssessment = JSON.parse(savedAssessment);
      setAssessment(parsedAssessment);
      const recs = getRecommendations(parsedAssessment.mood, parsedAssessment.answers);
      setAiRecommendations(recs);
    }
  }, []);

  if (!assessment) {
    return (
      <div className="text-center">
        <p>No assessment results found. Please take the assessment first.</p>
        <button
          onClick={() => navigate('/assessment')}
          className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg"
        >
          Take Assessment
        </button>
      </div>
    );
  }

  const result = recommendations[assessment.mood];

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton to="/assessment" />
      
      <motion.div 
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Sparkles className="h-12 w-12 text-primary-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">{result.title}</h1>
        <p className="text-gray-600">{result.message}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Brain className="h-5 w-5 text-primary-600 mr-2" />
            General Recommendations
          </h2>
          <ul className="space-y-4">
            {result.suggestions.map((suggestion, index) => (
              <motion.li 
                key={index} 
                className="flex items-center space-x-2 text-gray-700"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ArrowRight className="h-5 w-5 text-primary-600 flex-shrink-0" />
                <span>{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="h-5 w-5 text-primary-600 mr-2" />
            Personalized Activities
          </h2>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                className="p-4 bg-primary-50 rounded-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <h3 className="font-semibold text-primary-700 mb-2">{rec.title}</h3>
                <p className="text-gray-600 mb-2">{rec.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {rec.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => navigate('/mindfulness')}
          className="bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Mindfulness Exercises
        </button>
        <button
          onClick={() => navigate('/activities')}
          className="bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Explore Mood-Boosting Activities
        </button>
      </motion.div>
    </div>
  );
};

export default AssessmentResult;