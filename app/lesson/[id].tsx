import React, { useState, useEffect, ReactNode } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  useColorScheme,
  useWindowDimensions
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { 
  BookOpen, 
  Code, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  BookmarkPlus,
  Clock
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import Colors from "../../constants/colors";
import { lessons } from "@/mocks/lessons";
import { modules } from "@/mocks/modules";
import { useAppStore } from "@/store/appStore";
import { useProgressStore } from "@/store/progressStore";

// Simple markdown renderer components
const MarkdownHeading = ({ level, children, colors }: { level: number, children: ReactNode, colors: any }) => {
    const fontSize = 24 - (level - 1) * 2;
    const marginBottom = 16 - (level - 1) * 2;
    const fontWeight = level === 1 ? "bold" : "600";
    
    return (
      <Text 
        style={{ 
          fontSize, 
          fontWeight, 
          marginBottom, 
          color: colors.text,
          marginTop: level === 1 ? 0 : 16
        }}
      >
        {children}
      </Text>
    );
  };

const MarkdownParagraph = ({ children, colors }: { children: ReactNode, colors: any }) => (
    <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16, color: colors.text }}>
      {children}
    </Text>
  );

const MarkdownCode = ({ children, colors }: { children: ReactNode, colors: any }) => (
    <View 
      style={{ 
        backgroundColor: colors.card === '#F8F9FA' ? '#EAEAEA' : '#2D2D2D', 
        padding: 16, 
        borderRadius: 8,
        marginBottom: 16
      }}
    >
      <Text 
        style={{ 
          fontFamily: 'monospace', 
          fontSize: 14, 
          color: colors.card === '#F8F9FA' ? '#333' : '#E0E0E0' 
        }}
      >
        {children}
      </Text>
    </View>
  );

const MarkdownList = ({ items, colors }: { items: string[], colors: any }) => (
    <View style={{ marginBottom: 16 }}>
      {items.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Text style={{ color: colors.text, marginRight: 8 }}>•</Text>
          <Text style={{ flex: 1, color: colors.text }}>{item}</Text>
        </View>
      ))}
    </View>
  );

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const { theme, codeEditorFontSize } = useAppStore();
  const { 
    completedLessons, 
    bookmarkedLessons, 
    markLessonComplete, 
    toggleBookmark,
    updateLastAccessed,
    incrementXP
  } = useProgressStore();
  
  const [activeTab, setActiveTab] = useState('content');
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  // Find the lesson
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Lesson not found</Text>
      </SafeAreaView>
    );
  }

  // Find the module this lesson belongs to
  const module = modules.find(m => m.id === lesson.moduleId);
  
  // Find the next and previous lessons in this module
  const moduleLessons = lessons.filter(l => l.moduleId === lesson.moduleId);
  const currentIndex = moduleLessons.findIndex(l => l.id === lesson.id);
  const previousLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;

  const isCompleted = completedLessons[lesson.id];
  const isBookmarked = bookmarkedLessons.includes(lesson.id);

  useEffect(() => {
    // Update last accessed
    updateLastAccessed({
      moduleId: lesson.moduleId,
      lessonId: lesson.id
    });
  }, [lesson.id]);

  const handleComplete = () => {
    if (!isCompleted) {
      markLessonComplete(lesson.id);
      incrementXP(10); // Award XP for completing a lesson
    }
  };

  const handleBookmark = () => {
    toggleBookmark(lesson.id);
  };

  const navigateToLesson = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  // Simple markdown parser
  const renderContent = (content: string) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const elements = [];
    let currentParagraph = '';
    let inCodeBlock = false;
    let codeContent = '';
    let listItems = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <MarkdownCode key={`code-${i}`} colors={colors}>
              {codeContent}
            </MarkdownCode>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          if (currentParagraph) {
            elements.push(
              <MarkdownParagraph key={`p-${i}`} colors={colors}>
                {currentParagraph}
              </MarkdownParagraph>
            );
            currentParagraph = '';
          }
          inCodeBlock = true;
        }
        continue;
      }
      
      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }
      
      // Handle headings
      // Handle headings
