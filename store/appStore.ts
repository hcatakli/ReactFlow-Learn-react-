import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '@/types';

interface AppState extends AppSettings {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setNotifications: (enabled: boolean) => void;
  setCodeEditorFontSize: (size: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      notifications: true,
      codeEditorFontSize: 16,
      
      setTheme: (theme) => set({ theme }),
      setNotifications: (notifications) => set({ notifications }),
      setCodeEditorFontSize: (codeEditorFontSize) => set({ codeEditorFontSize }),
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);