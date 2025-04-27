import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Clock, CheckCircle, BookmarkPlus, ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import { modules } from "@/mocks/modules";
import { lessons } from "@/mocks/lessons";
import { useAppStore } from "@/store/appStore";
import { useProgressStore } from "@/store/progressStore";

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  const { completedLessons, bookmarkedLessons, toggleBookmark } = useProgressStore();
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  // Find the module
  const module = modules.find(m => m.id === id);
  if (!module) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Module not found</Text>
      </SafeAreaView>
    );
  }

  // Get the lessons for this module
  const moduleLessons = lessons.filter(lesson => lesson.moduleId === module.id);
  
  // Calculate module progress
  const totalLessons = moduleLessons.length;
  const completedCount = moduleLessons.filter(
    lesson => completedLessons[lesson.id]
  ).length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const navigateToLesson = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  const handleBookmark = (lessonId: string) => {
    toggleBookmark(lessonId);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: module.title,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.description, { color: colors.text }]}>
            {module.description}
          </Text>
          
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%`, backgroundColor: colors.primary }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: colors.subtext }]}>
              {completedCount} of {totalLessons} lessons completed ({Math.round(progressPercentage)}%)
            </Text>
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Lessons</Text>
        
        <FlatList
          data={moduleLessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lessonsList}
          renderItem={({ item, index }) => {
            const isCompleted = completedLessons[item.id];
            const isBookmarked = bookmarkedLessons.includes(item.id);
            
            return (
              <TouchableOpacity 
                style={[
                  styles.lessonCard, 
                  { backgroundColor: colors.card }
                ]}
                onPress={() => navigateToLesson(item.id)}
              >
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonNumberContainer}>
                    <View 
                      style={[
                        styles.lessonNumber, 
                        { 
                          backgroundColor: isCompleted ? colors.primary : colors.border,
                        }
                      ]}
                    >
                      <Text 
                        style={[
                          styles.lessonNumberText, 
                          { color: isCompleted ? '#fff' : colors.text }
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.lessonContent}>
                    <Text style={[styles.lessonTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    
                    <Text 
                      style={[styles.lessonDescription, { color: colors.subtext }]}
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                    
                    <View style={styles.lessonMeta}>
                      <View style={styles.lessonDuration}>
                        <Clock size={14} color={colors.subtext} />
                        <Text style={[styles.lessonDurationText, { color: colors.subtext }]}>
                          {item.duration} min
                        </Text>
                      </View>
                      
                      <View style={styles.lessonTags}>
                        {item.tags.map((tag, tagIndex) => (
                          <View 
                            key={tagIndex} 
                            style={[
                              styles.tag, 
                              { backgroundColor: colors.highlight }
                            ]}
                          >
                            <Text style={[styles.tagText, { color: colors.primary }]}>
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.lessonActions}>
                    <TouchableOpacity 
                      style={styles.bookmarkButton}
                      onPress={() => handleBookmark(item.id)}
                    >
                      <BookmarkPlus 
                        size={20} 
                        color={isBookmarked ? colors.primary : colors.subtext} 
                        fill={isBookmarked ? colors.primary : 'transparent'}
                      />
                    </TouchableOpacity>
                    
                    {isCompleted ? (
                      <CheckCircle size={24} color={colors.success} />
                    ) : (
                      <ChevronRight size={24} color={colors.primary} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
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
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  lessonsList: {
    paddingBottom: 24,
  },
  lessonCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  lessonHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  lessonNumberContainer: {
    marginRight: 12,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumberText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lessonContent: {
    flex: 1,
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  lessonDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonDurationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  lessonTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
  },
  lessonActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkButton: {
    marginRight: 12,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});