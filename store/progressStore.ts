import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress } from '@/types';

interface ProgressState extends UserProgress {
  markLessonComplete: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  updateLastAccessed: (data: { moduleId?: string; lessonId?: string }) => void;
  incrementXP: (amount: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const initialState: UserProgress = {
  completedLessons: {},
  completedChallenges: {},
  bookmarkedLessons: [],
  lastAccessed: {},
  streakDays: 0,
  lastStreak: '',
  xp: 0,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      markLessonComplete: (lessonId) => set((state) => ({
        completedLessons: {
          ...state.completedLessons,
          [lessonId]: true,
        },
      })),
      
      toggleBookmark: (lessonId) => set((state) => {
        const isBookmarked = state.bookmarkedLessons.includes(lessonId);
        return {
          bookmarkedLessons: isBookmarked
            ? state.bookmarkedLessons.filter(id => id !== lessonId)
            : [...state.bookmarkedLessons, lessonId],
        };
      }),
      
      updateLastAccessed: (data) => set((state) => ({
        lastAccessed: {
          ...state.lastAccessed,
          ...data,
        },
      })),
      
      incrementXP: (amount) => set((state) => ({
        xp: state.xp + amount,
      })),
      
      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        
        // If already updated today, do nothing
        if (state.lastStreak === today) {
          return state;
        }
        
        // Check if last streak was yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        const newStreakDays = state.lastStreak === yesterdayString
          ? state.streakDays + 1
          : 1;
        
        return {
          streakDays: newStreakDays,
          lastStreak: today,
        };
      }),
      
      resetProgress: () => set(initialState),
    }),
    {
      name: 'user-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);