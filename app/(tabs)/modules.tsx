import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Lock, ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import { modules } from "@/mocks/modules";
import { useAppStore } from "@/store/appStore";
import { useProgressStore } from "@/store/progressStore";

export default function ModulesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  const { completedLessons } = useProgressStore();
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  const navigateToModule = (moduleId: string, isLocked: boolean | undefined) => {
    if (isLocked) return;
    router.push(`./module/${moduleId}`);
  };

  // Calculate completion percentage for each module
  const getModuleProgress = (moduleId: string) => {
    const moduleData = modules.find(m => m.id === moduleId);
    if (!moduleData) return 0;
    
    const totalLessons = moduleData.lessons.length;
    if (totalLessons === 0) return 0;
    
    const completedModuleLessons = moduleData.lessons.filter(
      lessonId => completedLessons[lessonId]
    ).length;
    
    return (completedModuleLessons / totalLessons) * 100;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Learning Modules</Text>
      
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const progress = getModuleProgress(item.id);
          
          return (
            <TouchableOpacity 
              style={[
                styles.moduleCard, 
                { backgroundColor: colors.card }
              ]}
              onPress={() => navigateToModule(item.id, item.isLocked)}
              disabled={item.isLocked}
            >
              <View style={styles.moduleContent}>
                <View style={styles.moduleInfo}>
                  <Text style={[styles.moduleTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text 
                    style={[styles.moduleDescription, { color: colors.subtext }]}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  
                  <View style={styles.moduleFooter}>
                    <View style={styles.progressContainer}>
                      <View 
                        style={[
                          styles.progressBar, 
                          { backgroundColor: colors.border }
                        ]}
                      >
                        <View 
                          style={[
                            styles.progressFill, 
                            { 
                              width: `${progress}%`, 
                              backgroundColor: item.isLocked ? colors.subtext : colors.primary 
                            }
                          ]} 
                        />
                      </View>
                      <Text style={[styles.progressText, { color: colors.subtext }]}>
                        {Math.round(progress)}% complete
                      </Text>
                    </View>
                    
                    <Text style={[styles.lessonCount, { color: colors.primary }]}>
                      {item.lessons.length} lessons
                    </Text>
                  </View>
                </View>
                
                {item.isLocked ? (
                  <Lock size={24} color={colors.subtext} />
                ) : (
                  <ChevronRight size={24} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
  list: {
    paddingBottom: 24,
  },
  moduleCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  moduleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleInfo: {
    flex: 1,
    marginRight: 16,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
  },
  lessonCount: {
    fontSize: 14,
    fontWeight: "500",
  },
});