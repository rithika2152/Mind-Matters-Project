import * as tf from '@tensorflow/tfjs';

interface UserFeatures {
  stressLevel: number;
  anxietyLevel: number;
  moodLevel: number;
  energyLevel: number;
  socialNeed: number;
}

interface ActivityFeatures {
  stressRelief: number;
  anxietyRelief: number;
  moodBoost: number;
  energyBoost: number;
  socialInteraction: number;
}

// Convert assessment answers to numerical features
export function processAssessmentAnswers(mood: string, answers: Record<number, string>): UserFeatures {
  const features: UserFeatures = {
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

  // Process answers using natural language processing
  Object.entries(answers).forEach(([_, answer]) => {
    const lowerAnswer = answer.toLowerCase();
    
    // Stress indicators
    if (lowerAnswer.includes('stress') || lowerAnswer.includes('overwhelm') || lowerAnswer.includes('pressure')) {
      features.stressLevel += 0.3;
    }
    
    // Anxiety indicators
    if (lowerAnswer.includes('anxiety') || lowerAnswer.includes('worry') || lowerAnswer.includes('nervous')) {
      features.anxietyLevel += 0.3;
    }
    
    // Social needs indicators
    if (lowerAnswer.includes('social') || lowerAnswer.includes('friend') || lowerAnswer.includes('people')) {
      features.socialNeed += 0.3;
    }
    
    // Energy indicators
    if (lowerAnswer.includes('tired') || lowerAnswer.includes('exhausted')) {
      features.energyLevel -= 0.2;
    }
    
    // Mood indicators
    if (lowerAnswer.includes('happy') || lowerAnswer.includes('joy')) {
      features.moodLevel += 0.2;
    } else if (lowerAnswer.includes('sad') || lowerAnswer.includes('depress')) {
      features.moodLevel -= 0.2;
    }
  });

  // Normalize values between 0 and 1
  Object.keys(features).forEach(key => {
    features[key as keyof UserFeatures] = Math.max(0, Math.min(1, features[key as keyof UserFeatures]));
  });

  return features;
}

// Calculate similarity between user needs and activity benefits
export function calculateSimilarity(userFeatures: UserFeatures, activityFeatures: ActivityFeatures): number {
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

// Get personalized tips based on user's mood and assessment
export function getPersonalizedTips(mood: string, features: UserFeatures): string[] {
  const tips: string[] = [];

  if (features.stressLevel > 0.6) {
    tips.push(
      "Try deep breathing exercises to reduce stress",
      "Take short breaks throughout the day",
      "Practice progressive muscle relaxation"
    );
  }

  if (features.anxietyLevel > 0.6) {
    tips.push(
      "Focus on the present moment using mindfulness",
      "Write down your worries and challenge them",
      "Try grounding exercises when feeling anxious"
    );
  }

  if (features.moodLevel < 0.4) {
    tips.push(
      "Engage in activities you usually enjoy",
      "Reach out to a friend or family member",
      "Set small, achievable goals for the day"
    );
  }

  if (features.energyLevel < 0.4) {
    tips.push(
      "Take a short walk to boost energy",
      "Ensure you're staying hydrated",
      "Try energizing breathing exercises"
    );
  }

  if (features.socialNeed > 0.6) {
    tips.push(
      "Schedule a call with a friend",
      "Join a local community group",
      "Participate in online social activities"
    );
  }

  // Add general positive tips for good moods
  if (mood === 'positive') {
    tips.push(
      "Share your positive energy with others",
      "Document what's going well in a gratitude journal",
      "Build on this momentum to tackle important tasks"
    );
  }

  // Shuffle and return a subset of tips
  return shuffleArray(tips).slice(0, 3);
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}