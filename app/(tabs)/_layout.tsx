import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Home, BookOpen, Award, Settings, Shapes, Server, ServerCrash, Send, Dice1, Diff, DiscAlbum, DnaOff, DownloadIcon, Drama, Dribbble, Drill, Droplet, Earth, Computer, FileCode, FileCode2, Code, Code2, Code2Icon, CodeSquare, CodeSquareIcon, CodeXml } from "lucide-react-native";

import Colors from "../../constants/colors";
import { useAppStore } from "@/store/appStore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: { 
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="modules"
        options={{
          title: "Modules",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => <Award size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: "Forum",
          tabBarIcon: ({ color, size }) => <Earth size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="code"
        options={{
          title: "Exercise",
          tabBarIcon: ({ color, size }) => <Code2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
      
    </Tabs>
  );
}