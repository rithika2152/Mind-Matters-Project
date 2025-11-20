import { DrawingTutorial, NatureLocation } from '../types/drawing';

export const drawingTutorials: DrawingTutorial[] = [
  {
    id: 'mandala',
    title: 'Simple Mandala Pattern',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=500',
    difficulty: 'Easy',
    timeNeeded: '15-20 minutes',
    description: 'Create a beautiful and symmetrical mandala pattern using simple shapes and repetition.',
    materials: ['Paper', 'Pencil', 'Eraser', 'Ruler or Compass', 'Colored pencils or markers (optional)'],
    tutorials: [
      {
        title: 'Basic Mandala Tutorial',
        embedId: 'YuGsc8h_wfY',
        duration: '8:24'
      },
      {
        title: 'Simple Flower Mandala',
        embedId: '4ELrjwJUGnQ',
        duration: '5:15'
      }
    ],
    steps: [
      {
        title: 'Start with the Center',
        description: 'Draw a small circle in the center of your paper using a compass or trace a small round object.',
        tip: 'Make sure your center point is clearly marked as all lines will radiate from here.'
      },
      {
        title: 'Create Guide Lines',
        description: 'Draw light lines through the center dividing the circle into 8 equal parts (like a pizza).',
        tip: 'Use a ruler and make very light lines as these will be guidelines only.'
      },
      {
        title: 'Add First Layer',
        description: 'Around your center circle, add simple shapes like petals, triangles, or circles that touch each guideline.',
        tip: 'Keep the shapes the same size for symmetry.'
      },
      {
        title: 'Build Outward',
        description: 'Continue adding layers of patterns moving outward from the center.',
        tip: 'Try alternating between different shapes: circles, squares, petals.'
      },
      {
        title: 'Add Details',
        description: 'Fill in spaces with smaller patterns like dots, lines, or curves.',
        tip: 'Work slowly and keep patterns consistent around the circle.'
      }
    ],
    resources: [
      {
        title: "Mandala Art History",
        url: "https://www.khanacademy.org/humanities/art-asia/beginners-guide-asian-culture/buddhist-art-culture/a/mandala",
        description: "Learn about the cultural significance and history of mandalas"
      },
      {
        title: "Pattern Design Guide",
        url: "https://www.skillshare.com/classes/mandala-art",
        description: "Comprehensive guide to creating mandala patterns"
      }
    ],
    examples: [
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1564991372231-4361091c5881?auto=format&fit=crop&w=500'
    ]
  },
  {
    id: 'zen-doodle',
    title: 'Zen Doodle Patterns',
    image: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&w=500',
    difficulty: 'Easy',
    timeNeeded: '10-15 minutes',
    description: 'Create relaxing patterns with simple repetitive strokes and shapes.',
    materials: ['Paper', 'Fine-tip pen or marker', 'Pencil (optional)'],
    tutorials: [
      {
        title: 'Basic Zen Doodle Patterns',
        embedId: 'Y5uLlOuNPJI',
        duration: '6:45'
      },
      {
        title: 'Relaxing Pattern Drawing',
        embedId: 'WEk_7Xk3s0k',
        duration: '7:30'
      }
    ],
    steps: [
      {
        title: 'Create Border',
        description: 'Draw a simple border or shape to contain your pattern.',
        tip: 'Start with a small square or circle to avoid feeling overwhelmed.'
      },
      {
        title: 'Start with Basic Shapes',
        description: 'Begin with simple shapes like circles, curves, or straight lines.',
        tip: 'There is no wrong way to doodle - let your hand move naturally.'
      },
      {
        title: 'Build Patterns',
        description: 'Repeat your shapes to create patterns that flow together.',
        tip: 'Focus on the meditative aspect of repeating patterns.'
      },
      {
        title: 'Add Variations',
        description: 'Introduce new elements or variations to your pattern.',
        tip: 'Try changing the size or direction of your shapes.'
      },
      {
        title: 'Fill Empty Spaces',
        description: 'Add smaller details to fill any empty spaces.',
        tip: 'Dots, small circles, or lines work great as fillers.'
      }
    ],
    resources: [
      {
        title: "Zentangle Basics",
        url: "https://zentangle.com/pages/get-started",
        description: "Learn the basics of zentangle patterns"
      },
      {
        title: "Pattern Library",
        url: "https://www.zentangle.com/zentangle-pattern-library",
        description: "Explore different zentangle patterns"
      }
    ],
    examples: [
      'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1576020799627-aeac74d58064?auto=format&fit=crop&w=500'
    ]
  }
];

export const natureLocations: NatureLocation[] = [
  {
    name: "Local Parks",
    description: "Visit your nearby park for inspiration from nature's patterns and colors.",
    tips: [
      "Find a quiet bench or spot under a tree",
      "Observe the play of light and shadow",
      "Notice the patterns in leaves and flowers",
      "Try sketching the same scene at different times of day"
    ],
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200"
  },
  {
    name: "Botanical Gardens",
    description: "Explore the diverse plant life and structured gardens for detailed studies.",
    tips: [
      "Focus on individual plant specimens",
      "Study the architecture of different flowers",
      "Practice capturing textures",
      "Take reference photos for later use"
    ],
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200"
  },
  {
    name: "Urban Nature Spots",
    description: "Find inspiration in city gardens and green spaces.",
    tips: [
      "Look for unexpected nature in urban settings",
      "Sketch architectural elements with natural elements",
      "Practice quick urban nature sketches",
      "Document seasonal changes"
    ],
    imageUrl: "https://images.unsplash.com/photo-1496769336828-c522a3a7e33c?auto=format&fit=crop&w=1200"
  }
];