export type Lesson = {
    id: string;
    title: string;
    description: string;
    content: string;
    codeExample?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in minutes
    tags: string[];
    moduleId: string;
  };
  
  export type Module = {
    id: string;
    title: string;
    description: string;
    icon: string;
    lessons: string[]; // lesson ids
    order: number;
    isLocked?: boolean;
  };
  
  export type Challenge = {
    id: string;
    title: string;
    description: string;
    prompt: string;
    initialCode: string;
    solution: string;
    hints: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    moduleId: string;
  };
  
  export type UserProgress = {
    completedLessons: Record<string, boolean>;
    completedChallenges: Record<string, boolean>;
    bookmarkedLessons: string[];
    lastAccessed: {
      lessonId?: string;
      moduleId?: string;
    };
    streakDays: number;
    lastStreak: string; // ISO date string
    xp: number;
  };
  
  export type AppSettings = {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    codeEditorFontSize: number;
  };