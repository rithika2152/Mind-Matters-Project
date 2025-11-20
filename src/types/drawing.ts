export interface VideoTutorial {
  title: string;
  embedId: string;
  duration: string;
}

export interface DrawingStep {
  title: string;
  description: string;
  tip: string;
}

export interface Resource {
  title: string;
  url: string;
  description: string;
}

export interface DrawingTutorial {
  id: string;
  title: string;
  image: string;
  difficulty: string;
  timeNeeded: string;
  description: string;
  materials: string[];
  tutorials: VideoTutorial[];
  steps: DrawingStep[];
  resources: Resource[];
  examples: string[];
}

export interface NatureLocation {
  name: string;
  description: string;
  tips: string[];
  imageUrl: string;
}