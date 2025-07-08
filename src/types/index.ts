export interface Letter {
  id: string;
  char: string;
  latin: string;
  varian: string[];
  audio: string;
  stroke?: string;
}

export interface Story {
  slug: string;
  title: string;
  origin: string;
  century: number;
  batak: string;
  latin: string;
  audio?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'choice' | 'type-latin' | 'type-batak';
  choices?: string[];
  answer: string;
  char?: string;
}

export interface Quiz {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  items: QuizQuestion[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  currentStreak: number;
  totalPoints: number;
}

export interface AppState {
  currentVariant: string;
  darkMode: boolean;
  language: string;
  user: User | null;
  userProgress: UserProgress;
  setCurrentVariant: (variant: string) => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: string) => void;
  login: (user: User) => void;
  logout: () => void;
  updateProgress: (progress: Partial<UserProgress>) => void;
}