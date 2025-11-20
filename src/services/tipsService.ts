import { Mood } from '../components/MoodTracker';

interface Tip {
  id: string;
  text: string;
  category: 'mood' | 'general' | 'health' | 'mindfulness';
  moodRelevance?: Mood[];
}

const tips: Tip[] = [
  // Mood-specific tips
  {
    id: 'mood-1',
    text: 'Channel your positive energy into helping others today',
    category: 'mood',
    moodRelevance: ['happy']
  },
  {
    id: 'mood-2',
    text: 'Take a moment to list three things you are grateful for',
    category: 'mood',
    moodRelevance: ['neutral', 'sad']
  },
  {
    id: 'mood-3',
    text: 'Remember that it is okay to not be okay. Consider talking to someone you trust',
    category: 'mood',
    moodRelevance: ['sad']
  },
  
  // General wellness tips
  {
    id: 'general-1',
    text: 'Stay hydrated! Aim to drink 8 glasses of water today',
    category: 'general'
  },
  {
    id: 'general-2',
    text: 'Take short breaks every hour to stretch and move around',
    category: 'general'
  },
  
  // Health tips
  {
    id: 'health-1',
    text: 'Try to get 7-8 hours of sleep tonight for better mental clarity',
    category: 'health'
  },
  {
    id: 'health-2',
    text: 'Consider a short walk outside to boost your vitamin D levels',
    category: 'health'
  },
  
  // Mindfulness tips
  {
    id: 'mindful-1',
    text: 'Practice deep breathing: inhale for 4 counts, hold for 4, exhale for 4',
    category: 'mindfulness'
  },
  {
    id: 'mindful-2',
    text: 'Take a mindful moment to observe your surroundings using all five senses',
    category: 'mindfulness'
  }
];

export function getTipsForMood(currentMood: Mood | null): Tip[] {
  // Get mood-specific tips
  const moodTips = currentMood
    ? tips.filter(tip => tip.moodRelevance?.includes(currentMood))
    : [];

  // Get general tips
  const generalTips = tips.filter(tip => !tip.moodRelevance);

  // Combine and shuffle tips
  const allTips = [...moodTips, ...generalTips];
  return shuffleArray(allTips);
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}