import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { forumMessages } from "@/mocks/forumPosts";
import { useColorScheme } from "react-native";
import Colors from "../../constants/colors";
import { useAppStore } from "@/store/appStore";

export default function MessageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  
  // Theme selection
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  // Find the message
  const message = forumMessages.find((msg) => msg.id === id);

  if (!message) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Message not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={[styles.title, { color: colors.text }]}>{message.title}</Text>
          <Text style={[styles.user, { color: colors.subtext }]}>By {message.user.name}</Text>
          <Text style={[styles.date, { color: colors.subtext }]}>{message.date}</Text>
        </View>
      </View>
      <Text style={[styles.content, { color: colors.text }]}>{message.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  user: {
    fontSize: 16,
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    fontSize: 16,
    marginTop: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
  },
});
