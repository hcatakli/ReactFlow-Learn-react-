import React from "react";
import { StyleSheet, Text, View, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Award, Calendar, Zap, BookOpen, CheckCircle } from "lucide-react-native";

import Colors from "@/constants/colors";
import { useProgressStore } from "@/store/progressStore";
import { useAppStore } from "@/store/appStore";
import { modules } from "@/mocks/modules";
import { lessons } from "@/mocks/lessons";

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  const { completedLessons, streakDays, xp } = useProgressStore();
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  // Calculate overall progress
  const totalLessons = lessons.length;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  // Calculate module completion
  const moduleProgress = modules.map(module => {
    const moduleLessons = module.lessons;
    const completedModuleLessons = moduleLessons.filter(
      lessonId => completedLessons[lessonId]
    ).length;
    const modulePercentage = moduleLessons.length > 0 
      ? (completedModuleLessons / moduleLessons.length) * 100 
      : 0;
    
    return {
      id: module.id,
      title: module.title,
      completed: completedModuleLessons,
      total: moduleLessons.length,
      percentage: modulePercentage,
      isLocked: module.isLocked
    };
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <BookOpen size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{completedCount}</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>Lessons Completed</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Calendar size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{streakDays}</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>Day Streak</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Zap size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{xp}</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>XP Earned</Text>
          </View>
        </View>
        
        {/* Overall Progress */}
        <View style={[styles.overallProgressCard, { backgroundColor: colors.card }]}>
          <View style={styles.overallProgressHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Overall Progress</Text>
            <Award size={20} color={colors.primary} />
          </View>
          
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
              {Math.round(progressPercentage)}% complete
            </Text>
          </View>
          
          <Text style={[styles.progressDetail, { color: colors.subtext }]}>
            {completedCount} of {totalLessons} lessons completed
          </Text>
        </View>
        
        {/* Module Progress */}
        <View style={styles.moduleProgressSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Module Progress</Text>
          
          {moduleProgress.map((module) => (
            <View 
              key={module.id} 
              style={[
                styles.moduleProgressCard, 
                { 
                  backgroundColor: colors.card,
                  opacity: module.isLocked ? 0.6 : 1
                }
              ]}
            >
              <View style={styles.moduleProgressHeader}>
                <Text style={[styles.moduleTitle, { color: colors.text }]}>
                  {module.title}
                </Text>
                {module.percentage === 100 && (
                  <CheckCircle size={16} color={colors.success} />
                )}
              </View>
              
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${module.percentage}%`, 
                        backgroundColor: module.isLocked ? colors.subtext : colors.primary 
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.moduleProgressText, { color: colors.subtext }]}>
                  {module.completed} of {module.total} lessons completed
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  overallProgressCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  overallProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 8,
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
    fontSize: 16,
    fontWeight: "500",
  },
  progressDetail: {
    fontSize: 14,
  },
  moduleProgressSection: {
    marginBottom: 24,
  },
  moduleProgressCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  moduleProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  moduleProgressText: {
    fontSize: 14,
  },
});