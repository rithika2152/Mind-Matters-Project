import { processAssessmentAnswers, getPersonalizedTips } from './aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatPattern {
  patterns: string[];
  responses: string[];
}

const chatPatterns: ChatPattern[] = [
  {
    patterns: ['anxious', 'anxiety', 'worried', 'nervous', 'stress', 'stressed'],
    responses: [
      "I understand anxiety can be overwhelming. Try taking slow, deep breaths - inhale for 4 counts, hold for 4, exhale for 4.",
      "It's normal to feel anxious. Would you like to try a quick grounding exercise? Name 5 things you can see right now.",
      "I hear you. Remember that anxiety is temporary and you have the strength to get through this. Have you tried our mindfulness exercises?",
      "When anxiety hits, try the 5-4-3-2-1 method: name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste."
    ]
  },
  {
    patterns: ['sad', 'depressed', 'lonely', 'alone', 'unhappy'],
    responses: [
      "I'm sorry you're feeling this way. Remember that it's okay to not be okay, and these feelings won't last forever.",
      "You're not alone in this. Would you like to explore some mood-lifting activities together?",
      "Your feelings are valid. Consider reaching out to someone you trust or try our mood-boosting exercises.",
      "Sometimes taking small steps can help. Could we start with something simple, like a short walk or listening to your favorite song?"
    ]
  },
  {
    patterns: ['help', 'emergency', 'crisis', 'suicide', 'hurt'],
    responses: [
      "If you're in immediate crisis, please call the 24/7 Crisis Helpline at 1-800-273-8255. Your life matters.",
      "You're not alone. Professional help is available 24/7. Would you like the number for emergency support?",
      "Your safety is important. Please reach out to emergency services or call our crisis line for immediate support.",
      "I'm concerned about your safety. Please know that help is available right now. Can I connect you with a crisis counselor?"
    ]
  },
  {
    patterns: ['sleep', 'tired', 'insomnia', 'rest'],
    responses: [
      "Sleep difficulties can be challenging. Have you tried establishing a regular bedtime routine?",
      "Consider trying some relaxation techniques before bed, like deep breathing or gentle stretching.",
      "Maintaining good sleep hygiene can help. Would you like some tips for better sleep?",
      "Try the 4-7-8 breathing technique before bed: inhale for 4 seconds, hold for 7, exhale for 8. This can help calm your mind."
    ]
  },
  {
    patterns: ['angry', 'mad', 'frustrated', 'upset'],
    responses: [
      "It's okay to feel angry. Would you like to try some calming techniques together?",
      "When we're angry, our thoughts can become overwhelming. Let's take a moment to breathe and process these feelings.",
      "I understand you're frustrated. Sometimes physical activity can help release tension. Would you like to try some simple exercises?",
      "Your feelings are valid. Would you like to explore what triggered these emotions?"
    ]
  },
  {
    patterns: ['meditation', 'mindfulness', 'calm', 'peace'],
    responses: [
      "Mindfulness can be a powerful tool. Would you like to try a quick guided meditation?",
      "Let's start with a simple breathing exercise. Focus on your breath for just 30 seconds.",
      "Finding inner peace takes practice. Our mindfulness exercises section has some great resources to help you get started.",
      "Sometimes just sitting quietly and observing your thoughts without judgment can be very calming."
    ]
  },
  {
    patterns: ['hello', 'hi', 'hey', 'start'],
    responses: [
      "Hello! I'm here to support you. How can I help you today?",
      "Hi there! Feel free to share what's on your mind.",
      "Welcome! I'm here to listen and help. What would you like to talk about?",
      "Hello! I'm your supportive companion. How are you feeling today?"
    ]
  },
  {
    patterns: ['thank', 'thanks', 'helpful', 'appreciate'],
    responses: [
      "You're welcome! I'm glad I could help. Remember, I'm here whenever you need support.",
      "It means a lot to hear that. Don't hesitate to reach out again if you need to talk.",
      "Thank you for sharing with me. Your wellbeing matters, and I'm here to support you.",
      "I appreciate your trust in sharing with me. Is there anything else you'd like to discuss?"
    ]
  }
];

const defaultResponses = [
  "I'm here to listen. Could you tell me more about what you're experiencing?",
  "Thank you for sharing. How can I best support you right now?",
  "I want to help. Could you elaborate on your feelings?",
  "I'm here to support you. Would you like to explore some coping strategies together?",
  "Your feelings matter. Would you like to talk more about what's on your mind?",
  "I'm listening and I care about what you're going through. What would help you most right now?"
];

export function generateResponse(userMessage: string): string {
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Check for matching patterns
  for (const pattern of chatPatterns) {
    if (pattern.patterns.some(p => lowercaseMessage.includes(p))) {
      const responses = pattern.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // If no pattern matches, analyze the message for emotional content
  const features = processAssessmentAnswers('neutral', { 1: userMessage });
  const tips = getPersonalizedTips('neutral', features);
  
  if (tips.length > 0) {
    return `${defaultResponses[Math.floor(Math.random() * defaultResponses.length)]} Here's a suggestion that might help: ${tips[0]}`;
  }
  
  // Return default response if no specific patterns or emotions are detected
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export function createMessage(text: string, sender: 'user' | 'bot'): Message {
  return {
    id: Math.random().toString(36).substr(2, 9),
    text,
    sender,
    timestamp: new Date()
  };
}