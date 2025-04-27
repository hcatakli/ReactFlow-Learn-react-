import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight, Clock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../constants/colors";
import { modules } from "@/mocks/modules";
import { lessons } from "@/mocks/lessons";
import { useProgressStore } from "@/store/progressStore";
import { useAppStore } from "@/store/appStore";

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  const { lastAccessed, completedLessons, updateLastAccessed } = useProgressStore();
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  // Find the last accessed module and lesson
  const lastModule = lastAccessed.moduleId ? 
    modules.find(m => m.id === lastAccessed.moduleId) : 
    modules[0];
    
  const lastLesson = lastAccessed.lessonId ? 
    lessons.find(l => l.id === lastAccessed.lessonId) : 
    lessons.find(l => l.id === lastModule?.lessons[0]);

  // Calculate progress
  const totalLessons = lessons.length;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  // Get the first 3 unlocked modules
  const unlockedModules = modules
    .filter(module => !module.isLocked)
    .slice(0, 3);

  useEffect(() => {
    // If no last accessed module/lesson, set the first one
    if (!lastAccessed.moduleId && modules.length > 0) {
      updateLastAccessed({
        moduleId: modules[0].id,
        lessonId: modules[0].lessons[0]
      });
    }
  }, []);

  const navigateToLesson = (moduleId: string, lessonId: string) => {
    updateLastAccessed({ moduleId, lessonId });
    router.push(`/lesson/${lessonId}`);
  };

  const navigateToModule = (moduleId: string) => {
    router.push(`./module/${moduleId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.welcomeText, { color: colors.text }]}>
        Welcome to React Native Learner
      </Text>
      
      {/* Continue Learning Section */}
      {lastModule && lastLesson && (
        <View style={[styles.continueSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Continue Learning</Text>
          <TouchableOpacity 
            style={styles.continueCard}
            onPress={() => navigateToLesson(lastModule.id, lastLesson.id)}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientCard}
            >
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.moduleTitle}>{lastModule.title}</Text>
                  <Text style={styles.lessonTitle}>{lastLesson.title}</Text>
                  <View style={styles.lessonMeta}>
                    <Clock size={14} color="#fff" />
                    <Text style={styles.lessonDuration}>{lastLesson.duration} min</Text>
                  </View>
                </View>
                <ChevronRight size={24} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Progress Overview */}
      <View style={[styles.progressSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Progress</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%`, backgroundColor: colors.primary }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.text }]}>
            {completedCount} of {totalLessons} lessons completed ({Math.round(progressPercentage)}%)
          </Text>
        </View>
      </View>

      {/* Module List */}
      <View style={styles.modulesSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Modules</Text>
          <TouchableOpacity onPress={() => router.push('./modules')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={unlockedModules}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.modulesList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.moduleCard, { backgroundColor: colors.card }]}
              onPress={() => navigateToModule(item.id)}
            >
              <Text style={[styles.moduleCardTitle, { color: colors.text }]}>{item.title}</Text>
              <Text 
                style={[styles.moduleCardDescription, { color: colors.subtext }]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View style={styles.moduleCardFooter}>
                <Text style={[styles.lessonCount, { color: colors.primary }]}>
                  {item.lessons.length} lessons
                </Text>
                <ChevronRight size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  continueSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  continueCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientCard: {
    borderRadius: 12,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDuration: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  progressSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
  },
  modulesSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modulesList: {
    paddingRight: 16,
  },
  moduleCard: {
    width: 240,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  moduleCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  moduleCardDescription: {
    fontSize: 14,
    marginBottom: 12,
    flex: 1,
  },
  moduleCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonCount: {
    fontSize: 14,
    fontWeight: "500",
  },
});