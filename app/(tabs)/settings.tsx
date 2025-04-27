import React from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, useColorScheme, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Moon, Sun, Smartphone, Bell, Type, Info, Trash2, Github } from "lucide-react-native";

import Colors from "@/constants/colors";
import { useAppStore } from "@/store/appStore";
import { useProgressStore } from "@/store/progressStore";

export default function SettingsScreen() {
  const systemColorScheme = useColorScheme();
  const { 
    theme, 
    notifications, 
    codeEditorFontSize,
    setTheme,
    setNotifications,
    setCodeEditorFontSize
  } = useAppStore();
  
  const { resetProgress } = useProgressStore();
  
  // Determine which theme to use (user preference or system)
  const activeTheme = theme === 'system' ? systemColorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  const handleResetProgress = () => {
    // In a real app, you would show a confirmation dialog here
    resetProgress();
  };

  const increaseFontSize = () => {
    if (codeEditorFontSize < 24) {
      setCodeEditorFontSize(codeEditorFontSize + 1);
    }
  };

  const decreaseFontSize = () => {
    if (codeEditorFontSize > 12) {
      setCodeEditorFontSize(codeEditorFontSize - 1);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          
          <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Moon size={20} color={colors.text} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={theme === 'dark'}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Smartphone size={20} color={colors.text} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Use System Theme</Text>
              </View>
              <Switch
                value={theme === 'system'}
                onValueChange={(value) => setTheme(value ? 'system' : activeTheme)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>
        </View>
        
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          
          <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Bell size={20} color={colors.text} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Push Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>
        </View>
        
        {/* Code Editor Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Code Editor</Text>
          
          <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Type size={20} color={colors.text} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Font Size</Text>
              </View>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity 
                  style={[
                    styles.fontSizeButton, 
                    { 
                      backgroundColor: colors.border,
                      opacity: codeEditorFontSize <= 12 ? 0.5 : 1
                    }
                  ]}
                  onPress={decreaseFontSize}
                  disabled={codeEditorFontSize <= 12}
                >
                  <Text style={[styles.fontSizeButtonText, { color: colors.text }]}>-</Text>
                </TouchableOpacity>
                
                <Text style={[styles.fontSizeValue, { color: colors.text }]}>
                  {codeEditorFontSize}
                </Text>
                
                <TouchableOpacity 
                  style={[
                    styles.fontSizeButton, 
                    { 
                      backgroundColor: colors.border,
                      opacity: codeEditorFontSize >= 24 ? 0.5 : 1
                    }
                  ]}
                  onPress={increaseFontSize}
                  disabled={codeEditorFontSize >= 24}
                >
                  <Text style={[styles.fontSizeButtonText, { color: colors.text }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        
        {/* Data Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Data</Text>
          
          <TouchableOpacity 
            style={[styles.settingCard, { backgroundColor: colors.card }]}
            onPress={handleResetProgress}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Trash2 size={20} color={colors.error} />
                <Text style={[styles.settingLabel, { color: colors.error }]}>
                  Reset Progress
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          
          <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Info size={20} color={colors.text} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Version 1.0.0
                </Text>
              </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Github size={20} color={colors.text} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  GitHub Repository
                </Text>
              </View>
            </View>
          </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  settingCard: {
    borderRadius: 12,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fontSizeValue: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
});