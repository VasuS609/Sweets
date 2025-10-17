export interface Option {
  id: number;
  text: string;
  emoji: string;
  tags: string[];
  order: number;
  questionId?: number;
}

export interface Question {
  id: number;
  text: string;
  order: number;
  options: Option[];
  createdAt?: Date;
}

export interface Sweet {
  id: number;
  name: string;
  emoji: string;
  description: string;
  tagline: string;
  funFact: string;
  imageUrl: string;
  tags: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  createdAt?: Date;
}

export interface QuizResult {
  id: number;
  userName: string | null;
  selectedOptions: number[];
  tagScores: Record<string, number>;
  recommendedSweet: string;
  createdAt: Date;
}