import * as tf from '@tensorflow/tfjs';

// Define activity categories and their features
const activities = {
  meditation: {
    stressRelief: 0.9,
    anxietyRelief: 0.8,
    moodBoost: 0.6,
    energyBoost: 0.3,
    socialInteraction: 0.1,
  },
  exercise: {
    stressRelief: 0.7,
    anxietyRelief: 0.6,
    moodBoost: 0.8,
    energyBoost: 0.9,
    socialInteraction: 0.4,
  },
  socializing: {
    stressRelief: 0.5,
    anxietyRelief: 0.4,
    moodBoost: 0.8,
    energyBoost: 0.6,
    socialInteraction: 1.0,
  },
  creativeActivities: {
    stressRelief: 0.8,
    anxietyRelief: 0.7,
    moodBoost: 0.7,
    energyBoost: 0.4,
    socialInteraction: 0.2,
  },
  natureWalk: {
    stressRelief: 0.8,
    anxietyRelief: 0.7,
    moodBoost: 0.7,
    energyBoost: 0.6,
    socialInteraction: 0.3,
  },
  mindfulDrawing: {
    stressRelief: 0.7,
    anxietyRelief: 0.8,
    moodBoost: 0.6,
    energyBoost: 0.3,
    socialInteraction: 0.1,
  },
};

// Convert assessment answers to numerical features
function processAssessmentAnswers(mood: string, answers: Record<number, string>) {
  // Initialize feature vector
  const features = {
    stressLevel: 0,
    anxietyLevel: 0,
    moodLevel: 0,
    energyLevel: 0,
    socialNeed: 0,
  };

  // Process mood
  switch (mood) {
    case 'positive':
      features.moodLevel = 0.8;
      features.energyLevel = 0.7;
      break;
    case 'neutral':
      features.moodLevel = 0.5;
      features.energyLevel = 0.5;
      break;
    case 'negative':
      features.moodLevel = 0.2;
      features.energyLevel = 0.3;
      break;
  }

  // Process answers
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Analyze answers and adjust features accordingly
    if (answer.toLowerCase().includes('stress') || answer.toLowerCase().includes('pressure')) {
      features.stressLevel += 0.3;
    }
    if (answer.toLowerCase().includes('anxiety') || answer.toLowerCase().includes('worry')) {
      features.anxietyLevel += 0.3;
    }
    if (answer.toLowerCase().includes('social') || answer.toLowerCase().includes('friends')) {
      features.socialNeed += 0.3;
    }
    // Add more answer analysis patterns as needed
  });

  return features;
}

// Calculate similarity between user needs and activity benefits
function calculateSimilarity(userFeatures: any, activityFeatures: any) {
  const userVector = tf.tensor1d([
    userFeatures.stressLevel,
    userFeatures.anxietyLevel,
    userFeatures.moodLevel,
    userFeatures.energyLevel,
    userFeatures.socialNeed,
  ]);

  const activityVector = tf.tensor1d([
    activityFeatures.stressRelief,
    activityFeatures.anxietyRelief,
    activityFeatures.moodBoost,
    activityFeatures.energyBoost,
    activityFeatures.socialInteraction,
  ]);

  // Calculate cosine similarity
  const dotProduct = tf.sum(tf.mul(userVector, activityVector));
  const normUser = tf.sqrt(tf.sum(tf.square(userVector)));
  const normActivity = tf.sqrt(tf.sum(tf.square(activityVector)));
  
  const similarity = tf.div(dotProduct, tf.mul(normUser, normActivity));
  
  return similarity.dataSync()[0];
}

export interface Recommendation {
  activity: string;
  score: number;
  description: string;
  benefits: string[];
}

// Main recommendation function
export function getRecommendations(mood: string, answers: Record<number, string>): Recommendation[] {
  const userFeatures = processAssessmentAnswers(mood, answers);
  
  // Calculate similarity scores for each activity
  const recommendations: Recommendation[] = Object.entries(activities).map(([activity, features]) => {
    const similarity = calculateSimilarity(userFeatures, features);
    
    return {
      activity,
      score: similarity,
      description: getActivityDescription(activity),
      benefits: getActivityBenefits(activity),
    };
  });

  // Sort by similarity score and return top recommendations
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// Helper functions for activity descriptions and benefits
function getActivityDescription(activity: string): string {
  const descriptions: Record<string, string> = {
    meditation: "Practice mindful meditation to center yourself and find inner peace",
    exercise: "Engage in physical activity to boost your mood and energy levels",
    socializing: "Connect with friends or join group activities",
    creativeActivities: "Express yourself through art, music, or other creative pursuits",
    natureWalk: "Take a refreshing walk in nature to clear your mind",
    mindfulDrawing: "Express yourself through calming and mindful drawing exercises"
  };
  return descriptions[activity] || "";
}

function getActivityBenefits(activity: string): string[] {
  const benefits: Record<string, string[]> = {
    meditation: [
      "Reduces stress and anxiety",
      "Improves focus and clarity",
      "Promotes emotional balance",
    ],
    exercise: [
      "Boosts endorphins and mood",
      "Increases energy levels",
      "Improves physical health",
    ],
    socializing: [
      "Provides emotional support",
      "Reduces feelings of isolation",
      "Creates positive experiences",
    ],
    creativeActivities: [
      "Encourages self-expression",
      "Reduces stress through focus",
      "Builds confidence through creation",
    ],
    natureWalk: [
      "Connects you with nature",
      "Provides gentle exercise",
      "Clears mental clutter",
    ],
    mindfulDrawing: [
      "Promotes mindfulness through creativity",
      "Reduces anxiety through focus",
      "Provides a calming creative outlet",
    ],
  };
  return benefits[activity] || [];
}