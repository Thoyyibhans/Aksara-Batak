import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User } from '../types';

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentVariant: 'toba',
      darkMode: false,
      language: 'id',
      user: null,
      userProgress: {
        completedLessons: [],
        quizScores: {},
        currentStreak: 0,
        totalPoints: 0,
      },
      setCurrentVariant: (variant) =>
        set({ currentVariant: variant }),
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),
      setLanguage: (lang) =>
        set({ language: lang }),
      login: (user: User) =>
        set({ user }),
      logout: () =>
        set({ user: null }),
      updateProgress: (progress) =>
        set((state) => {
          const currentProgress = state.userProgress;
          const newCompletedLessons = progress.completedLessons 
            ? [...new Set([...currentProgress.completedLessons, ...progress.completedLessons])]
            : currentProgress.completedLessons;
          
          const newQuizScores = progress.quizScores 
            ? { ...currentProgress.quizScores, ...progress.quizScores }
            : currentProgress.quizScores;
          
          const newTotalPoints = currentProgress.totalPoints + (progress.totalPoints || 0);
          
          return {
            userProgress: {
              completedLessons: newCompletedLessons,
              quizScores: newQuizScores,
              currentStreak: progress.currentStreak || currentProgress.currentStreak,
              totalPoints: newTotalPoints,
            },
          };
        }),
    }),
    {
      name: 'batakscript-storage',
    }
  )
);

export default useAppStore;