if (line.startsWith('#')) {
    if (currentParagraph) {
      elements.push(
        <MarkdownParagraph key={`p-${i}`} colors={colors}>
          {currentParagraph}
        </MarkdownParagraph>
      );
      currentParagraph = '';
    }
    
    const match = line.match(/^#+/);  // match ile kontrol et
    const level = match ? match[0].length : 0;  // match varsa level'ı al, yoksa 0
    const text = line.replace(/^#+\s/, '');
    elements.push(
      <MarkdownHeading key={`h-${i}`} level={level} colors={colors}>
        {text}
      </MarkdownHeading>
    );
    continue;
  }
  
      
      // Handle list items
      if (line.match(/^\s*-\s/)) {
        if (currentParagraph) {
          elements.push(
            <MarkdownParagraph key={`p-${i}`} colors={colors}>
              {currentParagraph}
            </MarkdownParagraph>
          );
          currentParagraph = '';
        }
        
        const text = line.replace(/^\s*-\s/, '');
        listItems.push(text);
        
        // Check if this is the last list item
        if (i === lines.length - 1 || !lines[i + 1].match(/^\s*-\s/)) {
          elements.push(
            <MarkdownList key={`list-${i}`} items={listItems} colors={colors} />
          );
          listItems = [];
        }
        continue;
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        if (currentParagraph) {
          elements.push(
            <MarkdownParagraph key={`p-${i}`} colors={colors}>
              {currentParagraph}
            </MarkdownParagraph>
          );
          currentParagraph = '';
        }
        continue;
      }
      
      // Add to current paragraph
      currentParagraph += (currentParagraph ? ' ' : '') + line;
      
      // If this is the last line, add the paragraph
      if (i === lines.length - 1 && currentParagraph) {
        elements.push(
          <MarkdownParagraph key={`p-${i}`} colors={colors}>
            {currentParagraph}
          </MarkdownParagraph>
        );
      }
    }
    
    return elements;
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: lesson.title,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity 
                style={{ marginRight: 16 }}
                onPress={handleBookmark}
              >
                <BookmarkPlus 
                  size={24} 
                  color={isBookmarked ? colors.primary : colors.text} 
                  fill={isBookmarked ? colors.primary : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleComplete}>
                <CheckCircle 
                  size={24} 
                  color={isCompleted ? colors.success : colors.text} 
                  fill={isCompleted ? colors.success : 'transparent'}
                />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          {module && (
            <Text style={[styles.moduleTitle, { color: colors.subtext }]}>
              {module.title}
            </Text>
          )}
          
          <Text style={[styles.lessonTitle, { color: colors.text }]}>
            {lesson.title}
          </Text>
          
          <View style={styles.lessonMeta}>
            <View style={styles.difficultyTag}>
              <Text 
                style={[
                  styles.difficultyText, 
                  { 
                    color: 
                      lesson.difficulty === 'beginner' ? colors.success :
                      lesson.difficulty === 'intermediate' ? colors.primary :
                      colors.secondary
                  }
                ]}
              >
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </Text>
            </View>
            
            <View style={styles.durationTag}>
              <Clock size={14} color={colors.subtext} />
              <Text style={[styles.durationText, { color: colors.subtext }]}>
                {lesson.duration} min
              </Text>
            </View>
            
            {lesson.tags.map((tag, index) => (
              <View 
                key={index} 
                style={[styles.tag, { backgroundColor: colors.highlight }]}
              >
                <Text style={[styles.tagText, { color: colors.primary }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'content' && [styles.activeTab, { borderBottomColor: colors.primary }]
            ]}
            onPress={() => setActiveTab('content')}
          >
            <BookOpen 
              size={20} 
              color={activeTab === 'content' ? colors.primary : colors.subtext} 
            />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'content' ? colors.primary : colors.subtext }
              ]}
            >
              Content
            </Text>
          </TouchableOpacity>
          
          {lesson.codeExample && (
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'code' && [styles.activeTab, { borderBottomColor: colors.primary }]
              ]}
              onPress={() => setActiveTab('code')}
            >
              <Code 
                size={20} 
                color={activeTab === 'code' ? colors.primary : colors.subtext} 
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: activeTab === 'code' ? colors.primary : colors.subtext }
                ]}
              >
                Code Example
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView 
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'content' ? (
            <View style={styles.content}>
              {renderContent(lesson.content)}
            </View>
          ) : (
            <View style={styles.codeContainer}>
              <MarkdownCode colors={colors}>
                {lesson.codeExample}
              </MarkdownCode>
            </View>
          )}
        </ScrollView>
        
        <View 
          style={[
            styles.navigationFooter, 
            { backgroundColor: colors.card }
          ]}
        >
          {previousLesson ? (
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={() => navigateToLesson(previousLesson.id)}
            >
              <ChevronLeft size={20} color={colors.primary} />
              <Text style={[styles.navigationText, { color: colors.primary }]}>
                Previous
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationPlaceholder} />
          )}
          
          <TouchableOpacity 
            style={[
              styles.completeButton, 
              { 
                backgroundColor: isCompleted ? colors.success : colors.primary,
                opacity: isCompleted ? 0.8 : 1
              }
            ]}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </Text>
            {isCompleted && <CheckCircle size={16} color="#fff" style={{ marginLeft: 4 }} />}
          </TouchableOpacity>
          
          {nextLesson ? (
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={() => navigateToLesson(nextLesson.id)}
            >
              <Text style={[styles.navigationText, { color: colors.primary }]}>
                Next
              </Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationPlaceholder} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  moduleTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  lessonMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  difficultyTag: {
    marginRight: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: "500",
  },
  durationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  durationText: {
    fontSize: 14,
    marginLeft: 4,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  codeContainer: {
    padding: 16,
  },
  navigationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationText: {
    fontSize: 16,
    fontWeight: "500",
  },
  navigationPlaceholder: {
    width: 80,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});