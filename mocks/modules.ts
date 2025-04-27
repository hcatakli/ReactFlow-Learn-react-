import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of React Native and set up your development environment',
    icon: 'rocket',
    lessons: [
      'intro-to-rn',
      'setting-up-environment',
      'hello-world',
      'understanding-jsx',
      'expo-vs-cli'
    ],
    order: 1
  },
  {
    id: 'core-components',
    title: 'Core Components',
    description: 'Explore the fundamental building blocks of React Native apps',
    icon: 'layers',
    lessons: [
      'view-component',
      'text-component',
      'image-component',
      'scrollview-component',
      'flatlist-component'
    ],
    order: 2
  },
  {
    id: 'styling',
    title: 'Styling & Layout',
    description: 'Master flexbox and styling in React Native',
    icon: 'palette',
    lessons: [
      'stylesheet-basics',
      'flexbox-layout',
      'dimensions-and-units',
      'responsive-design',
      'theming'
    ],
    order: 3
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Implement navigation between screens in your app',
    icon: 'navigation',
    lessons: [
      'navigation-intro',
      'stack-navigation',
      'tab-navigation',
      'drawer-navigation',
      'nested-navigation'
    ],
    order: 4
  },
  {
    id: 'state-management',
    title: 'State Management',
    description: 'Learn how to manage state in React Native applications',
    icon: 'database',
    lessons: [
      'useState-hook',
      'useReducer-hook',
      'context-api',
      'redux-basics',
      'zustand-intro'
    ],
    order: 5,
    isLocked: true
  },
  {
    id: 'apis-networking',
    title: 'APIs & Networking',
    description: 'Connect your app to external services and APIs',
    icon: 'wifi',
    lessons: [
      'fetch-api',
      'axios-library',
      'async-await',
      'handling-errors',
      'caching-strategies'
    ],
    order: 6,
    isLocked: true
  },
  {
    id: 'animations',
    title: 'Animations',
    description: 'Create smooth and interactive animations',
    icon: 'sparkles',
    lessons: [
      'animated-api',
      'layout-animations',
      'gesture-handler',
      'reanimated-basics',
      'complex-animations'
    ],
    order: 7,
    isLocked: true
  },
  {
    id: 'native-modules',
    title: 'Native Modules',
    description: 'Integrate native code into your React Native app',
    icon: 'cpu',
    lessons: [
      'native-modules-intro',
      'camera-access',
      'geolocation',
      'local-storage',
      'push-notifications'
    ],
    order: 8,
    isLocked: true
  }
];