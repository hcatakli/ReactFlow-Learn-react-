import React from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { forumMessages } from "@/mocks/forumPosts";
import { useColorScheme } from "react-native";
import Colors from "../../constants/colors";
import { useAppStore } from "@/store/appStore";

export default function ForumScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { theme } = useAppStore();
  
  // Theme selection
  const activeTheme = theme === 'system' ? colorScheme || 'light' : theme;
  const colors = Colors[activeTheme];

  // Navigate to message details
  const navigateToMessage = (messageId: string) => {
    router.push(`/forum/${messageId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={forumMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.messageCard, { backgroundColor: colors.card }]}
            onPress={() => navigateToMessage(item.id)}
          >
            <View style={styles.header}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={[styles.messageTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.messageUser, { color: colors.subtext }]}>By {item.user.name}</Text>
              </View>
            </View>
            <Text style={[styles.messageDate, { color: colors.subtext }]}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageUser: {
    fontSize: 14,
    marginTop: 4,
  },
  messageDate: {
    fontSize: 12,
    marginTop: 4,
  },
});
